(function() {
    'use strict';

    angular
        .module('app.user')
        .factory('User', user);

    user.$inject = ['$resource'];

    function user($resource) {
        return $resource(
            '/api/users/:id',
            null,
            {
                update: {method: 'put'},
            });
    }
}());
