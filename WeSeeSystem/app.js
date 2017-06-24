var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var session = require('express-session');
//var FileStore = require('session-file-store')(session);
var busboy = require("connect-busboy");

var index = require('./routes/index');
var now_show_page = require('./routes/now_show_page');
var later_show_page = require('./routes/later_show_page');
var personal_center = require('./routes/personal_center');



var app = express();

var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/WeSeeMovie');

//设定views系统变量，意为视图存放的目录，即将视图当前目录的views文件夹下面
app.set('views', path.join(__dirname, 'views'));

//设定view engine系统变量，意为网页模板引擎
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));     //将请求信息打印在控制台，便于开发调试；

//下面代码将请求日志打印到access.log文件中
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});
app.use(logger('combined', {stream: accessLogStream}));

app.use(bodyParser.json());    //处理json数据，没有设置路由路径，对所有请求都会拦截并解析
app.use(bodyParser.urlencoded({ extended: false })); //处理utf-8编码的数据，没有设置路由，对所有请求都会拦截并且解析
app.use(cookieParser());    //解析后的unsigned cookie保存在req.cookies中，
                            //而解析后的signed cookie只保存在req.signedCookies中。
                            //使用cookie-parser插件，后续代码直接使用req.cookies或者req.signedCookies即可

app.use(session({
    resave:false,
    saveUninitialized:false,
    secret: 'keyboard cat'
}));

app.use(busboy({
  limits: { fileSize : 10*1024*1024 }
}));

app.use(express.static(path.join(__dirname, 'public'))); //设置静态文件目录

//主页路由，包括Home和登陆注册的处理
app.use('/', index);
//正在热映路由
app.use('/now_show_page', now_show_page);
//即将上映路由
app.use('/later_show_page', later_show_page);
//个人中心路由
app.use('/personal_center', personal_center);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
