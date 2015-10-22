(function() {
    'use strict';

    angular
        .module('app.user')
        .controller('userController', userController);

    userController.$inject = ['User'];

    function userController(User) {
        /*jshint validthis:true */
        const vm = this;

        vm.processing = false;
        vm.deleteUser = deleteUser;

        activate();

        ////////////////////

        function activate() {
            vm.processing = true;
            loadUsers();
        }

        function loadUsers() {
            User.all()
                .success(function(data) {
                    // when all the users come back, remove the processing variable
                    vm.processing = false;

                    // bind the users that come back to vm.users
                    vm.users = data;
                });
        }

        function deleteUser(id) {
            vm.processing = true;

            User.delete(id)
                .success(loadUsers);
        }
    }
}());
