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
      "get-restaurant-dishes",
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

router.post("/update", restaurantauth, async (req, res) => {
  req.body.restaurantid = req.restaurant.id;
  try {
    kafka.make_request(
      "update-restaurant-dish",
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
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});

router.post("/create", restaurantauth, async (req, res) => {
  req.body.id = req.restaurant.id;

  try {
    kafka.make_request(
      "create-restaurant-dish",
      req.body,
      function (err, results) {
        console.log(err, results);
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
    res.status(500).send(error);
  }
});

router.delete("/:dish_id", restaurantauth, async (req, res) => {
  let msg = {
    dishid: req.params.dish_id,
    restaurantid: req.restaurant.id,
  };
  try {
    kafka.make_request("delete-restaurant-dish", msg, function (err, results) {
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
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
