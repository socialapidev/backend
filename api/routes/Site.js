const express = require('express');
const Site = require('../controller/routing/Site')

// Router
const Router = express.Router();

// @route GET /api/site/:id
// @access Private 
// @desc Returns a site
Router.get('/:id', Site.getSite)

// @route POST /api/site
// @access Private 
// @desc Create a site
Router.post('/', Site.createSite)

// @route PUT /api/site/:id
// @access Private 
// @desc Update a site
Router.put('/:id', Site.updateSite)

// @route DELETE /api/site/:id
// @access Private 
// @desc Delete a site
Router.delete('/:id', Site.deleteSite)

// Module Exports
module.exports = Router;