angular.module('app').controller('ArticleController', function($scope, $state,$http,$rootScope) {
    $scope.authError = null;

    //查询文章列表
    $http.post('/api/content/list')
    .then(function(response) {
        if(response.status === 200){
            $scope.articleLists = response.data;
        }
    }, function(x) {
        $scope.authError = 'Server Error';
    });
    $scope.showType = 'list';

    //删除文章
    let deleteArticle = function(id) {
        $http.post('/api/removeArticle', {articleId:id})
        .then(function(response) {
          if (response.status === 200 ) {
            $http.post('/api/content/list')
            .then(function(response) {
                if(response.status === 200){
                    $scope.articleLists = response.data;
                }
            }, function(x) {
                $scope.authError = 'Server Error';
            });
          }
        }, function(x) {
          $scope.authError = 'Server Error';
        });
      };
    
    //查询文章详情
    $scope.jumpType = (type,id) => {
        switch (type) {
            case 'query':
                // $scope.showType = 'query';
                $state.go('app.article-detail',{id: id});
                break;
            case 'edit':
                // $scope.showType = 'edit';
                $state.go('app.article-update',{id: id});
                break;
            case 'delete':
                deleteArticle(id);
                break;
        }
    }
});

// export default angular.module('app').controller('ArticleController',() => new ArticleController());
// class ArticleController {
//     constructor() { 
//         this.name = 'angular&es6';
//     }

//     getName() {
//         debugger;
//         return this.name;
//     }
// }
// export default angular.module('app', [])
//     .controller('Article', new ArticleController())
//     .name;
