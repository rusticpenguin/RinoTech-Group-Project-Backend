const express = require("express");
const router = express.Router({ mergeParams: true });
const Comment = require("../models/comments.js");
const Posts = require("../models/posts");

router.get("/", (req, res) => {
    Post.find({}, (err, allcomments) => {
        if (err) {
            console.log(err);
        } else {
            res.render("comments", {
                post: allcomments
            });
        }
    });
});

router.post("/", (req, res) => {
    Posts.findById(req.params.id, (err, post) => {
        console.log(req.body.comment);

        if (err) {
            console.log(err);
            res.redirect("/posts");
        } else {
            Comment.create(req.body, (err, comment) => {
                if (err) {
                    console.log(err);
                } else {
                    // comment.author.id = req.user._id;
                    // comment.author.username = req.user.username;
                    comment.save();
                    post.comments.push(comment);
                    post.save();
                    res.send(comment);
                }
            });
        }
    });
});

module.exports = router;
