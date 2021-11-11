const DeliveryAddress = require("../models/DeliveryAddress");

async function handle_request(msg, callback) {
  try {
    const { street, city, country, state } = msg;
    let addressFields = {};
    addressFields.street = street;
    addressFields.city = city;
    addressFields.country = country;
    addressFields.state = state;
    addressFields.customer_idx = msg.id;
    let isExists = await DeliveryAddress.findOne({ street });
    if (isExists) {
      callback(null, {
        status: 400,
        errors: [
          {
            msg: "Address already exists",
          },
        ],
      });
    }
    const address = new DeliveryAddress(addressFields);
    await address.save();
    callback(null, address);
  } catch (error) {
    console.log(error);
    callback(null, {
      status: 500,
      errors: "server error",
    });
  }
}

exports.handle_request = handle_request;
