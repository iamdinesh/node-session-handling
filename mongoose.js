var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost:27017/sessionHandling");

var userSchema = new Schema({
	"name" : String,
	"userName" : {
		type : String,
		unique : true,
		required : true
 	},
 	"email" : {
 		type : String,
		unique : true,
		required : true	
 	},
 	"password" : String
});

var User = mongoose.model("users",userSchema)

module.exports = User;