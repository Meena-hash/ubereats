const DeliveryAddress = require("../models/DeliveryAddress");

async function handle_request(msg, callback) {
  try {
    const addresses = await DeliveryAddress.find({
      customer_idx: msg,
    });
    callback(null, addresses);
  } catch (error) {
    callback(null, {
      status: 500,
      errors: "server error",
    });
    console.log(error);
  }
}

exports.handle_request = handle_request;
