const rateLimit = require('express-rate-limit');

const authRateLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 Minute
    max: 8, // Limit each IP to 8 login requests per 'window' per minute
    message:{ message: 'Too many attempts. Please try again in 1 minute.'},
    handler: (req,res,next, options) => {
        // TODO => Log Events to Logger File
        console.log(`Too many requests: ${options.message.message}`)
        res.status(options.statusCode).send(options.message)
    },
    standardHeader: true, // Return rate limit info in the 'RateLimit-*' headers
    legacyHeaders: false, // Disable the 'X-RateLimit-*' headers
})

module.exports = authRateLimiter;