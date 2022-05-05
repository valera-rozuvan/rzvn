const express = require('express');

const { AuthController } = require('../controllers');

const AuthRouter = express.Router();
const authController = new AuthController();

AuthRouter.post('/token', authController.getToken);

module.exports = { AuthRouter };
