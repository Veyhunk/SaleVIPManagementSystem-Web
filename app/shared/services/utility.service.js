(function() {
    'use strict';

    angular
        .module('app.shared')
        .factory('UtilityService', UtilityService);

    UtilityService.$inject = ['$q', '$rootScope', '$uibModal'];

    function UtilityService($q, $rootScope, $uibModal) {
        let UtilityService = {
            getOrderCode: getOrderCode,
            getDatetime: getDatetime,
            initPagination: initPagination,
            showLoading: showLoading,
            hideLoading: hideLoading,
            getSelected: getSelected,
            toggleItems: toggleItems,
            openNoticeModal: openNoticeModal,
            getTreeData: getTreeData,
            getParseDictionary: getParseDictionary
        };

        return UtilityService;

        function showLoading() {
            $rootScope.showLoading();
        }

        function hideLoading() {
            $rootScope.hideLoading();
        }
        /**
         * @param {Object} items 
         * @param {Boolean} state 
         */
        function toggleItems(items, state) {
            items.forEach((item) => {
                item.isChecked = state;
            });
        }

        /**
         * @param {Object} items 
         * @param {Boolean} state 
         */
        function toggleTreeItems(items, state) {
            items.forEach((item) => {
                if (item.children && item.children.length) {
                    toggleTreeItems(item.children, state);
                }
                item.isChecked = state;
            });
        }

        /**
         * 
         * @param {Object} types 
         * @returns 
         */
        function getParseDictionary(types) {
            let key,
                result = [];

            for (key in types) {
                let tmp = {};
                tmp.id = parseInt(key);
                tmp.name = types[key];
                result.push(tmp);
            }

            return result;
        }

        /**
         * 组装成具有层级结构的数据
         * 
         * @param {Array<Object>} items
         * @returns 
         */
        function getTreeData(items) {
            let result = [],
                // 保证数据无序正确组成树
                repeter = [];
            let root = {},
                nodes = {};

            let i,
                len = items.length;

            for (i = 0; i < len; i++) {
                let node = items[i];

                if (!node.parent) {
                    root[node.id] = node;
                    nodes[node.id] = node;
                    continue;
                }

                if (nodes[node.parent]) {
                    if (!nodes[node.parent].children) {
                        nodes[node.parent].children = [];
                    }
                    nodes[node.parent].children.push(node);
                } else {
                    repeter.push(node);
                }

                nodes[node.id] = node;

            }

            len = repeter.length;

            for (i = 0; i < len; i++) {
                let node = repeter[i];
                if (nodes[node.parent]) {
                    if (!nodes[node.parent].children) {
                        nodes[node.parent].children = [];
                    }
                    nodes[node.parent].children.push(node);
                } else {
                    // 还是没有父节点，直接插入根结点 
                    root[node.id] = node;
                }
            }

            let key;
            for (key in root) {
                result.push(root[key]);
            }
            return result;
        }

        /**
         * 
         * 从列表中获取选中的项
         * @param {Array[Object]} items
         * @returns
         */
        function getSelected(items) {
            let result = [];
            items.forEach(item => {
                if (item.isChecked) {
                    result.push(item);
                }
            });
            return result;
        }

        /**
         * 
         * 打开系统提示窗口
         * @param {object} configs
         * @returns
         */
        function openNoticeModal(configs) {
            $uibModal.open({
                templateUrl: 'app/shared/views/system-notice.tpl.html',
                size: 'sm',
                controller: function($scope) {

                    $scope.title = configs.title || '系统提示';
                    $scope.content = configs.content;;
                }
            });
            return;
        }

        // 获取项目中所需要用到的订单编号
        function getOrderCode(type) {
            let deferred = $q.defer();

            getDatetime().then(result => {
                deferred.resolve(type + result);
            });

            return deferred.promise;
        }

        // 获取后台时间，年+月+日+时分秒，如20161118192403
        function getDatetime() {
            let deferred = $q.defer();

            let result = moment().format('YYYYMMDDHHmmss');
            deferred.resolve(result);

            return deferred.promise;
        }

        // 初始化分页参数
        function initPagination() {
            let pagination = {
                configs: {
                    // 每页10条
                    per_page: 10,
                    // 当前页
                    page: 1,
                },
                // 总记录条数
                records: 0
            }
            return pagination;
        }
    }
})();