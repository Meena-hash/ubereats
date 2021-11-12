const Dish = require("../models/Dish");
async function handle_request(msg, callback) {
  let dish = await Dish.findById(msg.dish_id);

  let dishimage = {};
  dishimage.images = msg.path;
  if (dish) {
    dish = await Dish.findOneAndUpdate(
      { _id: msg.dish_id },
      {
        $set: dishimage,
      },
      { new: true }
    );
    await dish.save();
    callback(null, dish);
  } else {
    callback(null, {
      status: 400,
      errors: [{ msg: "No profile found for the user" }],
    });
  }
}

exports.handle_request = handle_request;
