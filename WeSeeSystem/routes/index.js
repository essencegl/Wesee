var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var models = require('../Models/models.js');
var moviemodels = require("../Models/moviemodels.js")
var seatmodels = require("../Models/seatmodel.js");
var ordermodels = require("../Models/ordermodels.js");
var path = require('path');
var fs = require('fs');
//连接数据库
var User = models.User;
var MovieData = moviemodels.MovieData;
var SeatData = seatmodels.seatData;
var OrderData = ordermodels.orderData;

var judge = 0;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/home');
});

router.get('/home', function(req, res, next) {
  if (!req.session.user) {
  	res.render("home", {session_username : "登陆"});
  } else {
  	res.render("home", {session_username : req.session.user.username});
  }
});

router.get('/movie_detail_*', function(req, res, next) {
  var db_number = parseInt(req.url.substring(14));
  /*
  //数据未录入数据库
  var movie_data = new MovieData ({
	title: "攻壳机动队",
	prize: 65,
	data: 2017,
	poster: 3,
	type: "动作",
	director:"鲁伯特·桑德斯",
	staring:"斯嘉丽·约翰逊 / 皮鲁·埃斯贝克 / 北野武 / 朱丽叶·比诺什",
	comments: "暂无评论信息",
	details: "少佐草薙素子（斯嘉丽·约翰逊饰），她是同类型生化人中的第一个，是有着人类大脑和灵魂的机器人，由奥莱特博士（朱丽叶·比诺什饰）Hanka Robotics公司所设计。少佐被创造出来之后，就加入了荒卷大辅（北野武饰）带领的公安九课，这是一支阻止罪犯和黑客的精英小分队。在办案的过程中，少佐常常被幻觉困扰，并开始渐渐怀疑自己的身份，企图寻找自己的过去。当她发现自己追寻的犯罪首脑久世（迈克尔·皮特饰）和自己有着相似之处时，一个更大的阴谋也渐渐显露出来",
	other: "暂无其他信息"
  });
	movie_data.save();

  	  if (!req.session.user) {
	  	res.render("movie_detail", {movie_data : movie_data, session_username : "登陆"});
	  } else {
	  	res.render("movie_detail", {movie_data : movie_data, session_username : req.session.user.username});
	  }
*/  
  
  getMovieData(db_number).then(function(movie_data) {
	  if (!req.session.user) {
	  	res.render("movie_detail", {movie_data : movie_data[0].toJSON(), session_username : "登陆"});
	  } else {
	  	res.render("movie_detail", {movie_data : movie_data[0].toJSON(), session_username : req.session.user.username});
	  }

  });
});

//判断登陆情况,并且返回是否valid
router.post('/signin_valid', function(req, res, next) {
    var signin_user = req.body;
    user_valid(signin_user).then(function(valid_data) {
    	if (valid_data.toString() != "") {
    		//设置session
    		req.session.user = valid_data[0].toJSON();
    		console.log(req.session.user);
    		res.send("true");
    	}
    	res.send("false");
    });
});

router.post('/regist', function(req, res) {
	judge = 0;
  	var user = req.body;
  	//设置session
  	req.session.user = user;
  	mail_not_repeat(user)
  	.then(phone_not_repeat)
  	.then(username_not_repeat)
	.then(function(){
		console.log(judge);
	  	if (judge == 0) {
		    var join_user = new User({ 
		        mail : user.mail, 
		        username : user.username,
				phone : user.phone,
				password: user.password,
		    }); 
		    console.log(join_user.toString());
		    join_user.save();
		    res.send("true");
	  	} else {
	  		//var repeats = getRepeatInformation(judge);
	  		res.send("false");
	    	//res.render('regist', { title: '注册'  , user : user, repeat:repeats});
	  	}
	});
});

router.get('/detail', function(req, res, next) {
	res.render('detail', { title: 'detail' , user:req.session.user, warning:""});
});

router.post("/order_seat", function(req, res, next) {
	//订单处理
	var order_temp = new OrderData({
		order_id: req.body.order_id, //电影票据ID
		date: req.body.date, //下订单时间
		hall: req.body.hall, //电影影厅
		showtime: req.body.showtime, //电影开映时间
		seat_number: req.body.seat_number, //票数
		seat_position: req.body.seat_position, //座位
		order_username: req.body.order_username, //用户名
		movie_title: req.body.movie_title, //电影名称
		movie_price: req.body.movie_price//电影价格	
	});
	//将订单存入数据库
	order_temp.save(function(err) {
		if (err) {
			console.log(err);
		}
	});

    //订单列表
	var seat_data = new SeatData({
		movie_title : req.body.movie_title,
		seat_id : 1,
		changCi :1,
		seatOrder: req.body.send_seat
	});
	//seat_data.save();
	
	SeatData.update({movie_title:req.body.movie_title}, {seatOrder: seat_data.seatOrder}, function(err) {
		if (err) {
			console.log(err);
		}
	});

	res.send(true);
});

router.post('/getSeatData', function(req, res, next) {
	var title_ = req.body.movie_title;
	getSeatData(title_).then(function(data) {
		res.send(data[0].seatOrder);
	}, function(data) {
		console.log("getSeatData err");
	});
});

//获取电影信息 根据电影海报编号 也就是电影编号 在数据库中查找
function getMovieData(num) {
	return new Promise(function(resolve, reject) {
		MovieData.find({'poster' : num}, function(err, data) {
			resolve(data);
		});
	});
}

//获取座位表
function getSeatData(title_) {
	return new Promise(function(resolve, reject) {
		SeatData.find({"movie_title" : title_}, function(err, data) {
			if (data.toString() != "") {
				resolve(data);
			} else {
				reject(err);
			}
		});
	});
}

//用户名是否存在判断
function username_not_repeat(user) {
	return new Promise(function(resolve, reject){
		User.find({'username' : user.username}, function(err, docs) {
			if (docs.toString() != "") {
				judge = 1;
			}
			resolve(judge);
		});
	});
}

//电话是否存在判断
function phone_not_repeat(user) {
	return new Promise(function(resolve, reject){
		User.find({'phone' : user.phone}, function(err, docs) {
			if (docs.toString() != "") {
				judge = 2;
			}
			resolve(user);
		});
	});
}

//邮箱是否存在判断
function mail_not_repeat(user) {
	return new Promise(function(resolve, reject){
		User.find({'mail' : user.mail}, function(err, docs) {
			if (docs.toString() != "") {
				judge = 3;
			}
			resolve(user);
		});
	});
}

//判断用户名密码是否一致
function user_valid(user) {
	return new Promise(function(resolve, reject) {
		User.find({'username': user.username, 'password': user.password}, function(err, docs) {
			resolve(docs);
		})
	});
}

module.exports = router;