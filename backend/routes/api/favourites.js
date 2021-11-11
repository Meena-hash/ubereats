const express = require("express");
const router = express.Router();
var kafka = require("../../kafka/client");
const { auth, checkAuth } = require("../../middleware/user_auth");
checkAuth();

router.post("/", auth, async (req, res) => {
  try {
    req.body.id = req.user.id;
    kafka.make_request("add-favourite", req.body, function (err, results) {
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

router.get("/", auth, async (req, res) => {
  try {
    req.body.id = req.user.id;
    kafka.make_request("get-favourite", req.body, function (err, results) {
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
