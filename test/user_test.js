const server = require("../index");
const chai = require("chai");
const chaiHttp = require("chai-http");
const utils = require("../models/userModelSchema");
const router = require("../router/userRouter");
const randomEmail = require('random-email');


chai.should();
chai.use(chaiHttp);

describe("User Login Api", () => {
  describe("POST/api/users", () => {
    it("It should return login user detail:", (done) => {
      const data = {
        userEmail: "agri@gmail.com",
        userPassword: "Agrima@24",
      };
      chai
        .request(server)
        .post("/user/login")
        .send(data)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a("object");
          res.body.should.have.property("success").eq("success");
          res.body.should.have.property("message").eq("Successfully login");
          res.body.should.have.property("token");
          done();
        });
    });
  });
});

it("It should return not valid user:", (done) => {
  const data = {
    userEmail: "rima@gmail.com",
    userPassword: "Agrima@24",
  };
  chai
    .request(server)
    .post("/user/login")
    .send(data)
    .end((err, res) => {
      res.should.have.status(400);
      res.body.should.have.property("success").eq("failure");
      res.body.should.have.property("message").eq("Invalid credentials");
      done();
    });
});

it("It should return invalid credentials:", (done) => {
  const data = {
    userEmail: "agri@gmail.com",
    userPassword: "Rima@24",
  };
  chai
    .request(server)
    .post("/user/login")
    .send(data)
    .end((err, res) => {
      res.should.have.status(400);
      res.body.should.have.property("success").eq("failure");
      res.body.should.have
        .property("message")
        .eq("Email or password is not valid");
      done();
    });
});

describe("User Register Api", () => {
  describe("POST/api/users", () => {
    it("It should return user already exists with email:", (done) => {
      const data = {
        userName: "Dinni",
        userEmail: "agri@gmail.com",
        userPhoneNo: "9424897223",
        userAddress: "laxminath chowk,indore",
        userPassword: "Agrima@24",
      };
      chai
        .request(server)
        .post("/user/signup")
        .send(data)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.a("object");
          res.body.should.have.property("success").eq("failure");
          res.body.should.have
            .property("message")
            .eq("User with this email is already exist");
          done();
        });
    });
  });
});

it("It shows that register successfully:", (done) => {
    const data = {
      userName: "riddhi",
      userEmail: randomEmail(),
      userPhoneNo: "9424897223",
      userAddress: "laxminath chowk,indore",
      userPassword: "Ridhi@24",
    };
    chai
    .request(server)
    .post("/user/signup")
    .send(data)
    .end((err, res) => {
        res.should.have.status(201);
        res.should.be.a("object");
        res.body.should.have.property("success").eq("success");
        res.body.should.have.property("message").eq("Signup successfully");
        done();
  });
});

describe("User Forget Password Api", () => {
  describe("POST/api/users", () => {
    it("It should return if email is valid:", (done) => {
      const data = {
        userEmail: "agri@gmail.com",
      };
      chai
        .request(server)
        .post("/user/resetpassword")
        .set('Authorization','Bearer ${token}')
        .send(data)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a("object");
          res.body.should.have.property("success").eq("success");
          res.body.should.have
            .property("message")
            .eq("You are register user now you can add new password");
          res.body.should.have.property("token");
          done();
        });
    });
  });
});

it("It should return if error is not valid:", (done) => {
  const data = {
    userEmail: "sssss@gmail.com",
  };
  chai
    .request(server)
    .post("/user/resetpassword")
    .send(data)
    .end((err, res) => {
      res.should.have.status(400);
      res.body.should.have.property("success").eq("failure");
      res.body.should.have.property("message").eq("you are not register user");
      res.body.should.have.property("token");
      done();
    });
});
