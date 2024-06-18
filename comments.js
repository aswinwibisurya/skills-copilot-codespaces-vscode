// Create web server
// Import modules
const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');

// Get all comments
router.get('/', (req, res) => {
    Comment.find()
        .then(comments => {
            res.json(comments);
        })
        .catch(err => {
            res.status(500).json({message: err});
        });
});

// Get a comment by ID
router.get('/:commentId', (req, res) => {
    Comment.findById(req.params.commentId)
        .then(comment => {
            if (comment) {
                res.json(comment);
            } else {
                res.status(404).json({message: 'Comment not found'});
            }
        })
        .catch(err => {
            res.status(500).json({message: err});
        });
});

// Create a comment
router.post('/', (req, res) => {
    const comment = new Comment({
        content: req.body.content,