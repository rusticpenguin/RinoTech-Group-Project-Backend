const express = require("express");
const router = express.Router();
const Post = require("../models/posts.js");

router.get("/", (req, res) => {
    Post.find({}, (err, allPosts) => {
        if (err) {
            console.log(err);
        } else {
            res.send(allPosts);
        }
    });
});

router.post("/", (req, res) => {
    let title = req.body.title;
    let topic = req.body.topic;
    let story = req.body.story;
    // let author = {
    //     id: req.user._id,
    //     username: req.user.username
    // };
    let newPost = {
        title: title,
        topic: topic,
        story: story
        // author: author
    };
    Post.create(newPost, (err, newlyCreated) => {
        if (err) {
            console.log(err);
        } else {
            res.send(newlyCreated);
        }
    });
});
router.put("/:id", (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body, (err, updatedPost) => {
        err ? console.log(err) : console.log(updatedPost);
    });
});
router.delete("/:id", (req, res) => {
    Post.findByIdAndRemove(req.params.id, (err, updatedPost) => {
        err ? console.log(err) : console.log(updatedPost);
    });
});

module.exports = router;
