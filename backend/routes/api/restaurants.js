const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
var kafka = require("../../kafka/client");
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("location", "Location is required").not().isEmpty(),
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

    try {
      kafka.make_request(
        "restaurant-signup",
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
      console.log(error);
      res.status(500).send(error);
    }
  }
);

module.exports = router;
