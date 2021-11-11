const RestaurantProfile = require("../models/RestaurantProfile");
const Dish = require("../models/Dish");
async function handle_request(msg, callback) {
  try {
    let dishes = await Dish.find();
    callback(null, dishes);
  } catch (error) {
    callback(null, {
      status: 500,
      errors: "server error",
    });
    console.log(error);
  }
}
exports.handle_request = handle_request;
