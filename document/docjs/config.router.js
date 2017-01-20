/*
路由配置
 */
myApp.run(
    ['$rootScope', '$state', '$stateParams',
        function($rootScope, $state, $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }
    ]
).config(
    ['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider
                .otherwise('/app/docs');
            $stateProvider
                .state('app', {
                    abstract: true, //表明此状态不能被显性激活，只能被子状态隐性激活
                    url: '/app',
                    templateUrl: 'doctpl/app.html'
                })
                .state('app.docs', {
                    url: '/docs',
                    templateUrl: 'doctpl/docs.html'
                })
                .state('app.bootstrap', {
                    url: '/bootstrap',
                    templateUrl: 'doctpl/bootstrap.html'
                })
        }
    ]);
