const express = require('express');

const { authenticate } = require('../middleware');

const { SuperAdminController } = require('../controllers');

const SuperAdminRouter = express.Router();
const superAdminController = new SuperAdminController();

SuperAdminRouter.get('/', authenticate, superAdminController.findAll);
SuperAdminRouter.get('/:id', authenticate, superAdminController.findOne);
SuperAdminRouter.post('/', authenticate, superAdminController.create);
SuperAdminRouter.put('/:id', authenticate, superAdminController.update);
SuperAdminRouter.post('/:id/password', authenticate, superAdminController.updatePassword);
SuperAdminRouter.delete('/:id', authenticate, superAdminController.destroy);

module.exports = { SuperAdminRouter };
