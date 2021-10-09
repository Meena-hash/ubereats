const config = require("config");
let chai = require("chai");
var request = require("request");
let chaiHttp = require("chai-http");
chai.use(chaiHttp);
let dashboard = require("../routes/api/restaurantdashboard");
let should = chai.should();
const expect = require("chai").expect;

const API = "http://localhost:5000";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN0YXVyYW50Ijp7ImlkIjo5ODZ9LCJpYXQiOjE2MzM3MzI5MDEsImV4cCI6MTYzNzMzMjkwMX0.ZHmf8QWATOkGaLlUvTwucD5v5VvskjQMQgC7BAUi4MA";

describe("/POST add a dish", () => {
  it("should add dish(access token passed)", (done) => {
    const body = {
      name: "Pasta - Mozha testing - dish",
      incredients: "maida pasta, salt, masala",
      price: 14,
      description: "Mouth watering dish",
      category: "Main course",
      type: "veg",
    };
    chai
      .request(API)
      .post("/api/restaurant/profile/create/dish")
      .set("x-auth-token", token)
      .send(body)
      .end((err, res) => {
        const attributes = res.body;
        expect(attributes).to.include.keys("id");
        done();
      });
  });
});
