const server = require("../index");
const chai = require("chai");
const chaiHttp = require("chai-http");
const utils = require("../models/blogModelSchema");
const router = require("../router/blogRouter");

chai.should();
chai.use(chaiHttp);

describe("Blog Like Api", () => {
    describe("PATCH/api/blogs", () => {
      it("It should return like detail:", (done) => {
        const data = {
          blogLikes: true
        };
        chai
          .request(server)
          .patch("/blog/like/63ef56a5efecfbcfa968669a")
          .send(data)
          .end((err, res) => {
            res.should.have.status(202);
            res.should.be.a("object");
            res.body.should.have.property("success").eq("success");
            res.body.should.have.property("message").eq("You liked a blog");
            done();
          });
      });
    });
  });

  //Add blog api test case
describe("Add Blog API", () => {
    describe("POST/api/blogs", () => {
      it("It should add blog:", (done) => {
        const data = {
          blogTitle: "Happy blog",
          blogDescription: "going out with family",
        };
        chai
          .request(server)
          .post("/blog/create/63f7544a2cb48ed5b3e9bb7c")
          .set("Content-Type", "application/x-www-form-urlencoded")
          .field(data)
          .attach("blogImage","/Users/HP/Pictures/Saved Pictures/nc.png", "nc.png")
          .end((err, res) => {
            res.should.have.status(201);
            res.should.be.a("object");
            res.body.should.have.property("success").eq("success");
            res.body.should.have
              .property("message")
              .eq("Blog create successfully");
            done();
          });
      });
    });
  });
  
  
  //Search blog test case
  describe("Search blog API", () => {
    describe("GET/api/blogs", () => {
      it("It should search all blogs:", (done) => {
        const data = {
          blogTitle: "H"
        };
        chai
          .request(server)
          .get("/blog/search")
          .send(data)
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.a("object");
            res.body.should.have.property("success").eq("success");
            res.body.should.have
              .property("message")
              .eq("All blogs related to search");
            done();
          });
      });
    });
  });
  
  //Userblog api test case
  describe("Myblog API", () => {
    describe("GET/api/blogs", () => {
      it("It should return all blogs related to user:", (done) => {
         const token =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2M2VkZGQyY2JkOGU1ZDFhMDBmMmRmMjIiLCJpYXQiOjE2Nzc1ODIxNDQsImV4cCI6MTY3ODQ0NjE0NH0.prsilO77ViyZXKD_U8rlqRwCLXx7SqpNcTOj7pZLOQQ09"
        chai
          .request(server)
          .get("/blog/myBlog/63eddd2cbd8e5d1a00f2df22")
          .set("Authorization", `Bearer ${token}`) //jwt token of logged in user
          .end((err, res)=>{
            res.should.have.status(200)
            res.should.be.a("object")
            res.body.should.have.property("success").eq("success")
            res.body.should.have.property("message").eq("All myblogs")
          done()
          })
      });
    });
  });
  
  //List of all blog test case
  describe("List All Blog API", () => {
    describe("GET/api/blogs", () => {
      it("It should return all blogs list:", (done) => {
        chai
          .request(server)
          .get("/blog/list")
          .end((err, res)=>{
            res.should.have.status(200)
            res.should.be.a("object")
            res.body.should.have.property("success").eq("success")
            res.body.should.have.property("message").eq("Here is the list of blogs")
          done()
          })
      });
    });
  });
  
  //Detail of blog test case
  describe("Detail Blog API", () => {
    describe("GET/api/blogs", () => {
      it("It should return detail of blog:", (done) => {
        chai
          .request(server)
          .get("/blog/details/63ef56a5efecfbcfa968669a")
          .end((err, res)=>{
            res.should.have.status(200)
            res.should.be.a("object")
            res.body.should.have.property("success").eq("success")
            res.body.should.have.property("message").eq("Here is the details of blog")
          done()
          })
      });
    });
  });
  
  //Edit blog test case
  describe("Edit Blog API", () => {
    describe("PATCH/api/blogs", () => {
      it("It should edit the blog:", (done) => {
        const editData = {
          blogTitle: "Hawa mahal"
        }
        const token =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2M2VkZGQyY2JkOGU1ZDFhMDBmMmRmMjIiLCJpYXQiOjE2Nzc0OTIzMTYsImV4cCI6MTY3ODM1NjMxNn0.BcTLxYtQMA5HasJKdyfYjY0KoE36JtnoiQ1Nhxhotfk"
        chai
          .request(server)
          .patch("/blog/edit/63ef616aca9f9905723bf9b6")
          .send(editData)
          .set("Authorization", `Bearer ${token}`)
          .end((err, res)=>{
            res.should.have.status(200)
            res.should.be.a("object")
            res.body.should.have.property("success").eq("success")
            res.body.should.have.property("message").eq("Edit blog successfully")
          done()
          })
      });
    });
  });
  
  //delete blog test case
  // describe("Delete Blog API", () => {
  //   describe("DELETE/api/blogs", () => {
  //     it("It should delete the blog:", (done) => {
  //       const token =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2M2VkZGQyY2JkOGU1ZDFhMDBmMmRmMjIiLCJpYXQiOjE2Nzc0OTIzMTYsImV4cCI6MTY3ODM1NjMxNn0.BcTLxYtQMA5HasJKdyfYjY0KoE36JtnoiQ1Nhxhotfk"
  //       chai
  //         .request(server)
  //         .delete("/blog/delete/63ef56a5efecfbcfa968669a")
  //         .set("Authorization", `Bearer ${token}`)
  //         .end((err, res)=>{
  //           res.should.have.status(200)
  //           res.should.be.a("object")
  //           res.body.should.have.property("success").eq("success")
  //           res.body.should.have.property("message").eq("Delete blog successfully")
  //         done()
  //         })
  //     });
  //   });
  // });