const express = require('express');
const fileController = require('../controllers/filesController');
const fileHandler = require('../middlewares/fileHandler');
const { verifyToken } = require('../middlewares/verifyToken');

const router = express.Router();

router.post('/upload', verifyToken, fileHandler, fileController.uploadController)

module.exports = router;