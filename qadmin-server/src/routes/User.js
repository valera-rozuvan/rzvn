const express = require('express')
const UserController = require('../controllers/User')
const router = express.Router();
const { authenticate } = require('../middlewares')

router.get('/',authenticate, UserController.findAll);
router.get('/:id',authenticate, UserController.findOne);
router.post('/',authenticate, UserController.create);
router.put('/:id',authenticate, UserController.update);
router.delete('/:id',authenticate, UserController.destroy);

module.exports = router
