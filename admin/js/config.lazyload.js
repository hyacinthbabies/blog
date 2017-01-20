myApp.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
    // We configure ocLazyLoad to use the lib script.js as the async loader
    $ocLazyLoadProvider.config({
        debug: false,
        events: true,
        modules: [{
                name: 'ui.calendar',
                files: ['framework/modules/angular-ui-calendar/calendar.js']
            }

        ]
    });
}]);
