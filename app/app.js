(function() {
    'use strict';

    angular.module('app', [
        // 第三方插件
        'restangular',
        // 布局模块
        'app.layout',
        // 系统配置模块
        'app.configs',
        // 业务逻辑模块
        'app.member_management',
        'app.goods_management'
    ]);
})();