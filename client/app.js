var app = angular.module("session",['ui.router','ngIdleTimer']);



/*For idle timer give time in seconds*/
app.run(function(idleTimer,request){
	idleTimer.initilize({
  		idleTime : 3*60,
  		alertTime : 1*60,
  		extendSession : request.test,
  		killSession : function(){
  			window.location.href = "/#/login";
  		}
  	});
});

app.config(function($stateProvider,$urlRouterProvider){

	$urlRouterProvider.otherwise("/login");

	$stateProvider.state('login',{
		"url":'/login',
		"templateUrl":"template/login.jade",
		"controller":"loginCtrl"
 	}).state('signUp',{
 		"url":'/signUp',
		"templateUrl":"template/signUp.jade",
		"controller":"signUpCtrl"	
 	}).state('home',{
 		"url":'/home',
		"templateUrl":"template/home.jade",
		"controller":"homeCtrl"	
 	})
});
