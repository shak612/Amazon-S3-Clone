const express = require('express');
const fileController = require('../controllers/filesController');

const router = express.Router();

router.post('/upload', fileController.uploadController)

module.exports = router;