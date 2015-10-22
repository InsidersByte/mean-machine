(function() {
    'use strict';

    angular
        .module('app.authentication')
        .factory('Auth', auth);

    auth.$inject = ['$http', '$q', 'AuthToken'];

    // ===================================================
    // auth factory to login and get information
    // inject $http for communicating with the API
    // inject $q to return promise objects
    // inject AuthToken to manage tokens
    // ===================================================
    function auth($http, $q, AuthToken) {
        // create auth factory object
        const authFactory = {
            login,
            logout,
            isLoggedIn,
            getUser,
            createSampleUser,
        };

        // return auth factory object
        return authFactory;

        ////////////////////

        // log a user in
        function login(username, password) {
            // return the promise object and its data
            return $http
                .post('/api/authenticate', {
                    username: username,
                    password: password,
                })
                .success(function(data) {
                    AuthToken.setToken(data.token);
                    return data;
                });
        }

        // log a user out by clearing the token
        function logout() {
            // clear the token
            AuthToken.setToken();
        }

        // check if a user is logged in
        // checks if there is a local token
        function isLoggedIn() {
            return !!AuthToken.getToken();
        }

        // get the logged in user
        function getUser() {
            if (AuthToken.getToken()) {
                return $http.get('/api/me', {cache: true});
            } else {
                return $q.reject({message: 'User has no token.'});
            }
        }

        function createSampleUser() {
            $http.post('/api/sample');
        }
    }
}());
