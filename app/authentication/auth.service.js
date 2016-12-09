(function() {
    'use strict';

    angular
        .module('app.authentication')
        .service('AuthService', AuthService);

    AuthService.$inject = ['AuthModel', '$state', '$q', 'ProfileService', 'localStorageService'];

    function AuthService(AuthModel, $state, $q, ProfileService, localStorageService) {
        this.logOut = logOut;
        this.login = login;

        var profileService = ProfileService;

        var storageName = 'authorizationData';

        function login(user) {
            var deferred = $q.defer();

            AuthModel.login(user).then(result => {
                result = result.plain();

                // 抽取授权 token
                var authorizationData = {};
                authorizationData.access_token = result.access_token;
                authorizationData.expire_int = result.expire_in;

                // 保存 token
                localStorageService.set(storageName, authorizationData);

                // 设置 profile
                profileService.setProfile(result.profile);

                deferred.resolve();
            }, error => {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        function logOut() {
            profileService.removeProfile();
            localStorageService.remove(storageName);
            $state.go('login');
        }
    }
})();