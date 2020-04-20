angular.module('MainController', ['AuthService'])
.controller('MainCtrl', function(Auth, $timeout, $location){
  const app = this;

  if (Auth.isLogin()) {
    console.log("login");
  } else {
    console.log("not login");
  }


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
            $location.path("/");
      }, 2000);
    }



});
