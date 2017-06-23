var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var movieData = new Schema({
	title: String,
	prize: Number,
	data: Number,
	poster: Number,
	type: String,
	director: String,
	staring: String,
	comments: String,
	details: String,
	other: String
});

exports.MovieData = mongoose.model("MovieData", movieData);