const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fetch = require("./fetchCode.js");

const app = express();
app.use(cors());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/", (req, res) => {
    console.log("Listening on base URL1");
    let { body } = req;
    let code;

    fetch(body.data)
        .then((resData) => {
            code = resData.data.choices[0];
            res.send(JSON.stringify(code));
            res.end();
        })
        .catch((err) => console.log(err));
});


app.listen(3001, () => {
    console.log("Listening on base URL - http://localhost:3001");
});
