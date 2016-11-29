(function() {
    'use strict';

    angular
        .module('app.consumption_management')
        .controller('PayForGoodsCtrl', PayForGoodsCtrl);

    PayForGoodsCtrl.$inject = ['UtilityService'];

    function PayForGoodsCtrl(UtilityService) {
        var vm = this;
        /*----------  界面层资源  ----------*/

        /*----------  内部变量  ----------*/

        var utilityService = UtilityService;
        /*----------  内部逻辑函数  ----------*/


        /*----------  内部辅助函数  ----------*/

        function init() {

        }

        init();
    }
})();