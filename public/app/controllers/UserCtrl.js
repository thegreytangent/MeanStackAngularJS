angular.module('UserController', ['UserService']).

    controller('regCtrl', function ($http, $location, $timeout, User) {

        const app = this;

        this.submitRegisterUser = function () {
            app.loading = true;
            console.log("data_submitted ");
            User.create(app.regData).then(function (data) {
              console.log("data_register ", data);
                app.isSuccess = data.data.success;
                app.Msg = data.data.message;

                if (!app.isSuccess) {
                  return false;
                }
                $timeout(function(){
                    $location.path("/login#pleaseLogin");
                },2000);

                app.loading = false;
            });
        }


    });
