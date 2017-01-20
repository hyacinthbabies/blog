myApp.controller('ArticleController', function($scope, $state) {
    var page = {
        pageNo: 0,
        pageSize: 8
    };
    var lists = [{
        date: '2017/1/10',
        title: '小程序',
        summary: '小程序也有应用商城，只是app需要下载，而它是扫描二维码。小程序也有应用商城，只是app需要下载，而它是扫描二维码小程序也有应用商城，只是app需要下载，而它是扫描二维码'
    }, {
        date: '2017/1/10',
        title: '小程序',
        summary: '小程序也有应用商城，只是app需要下载，而它是扫描二维码。小程序也有应用商城，只是app需要下载，而它是扫描二维码小程序也有应用商城，只是app需要下载，而它是扫描二维码'
    }];

    $scope.articleLists = lists;
    $scope.showType = 'list';
    $scope.queryDetail = function(type) {
        switch (type) {
            case 'query':
                // $scope.showType = 'query';
                $state.go('app.article-detail');
                break;
            case 'edit':
                // $scope.showType = 'edit';
                $state.go('app.article-update');
                break;
            case 'delete':
                $scope.showType = 'delete';
                break;
        }
        console.log($scope.showType);
    }
});
