const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Product Schema
const ProductSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true
    },
    name: {
        type: String,
        required: [true, 'Product name is required.']
    },
    productType: {
        type: String,
        required: [true, 'Product Type is required.']
    },
    details: {
        type: String,
        required: [true, 'Product details are required. Provide a brief description of the product.']
    },
    imageURL: {
        type: String
    },
    brand: {
        type: String,
        required: [true, 'Product Brand is required.']
    },
    model: {
        type: String,
        required: [true, 'Product model is required.']
    },
    website: {
        type: Schema.Types.ObjectId,
        ref: 'Site',
        required: [true, 'The website this product is related to is required (Website ID)']
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
    status: {
        type: String,
        required: [true, 'Status is required. (Active/Paused)'],
        enum: ['active', 'paused'],
        default: 'active'
    }
})

// Create Product Model
const Product = mongoose.model('Product', ProductSchema);

// Export Product Model
module.exports = Product;
