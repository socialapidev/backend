const express = require('express');
const mongoose = require('mongoose');
const Router = express.Router();
const Product = require('../../model/ProductModel');

//#################################   PRIVATE   ########################################

// @route GET /products/
// @access Private 
// @desc Retrieves all products.
async function getProducts(req, res, next) {

    // Mongoose Query Params
    let parameters = {}; // DISBALED IN BETA

    // Limit / Page / Sort
    const limit = Number(req?.query?.limit) || 100;
    const page = Number(req?.query?.page) || 1;
    const sort = Number(req?.query?.sort) || 1;

    try{
        // Get Products
        const products = await Product
        .find()
        .populate({
            path: 'Site'
        })
        .limit(Number(limit) * 1)
        .skip((Number(page) - 1) * Number(limit))
        .sort({ name: sort })
        .exec();

        // Returns total number of products
        const count = await Product.countDocuments();

        // Return Response
        res.status(200).send({
            ok: true,
            totalEntries: products.length,
            totalCount: count,
            totalPages: Math.ceil(count / Number(limit)),
            currentPage: Number(page),
            limit: Number(limit),
            data: products
        });
        
    }catch(err){
        next(err)
    }
}

// Module Export
module.exports = {
    getProducts
}