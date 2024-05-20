const express = require('express');
const User = require('../controller/routing/User')

// Router
const Router = express.Router();

// @route GET /api/user/:id
// @access Private 
// @desc Returns a user
Router.get('/:id', User.getUser)

// @route POST /api/user
// @access Private 
// @desc Create a user
Router.post('/', User.createUser)

// @route PUT /api/user/:id
// @access Private 
// @desc Update a user
Router.put('/:id', User.updateUser)

// @route DELETE /api/user/:id
// @access Private 
// @desc Delete a user
Router.delete('/:id', User.deleteUser)

// Module Exports
module.exports = Router;