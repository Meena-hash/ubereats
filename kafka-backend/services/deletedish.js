const Dish = require("../models/Dish");
async function handle_request(msg, callback) {
  let dish = await Dish.findById(msg.dishid);
  console.log(dish);
  if (!dish) {
    callback(null, {
      status: 400,
      errors: [{ msg: "Dish does not exists. Invalid request" }],
    });
  } else {
    if (dish.restaurant_idx === msg.restaurantid) {
      try {
        await dish.remove();
        callback(null, "Deleted successfully");
      } catch (error) {
        callback(null, {
          status: 500,
          errors: "server error",
        });
      }
    } else {
      callback(null, {
        status: 401,
        errors: [{ msg: "Not authorized to delete. Invalid request" }],
      });
    }
  }
}

exports.handle_request = handle_request;
