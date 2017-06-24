var express = require('express');
var router = express.Router();
var ordermodels = require("../Models/ordermodels.js");
var OrderData = ordermodels.orderData;

/* GET personal_center. */
router.get('/', function(req, res, next) {
  if (!req.session.user) {
  	res.render("personal_center", {order_data : {}, session_username : "登陆", username : "未登陆", phone : "未登录", email: "未登录"});
  } else {
	console.log(req.session.user.username);
  	getOrderData(req.session.user.username).then(function(order_data) {
  		res.render("personal_center", {order_data : order_data[0].toJSON(), session_username : req.session.user.username, username : req.session.user.username, phone : req.session.user.phone, email: req.session.user.mail});
  	}, function(err) {
  		res.render("personal_center", {order_data : {}, session_username : req.session.user.username, username : req.session.user.username, phone : req.session.user.phone, email: req.session.user.mail});
  	});
  }
});

//根据用户名来查找订票信息
function getOrderData(username) {
	return new Promise(function(resolve, reject) {
		OrderData.find({"order_username" : username}).sort({date : -1}).exec(function(err, data) {
			if (data.toString() != "") {
				resolve(data);
			} else {
				reject(err);
			}
		});
	});
}

module.exports = router;