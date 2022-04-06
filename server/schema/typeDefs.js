const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    posts: [Post]
  }

  type Post {
    postId: ID!
    petName: String
    caption: String
    image: String
  }
  type Query {
    me: [User]
    posts: [Post]
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addPost(petName:String!, caption: String!, image: Upload): Post

    removePost(postId:ID!)


  }
`;
