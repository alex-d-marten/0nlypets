const { Schema } = require("mongoose");
const dateFormat = require('../utils/dateFormat');

const commentSchema = new Schema(
    {
        commentText: {
            type: String,
            required: 'You need a comment',
            minlength: 1,
            maxLength: 400
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timeStamp => dateFormat(timeStamp)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

module.exports = commentSchema;