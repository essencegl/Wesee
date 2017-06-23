var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MyUser = new Schema({
    username : String,
    password : String,
    phone : String,
    mail : String
});

exports.User = mongoose.model("User", MyUser);