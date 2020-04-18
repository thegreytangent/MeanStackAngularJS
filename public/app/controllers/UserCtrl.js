angular.module('UserController', []).

controller('regCtrl', function($http) {
    
    const app = this;
    console.log(app.Msg);
    this.submitRegisterUser = function() {

        $http.post('api/users', this.regData).then(function(data){
            app.isSuccess = data.data.success;
            app.Msg = data.data.message;
                console.log("api/users", data);
        });

       
     
    
  
   }


});