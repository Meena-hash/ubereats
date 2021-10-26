const express = require("express");
const { check, validationResult } = require("express-validator");
const DeliveryAddress = require("../../models/DeliveryAddress");
const { auth, checkAuth } = require("../../middleware/user_auth");

const router = express.Router();
checkAuth();

router.get("/me", auth, async (req, res) => {
  try {
    const addresses = await DeliveryAddress.find({
      customer_idx: req.user.id,
    });
    return res.json(addresses);
  } catch (err) {
    console.log(err.message);
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
    try {
      const { street, city, country, state } = req.body;
      let addressFields = {};
      addressFields.street = street;
      addressFields.city = city;
      addressFields.country = country;
      addressFields.state = state;
      addressFields.customer_idx = req.user.id;
      let isExists = await DeliveryAddress.findOne({ street });
      if (isExists) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Address already exists" }] });
      }
      const address = new DeliveryAddress(addressFields);
      await address.save();
      return res.json(addressFields);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
