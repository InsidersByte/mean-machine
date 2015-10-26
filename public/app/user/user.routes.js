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
                templateUrl: 'app/user/users.html',
                controller: 'usersController',
                controllerAs: 'vm',
            })

            // form to create a new user
            // same view as edit page
            .when('/users/create', {
                templateUrl: 'app/user/userCreate.html',
                controller: 'userCreateController',
                controllerAs: 'vm',
            })

            // page to edit a user
            .when('/users/:userId', {
                templateUrl: 'app/user/userEdit.html',
                controller: 'userEditController',
                controllerAs: 'vm',
            });
    }
}());
