const express = require('./node_modules/express');
const request = require('./node_modules/request');
const app = express();
const port = 3000;

app.use(express.static('../frontend'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.get("/api/weatherApi", function (req, res) {
    console.log(req.query.choosedDate);
    const weatherURL = "https://api.darksky.net/forecast/a49d2e2893915131afa29b529dacfa22/53.9168,30.3449,"+req.query.choosedDate+"?units=uk2&exclude=currently,minutely,hourly,alerts,flags";
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