var danceword = {
    interval: 60,
    loop: false,
    isComeHere: function (obj) {
        var h1 = document.body.scrollTop;
        if (!/Chrome|Safari/.test(navigator.userAgent)) {
            h1 = document.documentElement.scrollTop;
        }
        var h2 = $(window).height();
        return (h1 + h2 - $(obj).offset().top) >= $(obj).height();
    },
    isVisible: function (obj) {
        var h1 = document.body.scrollTop;
        if (!/Chrome|Safari/.test(navigator.userAgent)) {
            h1 = document.documentElement.scrollTop;
        }
        var h2 = $(window).height();
        return h1 + h2 - $(obj).offset().top >= $(obj).height() && $(obj).offset().top + $(obj).height() >= h1;
    },
    showCore: function () {
        var me = this;
        if (!me.loop) {
            $("[class^='danceWord']:not(.past)").each(function () {
                var tmp = $.trim($(this).text());
                var h = '';
                for (var i in tmp) {
                    h += "<span>" + tmp[i] + "</span>";
                }
                h = h.replace(/<\/span><span>([\，\,\。\.\!\！\?\？])/g, "$1");
                $(this).html(h);
            });
            $("[class^='danceWord']:not(.past)").each(function () {
                var m1 = this;
                var l = $(this).text().length;
                if (me.isComeHere(m1)) {
                    $(m1).find("span").each(function (k, v) {
                        var me2 = this;
                        setTimeout(function () {
                            $(me2).addClass('ele')
                        }, (k + 1) * me.interval);
                    });
                    setTimeout(function () {
                        $(m1).html($(m1).text());
                    }, l * me.interval + 1000);
                    $(m1).addClass('past');
                }
            });
        } else {
            $("[class^='danceWord']").each(function () {
                var m1 = this;
                var l = $(this).text().length;
                if (!me.isVisible(m1)) {
                    $(m1).removeClass('past');
                    var tmp = $.trim($(m1).text());
                    var h = '';
                    for (var i in tmp) {
                        h += "<span>" + tmp[i] + "</span>";
                    }
                    h = h.replace(/<\/span><span>([\，\,\。\.\!\！\?\？])/g, "$1");
                    $(m1).html(h);
                }
                if (me.isVisible(m1) && !$(m1).hasClass('past')) {
                    var tmp = $.trim($(m1).text());
                    var h = '';
                    for (var i in tmp) {
                        h += "<span>" + tmp[i] + "</span>";
                    }
                    h = h.replace(/<\/span><span>([\，\,\。\.\!\！\?\？])/g, "$1");
                    $(m1).html(h).addClass('past');
                    $(m1).find("span").each(function (k, v) {
                        var me2 = this;
                        setTimeout(function () {
                            $(me2).addClass('ele')
                        }, (k + 1) * me.interval);
                    });
                    setTimeout(function () {
                        $(m1).html($(m1).text());
                    }, l * me.interval + 1000);
                }
                ;
            });
        }
        if (/MSIE/.test(navigator.userAgent) || navigator.userAgent.indexOf("Trident/7.0;") > -1) {
            $('[class^="danceWord"] span').css('display', 'inline');
        }
    },
    init: function (a) {
        var me = danceword;
        if (typeof a == 'object') {
            $.extend(me, a);
        }
        me.showCore();
        window.onscroll = function () {
            me.showCore();
        }
    }
};

window.onload = danceword.init;

$(function () {

    if (document.documentMode < 9) {
        alert('浏览器版本过低，请下载火狐浏览器。');
        window.location.href = 'static/login/resourceDownload.html';
        return;
    }
    var location = window.location;
    var address = location.protocol + '//' + location.host + '/' + location.pathname.split('/')[1];
    var origin = window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
    var reg = /\/([\S]*?)\//;
    var path = origin + "/" + address.match(reg)[1];
    $('#download-addr').attr('href', path + '/mobile/soft/download/downLoad_mobile.html');
    function IsMobile() {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone",
            "SymbianOS", "Windows Phone", "iPod"];
        var flag = false;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = true;
                break;
            }
        }
        return flag;
    }

    var controlFlag = "PC";
    var flag = IsMobile();
    if (flag) {
        //默认是PC，只有符合移动端条件才将此值设置为MOBILE
        controlFlag = "MOBILE";
        $('#pcLogin').remove();
        $('#mobileLogin').show();
    } else {
        $('#pcLogin').show();
        $('#mobileLogin').remove();
    }
    var errorMsg = '';
    $('#sumbitBtn,#sumbitBtn1').on('click', function () {
        errorMsg = '';
        if ($('#username').val() == '' || $('#password').val() == '') {
            errorMsg = '用户名或密码为空';
            $('#error-tip').html(errorMsg);
        } else {
            errorMsg = '';
            var data1 = {
                password: $('#password').val().trim(),
                userName: $('#username').val().trim(),
            };
            JSON.stringify(data1);
            $.ajax({
                url: "api/user/login.do",
                type: "post",
                contentType: "application/json;charset=UTF-8",
                data: JSON.stringify(data1),
                success: function (data, textStatus) {
                	console.log(data);
                    if (data && data.errorCode == "0000") {
                        if (data.res && data.res.userInfo) {
                            bison.require("store.js");
                            bison.store.add("userInfo", JSON.stringify(data.res.userInfo));
                            var href = window.top.location.href;
                            window.top.location.href = href.substring(0, href.lastIndexOf("/"));
                        }
                    } else {
                        swal({
                            title: "温馨提示",
                            text: data.errorMessage,
                            type: "error",
                            confirmButtonText: "确定"
                        });
                    }
                }/*,
                error: function (data, textStatus) {
                    bison.systemError();
                }*/
            });
        }
    })

    $('#password').on('keyup', function (e) {
        if (e.keyCode === 13) {
            $('#sumbitBtn').trigger('click');
        }
    });
});

//判断浏览器是否支持 placeholder属性
function isPlaceholder() {
    var input = document.createElement('input');
    return 'placeholder' in input;
}

if (!isPlaceholder()) {//不支持placeholder
    $(function () {
        if (!isPlaceholder()) {
            $("input").not("input[type='password']").each(//把input绑定事件
                function () {
                    if ($(this).val() == "" && $(this).attr("placeholder") != "") {
                        $(this).val($(this).attr("placeholder"));
                        $(this).focus(function () {
                            if ($(this).val() == $(this).attr("placeholder")) $(this).val("");
                        });
                        $(this).blur(function () {
                            if ($(this).val() == "") $(this).val($(this).attr("placeholder"));
                        });
                    }
                });
            //对password框的处理
            var pwdField = $("input[type=password]");
            var pwdVal = pwdField.attr('placeholder');
            pwdField.after('<input id="pwdPlaceholder" type="text" value=' + pwdVal + ' autocomplete="off" />');
            var pwdPlaceholder = $('#pwdPlaceholder');
            pwdPlaceholder.show();
            pwdField.hide();

            pwdPlaceholder.focus(function () {
                pwdPlaceholder.hide();
                pwdField.show();
                pwdField.focus();
            });

            pwdField.blur(function () {
                if (pwdField.val() == '') {
                    pwdPlaceholder.show();
                    pwdField.hide();
                }
            });
        }
    });
}
