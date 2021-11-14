const Restaurant = require("../models/Restaurant");

async function handle_request(msg, callback) {
  try {
    const restaurant = await Restaurant.findOne({
      _id: msg,
    }).select(["_id", "name", "email", "picture"]);
    callback(null, restaurant);
  } catch (error) {
    console.log(error);
    callback(null, {
      status: 500,
      errors: "server error",
    });
  }
}

exports.handle_request = handle_request;
