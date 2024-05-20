const mongoose = require('mongoose');
const { countries } = require('../lib/countries');
const Schema = mongoose.Schema;

// Define Site Schema
const SiteSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true
    },
    name: {
        type: String,
        required: [true, 'Website name is required.']
    },
    url: {
        type: String,
        required: [true, 'Website URL is required.']
    },
    logo: {
        type: String,
        required: [true, 'Logo URL is required.']
    },
    industry: {
        type: String,
        required: [true, 'Industry is required.']
    },
    country: {
        type: String,
        required: [true, 'Industry is required.'],
        enum: countries
    },
    companyName: {
        type: String,
        required: [true, 'Company name is required.']
    },
    businessDescription: {
        type: String,
        required: [true, 'Business Description is required.']
    },
    socials: {
        instagram: {
            username: {
                type: String
            }
        },
        facebook: {
            username: {
                type: String
            }
        },
        twitter: {
            username: {
                type: String
            }
        }
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
    status: {
        type: String,
        required: ['Status is required. (Default is Paused)'],
        enum: ['active', 'paused'],
        default: 'paused'
    },
    brand: {
        primaryColor: {
            type: String,
            required: [true, 'Brand Primary Color is required.'],
            maxlength: [6, 'Brand Primary Color must be an HEX value without #'],
            minlength: [3, 'Brand Primary Color must be an HEX value without #'],
            default: 'FFFFFF'
        },
        secondaryColor: {
            type: String,
            required: [true, 'Secondary Color is required.'],
            maxlength: [6, 'Brand Secondary Color must be an HEX value without #'],
            minlength: [3, 'Brand Secondary Color must be an HEX value without #'],
            default: '000000'
        },
        textColor: {
            lightBackground: {
                type: String,
                required: [true, 'Light Background Text Color is required.'],
                maxlength: [6, 'Light Background Text Color must be an HEX value without #'],
                minlength: [3, 'Light Background Text Color must be an HEX value without #'],
                default: '000000'
            },
            darkBackground: {
                type: String,
                required: [true, 'Dark Background Text Color is required.'],
                maxlength: [6, 'Dark Background Text Color must be an HEX value without #'],
                minlength: [3, 'Dark Background Text Color must be an HEX value without #'],
                default: 'FFFFFF'
            }
        },
        primaryFont: {
            fontFamily: {
                type: String
            },
            fontStyle: {
                type: String,
                enum: ['normal', 'bold', 'italic', 'oblique'],
                default: 'normal'
            },
            weight: {
                type: Number,
                enum: [100,200,300,400,500,600,700,800,900],
                default: 600
            }
        },
        secondaryFont: {
            fontFamily: {
                type: String
            },
            fontStyle: {
                type: String,
                enum: ['normal', 'bold', 'italic', 'oblique'],
                default: 'normal'
            },
            weight: {
                type: Number,
                enum: [100,200,300,400,500,600,700,800,900],
                default: 600
            }
        }
    }
})

// Create Site Model
const Site = mongoose.model('Site', SiteSchema);

// Export Site Model
module.exports = Site;
