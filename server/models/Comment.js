const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
    {
        commentText: {
            type: String,
            required: 'You need a comment'
        }
    }
)