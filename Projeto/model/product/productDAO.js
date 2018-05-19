const { pool } = require('../connection_mysql')

const saveProduct =  (id, body, total, nameFornec) => {
    
}

const findProductById = id => pool.execute('select * from cadprod1 where cod = ?', [id])

module.exports = {
    saveProduct,
    findProductById
}