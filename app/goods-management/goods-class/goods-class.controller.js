(function() {
    'use strict';

    angular
        .module('app.goods_management')
        .controller('GoodsClassCtrl', GoodsClassCtrl);

    GoodsClassCtrl.$inject = ['UtilityService', 'GoodsModel', 'Restangular', '$uibModal'];

    function GoodsClassCtrl(UtilityService, GoodsModel, Restangular, $uibModal) {
        let vm = this;
        /*----------  界面层资源  ----------*/

        vm.current = {
            class: null,
            classBackup: null,
            // 控制当前是新增还是修改操作
            operation: null,

        };
        // 商品分类列表
        vm.list;
        vm.listBackup;
        // 商品树形分类列表
        vm.treeList;


        vm.select = select;
        vm.onCreate = onCreate;
        vm.openRemoveModal = openRemoveModal;

        /*----------  内部变量  ----------*/

        let utilityService = UtilityService,
            goodsModel = GoodsModel,
            restangular = Restangular;


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
            vm.current.class = initGoodsClass();
        }

        function openRemoveModal(items) {
            let selected = utilityService.getSelected(items);
            if (!selected.length) {
                utilityService.openNoticeModal({ content: '请先选择需要删除的商品分类！' });

                return;
            }

            let that = vm;
            $uibModal.open({
                templateUrl: 'app/goods-management/goods-class/remove.modal.html',
                controller: function($scope) {

                    let vm = {};

                    vm.list = selected;
                    vm.remove = remove;

                    $scope.vm = vm;
                }
            });
        }

        function cancel() {

            vm.current.class = restangular.copy(vm.current.classBackup);
        }

        function select(item) {
            vm.current.class = restangular.copy(item);
            vm.current.classBackup = item;
            vm.current.operation = operation.edit;
        }
        /*----------  内部辅助函数  ----------*/

        function initGoodsClass() {
            let goodsClass = {
                "store": null,
                "operator": null,
                "name": "",
                "parent": null,
                "remark": ""
            }
            return goodsClass;
        }

        function initGoodsClassList() {
            goodsModel.getClasses().then(result => {
                vm.list = restangular.copy(result);
                vm.listBackup = result;
                vm.treeList = utilityService.getTreeData(result);
            });
        }

        function init() {
            // 初始化分类对象
            vm.current.class = initGoodsClass();

            vm.current.operation = operation.create;
            // 初始化分类列表
            initGoodsClassList();
        }

        init();
    }
})();