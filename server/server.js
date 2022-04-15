const express = require("express");
// import ApolloServer
const { ApolloServer } = require("apollo-server-express");
const {authMiddleware} = require('./utils/auth')
// import our typeDefs and resolvers
const { typeDefs, resolvers } = require("./schema");
const { graphqlUploadExpress } = require("graphql-upload");


const path = require("path");

// get schemas for type defs and reslovers

const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();

const startServer = async () => {
  // create a new Apollo server and pass in our schema data
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
  });
  // Start the Apollo server
  await server.start();

  // according to uploader guide this middleware is required before calling applyMiddleware()
  app.use(graphqlUploadExpress());

  // integrate our Apollo server with the Express application as middleware
  server.applyMiddleware({ app });

  // log where we can go to test our GQL API
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
};
startServer();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve up static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});