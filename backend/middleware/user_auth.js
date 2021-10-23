"use strict";
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const config = require("config");

function checkAuth() {
  var opts = {
    jwtFromRequest: ExtractJwt.fromHeader("x-auth-token"),
    secretOrKey: "ubereats",
  };
  opts.passReqToCallback = true;
  passport.use(
    new JwtStrategy(opts, (req, jwt_payload, callback) => {
      req.user = jwt_payload;
      callback(null, jwt_payload.user);
    })
  );
}

exports.checkAuth = checkAuth;
exports.auth = passport.authenticate("jwt", { session: false });
