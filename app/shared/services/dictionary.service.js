(function() {
    'use strict';

    angular
        .module('app.shared')
        .factory('DictionaryService', DictionaryService);

    DictionaryService.$inject = [];

    function DictionaryService() {

        var dictionaries = {
            //商品类型
            'goods.type': {
                1: '实物类',
                2: '服务类',
                3: '计次类',
                4: '计时类'
            },
            'sex': {
                0: '女士',
                1: '男士'
            },
            // 充值类型
            'member_charge.type': {
                1: '会员充值',
                2: '会员充次',
                3: '会员充时',
                4: '办卡充值'
            },
            // 消费类型
            'consumption.type': {
                1: '商品消费',
                2: '快速消费',
                3: '计次消费',
                4: '计时消费',
                5: '积分兑换'
            },
            // 出入库类型
            'inventory': {
                1: '商品入库',
                2: '销售出库',
                3: '编辑入库',
                4: '编辑出库'
            },
            'payment.type': {
                1: '余额',
                2: '现金',
                3: '网银',
                4: '支付宝',
                5: '微信'
            },
            'http_method': {
                1: 'get',
                2: 'post',
                3: 'patch',
                4: 'put',
                5: 'delete'
            },
            'goods.units': {
                1: '包',
                2: '条',
                3: '箱',
                4: '个',
                5: '次',
                6: '件',
                7: '台',
                8: '套',
                9: '组',
                10: '块'
            },
            'charge.units': {
                1: '元',
                2: '次',
                3: '分钟',
                4: '小时',
                5: '天'
            }
        };

        var DictionaryService = {
            get: get,
            resolve: resolve
        };

        return DictionaryService;

        ////////////////

        /**
         * 获取相应类型的字典表
         * 
         * @param {string} type
         * @returns
         * 
         * usage:
         * var sex = DictionaryService.get('sex');
         * console.info(sex[0]) // 女士
         */
        function get(type) {
            if (typeof dictionaries[type] !== 'undefined') {
                return dictionaries[type];
            }
        }

        /**
         * 根据所传类型和数值解析
         * 
         * @param {string} type
         * @param {number} value
         * @returns
         * 
         * usage:
         * var sex = DictionaryService.get('sex',0);
         * console.info(sex) // 女士
         */
        function resolve(type, value) {
            if (typeof dictionaries[type] !== 'undefined') {
                return dictionaries[type][value];
            }
        }
    }
})();