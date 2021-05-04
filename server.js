const express = require('express');
const cors = require('cors');
require('dotenv').config();
const weather = require('./assets/data/weather.json');
const PORT = process.env.PORT;
const app = express();
app.use(cors());

app.get('/', function (req, res) {



  res.send('<blockquote>Sometimes success comes in ways you don\'t expect.<br><cite>&mdash;by BEN BARNES</cite></blockquote>');
});

app.get('/weather', function (req, res) {
  const formatData = weather.data.map(result => new Weather(result));
  res.send(formatData);
});

app.get('/movie', function (req, res) {
  res.send('movie');
});

class Weather {
  constructor(data) {
    this.date = data.valid_date;
    this.temp = data.temp;
    this.windCdir = data.wind_cdir;
    this.minTemp = data.min_temp;
    this.maxTemp = data.max_temp;
    this.description = data.weather.description;
  }
}


app.listen(PORT);
