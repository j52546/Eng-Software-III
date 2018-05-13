const express = require('express')
const router = express.Router()

const indexController = require('../controller/index')

router.get('/', function(req, res, next) {
    if('user' in req.session) {
        return next()
    } else {
        res.redirect('/login')
    }
})

router.get('/', indexController.renderPage)
router.post('/atualizar_conta', indexController.updateAccount)

module.exports = router