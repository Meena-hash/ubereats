const express = require("express");
const { check, validationResult } = require("express-validator");
const { auth, checkAuth } = require("../../middleware/user_auth");
const User = require("../../models/User");
const UserProfile = require("../../models/UserProfile");
const router = express.Router();
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
checkAuth();

const test = graphqlHTTP({
  schema: buildSchema(`
    type User {
        name: String!
        email: String!
        password: String
    }

    type Response
    {
      token: String!
    }

    type RootQuery {
        user: User
    }

    type RootMutation {
        createUser(userInput: UserInput): Response
    }

    input UserInput {
      email: String!
      password: String!
      name: String!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
    `),

  rootValue: {
    user: () => {
      return User.findOne().then((result) => {
        return result._doc;
      });
    },
    createUser: async (args) => {
      let user = await User.findOne({ email: args.userInput.email });
      if (user) {
        throw new Error("Invalid Credentials");
      }
      user = new User({
        name: args.userInput.name,
        email: args.userInput.email,
        password: args.userInput.password,
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(args.userInput.password, salt);
      await user.save();
      let profile = new UserProfile({
        name: args.userInput.name,
        email: args.userInput.email,
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
  graphiql: true,
});

// router.get("/", auth, async (req, res) => {
//   try {
//     const user = await User.findOne({
//       _id: msg,
//     }).select(["_id", "name", "email", "picture"]);
//     callback(null, user);
//   } catch (error) {
//     console.log(error);
//     callback(null, {
//       status: 500,
//       errors: "server error",
//     });
//   }
// });

// router.post(
//   "/",
//   [
//     check("email", "Please include a valid email").isEmail(),
//     check("password", "Password is required").exists(),
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     kafka.make_request("validate-login", req.body, function (err, results) {
//       if (err) {
//         res.json({
//           status: "error",
//           msg: "System Error, Try Again.",
//         });
//       } else {
//         res_status = results.status;
//         if (res_status) {
//           res.status(res_status).json(results.errors);
//         } else {
//           res.status(200).json(results);
//         }

//         res.end();
//       }
//     });
//   }
// );

module.exports = test;
