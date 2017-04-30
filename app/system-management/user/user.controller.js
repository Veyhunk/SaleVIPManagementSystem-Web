(function() {
    'use strict';

    angular
        .module('app.system_management')
        .controller('UserCtrl', UserCtrl);

    UserCtrl.$inject = ['UtilityService', '$uibModal'];

    function UserCtrl(UtilityService, $uibModal) {
        var vm = this;
        vm.openAddUserModal = openAddUserModal;

        /*----------  界面层资源  ----------*/

        /*----------  内部变量  ----------*/

        var utilityService = UtilityService;
        /*----------  内部逻辑函数  ----------*/
        function openAddUserModal() {

            let modalInstance = $uibModal.open({

                templateUrl: 'app/system-management/user/add-user.modal.html',
                controller: ($scope) => {
                    $scope.user = {
                        username: '',
                        password: '',
                        name: '',
                        role: '',
                        contact: '',
                        sex: 1,
                        remark: ''
                    };

                    $scope.addUser = addUser;
                    $scope.modalInstance = modalInstance;
                }
            });
        }

        function addUser() {

        }

        /*----------  内部辅助函数  ----------*/

        function init() {

        }

        init();
    }
})();