const express = require('express')
const User = require('../../model/UserModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


//#################################   PUBLIC   ########################################


// @route POST /auth/login
// @access Public [ALL]
// @desc Login.
const login = async (req, res, next) => {

    console.log(req.body)

    const { username, password } = req.body

    // Validate Username & Password are in the request body
    if (!username || !password) {
        return res.status(400).send({
            ok: true,
            message: "All fields are required."
        })
    }

    try {
        // Query DB for User
        const user = await User.findOne({ username: username }).exec()

        // If no use is not found or not active, return 401
        if(!user) {
            return res.status(401).send({
                ok: false,
                message: 'Invalid credentials. Please try again.'
            })
        }

        // Verify Password with Hashed Password
        const match = await bcrypt.compare(password, user.password)

        // Check if passwords are a match
        if (!match) return res.status(401).send({ message: 'Invalid credentials. Please try again.', ok: false })

        // Create JWT Access Token
        const accessToken = jwt.sign(
            {
                "user": {
                    "username": user.username       // Payload
                }
            },
            process.env.ACCESS_TOKEN_SECRET,        // Secret Key
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }                     // Expiry (PROD: 60 Minutes)
        )

        // Create JWT Access Token (Sent via body not cookie)
        const refreshToken = jwt.sign(
            {
                "user": {
                    "username": user.username         // Payload
                }
            },          // Payload
            process.env.REFRESH_TOKEN_SECRET,       // Secret Key
            { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }                      // Expiry (PROD: 7 Days)
        )

        // Send accessToken containing username 
        res.status(200).json({ 
                displayName: user.displayName,
                email: user.email,
                username: user.username,
                accessToken: accessToken,
                refreshToken: refreshToken
        })
        
    } catch (err) {
        //Error Handler
        next(err)
    }
}


// @route GET /auth/refresh
// @access Public [ALL]
// @desc Refresh Token.
const refresh = async (req, res, next) => {

    const { refreshToken } = req?.body;

    if(!refreshToken){
        return res.status(400).send({
            ok: false,
            message: 'Refresh token is missing.'
        })
    }

    // Verify Refresh Token
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
            // If Error return 401
            if (err) {
                return res.status(401).send({ message: 'Unauthorized', success: false })
            }

            // Generate new access token
            const accessToken = jwt.sign(
                {
                    "user": {
                        "username": decoded.user.username // Payload
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,        // Secret Key
                { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }                     // Expiry (PROD: 15 Minutes)
            )

            // Send refreshed accessToken containing username 
            res.status(200).json({ 
                accessToken: accessToken
            })
        }
    )
}


// @route POST /auth/logout
// @access Public [ALL]
// @desc Logout.
const logout = async (req, res, next) => {

    const cookie = req.cookies

    // Check for jwt cookie
    if (!cookie?.jwt) return res.sendStatus(204)

    // Clear refresh cookie from client
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })

    // Respond with success
    res.status(200).send({ message: 'Cookie Cleared', success: true })
}


// Export Module
module.exports = {
    login,
    refresh,
    logout
}

