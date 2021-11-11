const RestaurantProfile = require("../models/RestaurantProfile");
async function handle_request(msg, callback) {
  try {
    const profile = await RestaurantProfile.findOne({
      restaurantid: msg,
    });
    if (!profile) {
      callback(null, {
        status: 400,
        errors: [{ msg: "there is no profile for this restaurant" }],
      });
    }
    callback(null, profile);
  } catch (err) {
    console.log(err);
    callback(null, {
      status: 500,
      errors: "server error",
    });
  }
}

exports.handle_request = handle_request;
