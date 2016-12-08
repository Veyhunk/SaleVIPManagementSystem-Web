(function() {
    'use strict';

    angular
        .module('app.authentication')
        .service('AuthService', AuthService);

    AuthService.$inject = ['AuthModel', '$state'];

    function AuthService(AuthModel, $state) {
        this.logOut = logOut;

        ////////////////

        function logOut() {
            $state.go('login');
        }
    }
})();