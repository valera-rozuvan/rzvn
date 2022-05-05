const express = require('express');

const { authenticate } = require('../middleware');

const { UserController } = require('../controllers');

const UserRouter = express.Router();
const userController = new UserController();

UserRouter.get('/', authenticate, userController.findAll);
UserRouter.get('/:id', authenticate, userController.findOne);
UserRouter.post('/', authenticate, userController.create);
UserRouter.put('/:id', authenticate, userController.update);
UserRouter.delete('/:id', authenticate, userController.destroy);

module.exports = { UserRouter };
