(function() {
    'use strict';

    angular
        .module('app.member_management')
        .controller('MemberSearchCtrl', MemberSearchCtrl);

    MemberSearchCtrl.$inject = ['UtilityService', 'MemberModel'];

    function MemberSearchCtrl(UtilityService, MemberModel) {
        var vm = this;
        /*----------  界面层资源  ----------*/
        vm.currentCharge;
        /*----------  内部变量  ----------*/

        var utilityService = UtilityService,
            memberModel = MemberModel;
        /*----------  内部逻辑函数  ----------*/


        /*----------  内部辅助函数  ----------*/



        function init() {

        }

        init();
    }
})();