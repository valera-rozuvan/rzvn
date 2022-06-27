const express = require('express')
const UserPublicKeyController = require('../controllers/UserPublicKey')
const UserPublicKeyRouter = express.Router();

UserPublicKeyRouter.get('/', UserPublicKeyController.findAll );
UserPublicKeyRouter.get('/byId/:userId', UserPublicKeyController.findUserPublicKeys );
UserPublicKeyRouter.get('/byKey/:userPublicKey', UserPublicKeyController.findOneByPublicKey);
UserPublicKeyRouter.post('/', UserPublicKeyController.create);
UserPublicKeyRouter.delete('/:id', UserPublicKeyController.destroy);
UserPublicKeyRouter.delete('/', UserPublicKeyController.destroyAll);

module.exports = UserPublicKeyRouter;
