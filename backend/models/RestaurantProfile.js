const Sequelize = require("sequelize");
const db = require("../config/db");
const Restaurant_Profile = db.define(
  "restaurant_profile",
  {
    restaurantid: {
      type: Sequelize.INTEGER,
      references: "restaurants",
      referencesKey: "id",
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      // primaryKey: true,
      unique: true,
    },
    location: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    images: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    ph_no: {
      type: Sequelize.STRING,
    },
    from_time: {
      type: Sequelize.TIME,
    },
    to_time: {
      type: Sequelize.TIME,
    },
    mode: {
      type: Sequelize.ENUM("delivery", "pickup", "both"),
    },
  },
  {
    timestamps: false,
  }
);
module.exports = Restaurant_Profile;
