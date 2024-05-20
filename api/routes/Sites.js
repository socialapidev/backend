const express = require('express');
const Sites = require('../controller/routing/Sites')

// Router
const Router = express.Router();

// @route GET /api/sites/
// @access Private 
// @desc Returns a list of all sites
Router.get('/', Sites.getSites)

// Module Exports
module.exports = Router;