const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs');

exports.uploadFile = async (req, res, next) => {

     const configMulter = {
          limits: { fileSize: req.user ? 1024 * 1024 * 10 : 1024 * 1024 },
          storage: fileStorage = multer.diskStorage({
               destination: (req, file, cb) => {
                    cb(null, __dirname +'/../uploads');
               },
               filename: (req, file, cb) => { 
                    const extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
                    cb(null, `${shortid.generate()}${extension}`);
               },
     
          })
     };

     const upload = multer(configMulter).single('file');

     upload(req, res, (err) => { 
          console.log(req.file)

          if(!err) {
               res.json({ file: req.file.filename})
          } else {
               console.log(err);
               return next();
          }
     });
     
};

exports.deleteFile = async (req, res) => { 
     console.log(req.file);

     try {
          fs.unlinkSync(__dirname + `/../uploads/${req.file}`);
          console.log('se elimino el archivo');
     } catch (err) {
          console.log(err);
     }
};