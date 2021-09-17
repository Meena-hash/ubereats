const Sequelize = require("sequelize");
const db = require("../config/db");
const Restaurant_Profile = db.define(
  "restaurant_profile",
  {
    restaurantid: {
      type: Sequelize.INTEGER,
      references: "restaurants",
      referencesKey: "id",
    },
    name: {
      type: Sequelize.STRING,
      primaryKey: true,
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
  },
  {
    timestamps: false,
  }
);
module.exports = Restaurant_Profile;
