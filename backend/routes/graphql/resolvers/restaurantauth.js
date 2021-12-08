const Restaurant = require("../../../models/Restaurant");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const RestaurantProfile = require("../../../models/RestaurantProfile");
const { UserInputError } = require("apollo-server-express");
const restaurantResolver = {
  Query: {
    async getRestaurant(_, id) {
      try {
        const restaurant = await Restaurant.findOne({ _id: id.id });
        return restaurant;
      } catch (error) {}
    },
  },
  Mutation: {
    async loginRestaurant(_, { loginInput: { email, password } }) {
      const restaurant = await Restaurant.findOne({ email: email });
      if (!restaurant) {
        throw new UserInputError("Invalid user");
      }
      const isMatch = await bcrypt.compare(password, restaurant.password);
      if (!isMatch) {
        throw new UserInputError("Wrong password!");
      }
      const payload = {
        restaurant: {
          id: restaurant._id,
        },
      };
      const token = await jwt.sign(payload, "ubereats");
      return { token };
    },
    async createRestaurant(
      _,
      { restaurantInput: { name, email, password, location } },
      context,
      info
    ) {
      console.log(name, email);
      let restaurant = await Restaurant.findOne({ email: email });
      if (restaurant) {
        throw new UserInputError("User already exists", {
          errors: { msg: "user already exists" },
        });
      }
      restaurant = new Restaurant({
        name,
        email,
        location,
        password,
      });
      const salt = await bcrypt.genSalt(10);
      restaurant.password = await bcrypt.hash(password, salt);
      await restaurant.save();
      let profile = new RestaurantProfile({
        restaurantid: restaurant._id,
        name,
        location,
        email,
      });
      await profile.save();
      const payload = {
        restaurant: {
          id: restaurant._id,
        },
      };
      const token = await jwt.sign(payload, "ubereats");
      return { token };
    },
  },
};
module.exports = restaurantResolver;
