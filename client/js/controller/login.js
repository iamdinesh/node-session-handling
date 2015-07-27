app.controller("loginCtrl",function($scope,request,$location,idleTimer){
	$scope.login = {};

	$scope.validate = function(){
		request.login($scope.login).then(function(res){
			if(res.status === "success"){
				idleTimer.watch();
				$location.path('/home');
			} else {
				alert("Error occured please try again.");
			}
		});
	}	
});