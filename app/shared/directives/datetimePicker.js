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
        };
        return datetimePicker;

        function link(scope, element, attrs) {
            if (!scope.datetimePickerOptions) {
                scope.datetimePickerOptions = {};
            }
            angular.extend(scope.datetimePickerOptions, {
                autoclose: true,
                pickerPosition: 'bottom-left',
                language: 'zh-CN'
            });
            debugger;
            element.datetimepicker(scope.datetimePickerOptions);
        }
    }
})();