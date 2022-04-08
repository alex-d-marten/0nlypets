const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    posts: [Post]

  }

  type Post {
    _id: ID
    petName: String
    caption: String
    image: String
    createdAt: String
    username: String
    comments: [Comment]
    likeCount: Int
    likes: [Like]
  }

  type Comment {
      _id: ID
      commentBody: String
      createdAt: String    
      username: String  
  }

  type Like {
      _id: ID
      createdAt: String    
      username: String  
  }

  type Auth{
    token: ID!
    user: User
}


  type Query {
    me: User
    users: [User]
    user(username: String!): User
    posts(username: String): [Post]
    post(_id: ID!): Post
    comments(username: String): [Comment]
    comment(_id: ID!): Comment
    likes(username: String): [Like]
    like(_id: ID!): Like
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addPost(petName:String!, caption: String!, image: String): Post
    addComment(commentId: ID!, commentText: String!): Comment
    removeComment(commentId: ID!, commentText: String!): Post
    addLike(likeId: ID!): Like
    removePost(postId:ID!) : User
    updatePost(petName:String!, caption: String!, image: String): Post
  }
`;

module.exports = typeDefs;
