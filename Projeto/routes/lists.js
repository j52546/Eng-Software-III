const router = require('express').Router()
const providerController = require('../controller/cadastre/purveyor')
const clientController = require('../controller/cadastre/client')

router.use(function(req, res, next) {
    if('user' in req.session) {
        next()
    } else {
        res.redirect('/login')
    }
})

router.get('/purveyor', providerController.getPurveyors)
router.get('/clients', clientController.getClients)

module.exports = router