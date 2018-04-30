const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000
const session = require("express-session")

// import the routes
const login = require('./routes/index')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(session({
    secret:'Trabalho Marcio',
    resave: false,
    saveUninitialized: true
}))
app.set('view engine', 'ejs')

app.use('/', login)
app.use('*', function(req, res) {
    res.status(404)
    res.render('notFound')
})
app.listen(PORT, err => {
    if( err ){
        console.log('ERROR TO START SERVER ', err)
    } else {
        console.log('listen to serve on port ', PORT)
    }
})

