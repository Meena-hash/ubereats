const express = require("express");
var multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const config = require("config");
const RestaurantProfile = require("../../models/RestaurantProfile");
const Dish = require("../../models/Dish");
const UserProfile = require("../../models/UserProfile");
const router = express.Router();
const {
  restaurantauth,
  checkRestaurantAuth,
} = require("../../middleware/restaurant_auth");
checkRestaurantAuth();

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

router.post(
  "/upload",
  restaurantauth,
  parser.single("image"),
  async (req, res) => {
    // upload the public id to db
    try {
      let profile = await RestaurantProfile.findOne({
        restaurantid: req.restaurant.id,
      });
      let profileimage = {};
      profileimage.images = req.file.path;
      if (profile) {
        profile = await RestaurantProfile.findOneAndUpdate(
          { restaurantid: req.restaurant.id },
          { $set: profileimage },
          { new: true }
        );

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

router.post(
  "/dish/upload/:dish_id",
  restaurantauth,
  parser.single("image"),
  async (req, res) => {
    // upload the public id to db
    try {
      let dish = await Dish.findOne({ _id: req.params.dish_id });
      let dishimage = {};
      dishimage.images = req.file.path;
      if (dish) {
        // { restaurantid: req.restaurant.id },
        // { $set: profileimage },
        // { new: true }
        dish = await Dish.findOneAndUpdate(
          { id: req.params.dish_id },
          {
            $set: dishimage,
          },
          { new: true }
        );
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
  restaurantauth,
  parser.single("image"),
  async (req, res) => {
    // upload the public id to db
    try {
      let profile = await UserProfile.findOne({
        profileid: req.params.user_id,
      });
      let profileimage = {};
      profileimage.picture = req.file.path;
      if (profile) {
        // { restaurantid: req.restaurant.id },
        // { $set: profileimage },
        // { new: true }
        profile = await UserProfile.findOneAndUpdate(
          { profileid: req.params.user_id },
          { $set: profileimage },
          { new: true }
        );

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
