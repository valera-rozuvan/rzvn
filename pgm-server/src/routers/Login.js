const express = require('express')
const LoginController = require('../controllers/Login')
const LoginRouter = express.Router();

LoginRouter.post('/', LoginController.findUserToLogin);


module.exports = LoginRouter;