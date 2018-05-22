const CONSTANTS = require('../util/CONSTANTS.JS')
const userDAO = require('../model/home/index')
const users = new Array()
const renderPageSales = (req, res) => {
    if(CONSTANTS.ROLES.MANAGER.toUpperCase() === req.session.user.role.toUpperCase()) {
        userDAO.getAccountDontAuthorizated()
        .then(result => {
            if(result && result[0].length > 0) {
                users = result[0]
                res.locals.users = users
            }
            res.render('approve/sales')
        })
        .catch( err => {
            res.redirect('/')
        })       
    } else {
        res.render('approve/sales')
    }
}

const renderPagePurchases = (req, res) => {
    if(CONSTANTS.ROLES.MANAGER.toUpperCase() === req.session.user.role.toUpperCase()) {
        userDAO.getAccountDontAuthorizated()
        .then(result => {
            if(result && result[0].length > 0) {
                users = result[0]
                res.locals.users = users
            }
            res.render('approve/purchases')
        })
        .catch( err => {
            res.redirect('/')
        })       
    } else {
        res.render('approve/purchases')
    }
}

module.exports = {
    renderPageSales,
    renderPagePurchases
}