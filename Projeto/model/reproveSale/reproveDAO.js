const {pool} = require('../connection_mysql')

const reproveSale = async id => {
    let sql = 'update conrec set recebido = -1 where id = ?'
    let connection = await pool.getConnection()
    return connection.execute(sql, [id])
    .then(() => {
        connection.commit()
        connection.release()
    })
    .catch(err=>{
        connection.rollback()
        throw err
    })
}

module.exports = {
    reproveSale
}