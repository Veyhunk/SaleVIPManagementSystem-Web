// angular bootstrap
$(function() {

    // moment.js default language
    moment.locale('zh-cn')

    angular.bootstrap(document, ['app']);


});

// 使用 datetimepicker插件的时候反注释掉下面内容
// (function($){
//     $.fn.datetimepicker.dates['zh-CN'] = {
//             days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
//             daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
//             daysMin:  ["日", "一", "二", "三", "四", "五", "六", "日"],
//             months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
//             monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
//             today: "今天",
//             suffix: [],
//             meridiem: ["上午", "下午"],

//     };
// }(jQuery));