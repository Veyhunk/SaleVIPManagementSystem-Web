(function() {
    'use strict';

    angular.module('app.page_template', ['ui.router'])
        .config(pageTemplateConfig);

    pageTemplateConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function pageTemplateConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app.page_template', {
                name: '系统管理',
                url: '/page_template',
                abstract: true,
            })
            .state('app.page_template.form', {
                name: '表单',
                url: '/form',
                views: {
                    'content@app': {
                        templateUrl: 'app/page-template/form/form.html'
                    }
                }
            })
            .state('app.page_template.modal', {
                name: '模态框',
                url: '/modal',
                views: {
                    'content@app': {
                        templateUrl: 'app/page-template/modal/modal.html'
                    }
                }
            })
            .state('app.page_template.table', {
                name: '表格',
                url: '/table',
                views: {
                    'content@app': {
                        templateUrl: 'app/page-template/table/table.html'
                    }
                }
            })
            .state('app.page_template.textarea', {
                name: '文本域',
                url: '/textarea',
                views: {
                    'content@app': {
                        templateUrl: 'app/page-template/textarea/textarea.html'
                    }
                }
            })
            .state('app.page_template.tree', {
                name: '树',
                url: '/tree',
                views: {
                    'content@app': {
                        templateUrl: 'app/page-template/tree/tree.html'
                    }
                }
            })
            .state('app.page_template.two_view', {
                name: '双视图',
                url: '/two_view',
                views: {
                    'content@app': {
                        templateUrl: 'app/page-template/two-view/two-view.html'
                    }
                }
            });

    }

})();