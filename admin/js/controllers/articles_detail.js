angular.module('app').controller('DetailControl',function($http,$scope,$stateParams){
	$scope.content = '';
    let id = $stateParams.id;
    //查询文章详情
	$http.post("/api/queryContent/"+id)
    .then(function(response) {
        if(response.status === 200){
			$scope.content = response.data;
			$("#htmlContent").html($scope.content.articleContent);
        }
    }, function(x) {
        $scope.authError = 'Server Error';
    });
});