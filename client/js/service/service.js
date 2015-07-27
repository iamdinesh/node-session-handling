app.factory("request",function($q,$http,$location){
	return {
		"login" : login,
		"addUser" :addUser,
		"signout" : signout,
		"kill" : kill,
		"test" :test
	};
	function login(data){
		return promise("POST","/api/validate",data);
	};

	function addUser(data){
		return promise("POST","/api/api/addUser",data);
	};

	function signout(){
		return promise("DELETE","/api/signout",null);	
	};

	function test(){
		return promise("GET","/api/dummy",null);	
	};

	function kill(){
		$location.path = "/login";
	};

	function redirect(){
		$location.path('/login');
	}
	function promise(method,url,data){
		var defer = $q.defer();
		$http({
			"method" : method,
			"url" : url,
			"data" :data
		}).success(function(res){
			if(res.status == "Not Authenticated"){
				defer.resolve(redirect())
			} else {
				defer.resolve(res);
			}			
		}).error(function(err){
			defer.reject(err);
		});
		return defer.promise;
	}
})