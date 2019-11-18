const express = require('express');
const router = express.Router();
const Post = require('../models/Posts');

//gets back all the posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    }catch(err) {
        res.json({message: err});
    }
});

//submit a post
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    })
    try {
        const savePost = await post.save();
        res.json(savePost);
    } catch (err) {
        res.json({message: err});
    }
});

//specific post
router.get('/:postId', async (req, res) => {
    const post = await Post.findById(req.params.postId);
    res.json(post);
})

//delete a specific post
router.delete('/:postId', async (req, res) => {
    try{
        const removedPost = await Post.deleteOne({ _id: req.param.postId });
        res.json(removedPost);
    }catch(err){
        res.json({message: err})
    }
    
});

module.exports = router;