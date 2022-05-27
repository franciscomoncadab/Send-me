const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'var.env' });

module.exports = (req, res, next) => {
     const authHeader = req.get('Authorization');
     if (authHeader) {
          const token = authHeader.split(' ')[1];
     
          try {
               const user = jwt.verify(token, process.env.JWT_SECRET);
               req.user = user;
          } catch (err) {
               console.log(err);
          }
     }
     return next();
};