const OpenAI = require("openai")
const { generateImage } = require("../imageGeneration/imageGeneration")

const openai_instance = new OpenAI({ apiKey: process.env.OPEN_AI_SECRET })

// Request
const performAiRequest = async (prompt) => {
    try {

        // Request Data
        const completion = await openai_instance.chat.completions.create({
            messages: [{ role: "system", content: prompt }],
            model: "gpt-3.5-turbo",
            response_format: { "type": "json_object" }
        })

        // Parse Data
        const parses = await JSON.parse(completion.choices[0].message.content)

        // Iterate Response
        const iterateObj = (obj) => {
            let array = [];
            for(let key in obj){
                let item = obj[key]
                array.push(item)
            }
            return array
        }

        console.log(parses)

        // Save Array
        const array = iterateObj(parses)

        return array

    }catch(err){
        console.log(err)
    }
}

// Export
module.exports = {
    performAiRequest
}