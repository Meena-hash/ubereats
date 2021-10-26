const express = require("express");
const router = express.Router();
const db = require("../../config/db");
const Favourites = require("../../models/Favourites");
const RestaurantProfile = require("../../models/RestaurantProfile");
const { auth, checkAuth } = require("../../middleware/user_auth");
checkAuth();

router.post("/", auth, async (req, res) => {
  try {
    let favFields = {};
    favFields.customer_id_fav = req.user.id;
    favFields.restaurant_id_fav = req.body.restaurant_id;
    let favourites = await Favourites.findOne({
      customer_id_fav: req.user.id,
      restaurant_id_fav: req.body.restaurant_id,
    });

    if (!favourites) {
      favourites = new Favourites(favFields);
      await favourites.save();
    }
    favourites = await Favourites.find({
      customer_id_fav: req.user.id,
    });

    for (let i in favourites) {
      restaurant = await RestaurantProfile.findOne({
        restaurantid: favourites[i].restaurant_id_fav,
      });
      favourites[i]._doc["restaurant_profile.restaurantid"] =
        restaurant.restaurantid;
      favourites[i]._doc["restaurant_profile.name"] = restaurant.name;
      favourites[i]._doc["restaurant_profile.location"] = restaurant.location;
      favourites[i]._doc["restaurant_profile.description"] =
        restaurant.description;
      favourites[i]._doc["restaurant_profile.images"] = restaurant.images;
      favourites[i]._doc["restaurant_profile.email"] = restaurant.email;
      favourites[i]._doc["restaurant_profile.ph_no"] = restaurant.ph_no;
      favourites[i]._doc["restaurant_profile.from_time"] = restaurant.from_time;
      favourites[i]._doc["restaurant_profile.to_time"] = restaurant.to_time;
      favourites[i]._doc["restaurant_profile.mode"] = restaurant.mode;
    }

    return res.json(favourites);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});

router.get("/", auth, async (req, res) => {
  try {
    let favourites = await Favourites.find({
      customer_id_fav: req.user.id,
    });
    for (let i in favourites) {
      let restaurant = await RestaurantProfile.findOne({
        restaurantid: favourites[i].restaurant_id_fav,
      });
      favourites[i]._doc["restaurant_profile.restaurantid"] = restaurant.id;
      favourites[i]._doc["restaurant_profile.name"] = restaurant.name;
      favourites[i]._doc["restaurant_profile.location"] = restaurant.location;
      favourites[i]._doc["restaurant_profile.description"] =
        restaurant.description;
      favourites[i]._doc["restaurant_profile.email"] = restaurant.email;
      favourites[i]._doc["restaurant_profile.ph_no"] = restaurant.ph_no;
      favourites[i]._doc["restaurant_profile.from_time"] = restaurant.from_time;
      favourites[i]._doc["restaurant_profile.to_time"] = restaurant.to_time;
      favourites[i]._doc["restaurant_profile.mode"] = restaurant.mode;
    }

    return res.json(favourites);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
