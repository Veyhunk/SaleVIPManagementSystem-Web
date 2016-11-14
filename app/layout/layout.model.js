(function() {
    'use strict';

    angular
        .module('app.layout')
        .factory('LayoutModel', LayoutModel);

    LayoutModel.$inject = ['Restangular'];

    function LayoutModel(Restangular) {
        var LayoutModel = {
            getMainMenus: getMainMenus
        };

        return LayoutModel;

        ////////////////


        // 获取用户菜单
        function getMainMenus() {
            return Restangular.all('menus.json').getList();
        }
    }
})();