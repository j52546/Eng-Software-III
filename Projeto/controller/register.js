const createAccountDAO = require('../model/createAccount/createAccountDAO')
const KEY_DRUP = 'ER_DUP_ENTRY'

const registerPage = (request, response) => {
    response.render('auth/createAccount')
}

const registerUser = (req, res) => {
    createAccountDAO.createAccount(req.body).then(result => {
        console.log(result)
        console.log(JSON.stringify(result, undefined, 2))
        if(result instanceof Error) {
            if(result.code === KEY_DRUP) {
                res.locals.KEY_DRUP = true;
                res.render('auth/createAccount')
            } else {
                res.locals.errorToCreateAccount = true
                res.render('auth/createAccount')
            }
        } else {
            res.locals.successToCreateAccount = true
            res.render('auth/login')
        }
    }).catch( err => {
        res.status(500)
        res.locals.errorToCreateAccount = true
        res.render('auth/createAccount')
    })
}

module.exports = {
    registerPage,
    registerUser
}