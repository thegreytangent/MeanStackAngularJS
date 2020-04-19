angular.module('AuthService', [])
.factory("Auth", function($http){
    AuthFactory = [];
    
    //User.create(regData)
    AuthFactory.login = function(data) {
            return $http.post('api/auth', data)
    }

    return AuthFactory;
});