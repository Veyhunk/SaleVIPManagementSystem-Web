(function() {
    'use strict';

    angular
        .module('app.goods_management')
        .controller('GoodsInventoryCtrl', GoodsInventoryCtrl);

    GoodsInventoryCtrl.$inject = ['UtilityService', 'GoodsModel'];

    function GoodsInventoryCtrl(UtilityService, GoodsModel) {
        var vm = this;
        /*----------  界面层资源  ----------*/
        vm.pagination;
        vm.showAddItemNotice = true;

        vm.current = {
            // 当前订单编号
            code: null,
            order: {

            },
            date: null,
            billing: null,
            remark: ''
        };

        vm.addItem = addItem;
        vm.removeItem = removeItem;
        vm.calculateBilling = calculateBilling;
        /*----------  内部变量  ----------*/

        var utilityService = UtilityService,
            goodsModel = GoodsModel;
        /*----------  内部逻辑函数  ----------*/

        function doInventory(current) {

        }

        /**
         * @param {object} item 
         */
        function removeItem(item) {
            delete vm.current.order[item.id];
            calculateBilling(vm.current.order);
        }


        function addItem(item) {


            vm.showAddItemNotice = false;

            if (!vm.current.order[item.id]) {
                vm.current.order[item.id] = {
                    id: item.id,
                    name: item.name,
                    quantities: 0,
                    entry_price: item.entry_price,
                }
            }

            vm.current.order[item.id].quantities = vm.current.order[item.id].quantities + 1;
            calculateBilling(vm.current.order);
        }
        /*----------  内部辅助函数  ----------*/
        function calculateBilling(order) {
            let billing = initBilling();

            for (let key in order) {
                billing.quantities = billing.quantities + order[key].quantities;
                billing.price = billing.price + order[key].quantities * order[key].entry_price;
            }
            debugger;
            vm.current.billing = billing;
        }

        function getGoods(configs) {
            goodsModel.getGoods(configs).then(result => {
                vm.list = result;
            });
        }

        // 初始化订单编号
        function getCode() {
            utilityService.getOrderCode('IG').then(result => {
                vm.current.code = result;
            });
        }

        function initBilling() {
            let result = {
                quantities: 0,
                price: 0
            }
            return result;
        }

        function init() {
            vm.current.date = moment().format('YYYY-MM-DD');
            vm.current.billing = initBilling();
            vm.pagination = utilityService.initPagination();
            getGoods(vm.pagination.configs);
            getCode();

        }

        init();
    }
})();