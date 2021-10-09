const config = require("config");
let chai = require("chai");
var request = require("request");
let chaiHttp = require("chai-http");
chai.use(chaiHttp);
let dashboard = require("../routes/api/restaurantdashboard");
let should = chai.should();

const API = "http://localhost:5000";
var assert = require("assert");
describe("Array", function () {
  describe("#indexOf()", function () {
    it("should return -1 when the value is not present", function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

describe("/GET restaurants", () => {
  it("it should GET all the restaurants for the user dashboard", (done) => {
    chai
      .request(API)
      .get("/api/dashboard/restaurants")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        done();
      });
  });
});

describe("/GET dishes", () => {
  it("it should GET all the dishes from all the restaurants to enable filtering", (done) => {
    chai
      .request(API)
      .get("/api/dashboard/dishes")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        done();
      });
  });
});
