const router = require('express').Router()

const clientController = require('../controller/client')

router.use(function(req, res, next) {
    console.log('session ', req.session)
    if('user' in req.session) {
        next()
    } else {
        res.redirect('/login')
    }
})

router.get('/all', clientController.allClients)

module.exports = router