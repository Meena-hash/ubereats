const { v4: uuidv4 } = require("uuid");
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Restaurant = require("../../models/Restaurant");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

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
    const { name, email, location, password } = req.body;
    try {
      let restaurant = await Restaurant.findOne({ where: { email: email } });
      if (restaurant) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Restaurant already exists" }] });
      }
      restaurant = new Restaurant({
        id: uuidv4(),
        name,
        email,
        location,
        password,
      });
      const salt = await bcrypt.genSalt(10);
      restaurant.password = await bcrypt.hash(password, salt);
      console.log("-------");
      console.log(restaurant);
      await restaurant.save();
      const payload = {
        restaurant: {
          id: restaurant.id,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 3600000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
