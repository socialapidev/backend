const express = require('express');
const Post = require('../controller/routing/Post')

// Router
const Router = express.Router();

// @route GET /api/post/:id
// @access Private 
// @desc Returns a post
Router.get('/:id', Post.getPost)

// @route POST /api/post
// @access Private 
// @desc Create a post
Router.post('/', Post.createPost)

// @route PUT /api/post/:id
// @access Private 
// @desc Update a post
Router.put('/:id', Post.updatePost)

// @route DELETE /api/post/:id
// @access Private 
// @desc Delete a post
Router.delete('/:id', Post.deletePost)

// Module Exports
module.exports = Router;