const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const connectDb = require("../config/db-mongo");

async function handle_request(logindata, callback) {
  const { email, password } = logindata;
  try {
    let user = await User.findOne({ email: email });
    if (!user) {
      callback(null, { status: 400, errors: [{ msg: "Invalid Credentials" }] });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      callback(null, { status: 400, errors: [{ msg: "Invalid Credentials" }] });
    }
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 3600000 },
      (err, token) => {
        if (err) throw err;
        callback(null, { token }, { status: 200 });
      }
    );
  } catch (error) {
    console.log(error);
    callback(null, {
      status: 500,
      errors: "server error",
    });
  }
}

exports.handle_request = handle_request;
