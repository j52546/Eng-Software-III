const homeDAO = require('../../model/home/index')
const CONSTANTS = require('../../util/CONSTANTS.JS')
const purveyorDAO = require('../../model/porveyor/porveyorDAO')
let users = new Array()
const renderPage = (req, res) => {
    if(req.session.user.role.toUpperCase() === CONSTANTS.ROLES.MANAGER.toUpperCase()) {
        homeDAO.getAccountDontAuthorizated()
        .then( result => {
            if(result && result[0].length > 0) {
                users = res.locals.users = result[0] 
            } else {
                users = new Array()
            }
            res.render('cadastre/fornecedor')
        })
        .catch( err => {
            console.log('ERROR: ',err)
            res.redirect('/')
        })
    } else {
        res.render('cadastre/fornecedor')
    }
}

const savePurveyor = (req, res) => {
    purveyorDAO.savePurveyor(req.body)
    .then(result => {
        console.log('RESULT = ', result)
        res.locals.users = users
        res.locals.successRegisterPurveyor = true
        res.render('cadastre/fornecedor')
    })
    .catch( err => {
        if(err.code === 'ER_DUP_ENTRY') {
            res.locals.users = users
            res.locals.purveyorAlreadyExist = true
            res.render('cadastre/fornecedor')
        } else {
            res.locals.users = users
            res.locals.errorSavePurveyor = true
            res.render('cadastre/fornecedor')
        }
    }) 
}

const getPurveyors = (req,res) => {
    purveyorDAO.getPurveyors()
    .then( result => {
        if(result && result[0].length > 0) {
            res.locals.users = users
            res.locals.purveyors = result[0]
       }
        res.render('lists/listaFornecedores')
    })
    .catch( err => {
        console.log('ERROR: ', err)
        res.redirect('/')
    })
}

const findPurveyor = (req, res) => {
    purveyorDAO.findPurveyor(req.body)
    .then( result => {
        if(result && result[0].length > 0) {
            let [row] = result[0]
            res.status(200).send({
                id: row.COD,
                name: row.NOME,
                email: row.EMAIL
            })
        }
        res.send(undefined)
    })
    .catch( err => {
        console.log('ERROR: ', err)
        res.redirect('/')
    })
    
}

module.exports = {
    renderPage,
    savePurveyor,
    getPurveyors,
    findPurveyor
}