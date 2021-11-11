const express = require("express");
const { check, validationResult } = require("express-validator");
var kafka = require("../../kafka/client");

const router = express.Router();
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    kafka.make_request("user-signup", req.body, function (err, results) {
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
  }
);

module.exports = router;
