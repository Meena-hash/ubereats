const express = require("express");
const router = express.Router();
var kafka = require("../../kafka/client");
const { check, validationResult } = require("express-validator");
const {
  restaurantauth,
  checkRestaurantAuth,
} = require("../../middleware/restaurant_auth");

checkRestaurantAuth();

router.get("/", restaurantauth, async (req, res) => {
  try {
    kafka.make_request(
      "get-restaurant",
      req.restaurant.id,
      function (err, results) {
        if (err) {
          res.json({
            status: "error",
            msg: "System Error, Try Again.",
          });
        } else {
          res_status = results.status;
          if (res_status) {
            res.status(res_status).json(results.errors);
          } else {
            res.status(200).json(results);
          }

          res.end();
        }
      }
    );
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});

router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    kafka.make_request(
      "validate-rest-login",
      req.body,
      function (err, results) {
        if (err) {
          res.json({
            status: "error",
            msg: "System Error, Try Again.",
          });
        } else {
          res_status = results.status;
          if (res_status) {
            res.status(res_status).json(results.errors);
          } else {
            res.status(200).json(results);
          }

          res.end();
        }
      }
    );
  }
);
module.exports = router;
