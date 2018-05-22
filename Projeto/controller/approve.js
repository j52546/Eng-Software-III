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

const getItemsById = (req, res) => {
    approveDAO.getItemSellById(req.body.id)
    .then( items => {
        res.status(200).send(items[0])
    })
    .catch( err => {
        console.log('ERROR: ', err) 
        res.status(500).send({error:'fail'})
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
    renderPagePurchases,
    getItemsById
}