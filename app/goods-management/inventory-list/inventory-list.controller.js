(function() {
    'use strict';

    angular
        .module('app.goods_management')
        .controller('InventoryListCtrl', InventoryListCtrl);

    InventoryListCtrl.$inject = ['UtilityService', 'GoodsModel'];

    function InventoryListCtrl(UtilityService, GoodsModel) {
        var vm = this;
        /*----------  界面层资源  ----------*/
        vm.pagination;
        vm.list;
        /*----------  内部变量  ----------*/

        var utilityService = UtilityService,
            goodsModel = GoodsModel;
        /*----------  内部逻辑函数  ----------*/


        function getInventories(configs) {
            goodsModel.getInventories(configs).then((result) => {
                result = result.plain();
                vm.list = result;
            });
        }
        /*----------  内部辅助函数  ----------*/

        function init() {
            vm.pagination = utilityService.initPagination();
            getInventories(vm.pagination.configs);
        }

        init();
    }
})();