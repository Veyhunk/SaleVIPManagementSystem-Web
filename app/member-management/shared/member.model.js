(function() {
    'use strict';

    angular
        .module('app.member_management')
        .factory('MemberModel', MemberModel);

    MemberModel.$inject = ['Restangular'];

    function MemberModel(Restangular) {
        var MemberModel = {
            getLevels: getLevels
        };

        return MemberModel;

        /**
         * 获取会员等级列表
         */
        function getLevels() {
            return Restangular.all('levels.json').getList();
        }
    }
})();