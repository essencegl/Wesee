var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var seatData = new Schema({
	movie_title : String,
	seat_id : Number,
	changCi : Number,
	seatOrder: String
});

exports.seatData = mongoose.model("SeatData", seatData);