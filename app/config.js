(function(angular) {
    'use strict';

    angular
        .module('app.configs', [])
        .config(['RestangularProvider', function(RestangularProvider) {

            RestangularProvider.setBaseUrl('http://localhost:3000/API');

            RestangularProvider.setDefaultHeaders({ 'Content-Type': 'application/json' });

            RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
                var extractedData;
                // .. to look for getList operations
                if (operation === "getList" && typeof data.data !== 'undefined') {
                    // .. and handle the data and record data
                    extractedData = data.data;
                    extractedData.record = data.record;
                } else {
                    extractedData = data;
                }
                return extractedData;
            });

        }]);


})(window.angular);