const Dish = require("../models/Dish");
async function handle_request(msg, callback) {
  const {
    _id,
    name,
    ingredients,
    price,
    description,
    category,
    updated_by,
    type,
    restaurant_idx,
  } = msg;

  let dishFields = {};
  dishFields._id = _id;
  dishFields.name = name;
  dishFields.ingredients = ingredients;
  dishFields.price = price;
  dishFields.description = description;
  dishFields.category = category;
  dishFields.updated_by = updated_by;
  dishFields.type = type;
  dishFields.restaurant_idx = restaurant_idx;

  if (restaurant_idx === msg.restaurantid) {
    try {
      let dish = await Dish.findById({
        _id: _id,
      });

      if (dish) {
        dish = await Dish.findByIdAndUpdate(
          { _id: _id },
          { $set: dishFields },
          { new: true }
        );
        callback(null, dish);
      } else {
        callback(null, {
          status: 400,
          errors: [{ msg: "Dish does not exists. Invalid request" }],
        });
      }
    } catch (error) {
      console.log(error);
      callback(null, {
        status: 500,
        errors: "server error",
      });
    }
  } else {
    callback(null, {
      status: 400,
      errors: [{ msg: "Not authorized to update. Invalid request" }],
    });
  }
}

exports.handle_request = handle_request;
