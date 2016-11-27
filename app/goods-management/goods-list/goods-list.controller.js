(function() {
    'use strict';

    angular
        .module('app.goods_management')
        .controller('GoodsListCtrl', GoodsListCtrl);

    GoodsListCtrl.$inject = ['GoodsModel', 'UtilityService'];

    function GoodsListCtrl(GoodsModel, UtilityService) {
        var vm = this;
        /*----------  界面层资源  ----------*/
        vm.pagination;


        /*----------  内部变量  ----------*/
        var goodsModel = GoodsModel,
            utilityService = UtilityService;
        /*----------  内部逻辑函数  ----------*/


        /*----------  内部辅助函数  ----------*/
        /**
         * 根据初始分页参数，获取商品列表
         * 
         * @param {object} pagination
         */
        function initGoods(pagination) {

        }

        function init() {
            vm.pagination = utilityService.initPagination();
            initGoods(vm.pagination);
        }

        init();
    }
})();