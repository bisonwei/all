var pdfSign02 = {
	uploadIpCer: null,//记录文件base64Url
    uploadCers: null,//证书List
    zipFile: null,//生成的Cer文件
    
    uploadCersAndFile: function (type) {
        if (pdfSign02.uploadIpCer != null) {
        	console.log(pdfSign02.uploadCers);
        	bison.require("util/base64.js");
        	bison.post({
                url: "admin/Base64CerToDerCer.do",
                data: {
                	uploadCers: bison.util.base64.encode(JSON.stringify(pdfSign02.uploadCers)),
                	uploadIpCer: pdfSign02.uploadIpCer
                },
                success: function (data, textStatus) {
                    console.log(data);
                	if (data && data.errorCode != "0") {
                    	pdfSign02.zipFile = data.zipFile;
                    	pdfSign02.downloadCers();
                    } 
                    
                }
            });
        }
    }, 
    //下载pdf
    downloadCers: function () {
        if (pdfSign02.zipFile != null) {
            var bytes = window.atob(pdfSign02.zipFile);//去掉url的头，并转换为byte
            var ab = new ArrayBuffer(bytes.length);//处理异常,将ascii码小于0的转换为大于0
            var ia = new Uint8Array(ab);
            for (var i = 0; i < bytes.length; i++) {
                ia[i] = bytes.charCodeAt(i);
            }
            $("#downloadCers").attr("download", "二进制证书_out.zip");
            $("#downloadCers").attr("href", window.URL.createObjectURL(new Blob([ab], {type: 'application/zip'})));
            $("#downloadCers span").click();
            
        }
    },
    initEvent: function () {
        //选择记录文件
        $("#btn-uploadFilePath,#uploadFilePath").on("click", function () {
            if (document.getElementById("uploadFile").outerHTML) {
                document.getElementById("uploadFile").outerHTML = document.getElementById("uploadFile").outerHTML;
                $("#uploadFile").on("change", function () {
                    bison.require("util/dataURIScheme.js");
                    bison.util.dataURIScheme("uploadFile", function (result, file) {
                        pdfSign02.uploadIpCer = result;
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
                    	console.log(resultList);
                    	if (resultList.indexOf("data:") != -1) {
                            pdfSign02.uploadCers = [{
                                name: file.name,
                                base64: resultList.split(",")[1]
                            }];
                        } else {
                            pdfSign02.uploadCers = resultList;
                        }
                        $("#uploadCerPath").val("读取成功");
                    });
                });
            } else {
                document.getElementById("uploadCer").value = "";
            }
            $("#uploadCer").click();
        });
        //转换converted
        $("#converted").on("click", function () {
        	pdfSign02.uploadCersAndFile();
        });
    }
};
	

$(document).ready(function () {
    pdfSign02.initEvent();
});