const express = require('express')
const {getToken} = require('../middlewares')
const router = express.Router();

router.post('/token', getToken);

module.exports = router
