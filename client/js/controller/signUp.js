app.controller("signUpCtrl",function($scope,request){
	$scope.user = {};

	$scope.addUser = function(){
		request.addUser($scope.user).then(function(res){
			console.log("res",res);
		});
	}	
});