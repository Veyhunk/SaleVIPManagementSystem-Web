(function() {
    'use strict';

    angular.module('app.layout', ['ui.router'])
        .config(LayoutConfig);

    LayoutConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function LayoutConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
                abstract: true,
                views: {
                    root: {
                        templateUrl: 'app/layout/layout.html',
                    }
                }
            }).state('app.home', {
                url: '/home',
                views: {
                    'content@app': {
                        templateUrl: 'app/layout/home.html',
                    }
                }
            }).state('app.login', {
                url: '/login',
                views: {
                    'content@app': {
                        templateUrl: 'app/layout/home.html',
                    }
                }
            });


        $urlRouterProvider.otherwise(function($injector, $location) {

            $location.path('/login');
        });



    }

})();