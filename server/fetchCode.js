const { response } = require("express");
const { Configuration, OpenAIApi } = require("openai");

require("dotenv").config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// openai.createCompletion({
//             model: "code-davinci-002",
//             prompt: "what is python",
//             temperature: 0,
//             max_tokens: 256,
//             top_p: 1,
//             frequency_penalty: 0,
//             presence_penalty: 0,
//         }).then((response) =>{
//             console.log(response.data.choices[0].text);
//             return response.data.choices[0].text;
//         });

async function fetch(comment) {
    const response = await openai.createCompletion({
        model: "code-davinci-002",
        prompt: comment,
        temperature: 0,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });
    return response;
}

module.exports = fetch;
