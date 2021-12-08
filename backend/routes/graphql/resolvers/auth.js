const User = require("../../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserProfile = require("../../../models/UserProfile");
const { UserInputError } = require("apollo-server-express");
const checkAuth = require("../check-auth");
const userResolver = {
  Query: {
    async getUser(_, userid) {
      try {
        const user = await User.findOne({ _id: userid.userid });
        return user;
      } catch (error) {}
    },
  },
  Mutation: {
    async login(_, { loginInput: { email, password } }) {
      const user = await User.findOne({ email: email });
      if (!user) {
        throw new UserInputError("Invalid user");
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new UserInputError("Wrong password!");
      }
      const payload = {
        user: {
          id: user._id,
        },
      };
      const token = await jwt.sign(payload, "ubereats");
      return { token };
    },
    async createUser(
      _,
      { userInput: { name, email, password, picture } },
      context,
      info
    ) {
      let user = await User.findOne({ email: email });
      if (user) {
        throw new UserInputError("User already exists", {
          errors: { msg: "user already exists" },
        });
      }
      user = new User({
        name,
        email,
        password,
        picture,
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      let profile = new UserProfile({
        name,
        email,
        profileid: user.id,
      });
      await profile.save();
      const payload = {
        user: {
          id: user._id,
        },
      };
      const token = await jwt.sign(payload, "ubereats");
      return { token };
    },
  },
};
module.exports = userResolver;
