const User = require("../models/User");
const UserProfile = require("../models/UserProfile");
async function handle_request(msg, callback) {
  const {
    name,
    street,
    city,
    state,
    country,
    nickname,
    about,
    dob,
    email,
    ph_no,
  } = msg;
  try {
    let user = await User.findOne({ _id: msg.id });
    let profile = await UserProfile.findOne({ profileid: user.id });
    let profileFields = {};
    profileFields.profileid = user.id;
    profileFields.name = name;
    profileFields.street = street;
    profileFields.city = city;
    profileFields.state = state;
    profileFields.country = country;
    profileFields.nickname = nickname;
    profileFields.about = about;
    profileFields.dob = dob;
    profileFields.email = email;
    profileFields.ph_no = ph_no;

    if (profile) {
      profile = await UserProfile.findOneAndUpdate(
        { profileid: user.id },
        { $set: profileFields },
        { new: true }
      );
      callback(null, profile);
    } else {
      profile = new UserProfile(profileFields);
      await profile.save();
      callback(null, profile);
    }
  } catch (err) {
    console.log(err);
    callback(null, {
      status: 500,
      errors: "server error",
    });
  }
}

exports.handle_request = handle_request;
