var Yelp = require('yelp');
var env  = require('../config/config.js')

var yelp = new Yelp({
  consumer_key: env.YELP_CONSUMER_KEY,
  consumer_secret: env.YELP_CONSUMER_SECRET,
  token: env.YELP_ACCESS_TOKEN,
  token_secret: env.YELP_ACCESS_SECRET
});

// See http://www.yelp.com/developers/documentation/v2/search_api

function getAll(request, response){
  yelp.search({ term: request.query.search, ll: 51.5217 + "," + -0.0723, sort: 1, radius: 2000 })
  .then(function (data) {
    response.status(200).send(data.businesses);
  })
  .catch(function (err) {
    response.status(404).send(err)
  });
}

module.exports = {
  getAll: getAll
}