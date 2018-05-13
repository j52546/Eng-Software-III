const router = require('express').Router()
const clientController = require('../controller/cadastre/client')

router.use(function(req, res, next) {
    if('user' in req.session) {
        next()
    } else {
        res.redirect('/login')
    }
})

router.get('/client', clientController.renderPage)
router.post('/client', clientController.createClient)

module.exports = router