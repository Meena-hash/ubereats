const config = require("config");
const Sequelize = require("sequelize");
module.exports = new Sequelize(
  config.get("database"),
  config.get("user"),
  config.get("password"),
  {
    host: config.get("mysqlHost"),
    dialect: "mysql",
    // logging: false,
  }
);
