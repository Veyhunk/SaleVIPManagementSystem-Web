(function(angular) {
    'use strict';

    angular
        .module('app.configs', [])
        .config(['RestangularProvider', function(RestangularProvider) {

            RestangularProvider.setBaseUrl('http://localhost:3000/API');

            RestangularProvider.setDefaultHeaders({ 'Content-Type': 'application/json' });

        }]);


})(window.angular);