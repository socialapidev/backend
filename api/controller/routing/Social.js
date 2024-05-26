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

    // Access User ID
    // const { username } = req; 

    // if(!req.username){
    //     return res.status(400).message({
    //         ok: false,
    //         message: "Username is missing from request."
    //     })
    // }
    
    const username = "admin3"
    // Fetch User Meta Access Token
    try{

        // Requesting User
        const RequestingUser = await User.find({ username: username })

        if(!RequestingUser){
            return res.status(404).send({
                message: 'User not found.',
                ok: false
            })
        }

        const { userId, metaAccessToken } = RequestingUser[0].meta

        // Request User Meta Businesses
        const metaAccounts = await getMetaBusinessAccounts(userId, metaAccessToken)

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