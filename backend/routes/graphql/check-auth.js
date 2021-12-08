const { AuthenticationError } = require("apollo-server-express");

const jwt = require("jsonwebtoken");

module.exports = (context) => {
  // context = { ... headers }
  console.log(context);
  const token = context.req.headers["x-auth-token"];
  console.log(token);
  if (token) {
    try {
      const decoded = jwt.verify(token, "ubereats");
      return decoded.restaurant;
    } catch (err) {
      throw new AuthenticationError("Invalid/Expired token");
    }
  }
};
