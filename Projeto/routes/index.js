const express = require('express')
const router = express.Router()
const loginController = require('../controller/index')
router.get('/', loginController.login)

module.exports = router
