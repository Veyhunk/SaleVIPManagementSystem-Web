(function() {
    'use strict';

    angular
        .module('app.system_management')
        .factory('SystemModel', SystemModel);

    SystemModel.inject = ['Restangular'];

    function SystemModel(Restangular) {

        let permissions = Restangular.all('permissions.json');

        let SystemModel = {
            getPermissions: getPermissions
        };

        return SystemModel;


        /**
         * 
         * @param {Object} [configs={}] 
         * @returns 
         */
        function getPermissions(configs = {}) {
            return permissions.getList(configs);
        }
    }
})();