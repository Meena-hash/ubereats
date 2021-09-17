const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "No token. Auth failed" });
  }
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.restaurant = decoded.restaurant;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: "Token is not valid" });
  }
};
