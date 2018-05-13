const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000
const CONSTANTS = require('./util/CONSTANTS.JS')
CONSTANTS.PORT_ON_SERVER = PORT
const session = require('express-session')
const mysql = require('./model/connection_mysql')

// import the routes
const login = require('./routes/login')
const home = require('./routes/home')
const forgotPassword = require('./routes/forgotPassword')
const register = require('./routes/register')
const logout = require('./routes/logout')
const create = require('./routes/cadastre')

app.use(bodyParser.urlencoded({extended: true}))
app.use(session({
    secret:'Trabalho Marcio',
    resave: false,
    saveUninitialized: true
}))
app.use('/static',express.static('public'))
app.set('view engine', 'ejs')
app.use(function(req, res, next) {
    if('user' in req.session) {
        console.log(req.session)
        res.locals.user = req.session.user
    }
    next()
})
app.use('/login',login)
app.use('/recuperar-senha', forgotPassword)
app.use('/register', register)
app.use('/logout', logout)
app.use('/create', create)
app.use('/', home)
app.use('*',(req, res) => {
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


