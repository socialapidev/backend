const express = require('express');
const mongoose = require('mongoose');
const Site = require('../../model/SiteModel');
const Product = require('../../model/ProductModel')
const Router = express.Router();

//#################################   PRIVATE   ########################################

// @route GET /site/:ID
// @access Private 
// @desc Return a single site 
async function getSite(req, res, next) {
    
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

        // query DB for site
        const site = await Site
        .findById(id)

        // Not Found
        if(!site){
            res.status(404).send({
                ok: true,
                message: 'Site not found.'
            })
            return
        }

        // Return Response
        res.status(200).send({
            ok: true,
            data: site
        });

    } catch(err) { 
        next(err)
     }
}

// @route POST /site/
// @access Private 
// @desc Create a site
async function createSite(req, res, next) {

    // Request Body
    const { body } = req;

    // Create Site
    try {

        // Create Site
        const site = await new Site(body)

        // Save Data
        const data = await site.save()

        // Return Response
        res.status(200).send({
            ok: true,
            data: data
        });

    } catch(err) {
        next(err)
    }
}

// @route PUT /site/:ID
// @access Private 
// @desc Update a site
async function updateSite(req, res, next) {

    res.status(200).send('UPDATE SITE OK')
   
}

// @route DELETE /site/:ID
// @access Private 
// @desc Delete a site
async function deleteSite(req, res, next) {

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
        
        // Find Site
        let site = await Site
        .findById(id)

        // Not Found
        if(!site){
            res.status(404).send({
                ok: true,
                message: 'Site not found.'
            })
            return
        }

        if(site.products.length > 0){
            // Delete All Products related to site
            const products = await Product.deleteMany({ _id:{$in: site.products }})
        }

        // Delete Site
        site = await Site.findByIdAndDelete(id) 

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
    getSite,
    createSite,
    updateSite,
    deleteSite
}