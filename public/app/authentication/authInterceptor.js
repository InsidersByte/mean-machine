(function() {
    'use strict';

    angular
        .module('app.authentication')
        .factory('AuthInterceptor', authInterceptor);

    authInterceptor.$inject = ['$q', '$location', 'AuthToken'];

    function authInterceptor($q, $location, AuthToken) {
        let interceptorFactory = {
            request,
            responseError,
        };

        return interceptorFactory;

        ////////////////////

        // this will happen on all HTTP requests
        function request(config) {
            // grab the token
            const token = AuthToken.getToken();

            // if the token exists, add it to the header as x-access-token
            if (token) {
                config.headers.Authorization = 'Bearer ' + token;
            }

            return config;
        }

        // happens on response errors
        function responseError(response) {
            // if our server returns a 403 forbidden response
            if (response.status === 401) {
                AuthToken.setToken();
                $location.path('/login');
            }

            // return the errors from the server as a promise
            return $q.reject(response);
        }
    }
}());
