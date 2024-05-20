const { IgApiClient } = require("instagram-private-api")
const { get } = require("request-promise")

const postToInsta = async (post, username, password) => {

    const { imageUrl, caption } = post;

    // Login
    const ig = new IgApiClient()
    ig.state.generateDevice(username)
    await ig.account.login(username, password)

    // Load Image Into Buffer
    const imageBuffer = await get({
        url: imageUrl,
        encoding: null,
    })

    await ig.publish.photo({
        file: imageBuffer,
        caption: caption
    })

}

module.exports = {
    postToInsta
}