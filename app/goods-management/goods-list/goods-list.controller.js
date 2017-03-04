(function() {
    'use strict';

    angular
        .module('app.goods_management')
        .controller('GoodsListCtrl', GoodsListCtrl);

    GoodsListCtrl.$inject = ['GoodsModel', 'UtilityService', '$uibModal', 'Restangular', 'DictionaryService'];

    function GoodsListCtrl(GoodsModel, UtilityService, $uibModal, Restangular, DictionaryService) {
        let vm = this;
        /*----------  界面层资源  ----------*/



        // 商品列表
        vm.list;

        vm.current = {
            // 分页信息
            pagination: null
        };

        vm.getGoods = getGoods;
        vm.toggleItems = toggleItems;
        vm.openEditModal = openEditModal;
        vm.openRemoveModal = openRemoveModal;
        /*----------  内部变量  ----------*/

        let goodsModel = GoodsModel,
            utilityService = UtilityService,
            restangular = Restangular,
            dictionaryService = DictionaryService;

        /*----------  内部逻辑函数  ----------*/



        /**
         * 根据参数，获取商品列表
         * 
         * @param {object} configs
         */
        function getGoods(configs) {
            goodsModel.getGoods(configs).then(result => {
                vm.list = result;

                vm.current.pagination.records = result.records;

            });
        }

        /**
         * 打开删除会员等级窗口
         * @param {Array<Object>} items
         * @returns
         */
        function openRemoveModal(items) {
            let selected = utilityService.getSelected(items);
            if (!selected.length) {
                utilityService.openNoticeModal({ content: '请先选择需要删除的会员等级！' });

                return;
            }

            let that = vm;
            $uibModal.open({
                templateUrl: 'app/member-management/member-level/remove.modal.html',
                controller: function($scope) {

                    let vm = {};

                    vm.list = selected;
                    vm.remove = remove;

                    $scope.vm = vm;
                }
            });
        }

        /**
         * 确认删除商品
         * 
         * @param {Array<Object>} items
         */
        function remove(items) {

        }
        /**
         * 确认修改商品信息
         * 
         * @param {Object} item
         */
        function edit(item) {
            utilityService.showLoading();
            goodsModel.edit(item).then(result => {
                utilityService.hideLoading();
            });
        }
        /** 
         * 
         * 打开商品修改窗口
         * @param {Array<Object>} items
         * @returns
         */
        function openEditModal(items) {
            let selected = utilityService.getSelected(items);
            if (selected.length > 1) {
                utilityService.openNoticeModal({ content: '同时只能选中一个商品进行编辑！' });
                return;
            }

            if (selected.length == 0) {
                utilityService.openNoticeModal({ content: '请先选中一个商品！' });
                return;
            }
            let that = vm;
            $uibModal.open({
                templateUrl: 'app/goods-management/goods-list/edit.modal.html',
                size: 'lg',
                controller: function($scope) {
                    let goods = restangular.copy(selected[0]);
                    let vm = {};

                    vm.isExchangeable = goods.exchange_points ? true : false;
                    vm.goods = goods;
                    vm.classes = that.classes;

                    vm.types = that.types;
                    vm.units = that.units;


                    vm.edit = edit;

                    $scope.vm = vm;
                }
            });
        }
        /*----------  内部辅助函数  ----------*/

        function toggleItems(items) {
            utilityService.toggleItems(items, vm.current.selectedAll);
        }

        // 初始化商品单位
        function initGoodsUnits() {
            vm.units = _.toArray(dictionaryService.get('goods.units'));
        }

        // 初始化商品类型
        function initGoodsTypes() {
            let types = dictionaryService.get('goods.types');

            let key,
                result = [];

            for (key in types) {
                let tmp = {};
                tmp.id = parseInt(key);
                tmp.name = types[key];
                result.push(tmp);
            }

            vm.types = result;

        }

        // 初始化商品分类
        function initGoodsClass() {
            goodsModel.getClasses().then(result => {
                result = result.plain();
                vm.classes = result;
            });
        }

        function init() {
            // 初始化商品单位
            initGoodsUnits();
            // 初始化商品类型列表
            initGoodsTypes();
            // 初始化商品分类列表
            initGoodsClass();

            vm.current.pagination = utilityService.initPagination();
            getGoods(vm.current.pagination.configs);
        }

        init();
    }
})();