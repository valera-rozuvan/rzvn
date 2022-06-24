const express = require('express')
const FriendController = require('../controllers/Friend')
const FriendRouter = express.Router();
// const { authenticate } = require('../middlewares')

FriendRouter.get('/', FriendController.findAll);
FriendRouter.get('/:authorPublicKey', FriendController.findFriendsOfCurrentUserPublicKey );
FriendRouter.get('/:id', FriendController.findOne);
FriendRouter.post('/', FriendController.create);
FriendRouter.put('/:id', FriendController.update);
FriendRouter.delete('/:id', FriendController.destroy);

module.exports = FriendRouter;
