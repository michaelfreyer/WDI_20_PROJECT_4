module.exports = {
  port: process.env.PORT || 3000,
  // databaseUrl: process.env.MONGODB_URI || "mongodb://localhost:27017/daywithAlex",
  // secret: process.env.SECRECT || "isntpassportfun"
  key:  process.env.LOCU_CONSUMER_KEY,
  YELP_CONSUMER_KEY: process.env.YELP_CONSUMER_KEY,
  YELP_CONSUMER_SECRET: process.env.YELP_CONSUMER_SECRET,
  YELP_ACCESS_TOKEN: process.env.YELP_ACCESS_TOKEN,
  YELP_ACCESS_SECRET: process.env.YELP_ACCESS_SECRET
};