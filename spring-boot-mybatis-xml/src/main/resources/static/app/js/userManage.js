var userManager = {

    init: function () {
        //toastr通知设置
        toastr.options = {
            "closeButton": true,
            "debug": true,
            "progressBar": false,
            "positionClass": "toast-top-right",
            "showDuration": "400",
            "hideDuration": "1000",
            "timeOut": "1000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        };
        userManager.getTable();
    },

    //获取全部用户
    getTable: function () {
        $.jgrid.defaults.styleUI = "Bootstrap";
        $("#table_list_1").jqGrid({
            url: "user/getAllUsers.do",
            datatype: 'json',
            mtype: "post",
            height: 350,
            autowidth: true,
            shrinkToFit: true,
            rowNum: 20,
            rowList: [10, 20, 30],
            colNames: ["id", "用户名", "密码", "状态", "创建时间","更新时间","编辑","权限"],
            colModel: [{
                name: "id",
                index: "id",
                editable: false,
                width: 30,
                sorttype: "int",
                search: false,
                hidden: true
            }, {
                name: "user_name",
                index: "user_name",
                editable: false,
                search: true,
                width: 25,
                searchoptions: {
                    sopt: ["eq"]
                }
            }, {
                name: "password",
                index: "password",
                editable: false,
                search: true,
                width: 25,
                searchoptions: {
                    sopt: ["eq"]
                }
            }, {
                name: "state",
                index: "state",
                editable: false,
                search: true,
                width: 25,
                searchoptions: {
                    sopt: ["eq"]
                }
            },  {
                name: "create_time",
                index: "create_time",
                editable: false,
                search: false,
                width: 30
            }, {
                name: "update_time",
                index: "update_time",
                editable: false,
                search: false,
                width: 30
            }, {
                name: "edit",
                index: "edit",
                editable: false,
                width: 25,
                align: "center",
                search: false,
                formatter: function (cellvalue, options, rowObject) {
                	console.log(rowObject);
                    return '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#updateUser" onclick="userManager.updateUser(' + rowObject +
                        ')"  value="编辑用户">编辑用户</button>' ;
                }
            },{
                name: "operation",
                index: "operation",
                editable: false,
                width: 25,
                search: false,
                formatter: function (cellvalue, options, rowObject) {
                    var id = rowObject.id;
                    return '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#ztree_1" onclick="userManager.function(' + id +
                        ')"  value="权限">权限</button>' ;
                },
            }],
            pager: "#pager_list_1",
            viewrecords: true,
            hidegrid: false,
            jsonReader: {
                root: "users",
                page: "currPage",
                total: "totalPage",
                records: "totalCount",
                repeatitems: false,
                id: "id"
            },
            // caption: "用户管理",
            add: true,
            edit: true,
            cellEdit: true,
            cellurl: "user/editUser.do",
            addtext: "Add",
            edittext: "Edit",
            hidegrid: false,
            rownumbers: true,
            editurl: "user/editUser.do",
            afterSubmitCell: function (data) {
                var result = JSON.parse(data.responseText);
                if (result.errorCode == "0") {
                    $("#refresh_table_list_1").click();
                    toastr.success(result.errorMessage);
                } else {
                    $("#refresh_table_list_1").click();
                    toastr.error(result.errorMessage);
                }
            },
        });
        $("#table_list_1").setSelection(4, true);
        $("#table_list_1").jqGrid("navGrid", "#pager_list_1", {
            edit: false,
            add: true,
            del: true,
            search: true
        }, {
            //修改
        }, {
            //增加
        }, {
            //删除
            afterSubmit: function (obj) {
                var data =JSON.parse(obj.responseText);
                if(data.errorCode == "0"){
                    toastr.success(data.errorMessage);
                }else {
                    toastr.error(data.errorMessage);
                }
                $("#eData").click();
                $("#refresh_table_list_1").click();
            }
        }, {
            //搜索
            closeAfterSearch: true,
        });
        $(window).bind("resize", function () {
            var width = $(".jqGrid_wrapper").width();
            $("#table_list_1").setGridWidth(width)
        });

    },

    updateUser: function (rowObject) {
        bison.post({
            url: "user/changeUserState.do",
            data: {
                id: id,
                state: state,
                oper: "edit",
            },
            success: function (data) {
                if (data.errorCode == "0") {
                    var temp1 = '<i class="glyphicon glyphicon-plus" onclick="userManager.changeUserState(1, ' + id +
                        ')"></i>';
                    var temp2 = '<i class="glyphicon glyphicon-minus" onclick="userManager.changeUserState(0, ' + id +
                        ')"></i>';
                    $("#user_" + id).empty();
                    if (state == 0) {
                        $("#user_" + id).html(temp1);
                    } else if (state == 1) {
                        $("#user_" + id).html(temp2);
                    }


                } else {
                    toastr.error(result.errorMessage);
                }
            }
        });
    }

}

$(document).ready(function () {
    userManager.init();
});
