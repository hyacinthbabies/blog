angular.module('app').config(
    ['$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
        function($controllerProvider, $compileProvider, $filterProvider, $provide) {

            // lazy controller, directive and service
            myApp.controller = $controllerProvider.register;
            myApp.directive = $compileProvider.directive;
            myApp.filter = $filterProvider.register;
            myApp.factory = $provide.factory;
            myApp.service = $provide.service;
            myApp.constant = $provide.constant;
            myApp.value = $provide.value;
        }
    ]);
