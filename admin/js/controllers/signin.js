/* Controllers */
// signin controller
angular.module('app').controller('SigninFormController', ['$scope', '$http', '$state', '$rootScope', function($scope, $http, $state, $rootScope) {
    $scope.user = {
        name: '',
        password: ''
    };
    $scope.authError = null;
    // $scope.login = function() {
    //   $scope.authError = null;
    //   // Try to login
    //   $http.post('api/login', {email: $scope.user.email, password: $scope.user.password})
    //   .then(function(response) {
    //     if ( !response.data.user ) {
    //       $scope.authError = 'Email or Password not right';
    //     }else{
    //       $state.go('app.dashboard-v1');
    //     }
    //   }, function(x) {
    //     $scope.authError = 'Server Error';
    //   });
    // };
    $rootScope.user = {};
    $scope.login = function() {
        if ($scope.user.name == 'hyacinth' && $scope.user.password == '123456') {
            $rootScope.user = {
                token: '1vfw33fdsdcfudsi8f'
            };

            $state.go('app.calendar');

        } else {
            alert('用户名或密码错误，请重新输入')
        }
    }
}]);
