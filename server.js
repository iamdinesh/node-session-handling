var express = require("express");
var bodyParser = require("body-parser");
var bcrypt = require('bcrypt');
var model = require('./mongoose.js');
var session = require('express-session');

var app = express();
app.use(bodyParser());
app.set("view engine","jade");


/*configure your session*/
app.use(
	session({ 
		secret: 'keyboard cat', 
		cookie: { maxAge: 3*60 * 1000},
		rolling: true
	})
);


/*Configure your middle layer -- validate your session object*/
app.use(function(req,res,next){
	if(req.url.indexOf('/api/') >= 0){
		if(req.url.indexOf("validate") >= 0 || req.url.indexOf("addUser") >=0 || req.session.userName){
			next();
		} else {
			return res.json({"status":"Not Authenticated"});
		}
	} else {
		next();
	}
});

app.get(/.*?\.\w{2,4}$/,function(req,res){
	if(req.url.indexOf('.jade') > 0){
		return res.render(__dirname+'/client/'+req.url);
	} else {
		return res.sendFile(__dirname+'/client/'+req.url);	
	}	
});

app.post("/api/addUser",function(req,res){
	var data = req.body;
	var salt = bcrypt.genSaltSync(10);
	data.password = bcrypt.hashSync(data.password,salt);
	model.create(data,function(err,user){
		if(err){
			return res.send({"status":"Error","data":err});
		} else {
			return res.send({"status":"success"});
		}
	});
});


app.post("/api/validate",function(req,res){
	var data = req.body;
	model.findOne({'email':data.email},function(err,user){
		if(err){
			return res.send({"status":"Error","data":err});
		} else {
			if(bcrypt.compareSync(data.password,user.password)){
				/*set the user name in the session*/
				req.session.userName = req.body.email;
				return res.send({"status":"success"});
			} else {
				return res.send({"status":"mismatch"})	
			}
			
		}
	});
});

app.get("/api/dummy",function(req,res){
	console.log("sessionObj",req.session.userName);
	res.json({"status":"success"});
});

app.delete("/api/signout",function(req,res){
	req.session.destroy();
	res.json({"status":"success","message":"session cleared successfully"});
});

app.get("/",function(req,res){
	console.log("inside /");
	res.render(__dirname+'/client/index',{title:"Session Handling"});
});

app.listen(3000,function(){
	console.log("Listining to port 3000");
});