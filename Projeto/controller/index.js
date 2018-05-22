const homeDAO = require('../model/home/index')
const CONSTANTS = require('../util/CONSTANTS.JS')

const renderPage = (req, res) => {
    if(req.session.user.role.toUpperCase() === CONSTANTS.ROLES.MANAGER.toUpperCase()) {
        homeDAO.getAccountDontAuthorizated()
        .then( result => {
            if(result && result[0].length > 0) {
                CONSTANTS.USERS = result[0]
                res.locals.users = result[0] 
            }
            res.render('home/index')
        })
        .catch( err => {
            console.log('ERROR: ',err)
            res.redirect('/login')
        })
    } else {
        CONSTANTS.USERS.length = 0
        res.render('home/index')
    }
}

const updateAccount = (req, res) => {
    homeDAO.updateAccount(req.body)
    .then( result => {
        console.log('res = ', result)
        res.redirect('/')
    })
    .catch( err => {
        console.log('ERROR:', err)
        res.redirect('/')
    })
}

module.exports = {
    renderPage,
    updateAccount
}