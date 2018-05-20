const { pool } = require('../connection_mysql')

const saveCompra =  async body => {
    let connection = await pool.getConnection()
    let result = undefined
    return connection.beginTransaction()
    .then(() => {
        result = body.map( values => {
            let sql = 'insert into cabpedcomp (NOMEFORNEC, TOTAL_PED, CADFORNEC_COD) VALUES '
            sql = sql.concat('(?,?,?)')
            return connection.execute(sql, [values.items[0].name_fornec, values.items.length, parseInt(values.id_fornec)])
            .then( result => {
                let total = values.items.map(v=>v.total).reduce((a,b)=>Number(a)+Number(b), 0)
                return saveContas(connection, total, result[0].insertId).then(() => {
                   return values.items.map( content => {
                        let sqlItem =  'insert into itepedcomp (QTD, PREC, TOTAL, CABPEDCOMP_COD, CADPROD1_COD) values '
                        sqlItem = sqlItem.concat('(?,?,?,?,?)')
                        return connection.execute(sqlItem, [content.qtd, content.preco, content.preco*content.qtd, result[0].insertId, parseInt(content.id_prod)])
                        .catch(err => {
                            connection.rollback()
                        })
                    })
                })
                .catch( err => {
                    connection.rollback()
                    throw err
                })
            })
            .catch( err => {
                connection.rollback()
                throw {err}
            })
            
        })
        let res = new Array()
        return Promise.all(result)
        .then((resultAll) => {
           resultAll.map(v=>v.map(c=>res.push(c)))
            return Promise.all(res)
            .then((r)=>{
                connection.commit()
                connection.release()
            })
            .catch( err => {


                connection.roolback()
                throw err
            })
        })
        .catch( err => {
            console.log(err)
            connection.rollback()
            throw {err}
        })
    })
}

const findProductById = id => pool.execute('select * from cadprod1 where cod = ?', [id])

function saveContas(conn, tot, insertId) {
    let dateVencimento = getDateVencimento()
    let sql = 'insert into conpagar (datvencim  , valor, pago, datpagamento, cabpedcomp_cod ) values '
    sql = sql.concat('(?,?,?,?,?)')
    return conn.execute(sql, [dateVencimento, tot, 0, null, insertId])
}

function getDateVencimento() {
    let dateVencimento = new Date()
    dateVencimento.setDate(dateVencimento.getDate()+30)
    return dateVencimento.getFullYear()+'/'+(dateVencimento.getMonth()+1)+'/'+dateVencimento.getDate()
    
}


module.exports = {
    saveCompra,
    findProductById
}