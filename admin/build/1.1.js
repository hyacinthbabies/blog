webpackJsonp([1],{

/***/ 4:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// class ArticleController {
	//     constructor($scope, $state) {

	//     }

	//     test($scope, $state) {
	//         var page = {
	//             pageNo: 0,
	//             pageSize: 8
	//         };
	//         var lists = [{
	//             date: '2017/1/10',
	//             title: '小程序',
	//             summary: '小程序也有应用商城，只是app需要下载，而它是扫描二维码。小程序也有应用商城，只是app需要下载，而它是扫描二维码小程序也有应用商城，只是app需要下载，而它是扫描二维码'
	//         }, {
	//             date: '2017/1/10',
	//             title: '小程序',
	//             summary: '小程序也有应用商城，只是app需要下载，而它是扫描二维码。小程序也有应用商城，只是app需要下载，而它是扫描二维码小程序也有应用商城，只是app需要下载，而它是扫描二维码'
	//         }];
	//         $scope.articleLists = lists;
	//         $scope.showType = 'list';
	//         $scope.queryDetail = (type) => {
	//             switch (type) {
	//                 case 'query':
	//                     // $scope.showType = 'query';
	//                     $state.go('app.article-detail');
	//                     break;
	//                 case 'edit':
	//                     // $scope.showType = 'edit';
	//                     $state.go('app.article-update');
	//                     break;
	//                 case 'delete':
	//                     $scope.showType = 'delete';
	//                     break;
	//             }
	//             console.log($scope.showType);
	//             console.log('ssss');
	//         }
	//     }
	// }

	// export default angular.module('app').controller('ArticleController',() => new ArticleController());
	var ArticleController = function () {
	    function ArticleController() {
	        _classCallCheck(this, ArticleController);

	        this.name = 'angular&es6';
	    }

	    _createClass(ArticleController, [{
	        key: 'getName',
	        value: function getName() {
	            debugger;
	            return this.name;
	        }
	    }]);

	    return ArticleController;
	}();

	exports.default = angular.module('app', []).controller('ArticleController', new ArticleController()).name;

/***/ }

});