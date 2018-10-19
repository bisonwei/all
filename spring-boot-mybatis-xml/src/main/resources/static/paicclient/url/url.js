/**
 * Created by XIEYAN630@pingan.com.cn on 2017/5/22.
 */
(function () {
    bison.registerNamespace("bison.url");

    bison.url.queryString = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", i); // 匹配目标参数
        var result = window.location.search.substr(1).match(reg);  // 对querystring匹配目标参数
        if (result != null) {
            return decodeURIComponent(result[2]);
        } else {
            return null;
        }
    };
    bison.url.isUrl = function(url) {
        if (iunet.util.isNullOrEmpty(url)) return false;
        var reg = /^(http(s)?:\/\/)?([\w-]+\.)+[\w-]+(:\d+)?(\/[\w- .\/?%&=#]*)?$/i;
        return (url.search(reg) != -1)
    };
}());