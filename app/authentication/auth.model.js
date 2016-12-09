(function() {
    'use strict';

    angular
        .module('app.authentication')
        .factory('AuthModel', AuthModel);

    AuthModel.$inject = ['Restangular'];

    function AuthModel(Restangular) {

        var login = Restangular.all('login');
        var AuthModel = {
            login: login
        };

        return AuthModel;


        function login(user) {
            return login.post(user);
        }
    }
})();