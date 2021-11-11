const mongoose = require("mongoose");
const RestaurantsSchema = mongoose.Schema(
  {
    id: {
      type: String,
      primaryKey: true,
    },
    name: {
      type: String,
      allowNull: false,
      unique: true,
    },
    location: {
      type: String,
      allowNull: false,
    },
    email: {
      type: String,
      allowNull: false,
      unique: true,
    },
    password: {
      type: String,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    collection: "restaurant",
  }
);
module.exports = Restaurants = mongoose.model("restaurant", RestaurantsSchema);
