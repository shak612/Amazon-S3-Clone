//mocha
//chai
//sinon

let expect = require('chai').expect;
let { Validator } = require('../../src/utils/validator');

let userRegistration = {
    "fullName": "Testing",
    "userName": "testing1",
    "emailId": "testing1@gmail.com",
    "password": "12345678",
    "newsPreferences": { "categories": "sports", "sources": "bbc-news" },
}

let userLogin = {
    "userName": "testing1",
    "password": "12345678",
}

// This test is for registeration form:-
describe("Testing the validate Register Form functionality", function(){
    it("1. Validating the User Registeration - Validates the User Info Succefully", (done) => {
       let response =  Validator.validateRegisterForm(userRegistration);
       expect(response.status).equal(true);
       expect(response.message).equal("Valid!");
       done();
    });

    it("2. Validating the User Registeration - Validates the User Info Invalid", (done) => {
        userRegistration["id"] = 1;
        let response =  Validator.validateRegisterForm(userRegistration);
        expect(response.status).equal(false);
        expect(response.message).to.include("Invalid:");
        done();
    });
})

// This test is for login form:-
describe("Testing the validate Login Form functionality", function(){
    it("1. Validating the User Login Credentials - Validates the User Credentials Succefully", (done) => {
       let response =  Validator.validateLoginForm(userLogin);
       expect(response.status).equal(true);
       expect(response.message).equal("Valid!");
       done();
    });

    it("2. Validating the User Login Credentials - Validates the User Credentials is Invalid", (done) => {
        userLogin["password"] = "123";
        let response =  Validator.validateLoginForm(userLogin);
        expect(response.status).equal(false);
        expect(response.message).to.include("Invalid:");
        done();
    });
})