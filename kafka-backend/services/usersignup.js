const User = require("../models/User");
const UserProfile = require("../models/UserProfile");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

async function handle_request(logindata, callback) {
  const { name, email, password } = logindata;
  try {
    let user = await User.findOne({ email: email });
    if (user) {
      callback(null, { status: 400, errors: [{ msg: "User already exists" }] });
    }
    user = new User({
      name,
      email,
      password,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    let profileid = user.id;
    const userProfile = new UserProfile({ name, email, profileid });
    await userProfile.save();
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 3600000 },
      (err, token) => {
        if (err) throw err;
        callback(null, { token }, { status: 200 });
      }
    );
  } catch (error) {
    console.log(error);
    callback(null, {
      status: 500,
      errors: "server error",
    });
  }
}

exports.handle_request = handle_request;
