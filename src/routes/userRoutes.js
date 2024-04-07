const express = require('express');
const userController = require('../controllers/usersController');

const router = express.Router();

router.post('/register', userController.registerController)
router.get('/login', userController.loginController)

module.exports = router;