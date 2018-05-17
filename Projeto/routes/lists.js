const router = require('express').Router()
const providerController = require('../controller/cadastre/purveyor')

router.use(function(req, res, next) {
    if('user' in req.session) {
        next()
    } else {
        res.redirect('/login')
    }
})

router.get('/purveyor', providerController.getPurveyors)

module.exports = router