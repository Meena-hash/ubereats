const Sequelize = require("sequelize");
const db = require("../config/db");
const OrderDish = db.define(
  "order_dish",
  {
    orderId: {
      type: Sequelize.INTEGER,
      references: "orders",
      referencesKey: "id",
    },
    dish_id: {
      type: Sequelize.INTEGER,
      references: "dish",
      referencesKey: "id",
      primaryKey: true,
    },
    count: {
      type: Sequelize.INTEGER,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = OrderDish;
