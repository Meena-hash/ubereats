const Favourites = require("../models/Favourites");
const RestaurantProfile = require("../models/RestaurantProfile");

async function handle_request(msg, callback) {
  try {
    let favourites = await Favourites.find({
      customer_id_fav: msg.id,
    });
    for (let i in favourites) {
      let restaurant = await RestaurantProfile.findOne({
        restaurantid: favourites[i].restaurant_id_fav,
      });
      favourites[i]._doc["restaurant_profile.restaurantid"] =
        restaurant.restaurantid;
      favourites[i]._doc["restaurant_profile.name"] = restaurant.name;
      favourites[i]._doc["restaurant_profile.location"] = restaurant.location;
      favourites[i]._doc["restaurant_profile.description"] =
        restaurant.description;
      favourites[i]._doc["restaurant_profile.email"] = restaurant.email;
      favourites[i]._doc["restaurant_profile.ph_no"] = restaurant.ph_no;
      favourites[i]._doc["restaurant_profile.from_time"] = restaurant.from_time;
      favourites[i]._doc["restaurant_profile.to_time"] = restaurant.to_time;
      favourites[i]._doc["restaurant_profile.mode"] = restaurant.mode;
      favourites[i]._doc["restaurant_profile.images"] = restaurant.images;
    }

    callback(null, favourites);
  } catch (error) {
    callback(null, {
      status: 500,
      errors: "server error",
    });
    console.log(error);
  }
}
exports.handle_request = handle_request;
