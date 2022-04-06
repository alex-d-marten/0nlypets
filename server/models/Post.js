const { Schema, model } = require("mongoose");


const postSchema = new Schema(
  {
    petName: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      required: true,
    },
    //should we make the image required or make it so they don't have to post a pic but can still post words
    //
    image: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);
// userSchema.virtual("likeCount").get(function () {
//   return this.friends.length;
// });
const Post = model("Post", postSchema);
module.exports = Post;
