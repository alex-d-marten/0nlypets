const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar Upload

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type User {
    _id: ID
    username: String!
    email: String!
    posts: [Post]
  }

  type Post {
    _id: ID
    petName: String!
    caption: String!
    image: String!
    createdAt: String!
    username: String!
    comments: [Comment]
    likeCount: Int
    likes: [Like]
  }

  type Comment {
    _id: ID
    commentText: String
    createdAt: String
    username: String
  }

  type Like {
    _id: ID
    createdAt: String
    username: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    posts(username: String): [Post]
    post(_id: ID!): Post
    comments(_id: ID!): [Comment]
    comment(_id: ID!): Comment
    likes(username: String): [Like]
    like(_id: ID!): Like
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addPost(petName: String!, caption: String!, image: String!): Post
    addComment(postId: ID!, commentText: String!): Post
    removeComment(postId: ID!, commentText: String!): Post
    addLike(likeId: ID!): Like
    removePost(postId: ID!): User
    updatePost(
      postId: ID!
      petName: String
      caption: String!
      image: String
    ): Post
    singleUpload(file: Upload!): File!
  }
`;

module.exports = typeDefs;
