(function() {
    'use strict';

    angular
        .module('app.member_management')
        .controller('MemberSearchCtrl', MemberSearchCtrl);

    MemberSearchCtrl.$inject = ['$scope', 'UtilityService', 'MemberModel', '$uibModal'];

    function MemberSearchCtrl($scope, UtilityService, MemberModel, $uibModal) {
        var vm = this;
        /*----------  界面层资源  ----------*/
        vm.showMemberDetail = false;
        vm.showCustomer = false;
        vm.selectedCustomer = false;

        vm.current = {
            member: null,
            charge: null,
        };

        vm.search = search;
        vm.selectCustomer = selectCustomer;
        /*----------  内部变量  ----------*/

        var utilityService = UtilityService,
            memberModel = MemberModel;
        /*----------  内部逻辑函数  ----------*/

        function selectCustomer(isSelectCustomer) {
            debugger;
            if (isSelectCustomer) {
                selectMember(vm.customer);
            } else {
                selectMember({});
                vm.showMemberDetail = false;
            }
        }

        function search(queryString) {
            utilityService.showLoading();
            memberModel.search(queryString).then(result => {
                result = result.plain();
                utilityService.hideLoading();

                if (result.length <= 1) {
                    return selectMember(result);
                }

                $uibModal.open({
                    templateUrl: 'app/member-management/shared/member-search-list.modal.html',
                    size: 'lg',
                    controller: function($scope) {
                        $scope.list = result;
                        $scope.select = function(member) {
                            selectMember(member);
                        }
                    }
                });

            });
        }


        /*----------  内部辅助函数  ----------*/

        function selectMember(member) {
            debugger;
            vm.current.member = member;
            $scope.$emit('MEMBER_SEARCH_EVENT', member);
        }

        function init() {
            memberModel.getMembers().then(result => {
                result = result.plain();
                vm.customer = result[0];
            });
            if ($scope.$parent.showCustomer) {
                vm.showCustomer = true;
            }
        }

        init();
    }
})();