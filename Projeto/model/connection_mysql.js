const mysql = require('mysql2/promise')
const connection = mysql.createConnection({
    host            : 'localhost',
    user            : 'root',
    password        : 'root',
    database        : 'mydb',
})

const pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : 'root',
    database        : 'mydb',
})

module.exports = {
    connection,
    pool
}