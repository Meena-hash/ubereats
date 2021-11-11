const mongoose = require("mongoose");
const DishSchema = mongoose.Schema(
  // "dish",
  {
    name: {
      type: String,
    },
    ingredients: {
      type: String,
    },
    price: {
      type: Number,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
      default: "Main Course",
    },
    updated_by: {
      type: String,
    },

    type: {
      type: String,
      enum: ["veg", "non-veg", "vegan", "all"],
    },
    images: {
      type: String,
    },
    restaurant_idx: {
      type: mongoose.Schema.Types.String,
      ref: "restaurant",
    },
  },
  {
    timestamps: false,
    collection: "dish",
  }
);
module.exports = Dish = mongoose.model("dish", DishSchema);
