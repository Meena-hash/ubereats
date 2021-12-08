const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      allowNull: false,
      unique: true,
    },
    email: {
      type: String,
      allowNull: false,
      unique: true,
    },
    password: {
      type: String,
      allowNull: false,
    },
    picture: {
      type: String,
    },
  },
  {
    timestamps: false,
    collection: "user",
  }
);
module.exports = User = mongoose.model("user", UserSchema);
