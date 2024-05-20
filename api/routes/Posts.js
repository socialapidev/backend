const express = require('express');
const Posts = require('../controller/routing/Posts')

// Router
const Router = express.Router();

// @route GET /api/posts/
// @access Private 
// @desc Returns a list of all posts
Router.get('/', Posts.getPosts)

// @route GET /api/posts/generate
// @access Private 
// @desc Generate posts for a website
Router.post('/create', Posts.generatePosts)

// Module Exports
module.exports = Router;