const express = require("express");
var multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const config = require("config");
var kafka = require("../../kafka/client");

const router = express.Router();
const {
  restaurantauth,
  checkRestaurantAuth,
} = require("../../middleware/restaurant_auth");
checkRestaurantAuth();
const { auth, checkAuth } = require("../../middleware/user_auth");
checkAuth();

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
    if (req && req.file && req.file.path) {
      let msg = {
        id: req.restaurant.id,
        path: req.file.path,
      };
      // upload the public id to db
      try {
        kafka.make_request("upload-rest-image", msg, function (err, results) {
          if (err) {
            res.json({
              status: "error",
              msg: "System Error, Try Again.",
            });
          } else {
            res_status = results.status;
            if (res_status) {
              res.status(res_status).json(results.errors);
            } else {
              res.status(200).json(results);
            }
            res.end();
          }
        });
      } catch (err) {
        console.log(err);
        res.status(500).send(err);
      }
    }
  }
);

router.post(
  "/dish/upload/:dish_id",
  restaurantauth,
  parser.single("image"),
  async (req, res) => {
    // upload the public id to db
    if (req && req.file && req.file.path) {
      msg = {
        dish_id: req.params.dish_id,
        path: req.file.path,
      };
      try {
        kafka.make_request("upload-dish-image", msg, function (err, results) {
          if (err) {
            res.json({
              status: "error",
              msg: "System Error, Try Again.",
            });
          } else {
            res_status = results.status;
            if (res_status) {
              res.status(res_status).json(results.errors);
            } else {
              res.status(200).json(results);
            }
            res.end();
          }
        });
      } catch (err) {
        console.log(err);
        res.status(500).send(err);
      }
    }
  }
);

router.post(
  "/user/upload/:user_id",
  auth,
  parser.single("image"),
  async (req, res) => {
    if (req && req.file && req.file.path) {
      let msg = {
        user_id: req.params.user_id,
        path: req.file.path,
      };
      try {
        kafka.make_request("upload-user-image", msg, function (err, results) {
          if (err) {
            res.json({
              status: "error",
              msg: "System Error, Try Again.",
            });
          } else {
            res_status = results.status;
            if (res_status) {
              res.status(res_status).json(results.errors);
            } else {
              res.status(200).json(results);
            }
            res.end();
          }
        });
      } catch (err) {
        console.log(err);
        res.status(500).send(err);
      }
    }
    // upload the public id to db
  }
);

module.exports = router;
