(function() {
    'use strict';

    angular
        .module('app.user')
        .factory('User', user);

    user.$inject = ['$http'];

    function user($http) {
        // create a new object
        let userFactory = {
            get: get,
            all,
            create,
            update,
            delete: remove,
        };

        // return our entire userFactory object
        return userFactory;

        ////////////////////

        // get a single user
        function get(id) {
            return $http.get('/api/users/' + id);
        }

        // get all users
        function all() {
            return $http.get('/api/users/');
        }

        // create a user
        function create(userData) {
            return $http.post('/api/users/', userData);
        }

        // update a user
        function update(id, userData) {
            return $http.put('/api/users/' + id, userData);
        }

        // delete a user
        function remove(id) {
            return $http.delete('/api/users/' + id);
        }
    }
}());
