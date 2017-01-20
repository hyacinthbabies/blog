myApp.controller('ProfileController', function($scope, $state) {
     $scope.timeline = true;
     $scope.select = function(option){
         switch(option){
         	case '1':
         	    $scope.timeline = true;
         	    break;
         	case '2':
         	    $scope.timeline = false;
         	    break;
         }
     }
});