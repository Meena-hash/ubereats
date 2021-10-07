const Sequelize = require("sequelize");
const db = require("../config/db");
const Orders = db.define(
  "orders",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    tip: {
      type: Sequelize.INTEGER,
    },
    userprofileid: {
      type: Sequelize.INTEGER,
      references: "user_profiles",
      referencesKey: "profileid",
    },
    restaurant_id_order: {
      type: Sequelize.INTEGER,
      references: "restaurant_profiles",
      referencesKey: "restaurantid",
    },
    date: {
      type: Sequelize.DATE,
    },
    total: {
      type: Sequelize.INTEGER,
    },
    order_type: {
      type: Sequelize.ENUM("new", "delivered", "cancelled"),
    },
    type: {
      type: Sequelize.ENUM("deliver", "pickup"),
    },
    delivery_status: {
      type: Sequelize.ENUM("received", "preparing", "otw", "delivered"),
    },
    pickup_status: {
      type: Sequelize.ENUM("received", "preparing", "ready", "pickedup"),
    },
    delivery_address: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Orders;
