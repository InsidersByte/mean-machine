(function() {
    'use strict';

    angular
        .module('app.user')
        .config(config);

    config.$inject = ['$routeProvider'];

    function config($routeProvider) {
        $routeProvider

            // show all users
            .when('/users', {
                templateUrl: 'app/user/all.html',
                controller: 'userController',
                controllerAs: 'user',
            })

            // form to create a new user
            // same view as edit page
            .when('/users/create', {
                templateUrl: 'app/user/single.html',
                controller: 'userCreateController',
                controllerAs: 'user',
            })

            // page to edit a user
            .when('/users/:user_id', {
                templateUrl: 'app/user/single.html',
                controller: 'userEditController',
                controllerAs: 'user',
            });
    }
}());
