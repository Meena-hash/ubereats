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
      "get-restaurant-orders",
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

router.put(
  "/update/delivery/:order_id/:del_status",
  restaurantauth,
  async (req, res) => {
    try {
      let msg = {
        order_id: req.params.order_id,
        del_status: req.params.del_status,
      };
      kafka.make_request(
        "update-delivery-status",
        msg,
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
              res.status(200).json([results]);
            }
            res.end();
          }
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).send("Server error");
    }
  }
);

router.get("/get/order/dishes/:order_id", async (req, res) => {
  kafka.make_request(
    "get-orders",
    req.params.order_id,
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
});

module.exports = router;
