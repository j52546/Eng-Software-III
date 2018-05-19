const { pool } = require('../connection_mysql')

const saveCompra =  async body => {
    let connection = await pool.getConnection()
    let result = body.map( values => {
        let sql = 'insert into cabpedcomp (NOMEFORNEC, TOTAL_PED, CADFORNEC1_COD) VALUES '
        sql = sql.concat('(?,?,?)')
        return connection.execute(sql, [values.items[0].name_fornec, values.items.length, values.id_fornec])
        .then( result => {
            values.items.map( content => {
                let total = values.items.map(v=>v.total).reduce((a,b)=>Number(a)+Number(b), 0)
                let sqlItem =  'insert into itepedcomp (QTD, PREC, TOTAL, CABPEDCOMP_COD, CADPROD1_COD) values '
                sqlItem = sqlItem.concat('(?,?,?,?,?)')
                return connection.execute(sql, [content.qtd, content.preco, total, result[0].insertId, parseInt(content.id_prod)])
                .catch(err => {
                    console.log(err)
                    connection.rollback()
                })
            })
        })
        .catch( err => {
            console.log(err)
            connection.rollback()
            throw {err}
        })
        
    })
   console.log(result)
}

const findProductById = id => pool.execute('select * from cadprod1 where cod = ?', [id])

module.exports = {
    saveCompra,
    findProductById
}