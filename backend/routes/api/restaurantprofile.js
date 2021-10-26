const express = require("express");
const router = express.Router();
const db = require("../../config/db");
const RestaurantProfile = require("../../models/RestaurantProfile");
const UserProfile = require("../../models/UserProfile");
const Restaurant = require("../../models/Restaurant");
const Orders = require("../../models/Order");

const {
  restaurantauth,
  checkRestaurantAuth,
} = require("../../middleware/restaurant_auth");

checkRestaurantAuth();

router.get("/", restaurantauth, async (req, res) => {
  try {
    const profile = await RestaurantProfile.findOne({
      restaurantid: req.restaurant.id,
    });
    if (!profile) {
      return res
        .status(400)
        .json({ msg: "there is no profile for this restaurant" });
    }
    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/basic", restaurantauth, async (req, res) => {
  let restaurant = await Restaurant.findOne({
    _id: req.restaurant.id,
  });
  if (!restaurant) {
    return res.status(400).json({
      msg: "Error fetching restaurant details. Contact administrator.",
    });
  }
  const {
    name,
    location,
    description,
    email,
    ph_no,
    from_time,
    to_time,
    mode,
  } = req.body;

  let profileFields = {};
  profileFields.restaurantid = restaurant._id;
  profileFields.name = name;
  profileFields.location = location;
  profileFields.description = description;
  profileFields.email = email;
  profileFields.ph_no = ph_no;
  profileFields.from_time = from_time;
  profileFields.to_time = to_time;
  profileFields.mode = mode;
  let contactFields = {};
  contactFields.email = email;
  contactFields.location = location;
  contactFields.name = name;

  try {
    let profile = await RestaurantProfile.findOne({
      restaurantid: restaurant._id,
    });
    let user = await Restaurant.findOne({
      id: restaurant._id,
    });

    if (profile) {
      profile = await RestaurantProfile.findOneAndUpdate(
        { restaurantid: restaurant._id },
        { $set: profileFields },
        { new: true }
      );
      user = await Restaurant.findOneAndUpdate(
        { _id: restaurant._id },
        { $set: contactFields }
      );

      return res.json(profile);
    }
    profile = new RestaurantProfile(profileFields);
    await profile.save();
    return res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

// router.get("/get/order/dishes/:order_id", restaurantauth, async (req, res) => {
//   try {
//     let dishes = await db.query(
//       `call ubereats.getOrderSummary(${req.params.order_id})`
//     );
//     return res.json(dishes);
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).send("Server error");
//   }
// });
module.exports = router;
