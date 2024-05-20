const express = require('express');
const dotenv = require('dotenv').config({path: __dirname + '/.env'})
const mongoose = require('mongoose');
const Router = require('./api/routes/Router');
const { connectionURL, connectionParams } = require('./api/db/mongooseConfig')
const { evaluateENV } = require('./api/helpers/evaluateENV')
const Middleware = require('./api/middleware/middleware')
const cors = require('cors')

// Port
const PORT = process.env.PORT || 8080;

// CORS Options
const origin = process.env.NODE_ENV === 'PROD' ? process.env.PUBLIC_CLIENT_URL_PROD : process.env.PUBLIC_CLIENT_URL_DEV;
const corsOptions = {
    origin: origin,
    optionsSuccessStatus: 200 // For legacy browser support
    }

// Express Configuration
const app = express();

// CORS
app.use(cors(corsOptions))

// Middleware
app.use(Middleware);

// Router API
app.use('/api/', Router)

//Connect to DB and start server
const connect = async () => {
    console.log('Attempting DB connection --- Please Wait')
    const connection = await mongoose.connect(connectionURL, connectionParams)
    .then(() => mongoose.syncIndexes())
    .then(() => console.log('Successfully Connected to DB. Starting Server...'))
    .then(startServer())
    // .then(cronJobs())
    .catch((err) => console.log(err))
}

// Disconnect DB
const disconnectDB = async () => {
    const connection = await mongoose.disconnect(connectionURL, connectionParams)
    .then(() => console.log('Disconnected from DB Successfully'))
    .catch((err) => console.log(err))
}

// Start Server based on Node_Env method
const startServer = async () => {
    try{
        app.listen(PORT, () => {
            evaluateENV(PORT)
        })
    }catch(err){
        await disconnectDB()
        console.log(err)
        process.exit(1)
    }
}

// Connect to DB and start server
connect()