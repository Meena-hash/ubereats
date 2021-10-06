const Sequelize = require("sequelize");
const db = require("../config/db");
const OrderDish = db.define(
  "order_dish",
  {
    order_id: {
      type: Sequelize.INTEGER,
      references: "orders",
      referencesKey: "id",
      primaryKey: true,
    },
    dish_id: {
      type: Sequelize.INTEGER,
      references: "dish",
      referencesKey: "id",
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
