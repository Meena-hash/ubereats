const Orders = require("../models/Order");
const OrderDish = require("../models/OrderDish");
async function handle_request(msg, callback) {
  let userOrders = await Orders.find({
    uid: msg,
  })
    .populate("restaurant_id_order")
    .exec();
  for (let order of userOrders) {
    let dishes = await OrderDish.find({ orderId: order._id }).select([
      "dish_id",
    ]);
    order._doc.dish = [];
    for (let dish of dishes) {
      order._doc.dish.push(dish.dish_id);
    }
  }
  callback(null, userOrders);
}

exports.handle_request = handle_request;
