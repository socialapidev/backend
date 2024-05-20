const express = require('express');
const mongoose = require('mongoose');
const Router = express.Router();
const Post = require('../../model/PostModel');
const Site = require('../../model/SiteModel');
const { performAiRequest } = require('../../lib/OpenAI/methods');
const { generateInstagramProductPost } = require('../../lib/OpenAI/prompts');

//#################################   PRIVATE   ########################################

// @route GET /posts/
// @access Private 
// @desc Retrieves all posts.
async function getPosts(req, res, next) {

    // Mongoose Query Params
    let parameters = {}; // DISBALED IN BETA

    // Limit / Page / Sort
    const limit = Number(req?.query?.limit) || 100;
    const page = Number(req?.query?.page) || 1;
    const sort = Number(req?.query?.sort) || 1;

    try{
        // Get Posts
        const posts = await Post
        .find()
        .populate({
            path: 'Site'
        })
        .populate({
            path: 'Product'
        })
        .limit(Number(limit) * 1)
        .skip((Number(page) - 1) * Number(limit))
        .sort({ name: sort })
        .exec();

        // Returns total number of posts
        const count = await Post.countDocuments();

        // Return Response
        res.status(200).send({
            ok: true,
            totalEntries: posts.length,
            totalCount: count,
            totalPages: Math.ceil(count / Number(limit)),
            currentPage: Number(page),
            limit: Number(limit),
            data: posts
        });
        
    }catch(err){
        next(err)
    }
}

// @route GET /posts/generate
// @access Private 
// @desc Generates a set of posts.
async function generatePosts(req, res, next) {

    // Body
    const { website, frequency, numberOfPosts, platforms } = req.body;

    // Website Validation
    if(!website || !mongoose.isValidObjectId(website)){
        return res.status(400).send({
            message: "Missing/Incorrect website Id",
            ok: false
        })
    }

    // Required Data Validation
    if(!frequency || !numberOfPosts || !platforms){
        return res.status(400).send({
            message: "Missing fields",
            ok: false
        })
    }

    // Query Website
    const site = await Site.findById(website)

    // No Website Found
    if(!site){
        return res.status(404).send({
            message: "Website not found",
            ok: false
        })
    }

    // Generate Standard Posts

    // Generate Product Specific Posts
    // if(site.products.length > 1){
    //     // For each product, generate X posts
    // }

    const dummyProduct = { name: "Mini Panel Solar DC 6V Polisilicio Módulo de Cargador de Célula Solar Epoxi Kits de Sistema Solar DIY con Cable de 30 cm", brand: "Eujgoov", productType: "portable solar panel", model: "Epoxi Kits 6W", details: "A prueba de nieve y viento: el panel solar está hecho de polisilicio de alta calidad, a prueba de nieve y viento, duradero en uso." }

    const productPosts = await performAiRequest(generateInstagramProductPost(site, dummyProduct, 3, "Spanish"))

    if(productPosts){
        console.log(productPosts)
    }



}

// Module Export
module.exports = {
    getPosts,
    generatePosts
}