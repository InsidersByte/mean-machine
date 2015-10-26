(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('mainController', main);

    main.$inject = ['$rootScope', '$location', 'Auth'];

    function main($rootScope, $location, Auth) {
        /*jshint validthis:true */
        const vm = this;

        // get info if a person is logged in
        vm.loggedIn = Auth.isLoggedIn();

        vm.user = '';
        vm.doLogout = doLogout;

        ////////////////////

        // check to see if a user is logged in on every request
        $rootScope.$on('$routeChangeStart', function() {
            vm.loggedIn = Auth.isLoggedIn();

            // get user information on page load
            Auth
                .getUser()
                .then(function(data) {
                    vm.user = data.data;
                });
        });

        // function to handle logging out
        function doLogout() {
            Auth.logout();
            vm.user = '';

            $location.path('/login');
        }
    }
}());
