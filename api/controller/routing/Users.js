const express = require('express');
const mongoose = require('mongoose');
const Router = express.Router();
const User = require('../../model/UserModel');

//#################################   PRIVATE   ########################################

// @route GET /users/
// @access Private 
// @desc Retrieves all users.
async function getUsers(req, res, next) {

    // Mongoose Query Params
    let parameters = {}; // DISBALED IN BETA

    // Limit / Page / Sort
    const limit = Number(req?.query?.limit) || 100;
    const page = Number(req?.query?.page) || 1;
    const sort = Number(req?.query?.sort) || 1;

    try{
        // Get Users
        const users = await User
        .find()
        .select('-password')
        .limit(Number(limit) * 1)
        .skip((Number(page) - 1) * Number(limit))
        .sort({ name: sort })
        .exec();

        // Returns total number of users
        const count = await User.countDocuments();

        // Return Response
        res.status(200).send({
            ok: true,
            totalEntries: users.length,
            totalCount: count,
            totalPages: Math.ceil(count / Number(limit)),
            currentPage: Number(page),
            limit: Number(limit),
            data: users
        });
        
    }catch(err){
        next(err)
    }
}

// Module Export
module.exports = {
    getUsers
}