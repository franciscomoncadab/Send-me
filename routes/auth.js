const express = require('express');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');
const router = express.Router();
const { check } = require('express-validator');

router.post('/', 
     [
          check('email', 'Digita un email valido por favor').isEmail(),
          check('password', 'Digita un password').not().isEmpty(),
     ],
     authController.autenticarUsuario
);

router.get('/',
     auth,
     authController.usuarioAutenticado
);

module.exports = router;