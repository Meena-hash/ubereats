const Orders = require("../models/Order");
const OrderDish = require("../models/OrderDish");
async function handle_request(msg, callback) {
  const { tip, restaurant_id_order, total, delivery_address, type, notes } =
    msg.orderData;
  let orderFields = {};
  orderFields.tip = tip;
  orderFields.date = new Date();
  orderFields.uid = msg.orderData.userid;
  orderFields.restaurantid = restaurant_id_order;
  orderFields.order_type = "new";
  if (type === "delivery") orderFields.type = "deliver";
  else orderFields.type = type;
  if (type === "pickup") orderFields.pickup_status = "order received";
  else orderFields.delivery_status = "order received";
  orderFields.total = total;
  orderFields.delivery_address = delivery_address;
  orderFields.notes = notes;
  order = new Orders(orderFields);
  await order.save();

  for (let i = 0; i < msg.dishes.length; i++) {
    var dish = msg.dishes[i];
    var dishesFields = {};
    (dishesFields.orderId = order._id),
      (dishesFields.dish_id = dish._id),
      (dishesFields.count = dish.count),
      (dishesFields.price = dish.price);
    var orderDish = new OrderDish(dishesFields);
    await orderDish.save();
  }
  callback(null, order);
}

exports.handle_request = handle_request;
