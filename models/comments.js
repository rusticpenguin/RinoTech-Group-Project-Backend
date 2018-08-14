const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    comment: String,
    date: { type: Date, default: Date.now },
    author: {
        id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        username: String
    },
    show: { type: Boolean, default: true, required: true },
    karma: { type: Number, default: 0, required: true }
});

module.exports = mongoose.model("comment", commentSchema);
