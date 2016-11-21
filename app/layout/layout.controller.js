(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('LayoutCtrl', LayoutCtrl);

    LayoutCtrl.$inject = ['$scope', '$state', 'LayoutModel', 'LayoutService'];

    function LayoutCtrl($scope, $state, LayoutModel, LayoutService) {
        /*----------  界面层资源  ----------*/
        var vm = this;

        vm.state = $state;
        // 系统主菜单
        vm.mainMenus = [];
        // 快捷菜单
        vm.shortcutMenus = [];
        /*----------  内部变量  ----------*/
        var layoutModel = LayoutModel,
            layoutService = LayoutService;


        vm.isShortcutMenusMini = true;

        /*----------  监听区块  ----------*/
        /*----------  逻辑代码区块  ----------*/


        function initMainMenus() {

            layoutModel.getPermissions().then(result => {
                result = result.plain()
                var menus = layoutService.resolveMenus(result);

                vm.mainMenus = menus.mainMenus;
                vm.shortcutMenus = menus.shortcutMenus;
            });
        }

        function initLayout() {
            initMainMenus();
        }


        initLayout();
    }
})();