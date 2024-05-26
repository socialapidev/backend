const express = require('express');
const Social = require('../controller/routing/Social')

// Router
const Router = express.Router();

// @route GET /api/social/meta/businesses
// @access Private 
// @desc Returns a list of user businesses
Router.get('/meta/businesses', Social.getUserMetaBusinnesses)

// Module Exports
module.exports = Router;