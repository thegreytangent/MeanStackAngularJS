angular.module('AuthService', [])

.factory("Auth", function($http, AuthToken){
AuthFactory = [];
//User.create(regData)
AuthFactory.login = function(data) {
	return $http.post('api/auth', data).then((getData) => {
		AuthToken.setToken(getData.data.token);
		return getData;
	});
}

AuthFactory.isLogin = () => {
	return AuthToken.getToken() ? true : false;
}

AuthFactory.logout = () => {
	AuthToken.setToken();
}

return AuthFactory;
})



.factory("AuthToken", function($window) {
AuthTokenFactory = {};

AuthTokenFactory.setToken = function(token) {

	if (token) {
			$window.localStorage.setItem('token', token);
	} else {
			$window.localStorage.removeItem('token');
	}

}

AuthTokenFactory.getToken = () => {
	return $window.localStorage.getItem('token');
}


return AuthTokenFactory;

});
