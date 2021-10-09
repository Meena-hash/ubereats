const config = require("config");
let chai = require("chai");
var request = require("request");
let chaiHttp = require("chai-http");
chai.use(chaiHttp);
let dashboard = require("../routes/api/restaurantdashboard");
let should = chai.should();
const expect = require("chai").expect;

const API = "http://localhost:5000";
var assert = require("assert");
describe("/POST user credentials", () => {
  it("should POST user credentials to get accesstoken", (done) => {
    const body = {
      email: "alice@gmail.com",
      password: "password",
    };
    chai
      .request(API)
      .post("/api/auth")
      .send(body)
      .end((err, res) => {
        res.should.have.status(200);
        const attributes = res.body;
        expect(attributes).to.include.keys("token");

        done();
      });
  });
});

describe("/GET favourites", () => {
  it("requires authentication - status should be 401", (done) => {
    chai
      .request(API)
      .get("/api/favourites")
      .end((err, res) => {
        res.should.have.status(401);

        done();
      });
  });
});
