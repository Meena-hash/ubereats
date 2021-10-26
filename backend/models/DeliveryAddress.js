const mongoose = require("mongoose");
const DeliveryAddressSchema = mongoose.Schema(
  {
    street: {
      type: String,
      required: true,
      unique: true,
      dropDups: true,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
    customer_idx: {
      type: mongoose.Schema.Types.String,
      ref: "user_profile",
      primaryKey: true,
    },
  },
  {
    timestamps: false,
    collection: "user_delivery_adr",
  }
);
module.exports = DeliveryAddress = mongoose.model(
  "user_delivery_adr",
  DeliveryAddressSchema
);
