const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: String,
    topic: String,
    story: String,
    date: { type: Date, default: Date.now },
    reply_count: { type: Number, default: 0, required: true },
    author: {
        id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    show: { type: Boolean, default: true, required: true },
    karma: { type: Number, default: 0, required: true }
});

module.exports = mongoose.model("post", postSchema);
