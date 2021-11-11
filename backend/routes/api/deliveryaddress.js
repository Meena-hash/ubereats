const express = require("express");
const { check, validationResult } = require("express-validator");
const { auth, checkAuth } = require("../../middleware/user_auth");
var kafka = require("../../kafka/client");
const router = express.Router();
checkAuth();

router.get("/me", auth, async (req, res) => {
  try {
    kafka.make_request("get-address", req.user.id, function (err, results) {
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

router.post(
  "/me",
  [
    auth,
    [
      check("street", "Street is required").not().isEmpty(),
      check("city", "City is required").not().isEmpty(),
      check("country", "Country is required").not().isEmpty(),
      check("state", "State is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    req.body.id = req.user.id;
    kafka.make_request(
      "add-delivery-address",
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
