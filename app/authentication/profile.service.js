(function() {
    'use strict';

    angular
        .module('app.authentication')
        .factory('ProfileService', ProfileService);

    ProfileService.$inject = ['localStorageService'];

    function ProfileService(localStorageService) {

        var _profile = {};

        var ProfileService = {
            getProfile: getProfile,
            setProfile: setProfile,
            getRole: getRole,
            getUser: getUser,
            getPermissions: getPermissions,
            initProfile: initProfile,
        };

        return ProfileService;

        ////////////////

        function getRole() {
            return profile.role;
        }

        function getUser() {
            return profile.user;
        }

        function getPermissions() {
            return profile.permissions;
        }

        function setProfile(profile) {
            _profile = profile;
        }

        function getProfile() {
            return profile;
        }

        function initProfile() {
            var profile = localStorageService.get('profile');
            if (profile) {
                _profile = profile;
            }
        }
    }
})();