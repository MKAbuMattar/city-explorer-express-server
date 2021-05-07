const superagent = require('superagent');
require('dotenv').config();
//env
const YELP_API_URL = process.env.YELP_API_URL;
const YELP_API_ID = process.env.YELP_API_ID;
const YELP_API_KEY = process.env.YELP_API_KEY;

//Cache Storage
let inCache = require('../inCache/inCache');

class Restaurant {
  constructor(data) {
    this.name = data.name;
    this.image_url = data.image_url;
    this.price = data.price;
    this.rating = data.rating;
    this.url = data.url;
  }
}

const handelRestaurant = (req, res) => {
  try {
    const yelpURL = `${YELP_API_URL}`;
    const params = {
      tearm: 'restaurants',
      location: req.query.location,
      limit: '10',
    };
    const key = `movie-${req.query.location}`;
    if (inCache[key] && (Date.now() - inCache[key].timestamp < (60 * 60 * 1000))) {
      res.send(inCache[key]);
    } else {
      superagent.get(yelpURL).query(params).set({ 'Authorization': `Bearer ${YELP_API_KEY}` }).then(yelpURLData => {
        const formatData = yelpURLData.body.businesses.map(result => new Restaurant(result));
        inCache[key] = formatData;
        inCache[key].timestamp = Date.now();
        res.send(formatData);
      });
    }
  } catch (err) {
    res.send(err);
  }
};

module.exports = handelRestaurant;
