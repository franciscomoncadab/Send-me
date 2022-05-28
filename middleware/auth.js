const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'var.env' });

module.exports = (req, res, next) => {
     const authHeader = req.get('Authorization');
     if (authHeader) {
          const token = authHeader.split(' ')[1];

          if(token) {
     
               try {
                    const usuario = jwt.verify(token, process.env.JWT_SECRET);
                    req.usuario = usuario;
               } catch (err) {
                    console.log(err);
               }
          }
     }
     return next();
};