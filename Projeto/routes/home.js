const express = require('express')
const router = express.Router()

router.get('/', function(req, res, next) {
    if('user' in req.session) {
        return next()
    } else {
        res.redirect('/login')
    }
})

router.get('/', function(req, res) {
    res.render('home')
})

module.exports = router