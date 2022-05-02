const express = require('express');
const ResourceController = require('../controllers/resource');
const router = express.Router();

router.get('/', ResourceController.findAll);
router.get('/:id', ResourceController.findOne);
router.post('/', ResourceController.create);
router.put('/:id', ResourceController.update);
router.delete('/:id', ResourceController.delete);

module.exports = router;
