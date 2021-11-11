const Orders = require("../models/Order");

async function handle_request(msg, callback) {
  let delivery = {};
  let order = await Orders.findOne({ _id: msg.order_id });
  if (order.type === "deliver") delivery.delivery_status = msg.del_status;
  else delivery.pickup_status = msg.del_status;
  if (msg.del_status === "delivered") {
    delivery.order_type = "delivered";
  }
  if (msg.del_status === "cancelled") {
    delivery.order_type = "cancelled";
  }
  order = await Orders.findOneAndUpdate(
    { _id: msg.order_id },
    {
      $set: delivery,
    }
  ).populate("userprofileid");
  callback(null, order);
}

exports.handle_request = handle_request;
