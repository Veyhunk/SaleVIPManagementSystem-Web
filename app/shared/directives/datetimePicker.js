(function() {
    'use strict';

    angular
        .module('app.shared')
        .directive('datetimePicker', datetimePicker);

    datetimePicker.$inject = [];

    function datetimePicker() {
        // Usage:
        //
        // Creates:
        //
        var datetimePicker = {
            link: link,
            restrict: 'A',
            scope: {
                datetimePickerOptions: '='
            }
        };
        return datetimePicker;

        function link(scope, element, attrs) {
            var options = {};
            if (scope.datetimePickerOptions) {
                options = scope.datetimePickerOptions;
            }
            options = angular.extend({
                autoclose: true,
                language: 'zh-CN',
                pickerPosition: 'bottom-right'
            }, options);

            debugger;
            element.datetimepicker(options);
        }
    }
})();