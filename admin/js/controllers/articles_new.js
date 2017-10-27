angular.module('app').controller('AddNewControl', function($scope,$rootScope,$http,$state) {
    $scope.editorContent = '';
    $scope.editorName = "";
    $scope.authorName = "宋华茜";
    $scope.editorType = "2";
    
    //新增文章
    $scope.add = function() {
      $scope.authError = null;
      if($scope.editorName.trim() ===""||
      $('#textarea1').val() === "")return;
      $http.post('/api/postContent', {articleName:$scope.editorName.trim(),
        articleContent:$('#textarea1').val(),
        authorName:$scope.authorName,
        articleType:$scope.editorType,
        articleDate:new Date()})
      .then(function(response) {
        if (response.status === 200 ) {
          $state.go("app.article-list")
        }
      }, function(x) {
        $scope.authError = 'Server Error';
      });
    };
});
