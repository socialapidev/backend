// Prompt to generate instagram posts
const generateInstagramPosts = (site, numberOfPosts, language) => {

    // Destructure Site Data
    const { 
        industry, 
        country, 
        companyName, 
        businessDescription
    } = site;

    return `
        You are a social media expert. 
        Write ${numberOfPosts} instagram captions for a ${industry} brand named ${companyName}.
        This is the description of the brand: ${businessDescription} 
        The response should be an array of JSON objects. 
        Each object should have a title which is used in a graphic image (title: String), and also a caption for the image (imageCaption), as well as a caption for the post. 
        The object key must be in English as title, imageCaption, caption. 
        The values must be in ${language} directed for customers in ${country}`
}

// Prompt to generate instagram product posts
const generateInstagramProductPost = (site, product, numberOfPosts, language) => {

    // Destructure Site Data
    const { 
        industry, 
        country, 
        companyName, 
        businessDescription, 
        products, 
    } = site;

    // Deconstruct Product Data
    const {
        name,
        productType,
        details,
        brand,
        model
    } =  product;

    return `
        Write a total of 3 different and unique instagram captions for a ${industry} brand named ${companyName}.
        The response should be an array of JSON objects with 3 posts. 
      `

    // return `
    //     You are a social media expert. 
    //     Write a total of 3 different and unique instagram captions for a ${industry} brand named ${companyName}.
    //     The 3 posts should be about a product called ${model} of brand ${brand}. This is a ${productType}.
    //     The details of the product are: ${details} 
    //     This is the description of the brand: ${businessDescription} 
    //     The response should be an array of JSON objects with 3 posts. 
    //     Each object should have a title which is used in a graphic image (title: String), and also a caption for the image (imageCaption), as well as a caption for the post. 
    //     The object key must be in English as title, imageCaption, caption. 
    //     The values must be in ${language} directed for customers in ${country}.
    //     For this product, generate 3 objects all including the required fields.`
}

module.exports = {
    generateInstagramPosts,
    generateInstagramProductPost
}