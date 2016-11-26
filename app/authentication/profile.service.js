(function() {
    'use strict';

    angular
        .module('app.authentication')
        .factory('ProfileService', ProfileService);

    ProfileService.$inject = ['Restangular'];

    function ProfileService(Restangular) {
        var profile = {

        };

        var ProfileService = {
            exposedFn: exposedFn,
            get user() {
                if (typeof profile.user === 'undefined') {
                    Restangular.one('members.json').get().then(result => {
                        debugger;
                        result = result.plain();
                        profile.user = result.data[1];
                    });
                }
                debugger;
                return profile.user;
            },
        };

        return ProfileService;

        ////////////////
        function exposedFn() {}
    }
})();