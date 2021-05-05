const express = require('express');
const cors = require('cors');
require('dotenv').config();
//components
const handelWeather = require('./components/weather/weather');
const handelMovie = require('./components/movie/movie');
//env
const PORT = process.env.PORT;

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.send('<blockquote>Sometimes success comes in ways you don\'t expect.<br><cite>&mdash;by BEN BARNES</cite></blockquote>');
});

app.get('/weather', handelWeather);

app.get('/movie', handelMovie);

app.listen(PORT);
