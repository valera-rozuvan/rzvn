const express = require('express');

const { authenticate } = require('../middleware');

const { AuthController } = require('../controllers');

const AuthRouter = express.Router();
const authController = new AuthController();

AuthRouter.post('/token', authController.getToken);
AuthRouter.get('/check_token', authenticate, authController.checkToken);

module.exports = { AuthRouter };
