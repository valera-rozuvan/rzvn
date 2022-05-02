const express = require('express')
const AppController = require('../controllers/App')
const router = express.Router();
const { authenticate } = require('../middlewares')

router.get('/',authenticate, AppController.findAll);
router.get('/:id',authenticate, AppController.findOne);
router.post('/',authenticate, AppController.create);
router.put('/:id',authenticate, AppController.update);
router.delete('/:id',authenticate, AppController.destroy);

module.exports = router
