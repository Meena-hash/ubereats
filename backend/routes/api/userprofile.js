const express = require("express");
var kafka = require("../../kafka/client");
const db = require("../../config/db");
const { auth, checkAuth } = require("../../middleware/user_auth");
const router = express.Router();

checkAuth();

router.get("/", auth, async (req, res) => {
  try {
    kafka.make_request("get-userprofile", req.user.id, function (err, results) {
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
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});
router.get("/:user_id", async (req, res) => {
  try {
    kafka.make_request(
      "get-userbyid",
      req.params.user_id,
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

router.post("/basic", auth, async (req, res) => {
  try {
    req.body.id = req.user.id;
    kafka.make_request("update-userprofile", req.body, function (err, results) {
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
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/get/past/orders/dishes/:order_id", auth, async (req, res) => {
  try {
    let dishes = await db.query(
      `call ubereats.getOrderSummary(${req.params.order_id})`
    );
    return res.json(dishes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
