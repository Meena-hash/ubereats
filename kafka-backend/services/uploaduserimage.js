const UserProfile = require("../models/UserProfile");
async function handle_request(msg, callback) {
  let profile = await UserProfile.findOne({
    profileid: msg.user_id,
  });
  let profileimage = {};
  profileimage.picture = msg.path;
  if (profile) {
    profile = await UserProfile.findOneAndUpdate(
      { profileid: msg.user_id },
      { $set: profileimage },
      { new: true }
    );

    await profile.save();
    callback(null, profile);
  } else {
    callback(null, {
      status: 400,
      errors: [{ msg: "No profile found for the user" }],
    });
  }
}

exports.handle_request = handle_request;
