const User = require("../models/User");

async function handle_request(msg, callback) {
  try {
    const user = await User.findOne({
      _id: msg,
    }).select(["_id", "name", "email", "picture"]);
    callback(null, user);
  } catch (error) {
    console.log(error);
    callback(null, {
      status: 500,
      errors: "server error",
    });
  }
}

exports.handle_request = handle_request;
