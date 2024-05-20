const nodeHtmlToImage = require('node-html-to-image')
const Site = require('../../model/SiteModel')
const { layout2 } = require('./layouts/posts/layout2')
const { layout1 } = require('./layouts/posts/layout1')
const { layout3 } = require('./layouts/posts/layout3')
const { one } = require('./layouts/posts/new/one')
const { two } = require('./layouts/posts/new/two')
const { three } = require('./layouts/posts/new/three')
const { four } = require('./layouts/posts/new/four')
const { five } = require('./layouts/posts/new/five')
const { v4: uuidv4 } = require('uuid');
const { getRandomInt } = require('../helpers')
const { layouts } = require('./layouts')


const generateImage = async (post) => {

    // Fetch Site
    // const site = await Site.findById(siteId)

    // // No Site Found
    // if(!site){ return }

    // Extract Brand Info
    // const { brand } = site;
    // const { primaryColor, secondaryColor, textColor, primaryFont, secondaryFont } = brand;

    const content = {
        title: post?.title,
        caption: post?.imageCaption,
        backgroundUrl: 'https://www.cnet.com/a/img/resize/19394aca4affc504651051d009160d0c0d216218/hub/2022/10/10/f2ff9ef7-f016-459d-b88a-a8a68270c315/solar-gettyimages-525206743.jpg?auto=webp&fit=crop&height=675&width=1200',
        logoUrl: 'https://cdn.freebiesupply.com/logos/large/2x/uber-15-logo-png-transparent.png',
        productOneUrl: 'https://www.cnet.com/a/img/resize/19394aca4affc504651051d009160d0c0d216218/hub/2022/10/10/f2ff9ef7-f016-459d-b88a-a8a68270c315/solar-gettyimages-525206743.jpg?auto=webp&fit=crop&height=675&width=1200',
        productTwoUrl: 'https://www.cnet.com/a/img/resize/19394aca4affc504651051d009160d0c0d216218/hub/2022/10/10/f2ff9ef7-f016-459d-b88a-a8a68270c315/solar-gettyimages-525206743.jpg?auto=webp&fit=crop&height=675&width=1200',
        primaryColor: '#57A6A1',
        secondaryColor: 'green',
        url: 'www.thhehomelyedit.com'
    }

    // Random Index
    const index = getRandomInt(0,layouts.length)
    // Layout
    const html = layouts[index]

    nodeHtmlToImage({
        output: `./${uuidv4()}.png`,
        html: html,
        content: content
    })
    .then(() => console.log('The image was created successfully!'))
}

module.exports = {
    generateImage
}