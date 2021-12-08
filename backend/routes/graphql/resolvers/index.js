const userResolvers = require("./auth");
const restaurantResolvers = require("./restaurantauth");
const dishResolvers = require("./dish");
const userProfileResolver = require("./userprofile");
const orderResolver = require("./order");
const statusResolver = require("./restaurantorder");
const resolver = {
  Query: {
    ...userResolvers.Query,
    ...restaurantResolvers.Query,
    ...userProfileResolver.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...restaurantResolvers.Mutation,
    ...dishResolvers.Mutation,
    ...userProfileResolver.Mutation,
    ...orderResolver.Mutation,
    ...statusResolver.Mutation,
  },
};
module.exports = resolver;
