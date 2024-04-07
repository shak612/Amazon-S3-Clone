const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../src/index');
const fs = require('node:fs');
const path = require('path');
const db = require('../../src/models/usersModelTesting.json')
chai.use(chaiHttp);
const expect = chai.expect;


// This test is for registeration form:-
describe('POST /register', () => {
    beforeEach((done) => {
      try {
          console.log("Calling from Before Each!!")
          const userToCreate = JSON.stringify([{
              fullName: "Testing",
              userName: "testin1",
              emailId: "testing1@gmail.com",
              password: "123445678",
              newsPreferences: { "categories": "sports", "sources": "bbc-news" },
              id: 1
            }]);
          const filePath = path.join(__dirname, '../../src/models/usersModelTesting.json')
            
          fs.writeFileSync(filePath, userToCreate, 'utf8',)      
          console.log("file is written!!!");
          done()
          
      } catch (error) {
          console.log(`Error clearing db:- ${error}`)
          done()
      }
    })

    it('1. should successfully register a new user', (done) => {
        const userRegistration = {
          fullName: 'Testingss',
          userName: 'testing123',
          emailId: 'testing123@gmail.com',
          password: '12345678',
          newsPreferences: { categories: 'sports', sources: 'bbc-news' },
        };
    
        chai.request(server).post('/api/register').send(userRegistration).end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('status').to.equal(true);
            expect(res.body).to.have.property('response').to.equal('Successfully registered!!');
            done();
          });
    });

    it("2. Validating the User Registeration Controller - Validates the User Info Invalid", (done) => {
      const userRegistration = {
        fullName: 'Testingss',
        userName:'',
        emailId: 'testing123@gmail.com',
        password: '12345678',
        newsPreferences: { categories: 'sports', sources: 'bbc-news' },
      };
  
      chai.request(server).post('/api/register').send(userRegistration).end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('status').to.equal(false);
          done();
        });
    });
   
})
