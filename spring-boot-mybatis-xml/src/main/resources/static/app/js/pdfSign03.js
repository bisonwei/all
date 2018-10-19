var pdfSign03 = {
    hasPdfSign: false,//是否设置印章规则
    uploadFileBase64: null,//记录文件base64Url
    uploadCers: null,//证书List
    sealImgFileBase64Url: null,//印章图片base64Url
    pdfFileBase64Url: null,//pdf文件base64Url
    downloadPdfFileBase64Url: null,//生成的pdf文件base64Url
    //根据规则进行签章
    pdfSign: function () {
        $(".loading").show();
        if (!pdfSign03.hasPdfSign && pdfSign03.sealImgFileBase64Url && pdfSign03.pdfFileBase64Url && pdfSign03.uploadCers) {
            bison.require("util/base64.js");
            var records = pdfSign03.uploadFileBase64.replace(/\s+/g, "").replace(/<\/?.+?>/g, "").replace(/[\r\n]/g, "");
            records = records.split("|");
            for (var i = 0; i < pdfSign03.uploadCers.length; i++) {
                for (var j = 0; j < records.length; j++) {
                    var item = records[j].split(":");
                    var cerName = item[1];
                    if (cerName == pdfSign03.uploadCers[i].name) {
                        pdfSign03.uploadCers[i].id = item[0];
                    } else {
                        continue;
                    }
                }
            }
            bison.post({
                url: "admin/initPdfSignRule.do",
                data: {
                    businessSource: $("#businessSource").val(),
                    unitName: $("#unitName").val(),
                    social_credit_code:$("#social_credit_code").val(),
                    rule_name: $("#rule_name").val(),
                    rule_num: $("#rule_num").val(),
                    sealImgFileBase64: pdfSign03.sealImgFileBase64Url.split(",")[1],
                    sealImgFileName: $("#sealImgFilePath").val(),
                    pdfFileBase64: pdfSign03.pdfFileBase64Url.split(",")[1],
                    uploadFileBase64: bison.util.base64.encode(JSON.stringify(pdfSign03.uploadCers)),
                    pageNo: $("#pageNo").val(),
                    posX: $("#posX").val(),
                    posY: $("#posY").val(),
                    sealWidth: $("#sealWidth").val(),
                    sealHeight: $("#sealHeight").val(),
                    encryption: $("#encryption").val(),
                    rule_type: $("#rule_type").val(),
                    keyWord: $("#keyWord").val(),
                    moveType: $("#moveType").val(),
                    moveSize: $("#moveSize").val(),
                    heightMoveSize: $("#heightMoveSize").val(),
                    updateCert: $("#updateCert").val()
                },
                success: function (data, textStatus) {
                    if (data && data.errorCode != "0") {
                    	 var statusCode = "";
                         if (data.res && data.res.statusCode) {
                             statusCode = data.res.statusCode;
                         }
                         swal({
                             title: "温馨提示",
                             text: data.errorMessage + " " + statusCode,
                             type: "error",
                             confirmButtonText: "确定"
                         });                        
                    } 
                    if (data.res && data.res.downloadPdfBytes) {
                        pdfSign03.downloadPdfFileBase64Url = "data:application/pdf;base64," + data.res.downloadPdfBytes;
                        pdfSign03.previewPDF();
                        $(".loading").hide();
                    }
                    if (data.res && data.res.uploadErrorList) {
                        console.log("uploadErrorList:", data.res.uploadErrorList);
                    }
                    if (data.res && data.res.configErrorList) {
                        console.log("configErrorList:", data.res.configErrorList);
                    }
                    if (data.res && data.res.pdfSignErrorList) {
                        console.log("pdfSignErrorList:", data.res.pdfSignErrorList);
                    }
                }
            });
        }
    },
    //预览pdf
    previewPDF: function () {
        if (pdfSign03.downloadPdfFileBase64Url != null) {
            if (document.getElementById("download-pdf-preview").outerHTML) {
                $("#download-pdf-preview").find("embed").attr("src", "");
                document.getElementById("download-pdf-preview").outerHTML = document.getElementById("download-pdf-preview").outerHTML;
            }
            $("#download-pdf-preview").find("embed").attr("src", pdfSign03.downloadPdf("preview"));
            $("#download-pdf-preview").find("embed").css("height", $("#form-p-1").css("height"));
            $("#download-pdf-preview").find("embed").show();
        }
    },
    //下载pdf
    downloadPdf: function (type) {
        if (pdfSign03.downloadPdfFileBase64Url != null) {
            var bytes = window.atob(pdfSign03.downloadPdfFileBase64Url.split(',')[1]);//去掉url的头，并转换为byte
            var ab = new ArrayBuffer(bytes.length);//处理异常,将ascii码小于0的转换为大于0
            var ia = new Uint8Array(ab);
            for (var i = 0; i < bytes.length; i++) {
                ia[i] = bytes.charCodeAt(i);
            }
            if (type == "open") {
                window.open(window.URL.createObjectURL(new Blob([ab], {type: 'application/pdf'})));
            } else if (type == "preview") {
                return window.URL.createObjectURL(new Blob([ab], {type: 'application/pdf'}));
            } else {
            	$("#downloadPdf").attr("download", $("#businessSource").val()+"_out.pdf");
                $("#downloadPdf").attr("href", window.URL.createObjectURL(new Blob([ab], {type: 'application/pdf'})));
                $("#downloadPdf span").click();
            }
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
                    $("#download-pdf-preview").find("embed").hide();
                    pdfSign03.pdfSign();//[2.根据坐标设置规则] 下一步
                    return true;
                }
                return flag;
            },
            onStepChanged: function (event, currentIndex, priorIndex) {
                if (currentIndex == 0) {
                    $("a[role='menuitem'][href='#finish']").hide();
                    $("a[role='menuitem'][href='#cancel']").text("重置表单");
                } else {
                    $("a[role='menuitem'][href='#finish']").show();
                    $("a[role='menuitem'][href='#cancel']").text("重新配置");
                }
            }, onFinishing: function (event, currentIndex) {
                var form = $(this);
                return form.valid();
            },
            //下载PDF按钮
            onFinished: function (event, currentIndex) {
                if (pdfSign03.downloadPdfFileBase64Url) {
                    pdfSign03.downloadPdf();
                    return true;
                }
            },
            //重置按钮
            onCanceled: function () {
                pdfSign03.hasPdfSign = false;
                pdfSign03.uploadCers = null;
                pdfSign03.signFileBase64Url = null;
                pdfSign03.sealImgFileBase64Url = null;
                pdfSign03.pdfFileBase64Url = null;
                pdfSign03.downloadPdfFileBase64Url = null;
                pdfSign03.uploadFileBase64 = null;

                $("#form").find("input").val("");
                $("#uploadFile").val("");
                $("#sealImgFile").val("");
                $("#pdfFile").val("");
                $("a[role='menuitem'][href='#previous']").click().click();
            },
            labels: {
                cancel: "重置表单",
                finish: "下载PDF"
            }
        }).validate({
            ignore: ":hidden",
            errorPlacement: function (error, element) {
                try {
                    var id = element.attr("id");
                    if (id == "sealImgFilePath" || id == "pdfPath" || id == "uploadFilePath" || id == "uploadCerPath") {
                        element.parent().before(error)
                    } else {
                        element.before(error)
                    }
                } catch (e) {
                }
            },
        });
        $("a[role='menuitem'][href='#finish']").hide();
        $(".wizard-big.wizard").find(".content").height($(".force-overflow-4").height() + 150);
    },
    initEvent: function () {
        //选择章图片
        $("#btn-sealImgFile,#sealImgFilePath").on("click", function () {
            if (document.getElementById("sealImgFile").outerHTML) {
                document.getElementById("sealImgFile").outerHTML = document.getElementById("sealImgFile").outerHTML;
                $("#sealImgFile").on("change", function () {
                    bison.require("util/dataURIScheme.js");
                    bison.util.dataURIScheme("sealImgFile", function (result, file) {
                        if (/image\/\w+/.test(file.type)) {
                            pdfSign03.sealImgFileBase64Url = result;
                            //预览印章
                            swal({
                                title: "印章图片",
                                text: "<img src='" + result + "' />",
                                html: true,
                                showCancelButton: true,
                                confirmButtonText: "确定",
                                cancelButtonText: "重新选择"
                            }, function (isConfirm) {
                                if (isConfirm) {
                                    $("#sealImgFilePath").val(file.name);
                                } else {
                                    $("#sealImgFile").val("");
                                    $("#sealImgFile").click();
                                }
                            });
                        }
                    });
                });
            } else {
                document.getElementById("sealImgFile").value = "";
            }
            $("#sealImgFile").click();
        });

        //选择PDF
        $("#btn-pdfPath,#pdfPath").on("click", function () {
            if (document.getElementById("pdfFile").outerHTML) {
                document.getElementById("pdfFile").outerHTML = document.getElementById("pdfFile").outerHTML;
                $("#pdfFile").on("change", function () {
                    bison.require("util/dataURIScheme.js");
                    bison.util.dataURIScheme("pdfFile", function (result, file) {
                        pdfSign03.pdfFileBase64Url = result;
                        $("#pdfPath").val(file.name);
                    });
                });
            } else {
                document.getElementById("pdfFile").value = "";
            }
            $("#pdfFile").click();
        });

        //选择记录文件
        $("#btn-uploadFilePath,#uploadFilePath").on("click", function () {
            if (document.getElementById("uploadFile").outerHTML) {
                document.getElementById("uploadFile").outerHTML = document.getElementById("uploadFile").outerHTML;
                $("#uploadFile").on("change", function () {
                    bison.require("util/dataURIScheme.js");
                    bison.util.dataURIScheme("uploadFile", function (result, file) {
                        pdfSign03.uploadFileBase64 = result;
                        $("#uploadFilePath").val(file.name);
                    }, true);
                });
            } else {
                document.getElementById("uploadFile").value = "";
            }
            $("#uploadFile").click();
        });

        //选择证书
        $("#btn-uploadCerPath,#uploadCerPath").on("click", function () {
            if (document.getElementById("uploadCer").outerHTML) {
                document.getElementById("uploadCer").outerHTML = document.getElementById("uploadCer").outerHTML;
                $("#uploadCer").on("change", function () {
                    bison.require("util/dataURIScheme.js");
                    bison.util.dataURIScheme("uploadCer", function (resultList, file) {
                        if (resultList.indexOf("data:") != -1) {
                            pdfSign03.uploadCers = [{
                                name: file.name,
                                base64: resultList.split(",")[1]
                            }];
                        } else {
                            pdfSign03.uploadCers = resultList;
                        }
                        $("#uploadCerPath").val("读取成功");
                    });
                });
            } else {
                document.getElementById("uploadCer").value = "";
            }
            $("#uploadCer").click();
        });
        //偏移量选择
        $("#moveType").change(function(){
        	var moveType = $("#moveType").val();
        	if(moveType=="0"){
        		$("#moveSizeGroup,#heightMoveSizeGroup").hide();
        	}else{
        		$("#moveSizeGroup,#heightMoveSizeGroup").show();
        	}
        	
        });
      //签章类型选择
        $("#rule_type").change(function(){
        	var rule_type = $("#rule_type").val();
        	if(rule_type=="1"){
        		$("#posXGroup,#posYGroup,#pageNoGroup").hide();
        		$("#keyWordGroup").show();
        	}else{
        		$("#posXGroup,#posYGroup,#pageNoGroup,#keyWordGroup").show();
        		$("#keyWordGroup").hide();
        	}
        	
        });
      //是否更新证书选择
        $("#updateCert").change(function(){
        	var updateCert = $("#updateCert").val();
        	var businessSource = $("#businessSource").val();
        	if(!businessSource){
        		swal({
                    title: "温馨提示",
                    text: "请先填写渠道号",
                    type: "warning",
                    confirmButtonText: "确定"
                });  
        		return;
        	}
        	if(updateCert=="1"){
        		$('#rule_num,#pageNo,#posX,#posY,'
        		+'#sealWidth,#sealHeight,#keyWord,'
        		+'#moveSize,#heightMoveSize').attr("readonly",false);
        	}else{
        		$('#rule_num,#pageNo,#posX,#posY,'
                +'#sealWidth,#sealHeight,#keyWord,'
                +'#moveSize,#heightMoveSize').attr("readonly",true); 
        		  bison.post({
                      url: "sealConfig/querySealConfig.do",
                      data: {
                          businessSource: $("#businessSource").val()
                      },
                      success: function (data, textStatus) {
                          console.log(data);
                    	  if (data && data.errorCode == "0") {
                              $("#unitName").val(data.res.field_1);
                              $("#rule_name").val(data.res.rule_name);
                              $("#rule_num").val(data.res.rule_num);
                              $("#pageNo").val(data.res.pageno);
                              $("#posX").val(data.res.posx);
                              $("#posY").val(data.res.posy);
                              $("#sealWidth").val(data.res.seal_width);
                              $("#sealHeight").val(data.res.seal_height);
                              $("#rule_type").val(data.res.rule_type);
                              $("#keyWord").val(data.res.field_5);
                              $("#moveType").val(data.res.field_2);
                              $("#moveSize").val(data.res.field_3);
                              $("#heightMoveSize").val(data.res.field_4);
                          }  
                      }
                  });
        	}
        	
        });
    },
};
$(document).ready(function () {
    pdfSign03.init();
    pdfSign03.initEvent();
});