const superagent = require('superagent');
require('dotenv').config();
//data JSON file
const weather = require('../../assets/data/weather.json');
//env
const WEATHER_BIT_API_URL = process.env.WEATHER_BIT_API_URL;
const WEATHER_BIT_API_KEY = process.env.WEATHER_BIT_API_KEY;

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

const handelWeather = (req, res) => {
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
};

module.exports = handelWeather;
