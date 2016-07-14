module.exports = {
  'port': process.env.PORT || 3000,
  'secret': process.env.JWT_SECRET || 'jsonwebtokensaregreat',
  'database': process.env.MONGODB_URL || 'mongodb://localhost:27017/find-the-spot',
  YELP_CONSUMER_KEY: process.env.YELP_CONSUMER_KEY,
  YELP_CONSUMER_SECRET: process.env.YELP_CONSUMER_SECRET,
  YELP_ACCESS_TOKEN: process.env.YELP_ACCESS_TOKEN,
  YELP_ACCESS_SECRET: process.env.YELP_ACCESS_SECRET
};
