(function() {
    'use strict';

    angular
        .module('app.authentication')
        .factory('AuthModel', AuthModel);

    AuthModel.$inject = ['Restangular'];

    function AuthModel(Restangular) {
        var AuthModel = {
            exposedFn: exposedFn
        };

        return AuthModel;

        ////////////////
        function exposedFn() {}
    }
})();