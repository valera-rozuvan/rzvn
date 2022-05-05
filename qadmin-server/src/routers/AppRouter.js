const express = require('express');

const { authenticate } = require('../middleware');

const { AppController } = require('../controllers');

const AppRouter = express.Router();
const appController = new AppController();

AppRouter.get('/', authenticate, appController.findAll);
AppRouter.get('/:id', authenticate, appController.findOne);
AppRouter.post('/', authenticate, appController.create);
AppRouter.put('/:id', authenticate, appController.update);
AppRouter.delete('/:id', authenticate, appController.destroy);

module.exports = { AppRouter };
