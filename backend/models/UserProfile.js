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
      default:
        "https://res.cloudinary.com/meena273/image/upload/v1633912634/images/xjm9ulwljbsnudpswa6q.jpg",
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
      type: String,
      min: "1920-01-01",
      max: "2020-12-31",
    },
  },
  {
    timestamps: false,
    collection: "user_profile",
  }
);
module.exports = User_Profile = mongoose.model("user_profile", ProfileSchema);
