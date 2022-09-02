const Controller = require('../controllers/trainee/Controller');
const userObj = new Controller();

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const mocha = require("mocha");
const { closeDatabase, connectDB } = require('./config/db');
const request = require('request');
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require("sinon");


// mongoose.Promise = global.Promise;

const { expect } = chai;
chai.should();
chai.use(chaiHttp);

describe("Authentication API", () => {
  before(async () => {
    await connectDB()
      .then(() => {
        console.log("DB Connected");
      })
      .catch((err) => {
        console.log(err.message);
      });
  });
  after(async () => {
    await closeDatabase();
  });

  describe("POST /SignUp", () => {
    describe("SUCCESS", () => {
      it("Should SignUp the user", (done) => {
        const stubCase = sinon.stub(userObj, "signup").returns({
          status: 200,
          message: "User created successfully"
        });
        request(
          {
            url: 'http://localhost:9001/api/user/register'
          },
          function (err, res, body) {
            stubCase(0).should.have.status(200);
            stubCase(0).should.have.a("object");
            stubCase(0)
              .should.have.property("message")
              .eql("User created successfully");
            done();
          }
        );
        stubCase.restore();
      })
    })
    describe("ERROR", () => {
      it("Should not signup if the user already exists in the database", (done) => {
        const stubCase = sinon.stub(userObj, "signup").returns({
          status: 409,
          message: "User already exists"
        });
        request(
          {
            url: 'http://localhost:9001/api/user/register'
          },
          function (err, res, body) {
            stubCase(0).should.have.status(409);
            stubCase(0).should.have.a("object");
            stubCase(0)
              .should.have.property("message")
              .eql("User already exists");
            done();
          }
        );
        stubCase.restore();
      })
      it("Should not signup the user without a valid email", (done) => {
        const stubCase = sinon.stub(userObj, "signup").returns({
          status: 404,
          message: "Invalid Email Address"
        });
        request(
          {
            url: 'http://localhost:9001/api/user/register'
          },
          function (err, res, body) {
            stubCase(0).should.have.status(404);
            stubCase(0).should.have.a("object");
            stubCase(0)
              .should.have.property("message")
              .eql("Invalid Email Address");
            done();
          }
        );
        stubCase.restore();
      })
    })
  });
  describe("POST /login", () => {
    describe("SUCCESS", () => {
      it('Should success if credential is valiiiiid', (done) => {
        const stubCase = sinon.stub(userObj, "login").returns({
          status: 200,
          message: "Authentication successful"
        });
        request(
          {
            url: 'http://localhost:9001/api/user/login'
          },
          function (err, res, body) {
            stubCase(0).should.have.status(200);
            stubCase(0).should.have.a("object");
            stubCase(0)
              .should.have.property("message")
              .eql("Authentication successful");
            done();
          }
        );
        stubCase.restore();
      });
    });
    describe("ERROR", () => {
      it('Should not signin the user without email', (done) => {
        const stubCase = sinon.stub(userObj, "login").returns({
          status: 500,
          message: "Authentication Fail"
        });
        request(
          {
            url: 'http://localhost:9001/api/user/login'
          },
          function (err, res, body) {
            stubCase(0).should.have.status(500);
            stubCase(0).should.have.a("object");
            stubCase(0)
              .should.have.property("message")
              .eql("Authentication Fail");
            done();
          }
        );
        stubCase.restore();
      })
      it('Should not signin the user without correct password', (done) => {
        const stubCase = sinon.stub(userObj, "login").returns({
          status: 500,
          message: "Authentication Fail"
        });
        request(
          {
            url: 'http://localhost:9001/api/user/login'
          },
          function (err, res, body) {
            stubCase(0).should.have.status(500);
            stubCase(0).should.have.a("object");
            stubCase(0)
              .should.have.property("message")
              .eql("Authentication Fail");
            done();
          }
        );
        stubCase.restore();
      })
    })
  });
  // Forget Password

  //----------------***********************-----------------

  describe("POST /forgotPassword", () => {
    describe("SUCCESS", () => {
      it('Should success if the password reset request for an existing email is sent', (done) => {
        const stubCase = sinon.stub(userObj, "forgotPassword").returns({
          status: 200,
          message: "User password has been updated successfully"
        });
        request(
          {
            url: 'http://localhost:9001/api/user/forgotPassword'
          },
          function (err, res, body) {
            stubCase(0).should.have.status(200);
            stubCase(0).should.have.a("object");
            stubCase(0)
              .should.have.property("message")
              .eql("User password has been updated successfully");
            done();
          }
        );
        stubCase.restore();
      });
    });
    describe("ERROR", () => {
      it('Should not reset the password for an invalid email address', (done) => {
        const stubCase = sinon.stub(userObj, "forgotPassword").returns({
          status: 404,
          message: "User not found, Please enter correct email address"
        });
        request(
          {
            url: 'http://localhost:9001/api/user/forgotPassword'
          },
          function (err, res, body) {
            stubCase(0).should.have.status(404);
            stubCase(0).should.have.a("object");
            stubCase(0)
              .should.have.property("message")
              .eql("User not found, Please enter correct email address");
            done();
          }
        );
        stubCase.restore();
      })
      it('Should not reset the password for an unregistered email address', (done) => {
        const stubCase = sinon.stub(userObj, "forgotPassword").returns({
          status: 404,
          message: "User not found, Please enter correct email address"
        });
        request(
          {
            url: 'http://localhost:9001/api/user/forgotPassword'
          },
          function (err, res, body) {
            stubCase(0).should.have.status(404);
            stubCase(0).should.have.a("object");
            stubCase(0)
              .should.have.property("message")
              .eql("User not found, Please enter correct email address");
            done();
          }
        );
        stubCase.restore();
      })
    })
  });

  // Resend Verification Email Test Cases
  describe("POST /resendVerificationEmail", () => {
    describe("SUCCESS", () => {
      it('Should send the verification email to the user', (done) => {
        const stubCase = sinon.stub(userObj, "resendVerificationEmail").returns({
          status: 200,
          message: "Email Sent"
        });
        request(
          {
            url: 'http://localhost:9001/api/user/resendVerificationEmail'
          },
          function (err, res, body) {
            stubCase(0).should.have.status(200);
            stubCase(0).should.have.a("object");
            stubCase(0)
              .should.have.property("message")
              .eql("Email Sent");
            done();
          }
        );
        stubCase.restore();
      })
    })
    describe("ERROR", () => {
      it('Should not send the verification email to an unregistered email address', (done) => {
        const stubCase = sinon.stub(userObj, "resendVerificationEmail").returns({
          status: 409,
          message: "Invalid Credentials"
        });
        request(
          {
            url: 'http://localhost:9001/api/user/resendVerificationEmail'
          },
          function (err, res, body) {
            stubCase(0).should.have.status(409);
            stubCase(0).should.have.a("object");
            stubCase(0)
              .should.have.property("message")
              .eql("Invalid Credentials");
            done();
          }
        );
        stubCase.restore();
      })
      it('Should not send the verification email to an invalid email address', (done) => {
        const stubCase = sinon.stub(userObj, "resendVerificationEmail").returns({
          status: 409,
          message: "Invalid Credentials"
        });
        request(
          {
            url: 'http://localhost:9001/api/user/resendVerificationEmail'
          },
          function (err, res, body) {
            stubCase(0).should.have.status(409);
            stubCase(0).should.have.a("object");
            stubCase(0)
              .should.have.property("message")
              .eql("Invalid Credentials");
            done();
          }
        );
        stubCase.restore();
      })
    })
    it('Should not send the verification email in case of a server error', (done) => {
      const stubCase = sinon.stub(userObj, "resendVerificationEmail").returns({
        status: 404,
        message: "Email not sent!, Error Sending Email"
      });
      request(
        {
          url: 'http://localhost:9001/api/user/resendVerificationEmail'
        },
        function (err, res, body) {
          stubCase(0).should.have.status(404);
          stubCase(0).should.have.a("object");
          stubCase(0)
            .should.have.property("message")
            .eql("Email not sent!, Error Sending Email");
          done();
        }
      );
      stubCase.restore();
    })
  })
});
