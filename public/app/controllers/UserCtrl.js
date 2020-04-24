angular.module('UserController', ['UserService'])
.controller('regCtrl', function ($http, $location, $timeout, User) {

  const app = this;
  app.usernameValid = true;

  this.submitRegisterUser = function (valid) {
    app.loading = true;


    if (!valid) {
      app.loading = false;
      app.Msg = "Please check all data you entered is valid.";
    }else {
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
  }





  this.checkEmail = (email) => {
    if (!email) return false;
    if (email) {

      app.checkingEmail = true;
      app.emailInvalid = false;
      app.emailMessage = false;

      User.checkEmail({ email : email }).then((data) => {
        app.emailInvalid    = data.data.success;
        app.emailMessage    = data.data.message;
        app.checkingEmail   = false;
        console.log("email data ", data.data.success);
      });
    }
  }



  this.checkUsername = (username) => {
    if (!username) return false;
    app.checkingUsername = true;
    if (username) {
      app.usernameMessage = false;

      User.checkUsername({ username : username }).then((data) => {
        app.usernameValid = !data.data.success ? false : true;

        app.usernameMessage    = data.data.message;
        app.checkingUsername   = false;
        console.log("username data ", app.usernameValid);
      });

    }
  }
})

.directive('match', function() {
  return {
    restrict: 'A',
    controller: ($scope) => {

      $scope.confirmed = false;

      $scope.doConfirm  = function(values) {
        values.forEach((elem) => {

          if (elem === $scope.confirm) {
            $scope.confirmed = true;
          } else {
            $scope.confirmed = false;
          }
            console.log("confirm ", $scope.confirmed, $scope.confirm, elem);
        });

      }
    },
    link : function(scope,element, attrs) {
      attrs.$observe('match', function() {
        scope.matches = JSON.parse(attrs.match);
        scope.doConfirm(scope.matches);
      });
      scope.$watch('confirm', function() {
        scope.matches = JSON.parse(attrs.match);
        scope.doConfirm(scope.matches);
      })
    }
  };

});
