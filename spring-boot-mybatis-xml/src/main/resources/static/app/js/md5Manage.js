var md5Manage = {

    event: function () {
    	
    	//加密
        $('#encode').on("click", function () {
	        	var str = $("#str").val(); 
	        	var password = $("#password").val(); 
	        	if(str==""){
	        		swal({ 
	        			  title: "提示！", 
	        			  text: "加密对象不能为空",
	        			  imageUrl: "imgs/user.png" 
	        		});
	        	}else{
	        		bison.post({
		                url: "utils/md5encode.do",
		                data: {
		                    str: str
		                },
		                success: function (data) {
		                	console.log(data);
		                	if (data.errorCode == "0000") {
		                        $("#result").val(data.res.result);
		                    } else {
		                        toastr.error(data.errorMessage);
		                        $("#close").click();
		                    }
		                }
		              })
	        	}
				
        });
    	
    }	
    	
}

$(document).ready(function () {
	md5Manage.event();
});
