const Sequelize = require("sequelize");
const db = require("../config/db");
const Favourites = db.define(
  "favourites",
  {
    customer_id_fav: {
      type: Sequelize.INTEGER,
      references: "user_profiles",
      referencesKey: "profileid",

      primaryKey: true,
    },
    restaurant_id_fav: {
      type: Sequelize.INTEGER,
      references: "restaurant_profiles",
      referencesKey: "restaurantid",
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);
module.exports = Favourites;
