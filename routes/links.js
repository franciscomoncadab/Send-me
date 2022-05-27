const express = require('express');
const linksController = require('../controllers/linksController');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../middleware/auth');

router.post('/',
     [
          check('name', 'Upload a file').not().isEmpty(),
          check( 'original_name', 'Upload a file').not().isEmpty(),
     ],
     auth,
     linksController.createLink,
);

module.exports = router;