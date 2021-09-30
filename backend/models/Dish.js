const Sequelize = require("sequelize");
const db = require("../config/db");
const Dish = db.define(
  "dish",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    ingredients: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    category: {
      type: Sequelize.STRING,
    },
    updated_by: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.ENUM("veg", "non-veg", "vegan", "all"),
    },
    images: {
      type: Sequelize.STRING,
    },
    restaurant_idx: {
      type: Sequelize.INTEGER,
      references: "restaurants",
      referencesKey: "id",
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);
module.exports = Dish;
