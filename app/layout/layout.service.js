(function() {
    'use strict';

    angular
        .module('Module')
        .service('LayoutService', LayoutService);

    LayoutService.$inject = ['$scope'];

    function LayoutService($scope) {
        this.exposedFn = exposedFn;

        ////////////////

        function exposedFn() {}
    }
})();