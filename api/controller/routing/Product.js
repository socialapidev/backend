const express = require('express');
const mongoose = require('mongoose');
const Product = require('../../model/ProductModel')
const Post = require('../../model/PostModel')
const Site = require('../../model/SiteModel');
const { generateImage } = require('../../lib/imageGeneration/imageGeneration');
const Router = express.Router();
const { performAiRequest } = require('../../lib/OpenAI/methods');
const { postToInsta } = require('../instagram/post');
const { IgApiClient } = require("instagram-private-api")
const { get } = require("request-promise")
//#################################   PRIVATE   ########################################

// @route GET /product/:ID
// @access Private 
// @desc Return a single product 
async function getProduct(req, res, next) {
    
    // Product ID
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

        // query DB for product
        const product = await Product
        .findById(id)

        // Not Found
        if(!product){
            res.status(404).send({
                ok: true,
                message: 'Product not found.'
            })
            return
        }

        // Return Response
        res.status(200).send({
            ok: true,
            data: product
        });

    } catch(err) { 
        next(err)
     }
}

// @route POST /product/
// @access Private 
// @desc Create a product manually
async function createProduct(req, res, next) {

    // Request Body
    const { body } = req;
    const websiteId = req?.body?.website;

    // Validate Website ID
    if(!Mongoose.isValidObjectId(websiteId)){
        return res.status(400).send({
            message: 'Website ID is not a valid Mongoose Object ID',
            ok: false
        })
    }

    // Create product
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

        // Create product
        const product = await new Product(body)

        // Save Data
        const data = await product.save()

        // Add to website products array
        site = await Site.findOneAndUpdate({ _id: websiteId }, {"$push": {products: product._id}}, { new: true })

        // Return Response
        res.status(200).send({
            ok: true,
            data: data
        });

    } catch(err) {
        next(err)
    }
}

// @route PUT /product/:ID
// @access Private 
// @desc Update a product
async function updateProduct(req, res, next) {

    // await postToInsta()
    // const posts = await performAiRequest('You are a social media expert. Write 10 instagram captions for a solar panels brand. The response should be an array of JSON objects. Each object should have a title which is used in a graphic image (title: String), and also a caption for the image (imageCaption), as well as a caption for the post. The object key must be in Englis as title, imageCaption, caption. The values must be in Spanish directed for customers in Mexico')
    // console.log(posts.length)
    // const images = posts.map(async (post) => {
    //     console.log('Generating Image')
    //     await generateImage(post)
    // }) 


    // Login
    const ig = new IgApiClient()
    ig.state.generateDevice("byminimalcandles")
    await ig.account.login("byminimalcandles", "Cremlino27")

    // Load Image Into Buffer
    const imageBuffer = await get({
        url: "https://www.hindustantimes.com/ht-img/img/2023/08/25/550x309/international_dog_day_1692974397743_1692974414085.jpg",
        encoding: null,
    })

    await ig.publish.photo({
        file: imageBuffer,
        caption: 'Testing server generate image'
    })


    res.status(200).send('UPDATE PRODUCT OK')
   
}

// @route DELETE /product/:ID
// @access Private 
// @desc Delete a product
async function deleteProduct(req, res, next) {

    // Product ID
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
        
        // Find Product
        let product = await Product
        .findById(id)

        // Not Found
        if(!product){
            res.status(404).send({
                ok: true,
                message: 'Product not found.'
            })
            return
        }

        if(product.posts.length > 0){
            // Delete All Posts related to site
            const posts = await Post.deleteMany({ _id:{$in: product.posts }})
        }

         // Remove from Website List
         const websiteId = product.website;

         // Update Website
         const site = await Site.findOneAndUpdate({ _id: websiteId }, {"$pop": {products: product._id}}, { new: true })

        // Delete Product
        product = await Product.findByIdAndDelete(id) 

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
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}