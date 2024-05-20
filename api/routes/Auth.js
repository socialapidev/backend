const express = require('express');
const Auth = require('../controller/routing/Auth');
const authRateLimiter = require('../middleware/authRateLimiter');

// Router
const Router = express.Router();

// Auth Rate Limiter 
// Limit to 5 Login requests per minute
if(process.env.NODE_ENV === 'PROD'){
    Router.use(authRateLimiter)
}

// @route POST /api/auth/
// @access Public 
// @desc Perform Login.
Router.post('/login', Auth.login)

// @route POST /api/auth/refresh
// @access Public
// @desc Refresh Auth Token.
Router.post('/refresh', Auth.refresh)

// @route POST /api/auth/logout
// @access Public
// @desc Logout.
Router.post('/logout', Auth.logout)


module.exports = Router;