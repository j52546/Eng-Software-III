const CONSTANTS = require('../util/CONSTANTS.JS')
const users = new Array()
const approveDAO = require('../model/approvedItems/approveItemsDAO')

const renderPageSales = (req, res) => {
    if(CONSTANTS.USERS.length > 0) {
        res.locals.users = CONSTANTS.USERS
    }
    approveDAO.getAllSales()
    .then( sales => {
        let [row] = sales
        res.render('approve/sales', {sales: row})
    })
    .catch( err => {
        console.log('ERROR: ', err)
        res.redirect('/')
    })
    
}

const renderPagePurchases = (req, res) => {
    if(CONSTANTS.USERS.length > 0) {
        res.locals.users = CONSTANTS.USERS
    }
    
 
    res.render('approve/purchases')
 }

module.exports = {
    renderPageSales,
    renderPagePurchases
}