"use strict";
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const config = require("config");

function checkRestaurantAuth() {
  var opts = {
    jwtFromRequest: ExtractJwt.fromHeader("x-auth-token"),
    secretOrKey: "ubereats",
  };
  opts.passReqToCallback = true;
  passport.use(
    "restaurant",
    new JwtStrategy(opts, (req, jwt_payload, done) => {
      req.restaurant = jwt_payload.restaurant;
      done(null, req.restaurant);
    })
  );
}

exports.checkRestaurantAuth = checkRestaurantAuth;
exports.restaurantauth = passport.authenticate("restaurant", {
  session: false,
});
