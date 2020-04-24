angular.module("UserService",[])
.factory("User", function($http){
	userFactory = [];

    userFactory.create = function(regData) {
    	return $http.post('api/users', regData)
    }


    userFactory.checkUsername = function(email) {
    	return $http.post('api/checkUsername', email)
    }


    userFactory.checkEmail = function(regData) {
    	return $http.post('api/checkEmail', regData)
    }


    return userFactory;
});