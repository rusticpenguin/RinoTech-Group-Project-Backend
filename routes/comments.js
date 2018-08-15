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

router.put("/:id", (req, res) => {
    req.body.comment.body = req.sanitize(req.body.comment.body);
    Comment.findByIdAndUpdate(
        req.params.id,
        req.body.comment,
        (err, updatedcomment) => {
            err ? console.log(err) : console.log(updatedcomment);
        }
    );
});
router.delete("/:id", (req, res) => {
    Comment.findByIdAndRemove(req.params.id, (err, updatedcomment) => {
        err ? console.log(err) : console.log(updatedcomment);
    });
});

module.exports = router;
