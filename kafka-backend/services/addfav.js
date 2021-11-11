const Favourites = require("../models/Favourites");
const RestaurantProfile = require("../models/RestaurantProfile");

async function handle_request(msg, callback) {
  try {
    let favFields = {};
    favFields.customer_id_fav = msg.id;
    favFields.restaurant_id_fav = msg.restaurant_id;
    let favourites = await Favourites.findOne({
      customer_id_fav: msg.id,
      restaurant_id_fav: msg.restaurant_id,
    });

    if (!favourites) {
      favourites = new Favourites(favFields);
      await favourites.save();
    }
    favourites = await Favourites.find({
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
      favourites[i]._doc["restaurant_profile.images"] = restaurant.images;
      favourites[i]._doc["restaurant_profile.email"] = restaurant.email;
      favourites[i]._doc["restaurant_profile.ph_no"] = restaurant.ph_no;
      favourites[i]._doc["restaurant_profile.from_time"] = restaurant.from_time;
      favourites[i]._doc["restaurant_profile.to_time"] = restaurant.to_time;
      favourites[i]._doc["restaurant_profile.mode"] = restaurant.mode;
    }
    callback(null, favourites);
  } catch (error) {
    console.log(error);
    callback(null, {
      status: 500,
      errors: "server error",
    });
  }
}
exports.handle_request = handle_request;
