const express = require('express')
const AuthController = require('../controllers/auth')
const router = express.Router();

router.post('/check_app', AuthController.checkApp);
router.post('/get_user', AuthController.getUser);

module.exports = router;
