var express = require('express');
var router = express.Router();
var fs = require('fs');
var mongoose = require('mongoose');
var models = require('../Models/models.js');

//var User = models.User;
//var db = mongoose.connect('mongodb://localhost/test');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resources');
});

//list all users in data/users.json
router.get('/listUsers', function(req, res) {
    fs.readFile('./data/users.json', 'utf8', function (err, data) {
    	data = JSON.parse(data);
    	console.log(data);
    	res.end(JSON.stringify(data));
    });
})

//find a user with its id and send it

router.get('/:id', function(req, res) {
	fs.readFile('./data/users.json', 'utf8', function(err, data) {
		data = JSON.parse(data);
		var user_id = "user" + req.params.id;
		var user = data[user_id];
		console.log(user);
		res.send(JSON.stringify(user));
	});
})

module.exports = router;
