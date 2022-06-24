const express = require('express')
const UserController = require('../controllers/User')
const UserRouter = express.Router();

UserRouter.get('/', UserController.findAll);
UserRouter.get('/:id', UserController.findOne);
UserRouter.post('/', UserController.create);
UserRouter.put('/:id', UserController.update);
UserRouter.delete('/:id', UserController.destroy);

module.exports = UserRouter;
