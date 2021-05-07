const superagent = require('superagent');
require('dotenv').config();
//env
const THEMOVIE_DB_API_URL = process.env.THEMOVIE_DB_API_URL;
const THEMOVIE_DB_API_KEY = process.env.THEMOVIE_DB_API_KEY;

//Cache Storage
let inCache = require('../inCache/inCache');

class Movie {
  constructor(data) {
    this.title = data.original_title;
    this.img = data.poster_path;
    this.releaseDate = data.release_date;
    this.description = data.overview;
  }
}

const handelMovie = (req, res) => {
  try {
    const theMovieDBURL = `${THEMOVIE_DB_API_URL}`;
    const params = {
      api_key: THEMOVIE_DB_API_KEY,
      query: req.query.city,
      limit: 10
    };
    const key = `movie-${req.query.city}`;
    if (inCache[key] && (Date.now() - inCache[key].timestamp < (60 * 60 * 1000))) {
      res.send(inCache[key]);
    } else {
      superagent.get(theMovieDBURL).query(params).then(theMovieDBData => {
        const formatData = theMovieDBData.body.results.map(result => new Movie(result));
        inCache[key] = formatData;
        inCache[key].timestamp = Date.now();
        res.send(formatData);
      });
    }
  } catch (err) {
    res.send(err);
  }
};

module.exports = handelMovie;
