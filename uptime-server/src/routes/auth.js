const express = require('express');
const AuthController = require('../controllers/auth');
const router = express.Router();

router.post('/token', AuthController.issueToken);
router.put('/token', AuthController.updateToken);
router.delete('/token', AuthController.deleteToken);
router.get('/details', AuthController.userDetails);
router.get('/check', AuthController.checkToken);

module.exports = router;
