const RestaurantProfile = require("../models/RestaurantProfile");

async function handle_request(msg, callback) {
  try {
    const restaurants = await RestaurantProfile.find();
    callback(null, restaurants);
  } catch (error) {
    callback(null, {
      status: 500,
      errors: "server error",
    });
    console.log(error);
  }
}
exports.handle_request = handle_request;
