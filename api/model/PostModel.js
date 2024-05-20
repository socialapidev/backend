const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Post Schema
const PostSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true
    },
    caption: {
        type: String
    },
    imageUrl: {
        type: String
    },
    website: {
        type: Schema.Types.ObjectId,
        ref: 'Site',
        required: [true, 'The website this post is related to is required (Website ID)']
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    type: {
        type: String,
        enum: ['product', 'caption', 'image']
    },
    status: {
        type: String,
        enum: ['pending', 'posted'],
        default: 'pending',
        required: [true, 'Status is required (Pending/Posted)']
    }
})

// Create Post Model
const Post = mongoose.model('Post', PostSchema);

// Export Post Model
module.exports = Post;
