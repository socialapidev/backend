const express = require('express');
const mongoose = require('mongoose');
const Router = express.Router();
const Site = require('../../model/SiteModel');

//#################################   PRIVATE   ########################################

// @route GET /sites/
// @access Private 
// @desc Retrieves all sites.
async function getSites(req, res, next) {

    // Mongoose Query Params
    let parameters = {}; // DISBALED IN BETA

    // Limit / Page / Sort
    const limit = Number(req?.query?.limit) || 100;
    const page = Number(req?.query?.page) || 1;
    const sort = Number(req?.query?.sort) || 1;

    try{
        // Get Sites
        const sites = await Site
        .find()
        .limit(Number(limit) * 1)
        .skip((Number(page) - 1) * Number(limit))
        .sort({ name: sort })
        .exec();

        // Returns total number of sites
        const count = await Site.countDocuments();

        // Return Response
        res.status(200).send({
            ok: true,
            totalEntries: sites.length,
            totalCount: count,
            totalPages: Math.ceil(count / Number(limit)),
            currentPage: Number(page),
            limit: Number(limit),
            data: sites
        });
        
    }catch(err){
        next(err)
    }
}

// Module Export
module.exports = {
    getSites
}