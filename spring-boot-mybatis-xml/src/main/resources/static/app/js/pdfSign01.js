var pdfSign01 = {
	Base64CertList: null,
    createAllCert: function () {
        bison.post({
            url: "admin/createAllCert.do",
            data: {
                unitName: $("#unitName").val(),
                alg: $("#alg").val(),
                ipList: $('[name="duallistbox"]').val().join(",")
            },
            success: function (data, textStatus) {
                if (data && data.errorCode == "0") {
                    if (data.res && data.res.certStr) {
                        $(".loading").hide();
                        pdfSign01.Base64CertList = data.res.certStr;//"data:text/plain;base64,"
                        $("#result").find("pre").text(data.res.certStr);
                        $("#result").find("pre").show();
                        $("#result").find("pre").css("height", $(".scrollbar").css("height"));
                        $("a[role='menuitem'][href='#finish']").show();
                    }
                } else {
                    swal({
                        title: "温馨提示",
                        text: data.errorMessage,
                        type: "error",
                        confirmButtonText: "确定"
                    });
                }
            }
        });
    },
    //获取发送北京CA邮件内容
    getBJCAEmailBody: function () {
        if (pdfSign01.Base64CertList != null) {
            bison.post({
                url: "admin/getBJCAEmailBody.do",
                data: {
                    unitName: $("#unitName").val(),
                    uploadFile: pdfSign01.Base64CertList
                },
                success: function (data, textStatus) {
                    if (data && data.errorCode == "0" && data.res.resultList) {
                        var bytes = window.atob(data.res.zipFile);
                        var ab = new ArrayBuffer(bytes.length);//处理异常,将ascii码小于0的转换为大于0
                        var ia = new Uint8Array(ab);
                        for (var i = 0; i < bytes.length; i++) {
                            ia[i] = bytes.charCodeAt(i);
                        }
                        $("#downloadZip").attr("download", $("#unitName").val()+"P10_out.zip");
                        $("#downloadZip").attr("href", window.URL.createObjectURL(new Blob([ab], {type: 'application/zip'})));
                        $("#downloadZip span").click();
                        swal({
                            title: "温馨提示",
                            text: "获取发送北京CA邮件内容",
                            type: "success",
                            showConfirmButton: false,
                            timer: 1000
                        });
                        
                    } else {
                        swal({
                            title: "温馨提示",
                            text: data.errorMessage,
                            type: "error",
                            confirmButtonText: "确定"
                        });
                    }
                }
            });
        }
    },
    init: function () {
        $("#form").steps({
            bodyTag: "section",
            onStepChanging: function (event, currentIndex, newIndex) {
                if (currentIndex > newIndex) {
                    return true
                }
                var form = $(this);
                if (currentIndex < newIndex) {
                    $(".body:eq(" + newIndex + ") label.error", form).remove();
                    $(".body:eq(" + newIndex + ") .error", form).removeClass("error")
                }
                var flag = form.valid();
                if (flag && currentIndex == 0) {
                    var duallist = $('[name="duallistbox"]').val();
                    if (duallist == undefined || duallist == "") {
                        swal({
                            title: "温馨提示",
                            text: "请选择选择加密机。",
                            type: "error",
                            confirmButtonText: "确定"
                        });
                        return false;
                    }
                    $("#result").show();
                    $(".loading").show();
                    $("#result").find("pre").hide();
                    pdfSign01.createAllCert();
                    return true;
                }
                return flag;
            },
            onStepChanged: function (event, currentIndex, priorIndex) {
            }, onFinishing: function (event, currentIndex) {
                var form = $(this);
                return form.valid();
            },
            onFinished: function (event, currentIndex) {
            	if (pdfSign01.Base64CertList != null) {
                	pdfSign01.getBJCAEmailBody();
                }
            },
            onCanceled: function () {
                pdfSign01.Base64CertList = null;
                $("#form").find("input").val("");
                $("#result").find("pre").text("");
                $("#result").find("pre").hide();
                $("a[role='menuitem'][href='#finish']").hide();
                $("a[role='menuitem'][href='#previous']").click().click();
            },
            labels: {
                cancel: "重置表单",
                finish: "获取邮件内容",
                next: "生成P10文件"
            }
        }).validate({
            ignore: ":hidden",
            errorPlacement: function (error, element) {
                try {
                    element.before(error);
                } catch (e) {
                }
            },
        });
        $("a[role='menuitem'][href='#finish']").hide();
        $(".wizard-big.wizard").find(".content").height($(".force-overflow-3").height() + 150);
    },
    initDualListBox: function () {
        bison.post({
            url: "admin/getAllIp.do",
            success: function (data, textStatus) {
                if (data && data.errorCode == "0") {
                    if (data.res && data.res.ipList) {
                        var html = [];
                        html.push('<select multiple="multiple" size="' + data.res.ipList.length + '" name="duallistbox">');
                        for (var i = 0; i < data.res.ipList.length; i++) {
                            html.push('<option value="' + data.res.ipList[i] + '">' + data.res.ipList[i] + '</option>');
                        }
                        html.push('</select>');
                        $(".ipList").find("div").html(html.join(""));
                        $('select[name="duallistbox"]').bootstrapDualListbox();
                        $(".ipList").show();
                    }
                } else {
                    swal({
                        title: "温馨提示",
                        text: data.errorMessage,
                        type: "error",
                        confirmButtonText: "确定"
                    });
                }
            }
        })
        ;
    }
};
$(document).ready(function () {
    pdfSign01.init();
    pdfSign01.initDualListBox();
});