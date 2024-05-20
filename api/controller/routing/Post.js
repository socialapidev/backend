const express = require('express');
const mongoose = require('mongoose');
const Post = require('../../model/PostModel');
const Product = require('../../model/ProductModel')
const Site = require('../../model/SiteModel')
const Router = express.Router();

//#################################   PRIVATE   ########################################

// @route GET /post/:ID
// @access Private 
// @desc Return a single post 
async function getPost(req, res, next) {
    
    // Site ID
    const { id } = req?.params;

    // Validate ID
    if(!mongoose.isValidObjectId(id)){
        res.status(400).send({
            ok: true,
            message: 'Invalid ID provided.'
        })
        return
    }

    try {

        // query DB for post
        const post = await Post
        .findById(id)
        .populate({
            path: 'Site'
        })
        .populate({
            path: 'Product'
        })

        // Not Found
        if(!post){
            res.status(404).send({
                ok: true,
                message: 'Post not found.'
            })
            return
        }

        // Return Response
        res.status(200).send({
            ok: true,
            data: post
        });

    } catch(err) { 
        next(err)
     }
}

// @route POST /post/
// @access Private 
// @desc Create a post
async function createPost(req, res, next) {

    // Request Body
    const { body } = req;
    const websiteId = req?.body?.website;

    // Validate Website ID
    if(!mongoose.isValidObjectId(websiteId)){
        return res.status(400).send({
            message: 'Website ID is not a valid Mongoose Object ID',
            ok: false
        })
    }

    // Create Post
    try {

        // Find if website exists
        let site = await Site.findById(websiteId)

        // If no site is found, return 404
        if(!site){
            return req.status(404).send({
                message: 'Website not found.',
                ok: false
            })
        }

        // Create Post
        const post = await new Post(body)

        // Save Data
        const data = await post.save()

        // If product post
        if(body.product){

            // Find if product exists
            let product = await Product.findById(body.product)

            // If no product, return 404
            if(!product){
                return req.status(404).send({
                    message: 'Product not found.',
                    ok: false
                })
            }

            // Add to product posts array
            product = await Product.findOneAndUpdate({ _id: product._id }, {"$push": {posts: post._id}}, { new: true })
            
        }

        // Add to website posts array
        site = await Site.findOneAndUpdate({ _id: websiteId }, {"$push": {posts: post._id}}, { new: true })

        // Return Response
        res.status(200).send({
            ok: true,
            data: data
        });

    } catch(err) {
        next(err)
    }
}

// @route PUT /post/:ID
// @access Private 
// @desc Update a post
async function updatePost(req, res, next) {

    res.status(200).send('UPDATE POST OK')
   
}

// @route DELETE /post/:ID
// @access Private 
// @desc Delete a post
async function deletePost(req, res, next) {

    // Post ID
    const { id } = req?.params;

    // Validate ID
    if(!mongoose.isValidObjectId(id)){
        res.status(400).send({
            ok: true,
            message: 'Invalid ID provided.'
        })
        return
    }

    try {
        
        // Find Post
        let post = await Post
        .findById(id)

        // Not Found
        if(!post){
            res.status(404).send({
                ok: true,
                message: 'Post not found.'
            })
            return
        }

        if(post.product){
            // Delete post from related product posts array

            // TODO

            // const products = await Product.deleteMany({ _id:{$in: site.products }})
        }

        // Delete Post
        post = await Post.findByIdAndDelete(id) 

        // Return Response
        res.status(200).send({
            ok: true,
            data: []
        });
        
    } catch(err) {
        next(err)
    }
   
}

// Module Export
module.exports = {
    getPost,
    createPost,
    updatePost,
    deletePost
}