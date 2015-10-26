(function() {
    'use strict';

    angular
        .module('app.user')
        .controller('userCreateController', userCreate);

    userCreate.$inject = ['User'];

    function userCreate(User) {
        /*jshint validthis:true */
        const vm = this;

        // variable to hide/show elements of the view
        // differentiates between create or edit pages
        vm.type = 'create';

        vm.processing = false;
        vm.message = '';
        vm.userData = {};
        vm.saveUser = saveUser;

        ////////////////////

        // function to create a user
        function saveUser() {
            vm.processing = true;
            vm.message = '';

            // use the create function in the userService
            User
                .save(vm.userData)
                .$promise
                .then(function(data) {
                    vm.processing = false;
                    vm.userData = {};
                    vm.message = data.message;
                });
        }
    }
}());
