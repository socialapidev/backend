const express = require('express');
const Product = require('../controller/routing/Product')

// Router
const Router = express.Router();

// @route GET /api/product/:id
// @access Private 
// @desc Returns a product
Router.get('/:id', Product.getProduct)

// @route POST /api/product
// @access Private 
// @desc Create a products manually
Router.post('/', Product.createProduct)

// @route PUT /api/product/:id
// @access Private 
// @desc Update a product
Router.put('/:id', Product.updateProduct)

// @route DELETE /api/product/:id
// @access Private 
// @desc Delete a product
Router.delete('/:id', Product.deleteProduct)

// Module Exports
module.exports = Router;