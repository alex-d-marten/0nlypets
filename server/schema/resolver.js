const { AuthenticationError } = require("apollo-server-express");
const { User, Post, Comment } = require("../models");
const { signToken } = require('../utils/auth');

/*
const resolvers = {
    Query: {
        me
        users
        user
        posts
        post
        comments
        comment
        likes
        like
    }
},

Mutation: {
    addUser
    login
    addPost
    addComment
    addLike
};

module.exports = resolvers;

*/