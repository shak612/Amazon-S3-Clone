const fs = require('node:fs');
const path = require('path');

before((done) => {
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
        console.log("Running before all the unit tests!!")
        process.env.NODE_ENV = "testing"
        done()
    } catch (error) {
        console.log(`Error clearing db:- ${error}`)
        done()
    }
});


// beforeEach((done) => {
//     try {
//         console.log("Calling from Before Each!!")
//         const userToCreate = JSON.stringify([{
//             fullName: "Testing",
//             userName: "testin1",
//             emailId: "testing1@gmail.com",
//             password: "123445678",
//             newsPreferences: { "categories": "sports", "sources": "bbc-news" },
//             id: 1
//           }]);
//         const filePath = path.join(__dirname, '../../src/models/usersModelTesting.json')
          
//         fs.writeFileSync(filePath, userToCreate, 'utf8',)      
//         console.log("file is written!!!");
//         done()
       
//     } catch (error) {
//        console.log(`Error clearing db:- ${error}`)
//        done()
//     }
// })

// afterEach((done) => {
//     try {
//         console.log("Calling from After Each!!")
//         const userToCreate = JSON.stringify([{
//             fullName: "Testing",
//             userName: "testin1",
//             emailId: "testing1@gmail.com",
//             password: "123445678",
//             newsPreferences: { "categories": "sports", "sources": "bbc-news" },
//             id: 1
//           }]);
//         const filePath = path.join(__dirname, '../../src/models/usersModelTesting.json')
          
//         fs.writeFileSync(filePath, userToCreate, 'utf8',)      
//         console.log("file is written!!!");
//         done()
       
//     } catch (error) {
//        console.log(`Error clearing db:- ${error}`)
//        done()
//     }
// })

after((done) => {
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
        console.log("Running after all the unit tests!!")
        process.env.NODE_ENV = "testing"
        done()
    } catch (error) {
        console.log(`Error clearing db:- ${error}`)
        done()
    }
})

