myApp.controller('AppCtrl', ['$scope', '$rootScope','$state',
    function($scope, $rootScope,$state) {
        // add 'ie' classes to html
        // var isIE = !!navigator.userAgent.match(/MSIE/i);
        // isIE && angular.element($window.document.body).addClass('ie');
        // isSmartDevice($window) && angular.element($window.document.body).addClass('smart');
        // config
        $scope.app = {
            name: 'Hyacinth',
            version: '1.0',
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
        $( function() { $( 'audio' ).audioPlayer(); } )
    }
]);
