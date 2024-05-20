const express = require('express');
const Users = require('../controller/routing/Users')

// Router
const Router = express.Router();

// @route GET /api/users/
// @access Private 
// @desc Returns a list of all users
Router.get('/', Users.getUsers)

// Module Exports
module.exports = Router;