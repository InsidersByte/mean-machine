(function() {
    'use strict';

    angular
        .module('app.authentication')
        .factory('AuthToken', authToken);

    authToken.$inject = ['$window'];

    // ===================================================
    // factory for handling tokens
    // inject $window to store token client-side
    // ===================================================
    function authToken($window) {
        let authTokenFactory = {
            getToken,
            setToken,
        };

        return authTokenFactory;

        ////////////////////

        // get the token out of local storage
        function getToken() {
            return $window.localStorage.getItem('token');
        }

        // function to set token or clear token
        // if a token is passed, set the token
        // if there is no token, clear it from local storage
        function setToken(token) {
            if (token) {
                $window.localStorage.setItem('token', token);
            } else {
                $window.localStorage.removeItem('token');
            }
        };
    }
}());
