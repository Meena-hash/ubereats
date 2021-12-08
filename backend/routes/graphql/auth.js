const { ApolloServer } = require("apollo-server-express");
const gql = require("graphql-tag");
const mongoose = require("mongoose");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const gauth = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});
module.exports = gauth;
