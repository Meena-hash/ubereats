const User = require("../models/User");
const UserProfile = require("../models/UserProfile");
async function handle_request(msg, callback) {
  try {
    const profile = await UserProfile.findOne({
      profileid: msg,
    });
    if (!profile) {
      callback(null, {
        status: 400,
        errors: [{ msg: "there is no profile for this user" }],
      });
    }
    callback(null, profile);
  } catch (error) {
    console.log(error);
    callback(null, {
      status: 500,
      errors: "server error",
    });
  }
}

exports.handle_request = handle_request;
