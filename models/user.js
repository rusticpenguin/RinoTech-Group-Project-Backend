const mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    karma: {
        type: Number,
        Default: 0,
        required: true
    },
    notification: {
        type: Number,
        Default: 0,
        required: true
    },
    password: String
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
