"use strict";

const path = require("path");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const morgan = require("morgan");
// const passport = require("passport");
const mongoose = require("mongoose");
// const Posts = require("./models/posts");
// const Comment = require("./models/comments");
// const User = require("./models/User");
const commentRoutes = require("./routes/comments");
const postsRoutes = require("./routes/posts");
// const indexRoutes = require("./routes/index");
const port = process.env.PORT || 8000;
const LocalStrategy = require("passport-local");
const cors = require("cors");

app.locals.moment = require("moment");

mongoose.connect(
    "mongodb://safespace:saferspace1@ds219672.mlab.com:19672/safespace"
);

// app.use(
//     require("express-session")({
//         secret: "Group Project",
//         resave: false,
//         saveUninitialized: false
//     })
// );

// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("short"));
app.use(cors());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.disable("x-powered-by");

app.use(bodyParser.json());

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.get("/", (req, res) => {
    res.send("Working");
});

// app.post("/register", (req, res) => {
//     var newUser = new User({
//         username: req.body.username
//     });
//     User.register(newUser, req.body.password, (err, user) => {
//         passport.authenticate("local")(req, res, () => {
//             res.send(user);
//         });
//     });
// });

// app.use(indexRoutes);
app.use("/posts", postsRoutes);
app.use("/posts/:id/comments", commentRoutes);

app.use((req, res) => {
    res.sendStatus(404);
});
app.listen(port, function() {
    console.log("Listening on port", port);
});

module.exports = app;
