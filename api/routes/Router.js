const express = require('express');
const Sites = require('./Sites')
const Site = require('./Site')
const Users = require('./Users')
const User = require('./User')
const Auth = require('./Auth');
const Products = require('./Products')
const Product = require('./Product')
const Posts = require('./Posts')
const Post = require('./Post')
const Social = require('./Social')
const { verifyToken } = require('../middleware/verifyToken');

// Router
const Router = express.Router();

// @route /api/auth/
// @access Private 
// @desc Handle Auth
Router.use('/auth', Auth);

// PRIVATE ENDPOINTS
// if(process.env.NODE_ENV === 'PROD'){
//     Router.use((req,res,next) => {
//         verifyToken(req,res,next)
//     })
// }

// Router.use((req,res,next) => {
//     verifyToken(req,res,next)
// })

// @route /api/sites/
// @access Private 
// @desc Returns a list of all sites
Router.use('/sites', Sites);

// @route /api/site/
// @access Private 
// @desc Handles all site requests
Router.use('/site', Site);

// @route /api/user/
// @access Private 
// @desc Handles all user requests
Router.use('/user', User);

// @route /api/users/
// @access Private 
// @desc Returns a list of all users
Router.use('/users', Users);

// @route /api/products/
// @access Private 
// @desc Returns a list of all products
Router.use('/products', Products);

// @route /api/product/
// @access Private 
// @desc Handles all product requests
Router.use('/product', Product);

// @route /api/posts/
// @access Private 
// @desc Returns a list of all posts
Router.use('/posts', Posts);

// @route /api/post/
// @access Private 
// @desc Handles all post requests
Router.use('/post', Post);

// @route /api/social/
// @access Private 
// @desc Handles all post requests
Router.use('/social', Social);

// Module Exports
module.exports = Router;
