const nodeMailer = require('nodemailer')
const fs = require('fs')
const html = fs.readFileSync(__dirname+'\\email.html').toString()
const transporter = nodeMailer.createTransport({
    service:'gmail',
    auth: {
        user:'astrasoftware2018@gmail.com',
        pass:'Astra@123'
    }
})

const mailOptions = {
    from:'astrasoftware2018@gmail.com',
    to:'',
    subject:'Recuperar Senha',
    html
}

const forgotPassword = (req, res) => {
    res.render('auth/forgotPassword')
}

const postPassword = (req, res) => {
   if(req.body.email && new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/).test(req.body.email)) {
        mailOptions.to = req.body.email
        transporter.sendMail(mailOptions, (err, info) => {
            if(err) {
                console.log('error to send email ', err)
            } else {
                console.log('ok, sent email ', info)
            }
        })
        res.locals.success = true
        res.render('auth/forgotPassword')
   } else {
        res.locals.error = true
        res.render('auth/forgotPassword')
   }
}

module.exports = {
    forgotPassword,
    postPassword
}