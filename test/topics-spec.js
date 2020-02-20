// const knex = require('knex')
// const app = require('../src/app')
// const { makeArticlesArray, makeMaliciousArticle } = require('./articles.fixtures')
// const { makeUsersArray } = require('./users.fixtures')


// describe('Topics Endpoints', function() {
//     let db; 

//     before('make knex instance', () => {

//         db = knex({
//           client: 'pg',
//           connection: process.env.TEST_DB_URL,
//         })
//         app.set('db', db)
    
//       })



//       after('disconnect from db', () => db.destroy())

//       describe(`POST /api/topics`, () => {
//         const testUsers = makeUsersArray();
        
//         return supertest(app)
//         .post('/api/topics')
//         .send(newTopic)
//         .expect(201)
//         .expect(res => {
//           expect(res.body.title).to.eql(newTopic.title)
//           expect(res.body.content).to.eql(newTopic.content)
//         })
//         .then(res =>
//             supertest(app)
//               .get(`/api/topics/${res.body.id}`)
//               .expect(res.body)
//         )

// })