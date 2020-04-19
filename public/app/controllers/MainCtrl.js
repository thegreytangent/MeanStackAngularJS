angular.module('MainController', ['AuthService'])
.controller('MainCtrl', function(Auth, $timeout, $location){
   

    const app = this;
       
    this.doLogin = function () {
        app.loading = true;
        Auth.login(app.loginData).then(function (data) {
            const loginData = app.loginData;
            console.log({
                loginData,
                data
            });
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
    


});