const router = require('express').Router()
const registerController = require('../controller/register')
router.get('/', registerController.registerPage)
module.exports = router