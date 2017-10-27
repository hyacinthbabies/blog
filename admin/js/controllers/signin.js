/* Controllers */
// signin controller
angular.module('app').controller('SigninFormController', ['$scope', '$http', '$state', '$rootScope', function($scope, $http, $state, $rootScope) {
    $scope.user = {
        name: '',
        password: ''
    };
    $scope.authError = null;
    $scope.login = function() {
      $scope.authError = null;
      $http.post('/api/login', {userName: $scope.user.name, password: $scope.user.password})
      .then(function(response) {
        if(response.status === 200){
          $state.go("app.article-list");
        }
      }, function(x) {
        $scope.authError = '服务器错误';
      });
    };
    // $rootScope.user = {};
    // $scope.login = function() {
    //     if ($scope.user.name == 'hyacinth' && $scope.user.password == '123456') {
    //         $rootScope.user = {
    //             token: '1vfw33fdsdcfudsi8f'
    //         };

    //         $state.go('app.calendar');

    //     } else {
    //         alert('用户名或密码错误，请重新输入')
    //     }
    // }
}]);
