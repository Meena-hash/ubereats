const User = require("../models/User");
const OrderDish = require("../models/OrderDish");

async function handle_request(msg, callback) {
  let dishes = await OrderDish.find({ orderId: msg }).select([
    "dish_id",
    "count",
    "price",
  ]);

  summary = [];

  for (dishid of dishes) {
    let dish = await Dish.findById(dishid.dish_id);
    dish._doc["count"] = dishid.count;
    dish._doc["price"] = dishid.price;
    summary.push(dish);
  }

  callback(null, summary);
}

exports.handle_request = handle_request;
