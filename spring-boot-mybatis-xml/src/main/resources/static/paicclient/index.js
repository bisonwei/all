var index = {
    init: function () {
        bison.require("store.js");
        var userInfo = bison.store.get("userInfo");
        try {
            userInfo = JSON.parse(userInfo);
            console.log(userInfo);
            if (userInfo && userInfo.userName) {
                $("#userName").text(userInfo.userName);
            } else {
                console.log("get userInfo error logout");
                bison.logoutPrompt();
                return;
            }
        } catch (e) {
            bison.logoutPrompt();
            return;
        }
        
        bison.post({
            url: "app/user/queryHomeMenu.do",
            success: function (data, textStatus) {
                $("body").show();
                if (data && data.errorCode == "0000") {
                    if (data.res && data.res.menus) {
                        var html = index.createFunctionTree(data.res.menus);
                        $("#side-menu").append(html);
                        bison.require("ui/contabs.min.js");
                        index.initEvent();
                    }
                } else {
                    swal({
                        title: "温馨提示",
                        text: data.errorMessage,
                        type: "error",
                        confirmButtonText: "确定"
                    });
                }
            },
            error: function () {
                bison.logoutPrompt();
            }
        });

    },
    logout: function () {
        swal({
            title: "温馨提示",
            text: "确定退出当前账号?",
            type: "info",
            showCancelButton: true,
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            closeOnConfirm: false
        }, function () {
            bison.post({
                url: "app/logout.do"
            });
            localStorage.clear();
            sessionStorage.clear();
            window.top.location.href = window.top.location.href.substring(0, window.top.location.href.lastIndexOf('/')) + '/login.html';
        });
    },

    createFunctionTree: function (array) {
        var func = new Array();
        for (var i = 0; i < array.length; i++) {
            var parent = array[i];
            var children = parent.children || new Array();
            if (children.length > 0) {
            	console.log("children.length"+children.length);
            	func.push('<li><a href="javascript:;"><i class="' + parent.icon + '"></i><span class="nav-label">' + parent.name + '</span><span class="fa arrow"></span></a><ul class="nav nav-second-level">')
                func.push(index.createFunctionTree(children));
                func.push('</ul></li>');
            } else {
            	console.log("1:"+children.length);
            	 var icon = parent.icon ?  parent.icon  : '';
                 func.push('<li><a class="J_menuItem" href="'+parent.param+'" >+ '+' <span class="nav-label">' + parent.name + '</span></a></li>');
            } 
        }
        console.log("func:"+func);
        return func.join("");
    },
    initEvent: function () {
        bison.browser.mobile && $("#content-main").css("overflow-y", "auto");
        var NavToggle = function () {
            $(".navbar-minimalize").trigger("click");
        };

        var SmoothlyMenu = function () {
            if ($("body").hasClass("mini-navbar")) {
                if ($("body").hasClass("fixed-sidebar")) {
                    ($("#side-menu").hide(), setTimeout(function () {
                        $("#side-menu").fadeIn(500, function () {

                        });
                    }, 500))
                } else {
                    $("#side-menu").removeAttr("style");
                }
            } else {
                ($("#side-menu").hide(), setTimeout(function () {
                    $("#side-menu").fadeIn(500, function () {
                        $("#side-menu").show();
                    });
                }, 500))
            }
        };

        $("#side-menu").metisMenu();

        $(".sidebar-collapse").slimScroll({
            height: "100%",
            railOpacity: .9,
            alwaysVisible: !1
        });

        $(".navbar-minimalize").on("click", function () {
            $("body").toggleClass("mini-navbar");
            SmoothlyMenu();
        });

        $("#side-menu>li").on("click", function () {
            $("body").hasClass("mini-navbar") && NavToggle();
        });

        $("#side-menu>li li a").on("click", function () {
            $(window).width() < 769 && NavToggle()
        });

        $(".nav-close").on("click", NavToggle);

        $(window).bind("load resize", function () {
            if ($(this).width() < 769) {
                $("body").addClass("mini-navbar");
                $(".navbar-static-side").fadeIn();
            }
        });
    },
}

$(document).ready(function () {
    index.init();
});
