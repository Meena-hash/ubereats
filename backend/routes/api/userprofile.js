const express = require("express");

const DeliveryAddress = require("../../models/DeliveryAddress");
const UserProfile = require("../../models/UserProfile");
const User = require("../../models/User");
const Orders = require("../../models/Order");
const OrderDish = require("../../models/OrderDish");
const RestaurantProfile = require("../../models/RestaurantProfile");

const db = require("../../config/db");

const { auth, checkAuth } = require("../../middleware/user_auth");
const router = express.Router();

checkAuth();

router.get("/", auth, async (req, res) => {
  try {
    const profile = await UserProfile.findOne({
      profileid: req.user.id,
    });
    if (!profile) {
      return res.status(400).json({ msg: "there is no profile for this user" });
    }
    return res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});
router.get("/:user_id", async (req, res) => {
  try {
    const profile = await UserProfile.findOne({
      profileid: req.params.user_id,
    });
    if (!profile) {
      return res.status(400).json({ msg: "there is no profile for this user" });
    }
    return res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/basic", auth, async (req, res) => {
  const {
    name,
    street,
    city,
    state,
    country,
    nickname,
    about,
    dob,
    email,
    ph_no,
  } = req.body;

  try {
    let user = await User.findOne({ _id: req.user.id });
    let profile = await UserProfile.findOne({ profileid: user.id });
    let profileFields = {};
    profileFields.profileid = user.id;
    profileFields.name = name;
    profileFields.street = street;
    profileFields.city = city;
    profileFields.state = state;
    profileFields.country = country;
    profileFields.nickname = nickname;
    profileFields.about = about;
    profileFields.dob = dob;
    profileFields.email = email;
    profileFields.ph_no = ph_no;

    if (profile) {
      profile = await UserProfile.findOneAndUpdate(
        { profileid: user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }
    profile = new UserProfile(profileFields);
    await profile.save();
    return res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/get/past/orders/dishes/:order_id", auth, async (req, res) => {
  try {
    let dishes = await db.query(
      `call ubereats.getOrderSummary(${req.params.order_id})`
    );
    return res.json(dishes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
