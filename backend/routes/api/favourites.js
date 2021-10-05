const express = require("express");
const router = express.Router();
const db = require("../../config/db");
const auth = require("../../middleware/auth");
const Favourites = require("../../models/Favourites");
const RestaurantProfile = require("../../models/RestaurantProfile");
router.post("/", auth, async (req, res) => {
  try {
    let favFields = {};
    favFields.customer_id_fav = req.user.id;
    favFields.restaurant_id_fav = req.body.restaurant_id;
    let favourites = await Favourites.findOne({
      where: favFields,
      attributes: { exclude: ["restaurantProfileRestaurantid"] },
    });
    if (!favourites) {
      favourites = new Favourites(favFields);
      await favourites.save();
    }
    RestaurantProfile.hasMany(Favourites);
    Favourites.belongsTo(RestaurantProfile, {
      foreignKey: "restaurant_id_fav",
    });
    favourites = await Favourites.findAll({
      where: { customer_id_fav: req.user.id },
      attributes: { exclude: ["restaurantProfileRestaurantid"] },
      include: [
        {
          model: RestaurantProfile,
          required: true,
        },
      ],
      raw: true,
    });
    res.json(favourites);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});
router.get("/", auth, async (req, res) => {
  try {
    RestaurantProfile.hasMany(Favourites);
    Favourites.belongsTo(RestaurantProfile, {
      foreignKey: "restaurant_id_fav",
    });
    const favourites = await Favourites.findAll({
      where: { customer_id_fav: req.user.id },
      attributes: { exclude: ["restaurantProfileRestaurantid"] },
      include: [
        {
          model: RestaurantProfile,
          required: true,
        },
      ],
      raw: true,
    });
    res.json(favourites);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
