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
    productDAO.saveCompra(req.body.content)
    .then( res => {
        res.send({operation:'done'})
    })
    .catch( err => {
        res.redirect('/')
    })
}

module.exports = {
    renderPage,
    newProduct
}