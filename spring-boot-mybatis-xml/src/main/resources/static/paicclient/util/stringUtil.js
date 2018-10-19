/**
 * Created by XIEYAN630@pingan.com.cn on 2017/4/13.
 */
(function () {
    bison.registerNamespace("bison.util");
    bison.util.trim = function (str) {
        if (str == null) return "";
        str = String(str);
        var reg = /^\s*/;
        str = str.replace(reg, "");
        reg = /\s*$/;
        str = str.replace(reg, "");
        return str
    };
    bison.util.trimEnd = function (str, reg) {
        if (str == null) return "";
        str = String(str);
        reg = reg ? reg : "\s";
        var newReg = new RegExp("" + reg + "$", "i");
        str = str.replace(newReg, "");
        return str
    };
    bison.util.trimStart = function (str, reg) {
        if (str == null) return "";
        reg = reg ? reg : "\s";
        str = String(str);
        var newReg = new RegExp("^" + reg + "", "i");
        str = str.replace(newReg, "");
        return str
    };
    bison.util.isEmpty = function (str) {
        return bison.util.trim(str) == "" ? true : false
    };
    bison.util.padLeft = function (str, len, c) {
        var padChar = (c && c.length > 0) ? c.charAt(0) : " ";
        var resultVal = new String(str);
        while (resultVal.length < len) {
            resultVal = padChar + resultVal
        }
        return resultVal
    };
    bison.util.padRight = function (str, len, c) {
        var padChar = (c && c.length > 0) ? c.charAt(0) : " ";
        var resultVal = new String(str);
        while (resultVal.length < len) {
            resultVal = resultVal + padChar
        }
        return resultVal
    };
    bison.util.right = function (str, len) {
        if (bison.util.isEmpty(str)) return "";
        var resultVal = new String(str);
        if (resultVal.length <= len) {
            return resultVal
        }
        return resultVal.substring(resultVal.length - len)
    };
    bison.util.left = function (str, len) {
        if (bison.util.isEmpty(str)) return "";
        var resultVal = new String(str);
        if (resultVal.length <= len) {
            return resultVal
        }
        return resultVal.substring(0, len)
    };
}());