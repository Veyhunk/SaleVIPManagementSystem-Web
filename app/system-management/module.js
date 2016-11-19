(function() {
    'use strict';

    angular.module('app.system_management', ['ui.router'])
        .config(SystemManagementConfig);

    SystemManagementConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function SystemManagementConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app.system_management', {
                name: '系统管理',
                url: '/system_management',
                abstract: true,
            })
            .state('app.system_management.user_management', {
                name: '用户管理',
                url: '/user_management',
                views: {
                    'content@app': {
                        templateUrl: 'app/system-management/user-management/user-management.html'
                    }
                }
            })
            .state('app.system_management.role_management', {
                name: '角色管理',
                url: '/role_management',
                views: {
                    'content@app': {
                        templateUrl: 'app/system-management/role-management/role-management.html'
                    }
                }
            });

    }

})();