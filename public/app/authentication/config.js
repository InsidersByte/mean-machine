(function() {
    'use strict';

    angular
        .module('app.authentication')
        .config(config);

    config.$inject = ['$httpProvider'];

    function config($httpProvider) {
        // attach our auth interceptor to the http requests
        $httpProvider.interceptors.push('AuthInterceptor');
    }
}());
