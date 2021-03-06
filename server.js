const express = require('express');
const cors = require('cors');
require('dotenv').config();
//modules
const handelWeather = require('./modules/weather/weather');
const handelMovie = require('./modules/movie/movie');
const handelRestaurant = require('./modules/restaurant/restaurant');
//env
const PORT = process.env.PORT;

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.send('<blockquote>Sometimes success comes in ways you don\'t expect.<br><cite>&mdash;by BEN BARNES</cite></blockquote>');
});

app.get('/weather', handelWeather);

app.get('/movie', handelMovie);

app.get('/restaurant', handelRestaurant);

app.listen(PORT);
