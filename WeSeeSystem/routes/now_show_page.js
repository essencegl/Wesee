var express = require('express');
var router = express.Router();

/* GET now_show_page. */
router.get('/', function(req, res, next) {
  if (!req.session.user) {
  	res.render("now_show_page", {session_username : "登陆"});
  } else {
  	res.render("now_show_page", {session_username : req.session.user.username});
  }
});

module.exports = router;