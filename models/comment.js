var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  yelpID: String,
  rating: Number
});

module.exports = mongoose.model('Comment', commentSchema);