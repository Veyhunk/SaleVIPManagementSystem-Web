(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('LayoutCtrl', LayoutCtrl);

    LayoutCtrl.$inject = [
        '$rootScope', '$state', 'LayoutModel', 'LayoutService', 'DictionaryService', 'ProfileService',
        'AuthService', 'Version', '$timeout'
    ];

    function LayoutCtrl($rootScope, $state, LayoutModel, LayoutService, DictionaryService, ProfileService,
        AuthService, Version, $timeout) {
        /*----------  界面层资源  ----------*/
        var vm = this;

        // 快捷菜单切换状态
        vm.isShortcutMenusMini = false;

        vm.state = $state;
        vm.logOut = AuthService.logOut;
        vm.Version = Version;

        // 用户信息
        vm.user = null;
        // 系统主菜单
        vm.mainMenus = null;
        // 快捷菜单
        vm.shortcutMenus = null;
        // loading
        vm.contentLoading = false;

        /*----------  内部变量  ----------*/
        var layoutModel = LayoutModel,
            layoutService = LayoutService,
            profileService = ProfileService;


        /*----------  逻辑代码区块  ----------*/

        /*----------  辅助函数区块  ----------*/

        function initMainMenus(permissions) {

            var menus = layoutService.resolveMenus(permissions);

            vm.mainMenus = menus.mainMenus;
            vm.shortcutMenus = menus.shortcutMenus;

        }

        function hideLoading() {
            vm.contentLoading = false;
        }

        function showLoading() {
            vm.contentLoading = true;
        }

        // 挂载全局函数
        $rootScope.showLoading = function() {
            showLoading();
        };

        $rootScope.hideLoading = function() {
            hideLoading();
        };
        /*----------  监听区块  ----------*/

        // MARK：这是一个好方法么？


        function init() {
            // 初始化菜单
            var permissions = profileService.getPermissions();
            initMainMenus(permissions);

            // 初始化用户信息
            vm.user = profileService.getUser();
            showLoading();

            $timeout(() => {
                hideLoading();
            }, 2000);
        }


        init();
    }
})();