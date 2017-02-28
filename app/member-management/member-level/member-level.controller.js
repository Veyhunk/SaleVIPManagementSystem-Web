(function() {
    'use strict';

    angular
        .module('app.member_management')
        .controller('MemberLevelCtrl', MemberLevelCtrl);

    MemberLevelCtrl.$inject = ['UtilityService', 'MemberModel', '$uibModal', 'Restangular'];

    function MemberLevelCtrl(UtilityService, MemberModel, $uibModal, Restangular) {
        let vm = this;
        /*----------  界面层资源  ----------*/

        //会员等级列表
        vm.list;

        vm.current = {
            selectedAll: false
        };

        vm.toggleItems = toggleItems;
        vm.openCreateModal = openCreateModal;
        vm.openEditModal = openEditModal;
        vm.openRemoveModal = openRemoveModal;
        /*----------  内部变量  ----------*/

        let utilityService = UtilityService,
            memberModel = MemberModel,
            restangular = Restangular;

        let status = {
            edit: {
                name: '编辑',
                save: saveEdit
            },
            create: {
                name: '添加',
                save: saveCreate
            }
        };

        /*----------  内部逻辑函数  ----------*/

        function saveEdit(member) {

        }

        function saveCreate(member) {

        }

        function remove(items) {

        }

        function openRemoveModal(items) {
            let that = vm;
            $uibModal.open({
                templateUrl: 'app/member-management/member-level/remove.modal.html',
                controller: function($scope) {
                    let selected = utilityService.getSelected(items);
                    let vm = {};

                    vm.list = selected;
                    vm.remove = remove;

                    $scope.vm = vm;
                }
            });
        }

        function toggleItems(items) {
            utilityService.toggleItems(items, vm.current.selectedAll);
        }
        /**
         * 
         * 打开会员等级修改窗口
         * @param {Array[Object]} items
         * @returns
         */
        function openEditModal(items) {
            let selected = utilityService.getSelected(items);
            if (selected.length > 1) {
                $uibModal.open({
                    templateUrl: 'app/shared/views/system-notice.tpl.html',
                    size: 'sm',
                    controller: function($scope) {

                        $scope.title = '系统提示';
                        $scope.content = '同时只能选中一个会员等级进行编辑！';
                    }
                });
                return;
            }

            let that = vm;
            $uibModal.open({
                templateUrl: 'app/member-management/member-level/create-edit.modal.html',
                controller: function($scope) {
                    let level = restangular.copy(selected[0]);
                    let vm = {};
                    debugger;
                    vm.level = level;
                    vm.status = status.edit;
                    vm.list = that.list;
                    $scope.vm = vm;
                }
            });
        }

        /**
         * 打开会员等级新增窗口
         */
        function openCreateModal() {
            let that = vm;
            $uibModal.open({
                templateUrl: 'app/member-management/member-level/create-edit.modal.html',
                controller: function($scope) {
                    let vm = {};
                    vm.level = initMemberLevel();

                    vm.list = that.list;
                    vm.status = status.create;
                    $scope.vm = vm;
                }
            });
        }

        /*----------  内部辅助函数  ----------*/

        function initMemberLevel() {
            let memberLevel = {
                "store": null,
                "operator": null,
                "name": "",
                "discount_rate": 0,
                "point_rate": 0,
                "allow_upgrade": 0,
                "upgrade_point": null,
                "next_level": null,
                "remark": "备注@string"
            }

            return memberLevel;
        }

        function initMemberLevelList() {
            memberModel.getLevels().then(result => {
                vm.list = result;
            }, error => {
                //TODO: show error msg
            });
        }

        function init() {

            initMemberLevelList();
        }

        init();
    }
})();