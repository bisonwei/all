var template = {
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
        template.getTable();

    },

    //获取全部dscs受控词
    //jqgrid
    getTable: function () {
        $.jgrid.defaults.styleUI = "Bootstrap";
        $("#table_list_1").jqGrid({
            url: "template/getAllTemplate.do",
            datatype: 'json',
            mtype: "post",
            height: 450,
            autowidth: true,
            shrinkToFit: true,
            rowNum: 20,
            rowList: [10, 20, 30],
            colNames: ["id", "模板号", "上传", "下载", "配置", "模板名称", "总键数", "key字体", "key编码", "签名关键字", "签名方位", "水平偏移量",
                "X轴偏移量", "Y轴偏移量", "手机号", "签名页码", "签名字体大小", "签名字体颜色", "创建时间", "修改时间", "签章规则", "渠道号",  "扩展3", "扩展4", "扩展5"],
            colModel: [{
                name: "id",
                index: "id",
                editable: false,
                width: 30,
                key: true,
                sorttype: "int",
                search: false,
                hidden: true
            }, {
                name: "template_id",
                index: "template_id",
                editable: true,
                search: true,
                width: 30,
                searchoptions: {
                    sopt: ["eq"]
                }
            }, {
                name: "uploadTemplate",
                index: "uploadTemplate",
                editable: false,
                width: 30,
                search: false,
                formatter: function (cellvalue, options, rowObject) {
                    var templateTableId = rowObject.id;
                    var oper = 101;
                    var dId = "uploadTemplate" + templateTableId;
                    return '<div class="site-demo-button" id="' + dId + '" style="margin-bottom: 0;">'
                        + '<button type="button" class="layui-btn" data-method="setTop" onclick="template.doAction(' + oper + ',' + templateTableId +
                        ')" value="上传">上传</button>'
                        + '</div>'
                }
            }, {
                name: "downloadTemplate",
                index: "downloadTemplate",
                editable: false,
                width: 30,
                search: false,
                formatter: function (cellvalue, options, rowObject) {
                    var templateTableId = rowObject.id;
                    var aId = "downloadTemplate" + templateTableId;
                    var oper = 102;
                    return '<button class="layui-btn" onclick="template.doAction(' + oper + ',' + templateTableId +
                        ')" value="">下载</button>'
                        + '<a id="' + aId + '" download href="#"  target="_blank" style="display: none;"><span></span></a>'
                }
            }, {
                name: "configTemplate",
                index: "configTemplate",
                editable: false,
                width: 30,
                search: false,
                formatter: function (cellvalue, options, rowObject) {
                    var templateTableId = rowObject.id;
                    var oper = 103;
                    var dId = "configTemplate" + templateTableId;
                    return '<div class="site-demo-button" id="' + dId + '" style="margin-bottom: 0;">'
                        + '<button type="button" class="layui-btn" data-method="setTop" onclick="template.doAction(' + oper + ',' + templateTableId +
                        ')" value="配置">配置</button>'
                        + '</div>'
                }
            }, {
                name: "description",
                index: "description",
                editable: true,
                search: true,
                width: 30,
                searchoptions: {
                    sopt: ["eq"]
                }
            }, {
                name: "total_key",
                index: "total_key",
                editable: true,
                search: false,
                width: 10,
            }, {
                name: "key_font",
                index: "key_font",
                editable: true,
                search: false,
                width: 20,
            }, {
                name: "key_encoding",
                index: "key_encoding",
                editable: true,
                search: false,
                width: 20,
            }, {
                name: "sign_key_word",
                index: "sign_key_word",
                editable: true,
                search: false,
                width: 20,
            }, {
                name: "pos",
                index: "pos",
                editable: true,
                search: false,
                width: 10,
            }, {
                name: "horizonta_offset",
                index: "horizonta_offset",
                editable: true,
                search: false,
                width: 20,
            }, {
                name: "posx",
                index: "posx",
                editable: true,
                search: false,
                width: 10,
            }, {
                name: "posy",
                index: "posy",
                editable: true,
                search: false,
                width: 10,
            }, {
                name: "mobile_phone",
                index: "mobile_phone",
                editable: true,
                search: false,
                width: 20,
            }, {
                name: "page_no",
                index: "page_no",
                editable: true,
                search: false,
                width: 10,
            }, {
                name: "sign_font_size",
                index: "sign_font_size",
                editable: true,
                search: false,
                width: 20,
            }, {
                name: "sign_font_color",
                index: "sign_font_color",
                editable: true,
                search: false,
                width: 20,
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
                search: false,
                width: 10,
            }, {
                name: "field_2",
                index: "field_2",
                editable: true,
                search: false,
                width: 10,
            }, {
                name: "field_3",
                index: "field_3",
                editable: true,
                search: false,
                width: 10,
            }, {
                name: "field_4",
                index: "field_4",
                editable: true,
                search: false,
                width: 10,
            }, {
                name: "field_5",
                index: "field_5",
                editable: true,
                search: false,
                width: 10,
            }],
            pager: "#pager_list_1",
            viewrecords: true,
            hidegrid: false,
            jsonReader: {
                root: "templates",
                page: "currPage",
                total: "totalPage",
                records: "totalCount",
                repeatitems: false,
                id: "id"
            },
            //caption: "模板管理",
            add: true,
            edit: true,
            cellEdit: true,
            cellsubmit: 'clientArray',
            //cellurl: "template/editTemplate.do",
            addtext: "Add",
            edittext: "Edit",
            hidegrid: false,
            rownumbers: true,
            editurl: "template/editTemplate.do.do",
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
                            url: "template/updateTemplate.do",
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
                var data = JSON.parse(obj.responseText);
                if (data.errorCode == "0") {
                    toastr.success(data.errorMessage);
                } else {
                    toastr.error(data.errorMessage);
                }
                $("#cData").click();
                $("#refresh_table_list_1").click();
            }
        }, {
            //删除
            afterSubmit: function (obj) {
                var data = JSON.parse(obj.responseText);
                if (data.errorCode == "0") {
                    toastr.success(data.errorMessage);
                } else {
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

    doAction: function (oper, templateTableId) {
        sessionStorage.setItem("templateTableId", templateTableId);
        var url = "";
        if (oper == 101) {
            template.layUI(oper, templateTableId);
        } else if (oper == 102) {
            bison.post({
                url: "template/downloadTemplate.do",
                data: {
                    id: templateTableId
                },
                success: function (data) {
                    if (data && data.errorCode == "0") {
                        if (data.res && data.res.templateArr) {
                            template.downloadPdf(data.res, templateTableId);
                            toastr.success(data.errorMessage);
                        }
                    } else {
                        toastr.error(data.errorMessage);
                    }
                }
            });
        } else if (oper == 103) {
            template.layUI(oper, templateTableId);
        }
    },

    // 弹出框
    layUI: function (oper, templateTableId) {
        var url = "";
        var id = "";
        if(oper == 101) {
            id = "uploadTemplate" + templateTableId;
            url = "templateUpload.html";
        } else if (oper == 103) {
            id = "configTemplate" + templateTableId;
            url = "templateConfig.html";
        }
        //触发事件

        var active = {
            setTop: function(){
                //iframe窗
                var index = layer.open({
                    type: 2,
                    title: '弹出框',
                    shadeClose: true,
                    shade: false,
                    maxmin: false, //开启最大化最小化按钮
                    area: ['893px', '600px'],
                    content: url
                });
                layer.full(index);
            }
        };
        var othis = $("#" + id + " .layui-btn"), method = othis.data('method');
        active[method] ? active[method].call(this, othis) : '';
    },

    //下载pdf
    downloadPdf: function (res, templateTableId) {
        var bytes = window.atob(res.templateArr);//转换为byte
        var ab = new ArrayBuffer(bytes.length);//处理异常,将ascii码小于0的转换为大于0
        var ia = new Uint8Array(ab);
        for (var i = 0; i < bytes.length; i++) {
            ia[i] = bytes.charCodeAt(i);
        }
        $("#downloadTemplate" + templateTableId).attr("download", res.templateId + ".pdf");
        $("#downloadTemplate" + templateTableId).attr("href", window.URL.createObjectURL(new Blob([ab], {type: 'application/pdf'})));
        $("#downloadTemplate" + templateTableId + " span").click();
    },


}

$(document).ready(function () {
    template.init();
    layui.use('layer', function(){
        layer = layui.layer;
    });
});
