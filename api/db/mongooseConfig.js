const mongoose = require('mongoose');

// Connection URL
const connectionURL = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`

// Connection Parameters
const connectionParams = {}

// Error Handling to Console
const handleError = (err) => {
    console.log('DB ERR')
    if(process.env.NODE_ENV === "DEV"){
        console.log('Error connecting to DB.')
        console.log(err)
    }
    if(process.env.NODE_ENV === "PROD"){
        console.log('Error connecting to DB.')
    }
}

// Export Module
module.exports = {
    connectionURL,
    connectionParams,
    handleError
}
