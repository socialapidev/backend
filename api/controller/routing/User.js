const express = require('express');
const mongoose = require('mongoose');
const User = require('../../model/UserModel');
const Router = express.Router();
const bcrypt = require('bcrypt');

//#################################   PRIVATE   ########################################

// @route GET /user/:ID
// @access Private 
// @desc Return a single user
async function getUser(req, res, next) {
    
    // User ID
    const { id } = req?.params;

    // Validate ID
    if(!mongoose.isValidObjectId(id)){
        res.status(400).send({
            ok: true,
            message: 'Invalid User ID provided.'
        })
        return
    }

    try {

        // query DB for user 
        const user = await User
        .findOne({ _id: id }, { password: 0 })

        // Not Found
        if(!user){
            res.status(404).send({
                ok: true,
                message: 'User not found.'
            })
            return
        }

        // Return Response
        res.status(200).send({
            ok: true,
            data: user
        });

    } catch(err) { 
        next(err)
     }
}

// @route POST /user/
// @access Private 
// @desc Create a user
async function createUser(req, res, next) {

    // Request Body
    const { body } = req;

    // Create User
    try {

        // Check Email or Username dont already exist
        const similarUser = await User.find(
            {$or:[{ email: req?.body?.email }, { username: req?.body?.username }]}
        )

        // If similarUser
        if(similarUser.length > 0){
            res.status(400).send({
                ok: true,
                message: "Email or Username are already registred."
            })
            return
        }

        // Create User
        const user = await new User(body)

        // Save Data
        const data = await user.save()

        // Return Response
        res.status(200).send({
            ok: true,
            data: {
                displayName: data.displayName,
                email: data.email,
                username: data.username,
                _id: data._id
            }
        });

    } catch(err) {
        next(err)
    }
}

// @route PUT /user/:ID
// @access Private 
// @desc Update a user
async function updateUser(req, res, next) {

    // User ID
    const { id } = req?.params;

    // Body
    let { body } = req;

    // Validate ID
    if(!mongoose.isValidObjectId(id)){
        res.status(400).send({
            ok: true,
            message: 'Invalid User ID provided.'
        })
        return
    }

    try {

        // If body contains a password update
        if (req.body.password) {

            // Generate Salt
            const salt = await bcrypt.genSaltSync(parseFloat(process.env.BCRYPT_SALT_ROUNDS));

            // Hash 
            const hashed = await bcrypt.hashSync(req.body.password, salt);

            // Set hashed password
            req.body.password = hashed;
        }

        // Find by ID and Update
        const user = await User.findOneAndUpdate({ _id: id }, body, { new: true, runValidators: true });

        // Check if user exists
        if(!user){
            res.status(404).send({
                ok: true,
                message: 'User not found.'
            })
            return
        }

        // Return Response with updated user
        res.status(200).json({
            data: {
                displayName: user.displayName,
                email: user.email,
                username: user.username,
                _id: user._id
            },
            ok: true
        });
    } catch(err) {
        next(err)
    }
   
}

// @route DELETE /user/:ID
// @access Private 
// @desc Delete a User
async function deleteUser(req, res, next) {

    // User ID
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

        // Check to ensure more than one admin exist
        const users = await User.aggregate([{ $match: { isAdmin: true }}])

        // If only one admin exists, return 400
        if(users.length == 1){
            res.status(400).send({
                ok: true,
                message: 'Another Admin must be active prior to deleting this user.'
            })
            return
        }
        
        // Find User
        let user = await User
        .findById(id)

        // Not Found
        if(!user){
            res.status(400).send({
                ok: true,
                message: 'User not found.'
            })
            return
        }

        // Delete User
        user = await User.findByIdAndDelete(id) 

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
    getUser,
    createUser,
    updateUser,
    deleteUser
}