const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
require("dotenv").config({ path: "var.env" });

exports.autenticarUsuario = async (req, res, next) => { 
     
     const errores = validationResult(req);
     if (!errores.isEmpty()) {
          return res.status(400).json({ errores: errores.array() });
     }


     const { email, password } = req.body;
     const usuario = await Usuario.findOne({ email});
     
     if (!usuario) {
          res.status(401).json({ msg: "No se encontro el usuario" });
          return next();
     }

     if(bcrypt.compareSync(password, usuario.password)) {
          const token = jwt.sign({
               id: usuario._id, 
               name: usuario.nombre,
               email: usuario.email
          }, process.env.JWT_SECRET, 
          { expiresIn: "4h" });
          res.json({ token });

     } else {
          res.status(401).json({ msg: "Credenciales inconrrectas" });
          return next();
     }
}

exports.usuarioAutenticado = async (req, res, next) => {
     res.json({ usuario: req.usuario})
}