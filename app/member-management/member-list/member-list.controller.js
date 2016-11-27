(function() {
    'use strict';

    angular
        .module('app.member_management')
        .controller('MemberListCtrl', MemberListCtrl);

    MemberListCtrl.$inject = ['MemberModel', 'UtilityService'];

    function MemberListCtrl(MemberModel, UtilityService) {
        var vm = this;
        /*----------  界面层资源  ----------*/
        vm.pagination;

        vm.memberList;

        /*----------  内部变量  ----------*/
        var memberModel = MemberModel,
            utilityService = UtilityService;
        /*----------  内部逻辑函数  ----------*/


        /*----------  内部辅助函数  ----------*/
        /**
         * 根据初始分页参数，获取会员列表
         * 
         * @param {object} pagination
         */
        function getMembers(configs) {
            var _configs = angular.copy(configs);
            // 关联 operator、level 对象
            _configs['fields'] = 'operator,level';

            memberModel.getMembers(_configs).then(result => {
                vm.memberList = result;
            });
        }

        function init() {
            vm.pagination = utilityService.initPagination();

            getMembers(vm.pagination);
        }

        init();
    }
})();