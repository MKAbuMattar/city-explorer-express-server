const express = require('express');
const cors = require('cors');
require('dotenv').config();
const superagent = require('superagent');
const weather = require('./assets/data/weather.json');
//env
const PORT = process.env.PORT;
const WEATHER_BIT_API_URL = process.env.WEATHER_BIT_API_URL;
const WEATHER_BIT_API_KEY = process.env.WEATHER_BIT_API_KEY;
const THEMOVIE_DB_API_URL = process.env.THEMOVIE_DB_API_URL;
const THEMOVIE_DB_API_KEY = process.env.THEMOVIE_DB_API_KEY;

const app = express();
app.use(cors());

app.get('/', function (req, res) {
  res.send('<blockquote>Sometimes success comes in ways you don\'t expect.<br><cite>&mdash;by BEN BARNES</cite></blockquote>');
});

// app.get('/weather', function (req, res) {
//   const formatData = weather.data.map(result => new Weather(result));
//   res.send(formatData);
// });

app.get('/weather', function (req, res) {

  try {
    const weatherBitURL = `${WEATHER_BIT_API_URL}?key=${WEATHER_BIT_API_KEY}&lat=${req.query.lat}&lon=${req.query.lon}`;
    superagent.get(weatherBitURL).then(weatherBitData => {
      const formatData = weatherBitData.body.data.map(result => new Weather(result));
      res.send(formatData);
    });
  } catch (err) {
    const formatData = weather.data.map(result => new Weather(result));
    res.send(formatData);
  }
});

app.get('/movie', function (req, res) {
  try {
    const theMovieDBURL = `${THEMOVIE_DB_API_URL}?api_key=${THEMOVIE_DB_API_KEY}&query=${req.query.city}&limit=10`;
    console.log(theMovieDBURL);
    superagent.get(theMovieDBURL).then(theMovieDBData => {
      const formatData = theMovieDBData.body.results.map(result => new Movie(result));
      res.send(formatData);
    });
  } catch (err) {
    res.send(err);
  }
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

class Movie {
  constructor(data) {
    this.title = data.original_title;
    this.img = data.poster_path;
    this.releaseDate = data.release_date;
    this.description = data.overview;
  }
}


app.listen(PORT);
