const mongoose = require("mongoose");
const RestaurantProfileSchema = mongoose.Schema(
  {
    restaurantid: {
      type: mongoose.Schema.Types.String,
      ref: "restaurant",
    },
    name: {
      type: String,
      unique: true,
    },
    location: {
      type: String,
    },
    description: {
      type: String,
    },
    images: {
      type: String,
      default:
        "https://res.cloudinary.com/meena273/image/upload/v1636663024/images/RestTeam_evgprv.jpg",
    },
    email: {
      type: String,
    },
    ph_no: {
      type: String,
    },
    from_time: {
      type: String,
    },
    to_time: {
      type: String,
    },
    mode: {
      type: String,
      enum: ["delivery", "pickup", "both"],
    },
  },
  {
    timestamps: false,
    collection: "restaurant_profile",
  }
);
module.exports = Restaurant_Profile = mongoose.model(
  "restaurant_profile",
  RestaurantProfileSchema
);
