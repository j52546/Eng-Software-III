const {pool} = require('../connection_mysql')

function getAllSales(){
    let sql = `select c.DATVENCIM, c.DATA_PED, clin.NOME, cb.TOTAL_PED, c.VALOR, cb.COD from conrec as c 
               join cabpedven as cb on cb.COD = c.CABPEDVEN_COD
               join cadclin1 as clin on clin.COD = cb.CADCLIN1_COD
               where c.RECEBIDO = 0`
    return pool.execute(sql)           
}

function getItemSellById(id) {
    let sql = `select prod.NOME, prod.PRECO, i.QTD, prod.DESCR, prod.SALDO from itepedven as i
               join cadprod1 as prod on i.CADPROD1_COD = prod.COD
               where i.CABPED_COD = ?`
    return pool.execute(sql, [id])
}

module.exports = {
    getAllSales,
    getItemSellById
}