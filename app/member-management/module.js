(function() {
    'use strict';

    angular.module('app.member_management', ['ui.router'])
        .config(LayoutConfig);

    LayoutConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function LayoutConfig($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app.member_management', {
                url: '/member_management',
                abstract: true,

            })
            .state('app.member_management.register', {
                url: '/register',
                views: {
                    'content@app': {
                        templateUrl: 'app/member-management/member-register/member-register.html'
                    }
                }
            })
            .state('app.member_management.list', {
                url: '/list',
                views: {
                    'content@app': {
                        templateUrl: 'app/member-management/member-list/member-list.html'
                    }
                }
            })
            .state('app.member_management.charge', {
                url: '/charge',
                views: {
                    'content@app': {
                        templateUrl: 'app/member-management/member-charge/member-charge.html'
                    }
                }
            })
            .state('app.member_management.level', {
                url: '/level',
                views: {
                    'content@app': {
                        templateUrl: 'app/member-management/member-level/member-level.html'
                    }
                }
            });
    };
})();