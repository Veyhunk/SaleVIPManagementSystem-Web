(function() {
    'use strict';

    angular
        .module('app.member_management')
        .controller('MemberListCtrl', MemberListCtrl);

    MemberListCtrl.$inject = ['MemberModel', 'UtilityService', '$uibModal', 'Restangular', 'MemberService'];

    function MemberListCtrl(MemberModel, UtilityService, $uibModal, Restangular, MemberService) {
        var vm = this;
        /*----------  界面层资源  ----------*/
        vm.pagination;

        // 会员列表
        vm.list;

        vm.current = {
            selectedAll: false
        };
        vm.toggleItems = toggleItems;
        vm.openEditModal = openEditModal;

        /*----------  内部变量  ----------*/
        var memberModel = MemberModel,
            utilityService = UtilityService,
            restangular = Restangular,
            memberService = MemberService;
        /*----------  内部逻辑函数  ----------*/

        function toggleItems(items) {
            utilityService.toggleItems(items, vm.current.selectedAll);
        }
        /**
         * 
         * 打开会员修改窗口
         * @param {any} items
         * @returns
         */
        function openEditModal(items) {
            let selected = utilityService.getSelected(items);
            if (selected.length > 1) {
                utilityService.openNoticeModal({ content: '同时只能选中一个会员进行编辑！' });
                return;
            }

            if (selected.length == 0) {
                utilityService.openNoticeModal({ content: '同时只能选中一个会员进行编辑！' });
                return;
            }
            $uibModal.open({
                templateUrl: 'app/member-management/member-list/edit.modal.html',
                size: 'lg',
                controller: function($scope) {
                    let member = restangular.copy(selected[0]);
                    let vm = {};

                    vm.member = member;
                    vm.confirmPaymentPassword = member.payment_password;
                    vm.hidePaymentPasswordNotice = true;
                    vm.edit = edit;
                    vm.levelList = vm.levelList;
                    vm.checkPaymentPassword = (password, confirmPassword) => {
                        vm.hidePaymentPasswordNotice = memberService.checkPassword(password, confirmPassword);
                    }

                    $scope.vm = vm;
                }
            });
        }
        /**
         * 打开删除会员窗口
         * 
         * @param {Array<Object>} items
         */
        function openRemoveModal(items) {
            let selected = utilityService.getSelected(items);
            if (!selected.length) {
                utilityService.openNoticeModal({ content: '请先选择需要删除的会员！' });

                return;
            }

            let that = vm;
            $uibModal.open({
                templateUrl: 'app/member-management/member-list/remove.modal.html',
                controller: function($scope) {
                    let vm = {};

                    vm.list = selected;
                    vm.remove = remove;

                    $scope.vm = vm;
                }
            });
        }
        /**
         * 删除会员
         * 
         * @param {Array<Object>} items
         */
        function remove(items) {

        }
        /**
         * 修改会员信息
         * 
         * @param {any} item
         */
        function edit(item) {
            utilityService.showLoading();
            memberModel.edit(item).then(result => {
                utilityService.hideLoading();
            });
        }

        /**
         * 根据参数，获取会员列表
         * 
         * @param {object} configs
         */
        function getMembers(configs) {
            var _configs = angular.copy(configs);
            // 关联 operator、level 对象
            _configs['fields'] = 'operator,level';

            memberModel.getMembers(_configs).then(result => {
                vm.list = result;
            });
        }

        /*----------  内部辅助函数  ----------*/




        function init() {
            vm.pagination = utilityService.initPagination();

            getMembers(vm.pagination);

            memberModel.getLevels().then(result => {

                vm.levelList = result;
            });

        }

        init();
    }
})();