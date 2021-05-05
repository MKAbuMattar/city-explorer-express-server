const superagent = require('superagent');
require('dotenv').config();
//env
const THEMOVIE_DB_API_URL = process.env.THEMOVIE_DB_API_URL;
const THEMOVIE_DB_API_KEY = process.env.THEMOVIE_DB_API_KEY;

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
    const theMovieDBURL = `${THEMOVIE_DB_API_URL}?api_key=${THEMOVIE_DB_API_KEY}&query=${req.query.city}&limit=10`;
    console.log(theMovieDBURL);
    superagent.get(theMovieDBURL).then(theMovieDBData => {
      const formatData = theMovieDBData.body.results.map(result => new Movie(result));
      res.send(formatData);
    });
  } catch (err) {
    res.send(err);
  }
};

module.exports = handelMovie;
