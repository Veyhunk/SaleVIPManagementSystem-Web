(function() {
    'use strict';

    angular
        .module('app.system_management')
        .controller('PermissionCtrl', PermissionCtrl);

    PermissionCtrl.$inject = ['UtilityService', 'Restangular', 'SystemModel', 'DictionaryService', '$uibModal'];

    function PermissionCtrl(UtilityService, Restangular, SystemModel, DictionaryService, $uibModal) {
        let vm = this;
        /*----------  界面层资源  ----------*/

        // 权限树形结构列表
        vm.treeList;

        // 权限列表
        vm.list;
        vm.listBackup;

        vm.methods;

        vm.current = {
            operation: null,
            permission: null
        };

        vm.select = select;
        vm.openRemoveModal = openRemoveModal;
        vm.cancel = cancel;
        vm.onCreate = onCreate;
        /*----------  内部变量  ----------*/

        let utilityService = UtilityService,
            systemModel = SystemModel,
            restangular = Restangular,
            dictionaryService = DictionaryService;

        let operation = {
            edit: {
                notice: {
                    content: '修改成功！'
                },
                buttons: [{
                    title: '保存',
                    class: 'btn-primary',
                    click: saveEdit
                }, {
                    title: '取消',
                    class: 'btn-default',
                    click: cancel
                }, ]
            },
            create: {
                notice: {
                    content: '新增成功！'
                },
                buttons: [{
                    title: '添加',
                    class: 'btn-success',
                    click: saveCreate,
                }]
            }

        };
        /*----------  内部逻辑函数  ----------*/

        function saveEdit() {

        }

        function saveCreate() {

        }

        function remove() {

        }
        /**
         * 切换新增模式
         */
        function onCreate() {
            vm.current.operation = operation.create;
            vm.current.permission = initPermission();
        }

        function openRemoveModal(items) {
            let selected = utilityService.getSelected(items);
            if (!selected.length) {
                utilityService.openNoticeModal({ content: '请先选择需要删除的权限！' });

                return;
            }

            let that = vm;
            $uibModal.open({
                templateUrl: 'app/shared/views/remove.modal.html',
                controller: function($scope) {

                    let vm = {};

                    vm.title = '确认删除权限？';

                    vm.list = selected;
                    vm.remove = remove;

                    $scope.vm = vm;
                }
            });
        }

        function cancel() {
            vm.current.permission = restangular.copy(vm.current.permissionBackup);
        }

        function select(item) {
            vm.current.permission = restangular.copy(item);
            vm.current.permissionBackup = item;
            vm.current.operation = operation.edit;
        }

        /*----------  内部辅助函数  ----------*/

        function initPermission() {
            let permission = {
                "name": "",
                "url": "",
                "is_API": 0,
                "is_shortcut": 0,
                "method": 1,
                "parent": null,
                "sort": 1,
                "icon": "",
                "remark": ""
            }
            return permission;
        }

        function initMethods() {
            let methods = dictionaryService.get('http_methods');
            debugger;
            vm.methods = utilityService.getParseDictionary(methods);;
        }

        function initPermissions() {

            systemModel.getPermissions().then(result => {
                vm.list = restangular.copy(result);
                vm.listBackup = result;
                vm.treeList = utilityService.getTreeData(result);
            });

        }

        function init() {
            vm.current.operation = operation.create;
            vm.current.permission = initPermission();

            initMethods();
            initPermissions();
        }

        init();
    }
})();