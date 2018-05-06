const {pool} = require('../model/connection_mysql')

const registerPage = (request, response) => {
    response.render('auth/createAccount')
}

const registerUser = (req, res) => {
    console.log(req.body)
    res.redirect('/register')
}

module.exports = {
    registerPage,
    registerUser
}