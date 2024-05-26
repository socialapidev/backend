const jwt = require('jsonwebtoken')

const verifyToken = (req,res,next) => {

    // Check for Auth Header
    const authHeader = req.headers.authorization || req.headers.Authorization

    // Return 400 if no Bearer Auth Header
    if(!authHeader?.startsWith('Bearer ')){
        return res.status(400).send({
            message: 'Bad request. Bearer is missing.',
            ok: false
        })
    }

    const token = authHeader.split(' ')[1]

    // Verify JWT Token
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            // If an error is detected return 403
            if(err) {
                return res.status(401).send({
                    message: 'Unauthorized',
                    ok: false
                })
            }

            // Set the decoded values
            req.username = decoded.user.username;

            // Next
            next();
        }
    )
}

module.exports = { verifyToken };