const express = require("express");
var multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const config = require("config");
const auth = require("../../middleware/restaurant_auth");
const RestaurantProfile = require("../../models/RestaurantProfile");
const Dish = require("../../models/Dish");
const UserProfile = require("../../models/UserProfile");
const router = express.Router();

// Account access information
cloudinary.config({
  cloud_name: config.get("cloud-name"),
  api_key: config.get("api-key"),
  api_secret: config.get("secret-key"),
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "images",
      format: "jpeg",
      crop: "fit",
    };
  },
});

const parser = multer({ storage: storage });

router.post("/upload", auth, parser.single("image"), async (req, res) => {
  // upload the public id to db
  try {
    let profile = await RestaurantProfile.findOne({
      where: { restaurantid: req.restaurant.id },
    });
    let profileimage = {};
    profileimage.images = req.file.path;
    if (profile) {
      profile = await RestaurantProfile.update(profileimage, {
        where: { restaurantid: req.restaurant.id },
      });
      profile = await RestaurantProfile.findOne({
        where: { restaurantid: req.restaurant.id },
      });
      return res.json(profile);
    } else {
      return res.status(400).json({ msg: "No profile found for the user" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.post(
  "/dish/upload/:dish_id",
  auth,
  parser.single("image"),
  async (req, res) => {
    // upload the public id to db
    try {
      let dish = await Dish.findOne({
        where: { id: req.params.dish_id },
      });
      let dishimage = {};
      dishimage.images = req.file.path;
      if (dish) {
        dish = await Dish.update(dishimage, {
          where: { id: req.params.dish_id },
        });
        dish = await Dish.findOne({
          where: { id: req.params.dish_id },
        });
        await dish.save();
        return res.json(dish);
      } else {
        return res.status(400).json({ msg: "No profile found for the user" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }
);

router.post(
  "/user/upload/:user_id",
  auth,
  parser.single("image"),
  async (req, res) => {
    // upload the public id to db
    try {
      let profile = await UserProfile.findOne({
        where: {
          profileid: req.params.user_id,
        },
      });
      let profileimage = {};
      profileimage.picture = req.file.path;
      if (profile) {
        profile = await UserProfile.update(profileimage, {
          where: { profileid: req.params.user_id },
        });
        profile = await UserProfile.findOne({
          where: { profileid: req.params.user_id },
        });
        await profile.save();
        return res.json(profile);
      } else {
        return res.status(400).json({ msg: "No profile found for the user" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }
);

module.exports = router;
