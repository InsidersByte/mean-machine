(function() {
    'use strict';

    angular
        .module('app.user')
        .controller('userEditController', userEdit);

    userEdit.$inject = ['User', '$routeParams'];

    function userEdit(User, $routeParams) {
        /*jshint validthis:true */
        const vm = this;

        // variable to hide/show elements of the view
        // differentiates between create or edit pages
        vm.type = 'edit';

        vm.processing = false;
        vm.message = '';
        vm.saveUser = saveUser;

        activate();

        ////////////////////

        function activate() {
            User
                .get({id: $routeParams.userId})
                .$promise
                .then(function(data) {
                    vm.userData = data;
                });
        }

        // function to save the user
        function saveUser() {
            vm.processing = true;
            vm.message = '';

            // call the userService function to update
            User
                .update({id: $routeParams.userId}, vm.userData)
                .$promise
                .then(function(data) {
                    vm.processing = false;

                    // clear the form
                    vm.userData = {};

                    // bind the message from our API to vm.message
                    vm.message = data.message;
                });
        }
    }
}());
