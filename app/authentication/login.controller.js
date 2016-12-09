(function() {
    'use strict';

    angular
        .module('app.authentication')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['AuthService', '$state'];

    function LoginCtrl(AuthService, $state) {
        var vm = this;
        /*----------  界面层资源  ----------*/
        vm.signIn = signIn;
        /*----------  内部变量  ----------*/

        var authService = AuthService;
        /*----------  内部逻辑函数  ----------*/

        // 登录
        function signIn(user) {

            user.password = CryptoJS.MD5(user.password);

            authService.login(user).then(result => {
                $state.go('app.home');
            }, error => {
                if (error.status == 'failure') {
                    return;
                }
            });
        }
        /*----------  内部辅助函数  ----------*/


    }
})();