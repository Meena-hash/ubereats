const express = require("express");
const { auth, checkAuth } = require("../../middleware/user_auth");
var kafka = require("../../kafka/client");
const router = express.Router();
checkAuth();

router.post("/", auth, async (req, res) => {
  try {
    req.body.orderData.userid = req.user.id;

    kafka.make_request("place-order", req.body, function (err, results) {
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
    console.log(error);
    res.status(500).send("Server error");
  }
});

router.get("/past", auth, async (req, res) => {
  try {
    kafka.make_request("get-past-orders", req.user.id, function (err, results) {
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

router.delete("/cancel/:order_id", auth, async (req, res) => {
  try {
    let msg = {
      order_id: req.params.order_id,
      userid: req.user.id,
    };
    kafka.make_request("cancel-order", msg, function (err, results) {
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
    console.log(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
