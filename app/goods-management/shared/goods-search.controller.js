(function() {
    'use strict';

    angular
        .module('app.goods_management')
        .controller('GoodsSearchCtrl', GoodsSearchCtrl);

    GoodsSearchCtrl.inject = ['$scope', 'UtilityService', 'GoodsModel'];

    function GoodsSearchCtrl($scope, UtilityService, GoodsModel) {
        let vm = this;
        /*----------  界面层资源  ----------*/
        vm.current = {
            queryString: '',
            pagination: ''
        }
        vm.search = search;

        /*----------  内部变量  ----------*/

        let utilityService = UtilityService,
            goodsModel = GoodsModel;
        /*----------  内部逻辑函数  ----------*/


        function search(current) {
            let search = {
                search: current.queryString,
            }

            search = _.assign(search, current.pagination.configs);

            goodsModel.getGoods(search).then((result) => {
                result = result.plain();

                $scope.emit('GOODS_SEARCH_EVENT', result);
            });
        }
        /*----------  内部辅助函数  ----------*/


        function init() {
            vm.current.pagination = utilityService.initPagination();
        }

        init();
    }
})();