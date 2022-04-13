const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");
const commentSchema = require("./Comment");

const postSchema = new Schema(
  {
    petName: {
      type: String,
      required: "You need to name the pet!",
      minlength: 1,
      maxLength: 40,
    },
    caption: {
      type: String,
      required: "A post caption is required!",
      minlength: 1,
      maxlength: 400,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    username: {
      type: String,
      required: true,
    },
    //should we make the image required or make it so they don't have to post a pic but can still post words
    image: {
      type: String,
      required: true,
    },
    likes:[
      {
        user:{
          type: Schema.Types.ObjectId,
        },
      },
    ],
    comments: [commentSchema],
  },

  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

postSchema.virtual("commentCount").get(function () {
  return this.comments.length;
});

postSchema.virtual("likeCount").get(function () {
  return this.likes.length;
});

const Post = model("Post", postSchema);

module.exports = Post;
