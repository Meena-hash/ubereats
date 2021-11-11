const Restaurant = require("../models/Restaurant");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

async function handle_request(logindata, callback) {
  const { email, password } = logindata;
  try {
    let restaurant = await Restaurant.findOne({ email: email });
    if (!restaurant) {
      callback(null, { status: 401, errors: [{ msg: "Invalid Credentials" }] });
    }
    const isMatch = await bcrypt.compare(password, restaurant.password);
    if (!isMatch) {
      callback(null, { status: 401, errors: [{ msg: "Invalid Credentials" }] });
    }
    const payload = {
      restaurant: {
        id: restaurant._id,
      },
    };
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
