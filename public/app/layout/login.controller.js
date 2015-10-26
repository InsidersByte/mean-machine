(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('loginController', login);

    login.$inject = ['$location', 'Auth'];

    function login($location, Auth) {
        /*jshint validthis:true */
        const vm = this;

        vm.processing = false;
        vm.error = '';
        vm.loginData = {};
        vm.doLogin = doLogin;
        vm.createSample = createSample;

        ////////////////////

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

        function createSample() {
            Auth.createSampleUser();
        }
    }
}());
