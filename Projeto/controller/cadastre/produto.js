const produtoDAO = require('../../model/product/productDAO')

const novoProduto = (req, res) => {
    produtoDAO.saveNewProduct(req.body)
    .then( produto => {
        res.send({operation:'done', id:produto[0].insertId})
    })
    .catch( err => {
        console.log('ERROR: ', err)
        res.send({operation:'fail'})
    })
}

const getAllProducts = (req, res) => {
    produtoDAO.getProducts()
    .then( result => {
        if(result && result[0].length > 0) {
            res.send({operation:'done', content:result[0]})
        } else {
            res.send({operation:'done', content:new Array()})
        }
    })
    .catch( err => {
        console.log('ERR: ', err)
        res.send({operation:'fail'})
    })
}
module.exports = {
    novoProduto,
    getAllProducts
}