const express = require('express');
const Products = require('../controller/routing/Products')

// Router
const Router = express.Router();

// @route GET /api/products/
// @access Private 
// @desc Returns a list of all products
Router.get('/', Products.getProducts)

// Module Exports
module.exports = Router;