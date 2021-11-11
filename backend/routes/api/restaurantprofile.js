const express = require("express");
const router = express.Router();
var kafka = require("../../kafka/client");
const {
  restaurantauth,
  checkRestaurantAuth,
} = require("../../middleware/restaurant_auth");

checkRestaurantAuth();

router.get("/", restaurantauth, async (req, res) => {
  try {
    kafka.make_request(
      "get-restaurantprofile",
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
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/basic", restaurantauth, async (req, res) => {
  req.body.id = req.restaurant.id;
  try {
    kafka.make_request(
      "update-restaurantprofile",
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
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
