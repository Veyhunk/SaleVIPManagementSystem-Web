(function() {
    'use strict';

    angular
        .module('app.authentication')
        .factory('ProfileService', ProfileService);

    ProfileService.$inject = ['localStorageService'];

    function ProfileService(localStorageService) {

        var profile = {};

        var ProfileService = {
            getProfile: getProfile,
            setProfile: setProfile,
            removeProfile: removeProfile,
            getRole: getRole,
            getUser: getUser,
            getPermissions: getPermissions,
            initProfile: initProfile,
        };

        return ProfileService;

        ////////////////

        var storageName = 'profile';

        function getRole() {
            return profile.role;
        }

        function getUser() {
            return profile.user;
        }

        function getPermissions() {
            return profile.permissions;
        }

        function setProfile(newProfile) {
            profile = newProfile;
            localStorageService.set(storageName, profile);
        }

        function getProfile() {
            return profile;
        }

        function removeProfile() {
            profile = {};
            localStorageService.remove(storageName);
        }

        function initProfile() {
            var result = localStorageService.get(storageName);
            if (result) {
                profile = result;
            }
        }

    }
})();