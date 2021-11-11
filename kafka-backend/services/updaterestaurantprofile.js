const Restaurant = require("../models/Restaurant");
const RestaurantProfile = require("../models/RestaurantProfile");
async function handle_request(msg, callback) {
  let restaurant = await Restaurant.findOne({
    _id: msg.id,
  });
  if (!restaurant) {
    callback(null, {
      status: 400,
      errors: [
        { msg: "Error fetching restaurant details. Contact administrator." },
      ],
    });
  }
  const {
    name,
    location,
    description,
    email,
    ph_no,
    from_time,
    to_time,
    mode,
    id,
  } = msg;

  let profileFields = {};
  profileFields.restaurantid = restaurant._id;
  profileFields.name = name;
  profileFields.location = location;
  profileFields.description = description;
  profileFields.email = email;
  profileFields.ph_no = ph_no;
  profileFields.from_time = from_time;
  profileFields.to_time = to_time;
  profileFields.mode = mode;
  let contactFields = {};
  contactFields.email = email;
  contactFields.location = location;
  contactFields.name = name;

  try {
    let profile = await RestaurantProfile.findOne({
      restaurantid: restaurant._id,
    });
    let user = await Restaurant.findOne({
      id: restaurant._id,
    });

    if (profile) {
      profile = await RestaurantProfile.findOneAndUpdate(
        { restaurantid: restaurant._id },
        { $set: profileFields },
        { new: true }
      );
      user = await Restaurant.findOneAndUpdate(
        { _id: restaurant._id },
        { $set: contactFields }
      );

      callback(null, profile);
    }
    profile = new RestaurantProfile(profileFields);
    await profile.save();
    callback(null, profile);
  } catch (err) {
    console.log(err);
    callback(null, {
      status: 500,
      errors: "server error",
    });
  }
}

exports.handle_request = handle_request;
