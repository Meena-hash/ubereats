const mongoose = require("mongoose");
const OrderDishSchema = mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.String,
      ref: "order",
    },
    dish_id: {
      type: mongoose.Schema.Types.String,
      ref: "dish",
      primaryKey: true,
    },
    count: {
      type: Number,
    },
    price: {
      type: Number,
    },
  },
  {
    timestamps: false,
    collection: "order_dish",
  }
);

module.exports = OrderDish = mongoose.model("order_dish", OrderDishSchema);
