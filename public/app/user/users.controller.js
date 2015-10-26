(function() {
    'use strict';

    angular
        .module('app.user')
        .controller('usersController', usersController);

    usersController.$inject = ['User'];

    function usersController(User) {
        /*jshint validthis:true */
        const vm = this;

        vm.processing = false;
        vm.users = [];
        vm.deleteUser = deleteUser;

        activate();

        ////////////////////

        function activate() {
            vm.processing = true;
            loadUsers();
        }

        function loadUsers() {
            User.query()
                .$promise
                .then(function(data) {
                    // when all the users come back, remove the processing variable
                    vm.processing = false;

                    // bind the users that come back to vm.users
                    vm.users = data;
                });
        }

        function deleteUser(id) {
            vm.processing = true;

            User
                .delete({id: id})
                .$promise
                .then(loadUsers);
        }
    }
}());
