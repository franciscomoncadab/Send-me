const express = require('express');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');
const router = express.Router();
const { check } = require('express-validator');

router.post('/', 
     [
          check('email', 'Please enter a valid email').isEmail(),
          check('password', 'Password is required').not().isEmpty(),
     ],
     authController.authUser
);

router.get('/',
     auth,
     authController.userAuthentication
);

module.exports = router;