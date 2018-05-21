const {pool} = require('../connection_mysql')

async function saveClient(client) {
    let { nome, pessoa, doc, email, telefone, endereco, cidade, estado, cep } = client
    let sql = 'insert into cadclin1 (NOME, PESSOA, DOCIND, EMAIL, TEL, END, CIDADE, ESTADO, CEP)'
    sql = sql.concat(' VALUES (?,?,?,?,?,?,?,?,?)')
    let connection = await pool.getConnection()
    return connection.execute(sql, [nome, pessoa, doc, email, telefone, endereco, cidade, estado, cep])
    .then(result=>result)
    .catch(err=>{
        connection.rollback()
        throw {code: err.code}
    })
}

const findClientById = id => pool.execute('select * from cadclin1 where cod = ?', [id])

const getClients = () => pool.execute('select * from cadclin1')

module.exports = {
    saveClient,
    getClients,
    findClientById
}