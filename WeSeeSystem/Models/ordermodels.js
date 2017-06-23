var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var orderData = new Schema({
	order_id: String, //电影票据ID
	date: String, //下订单时间
	hall: String, //电影影厅
	showtime: String, //电影开映时间
	seat_number: Number, //票数
	seat_position: String, //座位
	order_username: String, //用户名
	movie_title: String, //电影名称
	movie_price: Number//电影价格
});

exports.orderData = mongoose.model("OrderData", orderData);