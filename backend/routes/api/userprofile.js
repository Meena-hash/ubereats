const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const DeliveryAddress = require("../../models/DeliveryAddress");
const UserProfile = require("../../models/UserProfile");
const User = require("../../models/User");
const Orders = require("../../models/Order");

router.get("/", auth, async (req, res) => {
  try {
    const profile = await UserProfile.findOne({
      where: {
        profileid: req.user.id,
      },
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
      where: {
        profileid: req.params.user_id,
      },
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
// Update basic details (name, date of birth, city, state, country, nickname)
router.post("/basic", auth, async (req, res) => {
  let user = await User.findOne({ where: { id: req.user.id } });
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

  try {
    let profile = await UserProfile.findOne({
      where: { profileid: user.id },
    });
    if (profile) {
      profile = await UserProfile.update(profileFields, {
        where: { profileid: user.id },
      });
      profile = await UserProfile.findOne({ where: { profileid: user.id } });
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
// Update Contact Information (email id, phone number)
router.post("/contact", auth, async (req, res) => {
  let user = await User.findOne({ where: { id: req.user.id } });
  const { email, ph_no } = req.body;

  let profileFields = {};
  profileFields.profileid = user.id;
  profileFields.email = email;
  profileFields.ph_no = ph_no;

  try {
    let profile = await UserProfile.findOne({
      where: { profileid: user.id },
    });
    if (profile) {
      profile = await UserProfile.update(profileFields, {
        where: { profileid: user.id },
      });
      profile = await UserProfile.findOne({ where: { profileid: user.id } });
      console.log(profile);
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
router.get("/address/me", auth, async (req, res) => {
  try {
    const addresses = await DeliveryAddress.findAll({
      where: { customer_idx: req.user.id },
    });
    return res.json(addresses);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/address/me", auth, async (req, res) => {
  try {
    const { street, city, country, state } = req.body;
    let addressFields = {};
    addressFields.street = street;
    addressFields.city = city;
    addressFields.country = country;
    addressFields.state = state;
    addressFields.customer_idx = req.user.id;
    const address = new DeliveryAddress(addressFields);
    await address.save();
    return res.json(addressFields);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});
router.post("/orders", auth, async (req, res) => {
  try {
    const { tip, restaurant_id_order, total, delivery_address } = req.body;
    let orderFields = {};
    orderFields.userprofileid = req.user.id;
    orderFields.restaurant_id_order = restaurant_id_order;
    orderFields.tip = tip;
    orderFields.total = total;
    orderFields.order_type = "new";
    orderFields.type = "deliver";
    orderFields.delivery_status = "received";
    orderFields.delivery_address = delivery_address;
    const order = new Orders(orderFields);
    await order.save();
    return res.json(orderFields);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});
module.exports = router;
