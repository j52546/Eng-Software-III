const router = require('express').Router()
const reproveController = require('../controller/reprove')

router.use(function(req, res, next) {
    if('user' in req.session) {
        next()
    } else {
        res.redirect('/login')
    }
})

router.post('/sales', reproveController.reproveSale)

module.exports = router