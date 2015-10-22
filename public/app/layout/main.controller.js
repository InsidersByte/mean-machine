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

        vm.processing = false;
        vm.error = '';
        vm.user = '';
        vm.loginData = {};
        vm.doLogin = doLogin;
        vm.doLogout = doLogout;
        vm.createSample = createSample;

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

        // function to handle login form
        function doLogin() {
            vm.processing = true;

            // clear the error
            vm.error = '';

            Auth
                .login(vm.loginData.username, vm.loginData.password)
                .success(function(data) {
                    vm.processing = false;

                    // if a user successfully logs in, redirect to users page
                    if (data.success) {
                        $location.path('/users');
                    } else {
                        vm.error = data.message;
                    }
                });
        }

        // function to handle logging out
        function doLogout() {
            Auth.logout();
            vm.user = '';

            $location.path('/login');
        }

        function createSample() {
            Auth.createSampleUser();
        }
    }
}());
