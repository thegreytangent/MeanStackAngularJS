angular.module('userApp',[
    'appRoutes',
    'UserController',
    'MainController',
    'AuthService',
    'UserService',
    'ngAnimate'
])
.config(($httpProvider) => {
  $httpProvider.interceptors.push('AuthInterceptors');
});
