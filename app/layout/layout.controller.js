(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('LayoutCtrl', LayoutCtrl);

    LayoutCtrl.$inject = [
        '$scope', '$state', 'LayoutModel', 'LayoutService', 'DictionaryService', 'ProfileService',
        'AuthService', 'Version'
    ];

    function LayoutCtrl($scope, $state, LayoutModel, LayoutService, DictionaryService, ProfileService, AuthService, Version) {
        /*----------  界面层资源  ----------*/
        var vm = this;

        vm.state = $state;
        vm.logOut = AuthService.logOut;
        vm.Version = Version;
        // 用户信息
        vm.profile;

        //商品测试单位
        vm.goodsUnits = _.toArray(DictionaryService.get('goods.units'));

        vm.treeData = [{
                "id": 1,
                "title": "node1",
                "nodes": [{
                        "id": 11,
                        "title": "node1.1",
                        "nodes": [{
                            "id": 111,
                            "title": "node1.1.1",
                            "nodes": []
                        }]
                    },
                    {
                        "id": 12,
                        "title": "node1.2",
                        "nodes": []
                    }
                ]
            },
            {
                "id": 2,
                "title": "node2",
                "nodrop": true,
                "nodes": [{
                        "id": 21,
                        "title": "node2.1",
                        "nodes": []
                    },
                    {
                        "id": 22,
                        "title": "node2.2",
                        "nodes": []
                    }
                ]
            },
            {
                "id": 3,
                "title": "node3",
                "nodes": [{
                    "id": 31,
                    "title": "node3.1",
                    "nodes": []
                }]
            }
        ];
        // 系统主菜单
        vm.mainMenus = [];
        // 快捷菜单
        vm.shortcutMenus = [];
        /*----------  内部变量  ----------*/
        var layoutModel = LayoutModel,
            layoutService = LayoutService;


        vm.isShortcutMenusMini = false;

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

        function init() {
            initMainMenus();
            // 初始化用户信息
            vm.profile = ProfileService.profile;
        }


        init();
    }
})();