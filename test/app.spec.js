
const app = require('../src/app')


describe('App', ()=>{
    it('Returns 200',()=>{
        return supertest(app)
        .get('/')
        .expect(200, 'Hello World.')
    })





    
})