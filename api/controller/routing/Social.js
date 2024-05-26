const express = require('express');
const mongoose = require('mongoose');
const Router = express.Router();
const User = require('../../model/UserModel')
const Product = require('../../model/ProductModel');


const { getMetaBusinessAccounts } = require('../../lib/meta/getMetaBusinessAccounts');

//#################################   PRIVATE   ########################################

// @route GET /social/businesses/
// @access Private 
// @desc Retrieves all products.
async function getUserMetaBusinnesses(req, res, next) {

    const { userId, accessToken } = req.body;

    if(!userId || !accessToken){
        return res.status(400).send({
            message: 'User Id & Access Token are required.',
            ok: false
        })
    }
    
    // Fetch User Meta Access Token
    try{

        // Request User Meta Businesses
        const metaAccounts = await getMetaBusinessAccounts(userId, accessToken)

        // Return Business List
        res.status(200).send({
            ok: true,
            data: metaAccounts || []
        })
        

    }catch(err){
        console.log(err)
    }
}

// Module Export
module.exports = {
    getUserMetaBusinnesses
}