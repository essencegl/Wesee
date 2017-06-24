var express = require('express');
var router = express.Router();

/* GET later_show_page. */
router.get('/', function(req, res, next) {
  if (!req.session.user) {
  	res.render("later_show_page", {session_username : "登陆"});
  } else {
  	res.render("later_show_page", {session_username : req.session.user.username});
  }
});

module.exports = router;