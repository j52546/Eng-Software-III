const homeDAO = require('../../model/home/index')
const CONSTANTS = require('../../util/CONSTANTS.JS')

const renderPage = (req, res) => {
    if(req.session.user.role.toUpperCase() === CONSTANTS.ROLES.MANAGER.toUpperCase()) {
        homeDAO.getAccountDontAuthorizated()
        .then( result => {
            if(result && result[0].length > 0) {
                res.locals.users = result[0] 
            }
            res.render('cadastre/client')
        })
        .catch( err => {
            console.log('ERROR: ',err)
            res.redirect('/login')
        })
    } else {
        res.render('cadastre/client')
    }

}


module.exports = {
    renderPage
}