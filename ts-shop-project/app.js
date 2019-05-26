const express = require('express');
const request = require('request');
const app = express();
const port = 4200;

app.use(express.static('./'));

app.get("/api/shopItemList", function (req, res) {
    request(weatherURL, function (err, response, body, next) {
        if (err) {
            console.log('error:', err);
            res.status(500).send("ERROR, something went wrong");
        } else {
            let weather = JSON.parse(body)
            console.log(weather);
            res.status(200).send(body);
        }
    })
});

app.listen(port, () => console.log(`We are on port ${port}`));