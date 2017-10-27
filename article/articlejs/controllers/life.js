myApp.controller('LifeCtrl', ['$scope', '$http', function($scope, $http) {
  // $http.get('articlejs/controllers/life.json').then(function (resp) {
  //   $scope.notes = resp.data.notes;
  //   // set default note
  //   $scope.note = $scope.notes[0];
  //   $scope.notes[0].selected = true;
  // });
  $scope.notes = [];

  //查询文章列表
  $http.post('/api/content/list')
  .then(function(response) {
      if(response.status === 200){
          $scope.notes = response.data;
          // set default note
          findDetail($scope.notes[0]._id);
          $scope.notes[0].selected = true;
      }
  }, function(x) {
      $scope.authError = 'Server Error';
  });

  //查询文章详情
	function findDetail(id){
      $http.post("/api/queryContent/"+id)
    .then(function(response) {
        if(response.status === 200){
          $scope.note = response.data;
          $("#content").html(response.data.articleContent);
        }
    }, function(x) {
        $scope.authError = 'Server Error';
    });
  }

  $scope.colors = ['primary', 'info', 'success', 'warning', 'danger', 'dark'];

  $scope.selectNote = function(id){
    angular.forEach($scope.notes, function(note,index) {
      note.selected = false;
      if(note._id === id){
        note.selected = true;
      }
    });
    findDetail(id);
  }
  $scope.show = true;
  $scope.btnContent = "隐藏侧栏";
  $scope.hideNav = function(){
    $scope.show = $scope.show ? false:true;
    $scope.btnContent = $scope.show?"隐藏侧栏":"打开侧栏";
  }

}]);
