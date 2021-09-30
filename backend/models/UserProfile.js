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
      allowNull: false,
    },
    street: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    city: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    state: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    country: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    nickname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    picture: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    ph_no: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    about: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    dob: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
module.exports = User_Profile;
