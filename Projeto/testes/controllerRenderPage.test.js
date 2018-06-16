const loginController = require('../controller/login')
const registerController = require('../controller/register')
const forgotController = require('../controller/forgotPassword')
const sinon = require('sinon')

describe('Login controller', () => {
    it('render page', () => {
        const res = {
            render: function(){}
        }

        const mock = sinon.mock(res)
        mock.expects('render').once().withArgs('auth/login')
        loginController.login({}, res)
    })
})

describe('register controller', () => {
    it('render page', () => {
        const res = {
            render: function(){}
        }

        const mock = sinon.mock(res)
        mock.expects('render').once().withArgs('auth/createAccount')
        registerController.registerPage({}, res)
    })
})

describe('forgotPassword controller', ()=>{
    it('render page', () => {
        const res = {
            render: function(){}
        }
        const mock = sinon.mock(res)
        mock.expects('render').once().withArgs('auth/forgotPassword')
        forgotController.forgotPassword({}, res)
    })
})
