const express = require("express");
const router = express.Router();
const db = require("../../config/db");
const RestaurantProfile = require("../../models/RestaurantProfile");
const Dish = require("../../models/Dish");
router.get("/restaurants", async (req, res) => {
  try {
    const restaurants = await RestaurantProfile.find();
    res.json(restaurants);
  } catch (error) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/dishes", async (req, res) => {
  try {
    let dishes = await Dish.find();
    return res.json(dishes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});
module.exports = router;
