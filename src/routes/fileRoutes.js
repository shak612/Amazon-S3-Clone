const express = require('express');
const fileController = require('../controllers/filesController');
const fileHandler = require('../middlewares/fileHandler');

const router = express.Router();

router.post('/upload', fileHandler, fileController.uploadController)

module.exports = router;