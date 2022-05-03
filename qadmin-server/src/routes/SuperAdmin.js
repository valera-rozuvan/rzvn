const express = require('express');
const SuperAdminController = require('../controllers/SuperAdmin');

const router = express.Router();
const { authenticate } = require('../middlewares');

router.get('/', authenticate, SuperAdminController.findAll);
router.get('/:id', authenticate, SuperAdminController.findOne);
router.post('/', authenticate, SuperAdminController.create);
router.put('/:id', authenticate, SuperAdminController.update);
router.post('/:id/password', authenticate, SuperAdminController.updatePassword);
router.delete('/:id', authenticate, SuperAdminController.destroy);

module.exports = router;
