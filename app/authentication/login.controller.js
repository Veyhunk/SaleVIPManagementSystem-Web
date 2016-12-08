(function() {
    'use strict';

    angular
        .module('app.authentication')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['ProfileService', 'AuthModel', '$state'];

    function LoginCtrl(ProfileService, AuthModel, $state) {
        var vm = this;
        /*----------  界面层资源  ----------*/
        vm.signIn = signIn;
        /*----------  内部变量  ----------*/

        var authModel = AuthModel,
            profileService = ProfileService;
        /*----------  内部逻辑函数  ----------*/

        function signIn(login) {
            var hash = CryptoJS.MD5('test');
            debugger;
            $state.go('app.home');
        }
        /*----------  内部辅助函数  ----------*/

        function init() {

        }

        init();
    }
})();