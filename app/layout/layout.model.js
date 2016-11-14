(function() {
    'use strict';

    angular
        .module('app.layout')
        .factory('LayoutModel', LayoutModel);

    LayoutModel.$inject = ['$scope'];

    function LayoutModel($scope) {
        var LayoutModel = {
            exposedFn: exposedFn
        };

        return LayoutModel;

        ////////////////
        function exposedFn() {}
    }
})();