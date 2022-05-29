const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const router = express.Router();
const { check } = require('express-validator');

router.post('/',
[
     check('nombre', 'Elige un usuario').not().isEmpty(),
     check('email', 'Digita tu email').isEmail(),
     check('password', 'Tu contraseña debe contener al menos 6 caracteres').isLength({min:6}),
],
     usuarioController.nuevoUsuario
);

module.exports = router;