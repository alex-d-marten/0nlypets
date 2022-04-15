const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const { authMiddleware } = require("../utils/auth");

module.exports = { typeDefs, resolvers, context: authMiddleware };
