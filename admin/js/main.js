myApp.controller('AppCtrl', ['$scope', '$rootScope','$state',
    function($scope, $rootScope,$state) {
        // add 'ie' classes to html
        // var isIE = !!navigator.userAgent.match(/MSIE/i);
        // isIE && angular.element($window.document.body).addClass('ie');
        // isSmartDevice($window) && angular.element($window.document.body).addClass('smart');
        // config
        $scope.app = {
            name: 'Hyacinth',
            version: '1.3.3',
            // for chart colors
            color: {
                primary: '#7266ba',
                info: '#23b7e5',
                success: '#27c24c',
                warning: '#fad733',
                danger: '#f05050',
                light: '#e8eff0',
                dark: '#3a3f51',
                black: '#1c2b36'
            },
            settings: {
                themeID: 1,
                navbarHeaderColor: 'bg-black',
                navbarCollapseColor: 'bg-white-only',
                asideColor: 'bg-black',
                headerFixed: true,
                asideFixed: false,
                asideFolded: false,
                asideDock: false,
                container: false
            }
        }
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            if (toState.name == 'access.signin' || toState.name == 'access.signup' || toState.name == 'access.forgotpwd') return; // 如果是进入登录界面则允许
            // 如果用户不存在
            //最好再多加cookie记录
            if (!$rootScope.user || !$rootScope.user.token) {
                event.preventDefault(); // 取消默认跳转行为
                $state.go("access.signin",{from:fromState.name,w:'notLogin'}); //跳转到登录界面
            }
        });


    }
]);
