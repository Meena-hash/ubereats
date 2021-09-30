const express = require("express");
const router = express.Router();
const db = require("../../config/db");
const RestaurantProfile = require("../../models/RestaurantProfile");

router.get("/restaurants", async (req, res) => {
  try {
    const restaurants = await RestaurantProfile.findAll();
    res.json(restaurants);
  } catch (error) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
