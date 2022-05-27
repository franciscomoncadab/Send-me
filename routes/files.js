const express = require('express');
const fileController = require('../controllers/fileController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/',
     auth,
     fileController.uploadFile
);


module.exports = router;