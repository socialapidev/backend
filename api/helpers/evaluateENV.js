// This method evaluates the current Node Env (Prod or Dev) and returns an Error if the incorrect value is used in Node Env
const evaluateENV = (PORT) => {
    if(process.env.NODE_ENV === 'DEV'){
        console.log(`Server is running successfully in DEV mode on port ${PORT}`)
    }
    else if(process.env.NODE_ENV === 'PROD'){
        console.log(`Server is running successfully in PROD mode on port ${PORT}`)
    }
    else {
        throw new Error('Incorrect Node Environment Selected. Please ensure either DEV or PROD is selected')
    } 
}

// Export Modules
module.exports = {
    evaluateENV
}