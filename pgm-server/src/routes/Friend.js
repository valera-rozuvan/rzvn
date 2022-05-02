const express = require('express')
const FriendController = require('../controllers/Friend')
const router = express.Router();
// const { authenticate } = require('../middlewares')

router.get('/', FriendController.findAll);
router.get('/:id', FriendController.findOne);
router.post('/', FriendController.create);
router.put('/:id', FriendController.update);
router.delete('/:id', FriendController.destroy);

module.exports = router
