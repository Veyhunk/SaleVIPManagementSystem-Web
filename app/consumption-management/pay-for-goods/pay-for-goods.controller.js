(function() {
    'use strict';

    angular
        .module('app.consumption_management')
        .controller('PayForGoodsCtrl', PayForGoodsCtrl);

    PayForGoodsCtrl.$inject = ['UtilityService', 'GoodsModel', '$uibModal'];

    function PayForGoodsCtrl(UtilityService, GoodsModel, $uibModal) {
        let vm = this;
        vm.pay = pay;
        /*----------  界面层资源  ----------*/
        vm.current = {
            // 当前订单编号
            code: null,
            // 当前会员检索条件
            memberQueryString: '',
        };
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
        /*----------  内部辅助函数  ----------*/
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

        function init() {

            vm.pagination = utilityService.initPagination();
            getGoods(vm.pagination.configs);
            getCode();
        }

        init();
    }
})();