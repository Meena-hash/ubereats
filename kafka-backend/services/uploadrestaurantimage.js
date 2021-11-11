const RestaurantProfile = require("../models/RestaurantProfile");
async function handle_request(msg, callback) {
  let profile = await RestaurantProfile.findOne({
    restaurantid: msg.id,
  });
  let profileimage = {};
  profileimage.images = msg.path;
  if (profile) {
    profile = await RestaurantProfile.findOneAndUpdate(
      { restaurantid: msg.id },
      { $set: profileimage },
      { new: true }
    );
    callback(null, profile);
  } else {
    callback(null, {
      status: 400,
      errors: [{ msg: "No profile found for the user" }],
    });
  }
}

exports.handle_request = handle_request;
