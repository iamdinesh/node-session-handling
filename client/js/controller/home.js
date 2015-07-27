app.controller("homeCtrl",function($scope,request,$location){

	$scope.logout = function(){
		request.signout().then(function(res){
			console.log("response",res);
			$location.path("/login");
		});
	}

	$scope.test = function(){
		request.test().then(function(res){
			console.log("response");
		});
	}
});