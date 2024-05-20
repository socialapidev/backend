const express = require('express');
const Morgan = require('morgan');
const cookies = require('cookie-parser')

// Router 
const Router = express.Router();

// JSON Parser
Router.use(express.json())

// Cookie Parser
Router.use(cookies())

// Morgan
if(process.env.NODE_ENV === 'prod'){
    // Morgan - Tiny Mode
    Router.use(Morgan('tiny'))
} else {
    Router.use(Morgan('dev'))
}

// Module Exports
module.exports = Router;