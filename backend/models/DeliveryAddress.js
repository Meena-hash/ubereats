const Sequelize = require("sequelize");
const db = require("../config/db");
const DeliveryAddress = db.define(
  "user_delivery_adr",
  {
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
    customer_idx: {
      type: Sequelize.INTEGER,
      references: "user_profiles",
      referencesKey: "profileid",
      primaryKey: true,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);
module.exports = DeliveryAddress;
