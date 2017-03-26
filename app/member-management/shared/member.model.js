(function() {
    'use strict';

    angular
        .module('app.member_management')
        .factory('MemberModel', MemberModel);

    MemberModel.$inject = ['Restangular', '$q'];

    function MemberModel(Restangular, $q) {

        let members = Restangular.all('members.json'),
            levels = Restangular.all('levels.json');

        let MemberModel = {
            getLevels: getLevels,
            getMembers: getMembers,
            createMember: createMember,
        };

        return MemberModel;

        /**
         * 
         * 创建会员
         * @param {Object} member
         */
        function createMember(member) {
            return members.post(member);
        }

        /**
         * 获取会员列表
         * 
         * @param {any} configs
         * @returns
         */
        function getMembers(configs = {}) {
            return members.getList(configs);
        }

        /**
         * 获取会员等级列表
         */
        function getLevels(configs = {}) {

            return levels.getList(configs);

        }
    }
})();