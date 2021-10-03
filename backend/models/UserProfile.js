const Sequelize = require("sequelize");
const db = require("../config/db");
const User = require("./User");
const User_Profile = db.define(
  "user_profile",
  {
    profileid: {
      type: Sequelize.INTEGER,
      references: "users", // <<< Note, its table's name, not object name
      referencesKey: "id", // <<< Note, its a column name
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    street: {
      type: Sequelize.STRING,
    },
    city: {
      type: Sequelize.STRING,
    },
    state: {
      type: Sequelize.STRING,
    },
    country: {
      type: Sequelize.STRING,
    },
    nickname: {
      type: Sequelize.STRING,
    },
    picture: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
    },
    ph_no: {
      type: Sequelize.STRING,
    },
    about: {
      type: Sequelize.STRING,
    },
    dob: {
      type: Sequelize.DATE,
    },
  },
  {
    timestamps: false,
  }
);
module.exports = User_Profile;
