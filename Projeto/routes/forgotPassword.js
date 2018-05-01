const router = require('express').Router()
const forgotPasswordController = require('../controller/forgotPassword')

router.get('/', forgotPasswordController.forgotPassword)
router.post('/', forgotPasswordController.postPassword)

module.exports = router