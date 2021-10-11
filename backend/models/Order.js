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
      type: Sequelize.FLOAT,
    },
    order_type: {
      type: Sequelize.ENUM("new", "delivered", "cancelled"),
    },
    type: {
      type: Sequelize.ENUM("deliver", "pickup"),
    },
    delivery_status: {
      type: Sequelize.ENUM(
        "order received",
        "preparing",
        "on the way",
        "delivered",
        "cancelled"
      ),
    },
    pickup_status: {
      type: Sequelize.ENUM(
        "order received",
        "preparing",
        "pick up ready",
        "pickedup",
        "cancelled"
      ),
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
