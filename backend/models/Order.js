const mongoose = require("mongoose");
const OrdersSchema = mongoose.Schema(
  {
    tip: {
      type: Number,
    },
    // userprofileid
    uid: {
      type: mongoose.Schema.Types.String,
      ref: "user_profile",
      // referencesKey: "profileid",
    },
    // restaurant_id_order
    restaurantid: {
      type: mongoose.Schema.Types.String,
      ref: "restaurant_profile",
      // referencesKey: "restaurantid",
    },

    date: {
      type: Date,
    },
    total: {
      type: Number,
    },
    order_type: {
      type: String,
      enum: ["new", "delivered", "cancelled"],
    },
    type: {
      type: String,
      enum: ["deliver", "pickup"],
    },
    delivery_status: {
      type: String,
      enum: [
        "order received",
        "preparing",
        "on the way",
        "delivered",
        "cancelled",
      ],
    },
    pickup_status: {
      type: String,
      enum: [
        "order received",
        "preparing",
        "pick up ready",
        "pickedup",
        "cancelled",
      ],
    },
    delivery_address: {
      type: String,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: false,
    collection: "orders",
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);
OrdersSchema.virtual("userprofileid", {
  ref: "user_profile",
  localField: "uid",
  foreignField: "profileid",
});
OrdersSchema.virtual("restaurant_id_order", {
  ref: "restaurant_profile",
  localField: "restaurantid",
  foreignField: "restaurantid",
});

module.exports = Orders = mongoose.model("orders", OrdersSchema);
