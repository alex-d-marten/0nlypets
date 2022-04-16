const { AuthenticationError } = require("apollo-server-express");
const { User, Post } = require("../models");
const { signToken } = require("../utils/auth");
const { GraphQLUpload } = require("graphql-upload");
const { finished } = require("stream/promises");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
let fileName;
let imageUrl;

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne(
          { _id: context.user._id },
          { username: context.user.username }
        )
          .select("__v")
          .populate("posts");

        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },

    users: async () => {
      return User.find().select("-__v -password").populate("posts");
    },

    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("posts");
    },

    posts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Post.find(params).sort({ createdAt: -1 });
    },

    post: async (parent, { _id, username }) => {
      return Post.findOne({ _id, username });
    },
  },

  Upload: GraphQLUpload,

  Mutation: {
    singleUpload: async (parent, { file }) => {
      const { createReadStream, filename, mimetype, encoding } = await file;
      // invoke the `createReadStream` as this will return a Readable stream.
      const stream = createReadStream();

      // not sure if we need this, guide says it is for demo purposes but will have to play with this to decide if we need it
      const out = fs.createWriteStream(`./${filename}`);
      stream.pipe(out);
      await finished(out);
      imageName = filename;
      fileName = filename;


      return { filename, mimetype, encoding };
    },

    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },

    addPost: async (parent, args, context) => {
      if (context.user) {
        await cloudinary.uploader
        .upload(`./${fileName}`, {
          resource_type: "image",
        })
        .then(async (results) => {
          console.log("Success!", JSON.stringify(results, null, 2));
          
          imageUrl = results.secure_url;
          args.image = imageUrl;
        })
        .catch((error) => {
          console.error(error)
          console.log("Error!", JSON.stringify(error, null, 2));
        });

        const post = await Post.create({
          ...args,
          username: context.user.username,
        });
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { posts: post._id } },
          { new: true }
        );
        return post;
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    updatePost: async (parent, args, context) => {
      if (context.user) {
        return await Post.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }
      throw new AuthenticationError("Not logged in");
    },

    removePost: async (parent, { postId }, context) => {
      if (context.user) {
        return Post.findOneAndDelete({ _id: postId });
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    updatePost: async (parent, { postId, petName, caption }, context) => {
      if (context.user) {
        return Post.findOneAndUpdate(
          { _id: postId },
          { petName: petName, caption: caption },
          { new: true }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    removeComment: async (parent, { postId, commentId }) => {
      return Post.findOneAndUpdate(
        { _id: postId },
        { $pull: { comments: { _id: commentId } } },
        { new: true }
      );
    },

    addComment: async (parent, { postId, commentText }, context) => {
      if (context.user) {
        const updatedPost = await Post.findOneAndUpdate(
          { _id: postId },
          {
            $push: {
              comments: { commentText, username: context.user.username },
            },
          },
          { new: true }
        );

        return updatedPost;
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    removeComment: async (parent, { postId, commentId }, context) => {
      if (context.user) {
        const updatedPost = await Post.findOneAndUpdate(
          { _id: postId },
          { $pull: { comments: { _id: commentId } } },
          { new: true }
        );
        return updatedPost;
      }
      throw new AuthenticationError("You need to be logged in");
    },
  },
};

module.exports = resolvers;
