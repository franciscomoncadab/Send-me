const Links = require('../models/Links');
const shortid = require('shortid');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

exports.createLink = async (req, res, next) => { 
     
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
     }

     const { original_name, password } = req.body
     
     const link = new Links();
     link.url = shortid.generate();
     link.name = shortid.generate();
     link.original_name = original_name;
          
     if(req.user) {
          const { password, download } = req.body;

          if(download) {
               link.download = download;
          }

          if(password) {
               const salt = await bcrypt.genSalt(10);
               link.password = await bcrypt.hash(password, salt);
          }

          link.author = req.user.id;
     }

     try {
          await link.save();
          res.json({msg: `${link.url}`});
          next();
     } catch (err) {
          console.log(err);
     }
};

exports.getLink = async (req, res, next) => { 

     const { url } = req.params;
     const link = await Links.findOne({ url });

     if(!link) {
          res.status(404).json({ msg: 'Link not found' });
          return next();
     }

     res.json({ file: link.name})
     const { download, name } = link;

     if(download === 1) {
          req.file = name;

          await Links.findOneAndRemove(req.params.url);
          next();
     } else {
          link.download--;
          await link.save();
     }

};