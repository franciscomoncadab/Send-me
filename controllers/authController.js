const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
require("dotenv").config({ path: "var.env" });

exports.authUser = async (req, res, next) => { 
     
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
     }


     const { email, password } = req.body;
     const user = await User.findOne({ email});
     
     if (!user) {
          res.status(401).json({ msg: "User not found" });
          return next();
     }

     if(bcrypt.compareSync(password, user.password)) {
          const token = jwt.sign({
               id: user._id, 
               name: user.name,
          }, process.env.JWT_SECRET, 
          { expiresIn: "4h" });
          res.json({ token });

     } else {
          res.status(401).json({ msg: "Invalid credentials" });
          return next();
     }
}

exports.userAuthentication = async (req, res, next) => {
     res.json({ user: req.user})
}