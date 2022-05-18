const express = require('express')
const MessageController = require('../controllers/Message')
const MessageRouter = express.Router();

MessageRouter.get('/', MessageController.findAll);
MessageRouter.get('/:id', MessageController.findOne);
MessageRouter.post('/', MessageController.create);
MessageRouter.put('/:id', MessageController.update);
MessageRouter.delete('/:id', MessageController.destroy);

module.exports = MessageRouter;