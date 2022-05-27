const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const { check } = require('express-validator');

router.post('/',
[
     check('name', 'name is required').not().isEmpty(),
     check('email', 'email is required').isEmail(),
     check('password', 'Your password should be at least 6 characters long').isLength({min:6}),
],
     userController.createUser
);

module.exports = router;