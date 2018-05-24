const {pool} = require('../connection_mysql')

function getAllSales(){
    let sql = `select c.ID, c.DATVENCIM, c.DATA_PED, clin.NOME, cb.TOTAL_PED, c.VALOR, cb.COD from conrec as c 
               join cabpedven as cb on cb.COD = c.CABPEDVEN_COD
               join cadclin1 as clin on clin.COD = cb.CADCLIN1_COD
               where c.RECEBIDO = 0`
    return pool.execute(sql)           
}

function getItemSellById(id) {
    let sql = `select prod.COD, prod.NOME, prod.PRECO, i.QTD, prod.DESCR, prod.SALDO from itepedven as i
               join cadprod1 as prod on i.CADPROD1_COD = prod.COD
               where i.CABPED_COD = ?`
    return pool.execute(sql, [id])
}

async function approveItemById(id_ven, cod_cab) {
    let connection = await pool.getConnection()
    return connection.beginTransaction()
    .then(_=>{
        let sqlUpdateSellToApproved = 'update conrec set recebido = 1 where id = ?'
        return connection.execute(sqlUpdateSellToApproved, [id_ven])
        .then(()=>{
           return findItems(connection, cod_cab)
            .then(items=>{
                let [row] = items
                if(row.length > 0) {
                   let products = row.map(content => {
                      return connection.execute('select * from cadprod1 where cod = ?', [content.COD])
                       .then(prod => {
                            let [product] = prod
                            return {id: product[0].COD, saldo: product[0].SALDO, qtd: content.QTD}
                       })
                       .catch( err => {
                           connection.rollback()
                           throw err    
                       })
                    })
                    return Promise.all(products)
                    .then(result => {
                        let ids = result.filter((v, index)=>result.map(c=>c.id).indexOf(v.id)==index)
                        return ids.map(value => {
                            let tot = value.saldo - result.filter(c=>c.id===value.id).map(c=>c.qtd).reduce((a,b)=>a+b,0)
                            let sql = 'update cadprod1 set saldo = ? where cod = ?'
                            connection.execute(sql, [tot, value.id])
                            .then(()=>{
                                connection.commit()
                                connection.release()
                            })
                            .catch(err=>{
                                connection.rollback()
                                throw err
                            })
                       })
                    })
                    .catch( err => {
                        connection.rollback()
                        throw err
                    })

                } else {
                    connection.rollback()
                    throw err
                }
            })
            .catch(err=>{
                connection.rollback()
                throw err
            })
        })
        .catch(err=>{
            connection.rollback()
            throw err
        })
    })
    .catch(err=>{
        connection.rollback()
        throw err
     })
}

function findItems(connection, id) {
    let sqlFindItems = `select prod.COD, prod.NOME, prod.PRECO, i.QTD, prod.DESCR, prod.SALDO from itepedven as i
    join cadprod1 as prod on i.CADPROD1_COD = prod.COD
    where i.CABPED_COD = ?`
    return connection.execute(sqlFindItems, [id])
}

module.exports = {
    getAllSales,
    getItemSellById,
    approveItemById
}