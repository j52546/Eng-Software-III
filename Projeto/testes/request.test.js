const request = require('supertest')
const app = require('../index')
const expect = require('chai').expect

describe('request login', ()=>{
    it('expecting...', function(done){
        request(app)
        .get('/login')
        .expect(200, done)
    })
    
})

describe('getting products', ()=>{
    it('GET: /produtos/all', (done)=>{
        request(app)
        .get('/produtos/all')
        .expect(200)
        .end((err, result) => {
            expect(result.body.content).to.be.a('array')
            expect(result.body.operation).to.equal('done').and.to.be.a('string')
            done()
        })
    })
})

describe('redirect page', ()=>{
    it('GET', (done) => {
        request(app)
        .get('/')
        .expect(302, done)
    })
})