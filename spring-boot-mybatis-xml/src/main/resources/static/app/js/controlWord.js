var dscsControlWord = {
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
        dscsControlWord.getTable();

    },

    //获取全部dscs受控词
    //jqgrid
    getTable: function () {
        $.jgrid.defaults.styleUI = "Bootstrap";
        $("#table_list_1").jqGrid({
            url: "controlWord/getAllControlWord.do",
            datatype: 'json',
            mtype: "post",
            height: 450,
            autowidth: true,
            shrinkToFit: true,
            rowNum: 20,
            rowList: [10, 20, 30],
            colNames: ["id", "受控词类型", "值", "描述", "创建时间", "修改时间",
                "field1", "field2", "field3", "field4", "field5"],
            colModel: [{
                name: "id",
                index: "id",
                editable: false,
                width: 60,
                key: true,
                sorttype: "int",
                search: false,
                hidden: true
            }, {
                name: "type",
                index: "type",
                editable: true,
                search: true,
                width: 30,
                searchoptions: {
                    sopt: ["eq"]
                }
            }, {
                name: "value",
                index: "value",
                editable: true,
                search: true,
                width: 30,
                searchoptions: {
                    sopt: ["eq"]
                }
            }, {
                name: "description",
                index: "description",
                editable: true,
                search: false,
                width: 30,
            }, {
                name: "create_time",
                index: "create_time",
                editable: false,
                search: false,
                width: 30,
            }, {
                name: "update_time",
                index: "update_time",
                editable: false,
                search: false,
                width: 30,
            }, {
                name: "field_1",
                index: "field_1",
                editable: true,
                search: true,
                width: 20,
                searchoptions: {
                    sopt: ["eq"]
                }
            }, {
                name: "field_2",
                index: "field_2",
                editable: true,
                search: true,
                width: 20,
                searchoptions: {
                    sopt: ["eq"]
                }
            }, {
                name: "field_3",
                index: "field_3",
                editable: true,
                search: true,
                width: 20,
                searchoptions: {
                    sopt: ["eq"]
                }
            }, {
                name: "field_4",
                index: "field_4",
                editable: true,
                search: false,
                width: 20,
            }, {
                name: "field_5",
                index: "field_5",
                editable: true,
                search: false,
                width: 20,
            }],
            pager: "#pager_list_1",
            viewrecords: true,
            hidegrid: false,
            jsonReader: {
                root: "controlWords",
                page: "currPage",
                total: "totalPage",
                records: "totalCount",
                repeatitems: false,
                id: "id"
            },
            //caption: "dscs受控词管理",
            add: true,
            edit: true,
            cellEdit: true,
            cellsubmit: 'clientArray',
            //cellurl: "controlWord/editControlWord.do",
            addtext: "Add",
            edittext: "Edit",
            hidegrid: false,
            rownumbers: true,
            editurl: "controlWord/editControlWord.do",
            beforeSubmitCell: function (rowid, cellname, value) {
                swal({
                    title: "温馨提示",
                    text: "确定修改?",
                    type: "info",
                    showCancelButton: true,
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    closeOnConfirm: true,
                    closeOnCancel: true
                }, function (isConfirm) {
                    if (isConfirm) {
                        bison.post({
                            url: "controlWord/updateControlWord.do",
                            data: {
                                oper: "edit",
                                id: rowid,
                                cellname: cellname,
                                value: value,
                            },
                            success: function (data) {
                                if (data.errorCode == "0") {
                                    $("#refresh_table_list_1").click();
                                    toastr.success(data.errorMessage);
                                } else {
                                    $("#refresh_table_list_1").click();
                                    toastr.error(data.errorMessage);
                                }
                            },
                        });
                    } else {
                        $("#refresh_table_list_1").click();
                    }
                });
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
            afterSubmit: function (obj) {
                var data =JSON.parse(obj.responseText);
                if(data.errorCode == "0"){
                    toastr.success(data.errorMessage);
                }else {
                    toastr.error(data.errorMessage);
                }
                $("#cData").click();
                $("#refresh_table_list_1").click();
            }
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

    }

}

$(document).ready(function () {
    dscsControlWord.init();
});
