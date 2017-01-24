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
                .otherwise('/app/skill');
            // $locationProvider.html5Mode(true);
            $stateProvider
                .state('app', {
                    abstract: true, //表明此状态不能被显性激活，只能被子状态隐性激活
                    url: '/app',
                    templateUrl: 'articletpl/app.html'
                })
                .state('app.skill', {
                    url: '/skill',
                    templateUrl: 'articletpl/skill.html',
                    resolve: { //被使用来处理异步数据调用，以下是返回一个 promise
                        loadMyControl: ['$ocLazyLoad',
                            function($ocLazyLoad) {
                                return $ocLazyLoad.load(['framework/libs/moment.min.js', 'articlejs/controllers/skill.js']);
                            }
                        ]
                    }
                })
                .state('app.life', {
                    url: '/life',
                    templateUrl: 'articletpl/life.html',
                    resolve: { //被使用来处理异步数据调用，以下是返回一个 promise
                        loadMyControl: ['$ocLazyLoad',
                            function($ocLazyLoad) {
                                return $ocLazyLoad.load(['framework/libs/moment.min.js', 'articlejs/controllers/life.js']);
                            }
                        ]
                    }
                })
        }
    ]);
