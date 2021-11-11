const Dish = require("../models/Dish");
async function handle_request(msg, callback) {
  const { name, ingredients, price, description, category, type } = msg;
  let dishFields = {};
  dishFields.name = name;
  dishFields.ingredients = ingredients;
  dishFields.price = price;
  dishFields.description = description;
  dishFields.category = category;
  dishFields.updated_by = msg.id;
  dishFields.type = type;
  dishFields.restaurant_idx = msg.id;
  try {
    let dish = await Dish.findOne({
      name: name,
      restaurant_idx: msg.id,
    });

    if (dish) {
      callback(null, {
        status: 400,
        errors: [{ msg: "Dish already exists. Invalid request" }],
      });
    } else if (!type && !category) {
      callback(null, {
        status: 400,
        errors: [{ msg: "Category and type cannot be empty. Invalid request" }],
      });
    } else {
      dish = new Dish(dishFields);
      await dish.save();
      callback(null, dish);
    }
  } catch (error) {
    console.log(error);
    callback(null, {
      status: 500,
      errors: "server error",
    });
  }
}

exports.handle_request = handle_request;
