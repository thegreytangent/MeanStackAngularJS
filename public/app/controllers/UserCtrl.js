angular.module('UserController', ['UserService']).

    controller('regCtrl', function ($http, $location, $timeout, User) {

        const app = this;
       
        this.submitRegisterUser = function () {
            app.loading = true;
            User.create(app.regData).then(function (data) {
                app.isSuccess = data.data.success;
                app.Msg = data.data.message;

                $timeout(function(){
                    $location.path("/");
                },2000);
              
                app.loading = false;
            });
        }


    });