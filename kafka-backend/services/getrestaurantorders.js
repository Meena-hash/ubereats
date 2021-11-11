const Orders = require("../models/Order");

async function handle_request(msg, callback) {
  let orders = await Orders.find({
    restaurantid: msg,
  }).populate("userprofileid");
  callback(null, orders);
}

exports.handle_request = handle_request;
