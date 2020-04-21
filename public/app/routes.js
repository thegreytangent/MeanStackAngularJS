const app = angular.module('appRoutes',['ngRoute'])
.config(function($routeProvider, $locationProvider){
  $routeProvider.
  when('/', {
    templateUrl: 'app/views/pages/home.html'
  })
  .when('/about', {
    templateUrl: 'app/views/pages/about.html'
  })
  .when('/register', {
    templateUrl: 'app/views/pages/register.html',
    controller: 'regCtrl',
    controllerAs: 'register',
    authenticated: false
  })
  .when('/login', {
    templateUrl: 'app/views/pages/login.html',
    authenticated: false
  })
  .when('/logout', {
    templateUrl: 'app/views/pages/logout.html',
    authenticated: true
  })
  .when('/about', {
    templateUrl: 'app/views/pages/about.html'
  })
  .when('/profile', {
    templateUrl : 'app/views/pages/profile.html'
  })
  .otherwise({
    redirectTo: '/'
  })

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: true
  });

});


app.run(['$rootScope','Auth','$location', function($rootScope,Auth, $location) {

  $rootScope.$on('$routeChangeStart', function(event , next , current) {
    const isAuthenticated = next.$$route.authenticated;

    if (isAuthenticated === true) {

      if (!Auth.isLogin()) {
        event.preventDefault();
        $location.path("/");
      }

    } else if (isAuthenticated === false) {

      if (Auth.isLogin()) {
        event.preventDefault();
        $location.path("/profile");
      }

    } else {
      console.log("sure undefine");
    }


  });
}]);



// $rootScope.$on('$routeChangeStart', () => {
//     console.log("Route change");
//
//     if (Auth.isLogin()) {
//       app.isLogin = true;
//       Auth.getUser().then((data) => {
//         const user = data.data;
//         app.username = user.username;
//         app.email = user.email;
//         console.log("isLogin", app.username);
//       });
//     } else {
//       app.isLogin = false;
//     }
//
//     app.loadMe = true;
//
// });
