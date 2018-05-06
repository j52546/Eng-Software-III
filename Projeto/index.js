const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000
const session = require("express-session")
const mysql = require('./model/connection_mysql')

// import the routes
const login = require('./routes/login')
const home = require('./routes/home')
const forgotPassword = require('./routes/forgotPassword')
const register = require('./routes/register')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(session({
    secret:'Trabalho Marcio',
    resave: false,
    saveUninitialized: true
}))
app.set('view engine', 'ejs')
app.use('/', home)
app.use('/login', login)
app.use('/recuperar-senha', forgotPassword)
app.use('/register', register)
app.use('*', function(req, res) {
    res.status(404)
    res.render('notFound')
})

mysql.connection.then(() => {
    app.listen(PORT, err => {
        if( err ){
            console.log('ERROR TO START SERVER ', err)
        } else {
            console.log('listen to serve on port ', PORT)
        }
    })
}).catch(err => {
    console.log('Error to start the database, error =  ', err)
})


