const Restaurant = require("../models/Restaurant");
const RestaurantProfile = require("../models/RestaurantProfile");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
async function handle_request(msg, callback) {
  try {
    const { name, email, location, password } = msg;
    let restaurant = await Restaurant.findOne({ email: email });
    if (restaurant) {
      callback(null, {
        status: 400,
        errors: [{ msg: "Restaurant Already Exists" }],
      });
    }
    restaurant = new Restaurant({
      name,
      email,
      location,
      password,
    });
    const salt = await bcrypt.genSalt(10);
    restaurant.password = await bcrypt.hash(password, salt);
    await restaurant.save();
    const payload = {
      restaurant: {
        id: restaurant._id,
      },
    };
    let profile = new RestaurantProfile({
      restaurantid: restaurant._id,
      name: restaurant.name,
      location: restaurant.location,
      email: restaurant.email,
    });
    await profile.save();
    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 3600000 },
      (err, token) => {
        if (err) throw err;
        callback(null, { token }, { status: 200 });
      }
    );
  } catch (error) {
    console.log(error);
    callback(null, {
      status: 500,
      errors: "server error",
    });
  }
}

exports.handle_request = handle_request;
