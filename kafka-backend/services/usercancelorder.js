const Orders = require("../models/Order");
const OrderDish = require("../models/OrderDish");
async function handle_request(msg, callback) {
  let order = await Orders.findOne({
    _id: msg.order_id,
  });
  if (!order) {
    callback(null, {
      status: 400,
      errors: [{ msg: "Order does not exist. Invalid request" }],
    });
  } else {
    if (order.uid === msg.userid) {
      let ordertype = order.type;
      let orderUpdateFields = {};
      if (ordertype === "deliver") {
        if (order.delivery_status === "order received") {
          orderUpdateFields.order_type = "cancelled";
          orderUpdateFields.delivery_status = "cancelled";
        } else {
          callback(null, {
            status: 400,
            errors: [
              {
                msg: "Order cannot be cancelled. The restaurant is already processing your order. Please contact the restaurant",
              },
            ],
          });
        }
      } else if (ordertype === "pickup") {
        if (order.pickup_status === "order received") {
          orderUpdateFields.order_type = "cancelled";
          orderUpdateFields.pickup_status = "cancelled";
        } else {
          callback(null, {
            status: 400,
            errors: [
              {
                msg: "Order cannot be cancelled. The restaurant is already processing your order. Please contact the restaurant",
              },
            ],
          });
        }
      }
      if (orderUpdateFields) {
        order = await Orders.findOneAndUpdate(
          { _id: msg.order_id },
          { $set: orderUpdateFields },
          { new: true }
        );

        callback(null, order);
      }
    } else {
      callback(null, {
        status: 401,
        errors: [
          {
            msg: "Access not allowed",
          },
        ],
      });
    }
  }
}

exports.handle_request = handle_request;
