const express = require("express");
const dotenv = require("dotenv").config();

const { ApolloServer } = require("apollo-server-express");

const path = require("path");

// get schemas for type defs and reslovers
const { typeDefs, resolvers } = require("./schema");

const db = require("./config/connection");
const { authMiddleware } = require("./utils/auth");

const app = express();
const PORT = process.env.PORT || 3001;

const startServer = async () => {
  //create server from apollo server class
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
  });
  
  await server.start();

  //apply middleware to the app
  server.applyMiddleware({ app });

  console.log(`Use GraphQL at http://localhost${PORT}${server.graphqlPath}`);
}

startServer();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

db.once("open", () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
