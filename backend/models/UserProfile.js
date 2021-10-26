const mongoose = require("mongoose");
const User = require("./User");
const ProfileSchema = mongoose.Schema(
  {
    profileid: {
      type: mongoose.Schema.Types.String,
      ref: "user",
    },

    name: {
      type: String,
    },
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
    nickname: {
      type: String,
    },
    picture: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    ph_no: {
      type: String,
    },
    about: {
      type: String,
    },
    dob: {
      type: Date,
    },
  },
  {
    timestamps: false,
    collection: "user_profile",
  }
);
module.exports = User_Profile = mongoose.model("user_profile", ProfileSchema);
