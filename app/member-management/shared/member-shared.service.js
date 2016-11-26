(function() {
    'use strict';

    angular
        .module('app.member_management')
        .factory('MemberSharedService', MemberSharedService);

    MemberSharedService.$inject = ['Restangular'];

    function MemberSharedService(Restangular) {
        var MemberSharedService = {
            getLevels: getLevels
        };

        return MemberSharedService;

        /**
         * 获取会员等级列表
         */
        function getLevels() {
            return Restangular.all('levels.json').getList();
        }
    }
})();