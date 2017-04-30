(function() {
    'use strict';

    angular
        .module('app.consumption_management')
        .controller('PayForGoodsCtrl', PayForGoodsCtrl);

    PayForGoodsCtrl.$inject = ['$scope', 'UtilityService', 'GoodsModel', '$uibModal'];

    function PayForGoodsCtrl($scope, UtilityService, GoodsModel, $uibModal) {
        let vm = this;
        $scope.showCustomer = true;
        /*----------  界面层资源  ----------*/
        vm.pagination

        vm.current = {
            // 当前订单编号
            code: null,
            /**
             * 订单列表，数据结构如下
             * 
             * id:{
             *  id:
             *  name:
             *  // 总量
             *  quantites:
             *  // 单价
             *  sale_price:
             *  // 奖励积分
             *  reward_points
             * }
             */
            order: {

            },
            /**
             * 最后总账单
             * {
             * // 总数量
             * quantities:
             * // 总价格
             * price
             * // 折后总价
             * discount_price
             * // 获得总积分
             * reward_points
             */
            billing: null,
            date: null,
            remark: ''
        };

        vm.addItem = addItem;
        vm.pay = pay;
        vm.removeItem = removeItem;
        vm.changeQuantities = changeQuantities;
        /*----------  内部变量  ----------*/

        let utilityService = UtilityService,
            goodsModel = GoodsModel;
        /*----------  内部逻辑函数  ----------*/

        function pay() {


            $uibModal.open({
                templateUrl: 'app/shared/views/system-notice.tpl.html',
                size: 'sm',
                controller: function($scope) {
                    $scope.title = '系统提示';
                    $scope.content = 'bottom';
                }
            });


        }

        function changeQuantities(item) {
            if (isSaleOut(item)) return;
            calculateBilling(vm.current.order);
        }

        function calculateBilling(order) {
            let billing = initBilling();

            for (let key in order) {
                billing.quantities = billing.quantities + order[key].quantities;

                billing.reward_points = billing.reward_points + order[key].quantities * order[key].reward_points;

                billing.price = billing.price + order[key].quantities * order[key].sale_price

                billing.discount_price = billing.discount_price + order[key].quantities * order[key].sale_price * vm.current.member.level.discount_rate;
            }

            vm.current.billing = billing;
        }

        /**
         * @param {object} item 
         */
        function removeItem(item) {
            delete vm.current.order[item.id];
            calculateBilling(vm.current.order);
        }

        function addItem(item) {

            if (_.isEmpty(vm.current.member)) {
                $uibModal.open({
                    templateUrl: 'app/shared/views/system-notice.tpl.html',
                    size: 'sm',
                    controller: function($scope) {
                        $scope.title = '系统提示';
                        $scope.content = '请先选择会员！';
                    }
                });
                return;
            }

            if (isSaleOut(item)) return;

            if (!vm.current.order[item.id]) {
                vm.current.order[item.id] = {
                    id: item.id,
                    name: item.name,
                    quantities: 0,
                    sale_price: item.sale_price,
                    reward_points: item.reward_points
                }
            }

            vm.current.order[item.id].quantities = vm.current.order[item.id].quantities + 1;
            calculateBilling(vm.current.order);

        }
        /*----------  内部辅助函数  ----------*/

        function isSaleOut(item) {

            let isSaleOut;
            if (vm.current.order[item.id]) {
                isSaleOut = vm.current.order[item.id].quantities + 1 > item.inventories;
            } else {
                isSaleOut = !item.inventories;
            }

            if (isSaleOut) {
                $uibModal.open({
                    templateUrl: 'app/shared/views/system-notice.tpl.html',
                    size: 'sm',
                    controller: function($scope) {
                        $scope.title = '系统提示';
                        $scope.content = '无法继续添加商品，己超过最大库存！';
                    }
                });
                return true;
            }
            return false;

        }
        // 初始化订单编号
        function getCode() {
            utilityService.getOrderCode('GS').then(result => {
                vm.current.code = result;
            });
        }

        function getGoods(configs) {
            goodsModel.getGoods(configs).then(result => {
                vm.list = result;
            });
        }

        // 初始化参数 
        function initVariables() {
            vm.current.order = {};
            vm.current.billing = initBilling();
        }

        function initBilling() {
            let result = {
                quantities: 0,
                price: 0,
                discount_price: 0,
                reward_points: 0,
            }
            return result;
        }
        /*----------  监听区块  ----------*/

        $scope.$on('MEMBER_SEARCH_EVENT', (e, item) => {
            e.preventDefault();
            e.stopPropagation();
            vm.current.member = item;
            initVariables();
        });

        function init() {
            vm.current.date = moment().format('YYYY-MM-DD');
            vm.pagination = utilityService.initPagination();
            vm.current.billing = initBilling();
            getGoods(vm.pagination.configs);
            getCode();
        }

        init();
    }
})();