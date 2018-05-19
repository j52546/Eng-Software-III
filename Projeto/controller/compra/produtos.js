const CONSTANTS = require('../../util/CONSTANTS.JS')
const userDAO = require('../../model/home/index')
const users = new Array()
const productDAO = require('../../model/product/productDAO')

const renderPage = (req, res) => {
    if(CONSTANTS.ROLES.MANAGER.toUpperCase() === req.session.user.role.toUpperCase()) {
        userDAO.getAccountDontAuthorizated()
        .then(result => {
            if(result && result[0].length > 0) {
                users = result[0]
                res.locals.users = users
            }
            res.render('compra/produto')
        })
        .catch( err => {
            res.redirect('/')
        })       
    } else {
        res.render('compra/produto')
    }
}

const newProduct = (req, res) => {
    console.log(req.body+'\n-----------------------')
    let tot = req.body.items.map(v=>v.total).reduce((a, b)=>Number(a)+Number(b), 0)
    productDAO.saveProduct(req.body.cod ,req.body, tot, req.body.items[0].name)
    res.end()
}

module.exports = {
    renderPage,
    newProduct
}