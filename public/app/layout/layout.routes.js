(function() {
    'use strict';

    angular
        .module('app.layout')
        .config(config);

    config.$inject = ['$routeProvider', '$locationProvider'];

    function config($routeProvider, $locationProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl: 'app/layout/home.html',
            })

            // login page
            .when('/login', {
                templateUrl: 'app/layout/login.html',
                controller: 'mainController',
                controllerAs: 'login',
            });

        $locationProvider.html5Mode(true);
    }
}());
