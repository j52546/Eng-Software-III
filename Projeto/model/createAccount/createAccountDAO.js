const {pool} = require('../connection_mysql')
const md5 = require('md5')
const CONSTANTS = require('../../util/CONSTANTS.JS')

const createAccount = async body => {
    let { name, lastName, cpf, telephone, password, email } = body
    let sql = `insert into caduser1 (nome, docind, tel, password, permition, email) values (?,?,?,?,?,?)`
    let connection = await pool.getConnection()
    return connection.execute(sql, [name.concat(' ').concat(lastName), cpf, telephone, md5(CONSTANTS.SECRET_KEYBOARD.concat(password)), 0, email])
        .then(result => {
            connection.commit()
            return result
        })
        .catch( err => {
            connection.rollback()
            return err
        })
}


module.exports = {
    createAccount
}