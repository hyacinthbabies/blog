/*
路由配置
 */
angular.module('app').run(
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
                .otherwise('/access/signin');
            $stateProvider
                .state('app', {
                    abstract: true, //表明此状态不能被显性激活，只能被子状态隐性激活
                    url: '/app',
                    templateUrl: 'tpl/app.html'
                })
                .state('app.article-list', {
                    url: '/article-list',
                    templateUrl: 'tpl/articles_list.html',
                    resolve: { //被使用来处理异步数据调用，以下是返回一个 promise
                        // loadMyControl: ['$ocLazyLoad',
                        //     function($ocLazyLoad) {
                        //         return $ocLazyLoad.load(['js/controllers/articles_list.js']);
                        //     }
                        // ]
                        loadListController: ($q, $ocLazyLoad) => {
                            return $q((resolve) => {
                                require.ensure([], () => {
                                    // load whole module
                                    let module = require('./controllers/articles_list.js');
                                    $ocLazyLoad.load({ name: 'app' });
                                    resolve(module.controller);
                                });
                            });
                        }
                    }
                })
                .state('app.article-detail', {
                    url: '/article-detail',
                    templateUrl: 'tpl/articles_detail.html',
                    resolve: { //被使用来处理异步数据调用，以下是返回一个 promise
                        // loadMyControl: ['$ocLazyLoad',
                        //     function($ocLazyLoad) {
                        //         return $ocLazyLoad.load(['js/controllers/articles_detail.js']);
                        //     }
                        // ]
                        loadDetailController: ($q, $ocLazyLoad) => {
                            return $q((resolve) => {
                                require.ensure([], () => {
                                    // load whole module
                                    let module = require('./controllers/articles_detail.js');
                                    $ocLazyLoad.load({ name: 'app' });
                                    resolve(module.controller);
                                });
                            });
                        }
                    }
                })
                .state('app.article-update', {
                    url: '/article-update',
                    templateUrl: 'tpl/articles_update.html',
                    resolve: { //被使用来处理异步数据调用，以下是返回一个 promise
                        loadMyControl: ['$ocLazyLoad',
                            function($ocLazyLoad) {
                                return $ocLazyLoad.load(['js/controllers/articles_update.js', 'framework/wangeditor/css/wangEditor.min.css', 'framework/wangeditor/wangEditor.min.js']);
                            }
                        ]
                    }
                })
                .state('app.calendar', {
                    url: '/calendar',
                    templateUrl: 'tpl/app_calendar.html',
                    resolve: { //被使用来处理异步数据调用，以下是返回一个 promise
                        loadMyControl: ['$ocLazyLoad',
                            function($ocLazyLoad) {
                                return $ocLazyLoad.load(
                                    ['framework/jquery/fullcalendar/fullcalendar.css',
                                        'framework/jquery/fullcalendar/theme.css',
                                        'framework/jquery/jquery-ui-1.10.3.custom.min.js',
                                        'framework/libs/moment.min.js',
                                        'framework/jquery/fullcalendar/fullcalendar.min.js',
                                        'js/app/calendar/calendar.js'
                                    ]
                                ).then(function() {
                                    return $ocLazyLoad.load('ui.calendar');
                                })
                            }
                        ]
                    }
                })
                // pages
                .state('app.page', {
                    url: '/page',
                    template: '<div ui-view class="fade-in-down"></div>'
                })
                .state('app.page.profile', {
                    url: '/profile',
                    templateUrl: 'tpl/page_profile.html',
                    resolve: { //被使用来处理异步数据调用，以下是返回一个 promise
                        loadMyControl: ['$ocLazyLoad',
                            function($ocLazyLoad) {
                                return $ocLazyLoad.load(['js/controllers/app_profile.js']);
                            }
                        ]
                    }
                })
                .state('access', {
                    url: '/access',
                    template: '<div ui-view class="fade-in-right-big smooth"></div>'
                })
                .state('access.signin', {
                    url: '/signin',
                    templateUrl: 'tpl/page_signin.html',
                    resolve: { //被使用来处理异步数据调用，以下是返回一个 promise
                        //     deps: ['uiLoad',
                        //         function(uiLoad) {
                        //             return uiLoad.load(['js/controllers/signin.js']);
                        //         }
                        //     ]
                        loadMyControl: ['$ocLazyLoad',
                            function($ocLazyLoad) {
                                return $ocLazyLoad.load(['js/controllers/signin.js']);
                            }
                        ]
                    }
                })
                .state('access.signup', {
                    url: '/signup',
                    templateUrl: 'tpl/page_signup.html',
                    // resolve: {//被使用来处理异步数据调用，以下是返回一个 promise
                    //     deps: ['uiLoad',
                    //       function( uiLoad ){
                    //         return uiLoad.load( ['js/controllers/signup.js'] );
                    //     }]
                    // }
                })
                .state('access.forgotpwd', {
                    url: '/forgotpwd',
                    templateUrl: 'tpl/page_forgetpwd.html'
                })
                .state('mind', {
                    abstract: true,
                    url: '/mind',
                    templateUrl: 'tpl/mind.html'
                })
                .state('mind.contact', {
                    url: '/contact',
                    templateUrl: 'tpl/mind_contact.html',
                    resolve: { //被使用来处理异步数据调用，以下是返回一个 promise

                        loadMyControl: ['$ocLazyLoad',
                            function($ocLazyLoad) {
                                return $ocLazyLoad.load(['js/controllers/contact.js']);
                            }
                        ]
                    }
                })
                .state('mind.account', {
                    url: '/account',
                    templateUrl: 'tpl/mind_account.html',
                    resolve: { //被使用来处理异步数据调用，以下是返回一个 promise

                        loadMyControl: ['$ocLazyLoad',
                            function($ocLazyLoad) {
                                return $ocLazyLoad.load(['js/controllers/contact.js']);
                            }
                        ]
                    }
                })
                .state('mind.check', {
                    url: '/check',
                    templateUrl: 'tpl/mind_check.html',
                    resolve: { //被使用来处理异步数据调用，以下是返回一个 promise

                        loadMyControl: ['$ocLazyLoad',
                            function($ocLazyLoad) {
                                return $ocLazyLoad.load(['js/controllers/contact.js']);
                            }
                        ]
                    }
                })
        }
    ]);
