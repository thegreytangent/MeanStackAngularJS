angular.module('MainController', ['AuthService'])
.controller('MainCtrl', function(Auth, $timeout, $location, $rootScope){
  const app = this;



  app.loadMe = false;


  $rootScope.$on('$routeChangeStart', () => {
      console.log("Route change");

      if (Auth.isLogin()) {
        app.isLogin = true;
        Auth.getUser().then((data) => {
          const user = data.data;
          app.username = user.username;
          app.email = user.email;
          console.log("isLogin", app.username);
        });
      } else {
        app.isLogin = false;
      }

      app.loadMe = true;

  });




    this.doLogin = function() {

        app.loading = true;
        Auth.login(app.loginData).then(function (data) {
            const loginData = app.loginData;

            console.log("data", data);

            app.isSuccess = data.data.success;
            app.Msg = data.data.message;

            if (!app.isSuccess) {
                return false;
            }else {
                $timeout(function(){
                    $location.path("/");
                },2000);
            }


            app.loading = false;
        });
    }


    this.logout = () => {
      Auth.logout();
      $location.path("/logout");
      $timeout(()=> {
          app.loginData = null;
          app.isSuccess = null;
          app.Msg = null;
          app.username = null;
            $location.path("/");
      }, 2000);
    }



});
