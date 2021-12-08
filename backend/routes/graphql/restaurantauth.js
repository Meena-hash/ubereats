const { ApolloServer } = require("apollo-server-express");
const gql = require("graphql-tag");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const restaurantauth = new ApolloServer({
  typeDefs,
  resolvers,
});
module.exports = restaurantauth;
