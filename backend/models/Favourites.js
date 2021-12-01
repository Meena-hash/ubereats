const mongoose = require("mongoose");
const FavSchema = mongoose.Schema(
  {
    customer_id_fav: {
      type: mongoose.Schema.Types.String,
      ref: "user_profile",
      primaryKey: true,
    },
    restaurant_id_fav: {
      type: mongoose.Schema.Types.ObjectId,
      // ref: "restaurant_profile",

      // foreignField: "restaurantid",
    },
  },
  {
    timestamps: false,
    toObject: { virtuals: true },
    collection: "favourites",
  }
);
FavSchema.virtual("restaurant_id", {
  ref: "restaurant_profile",
  localField: "restaurant_id_fav",
  foreignField: "restaurantid",
});
module.exports = Favourites = mongoose.model("favourites", FavSchema);
