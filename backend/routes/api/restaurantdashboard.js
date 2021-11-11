const express = require("express");
const router = express.Router();
var kafka = require("../../kafka/client");
router.get("/restaurants", async (req, res) => {
  try {
    kafka.make_request("get-restaurants", null, function (err, results) {
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
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/dishes", async (req, res) => {
  try {
    kafka.make_request("get-dishes", null, function (err, results) {
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
