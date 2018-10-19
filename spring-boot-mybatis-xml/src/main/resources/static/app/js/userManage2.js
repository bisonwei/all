var userManager2 = {
	id :0,
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
        userManager2.getTable();
    },

    //获取全部用户
    getTable: function () {
    	$('#table_list_1').bootstrapTable({
    		 url: 'user/getAllUsers2.do', //请求后台的URL（*）
    		 method: 'post', //请求方式（*）
    		 toolbar: '#toolbar', //工具按钮用哪个容器
    		 striped: true, //是否显示行间隔色
    		 cache: false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
    		 pagination: true, //是否显示分页（*）
    		 paginationLoop:true,//设置为 true 启用分页条无限循环的功能
    		 undefinedText: "空",//当数据为 undefined 时显示的字符
    		 data_local: "zh-US",//表格汉化
    		 locale: "zh-CN",
    		 smartDisplay:true,//设置为 true 是程序自动判断显示分页信息和 card 视图。
    		 sortable: false, //是否启用排序
    		 sortOrder: "asc", //排序方式
    		 queryParams: userManager2.queryParams,//传递参数（*）
    		 sidePagination: "server", //分页方式：client客户端分页，server服务端分页（*）
    		 pageNumber:1, //初始化加载第一页，默认第一页
    		 pageSize: 10, //每页的记录行数（*）
    		 pageList: [5,10, 25, 50, 100], //可供选择的每页的行数（*）
    		 dataType: "json",//返回数据格式
    		 queryParamsType: "limit", //设置为 'limit' 则会发送符合 RESTFul 格式的参数。
    		 dataField : "users",	//返回数据的key
    		 search: false, //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
    		 strictSearch: true,
    		 showColumns: true, //是否显示所有的列
    		 showRefresh: true, //是否显示刷新按钮
    		 minimumCountColumns: 2, //最少允许的列数
    		 clickToSelect: true, //是否启用点击选中行
    		 //height: 500, //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
    		 uniqueId: "id", //每一行的唯一标识，一般为主键列
    		 showToggle:false, //是否显示详细视图和列表视图的切换按钮
    		 cardView: false, //是否显示详细视图
    		 detailView: false, //是否显示父子表
    		 paginationPreText: "上一页",
             paginationNextText: "下一页",
             showExport: true,    //是否显示导出
             exportOptions: {
            	ignoreColumn: [0,7] //忽略某一列的索引
             },
             exportDataType: "basic", //basic', 'all', 'selected'.
    		 columns: [
    			 {checkbox : true},
    			 {
		    		 field: 'id',
		    		 title: '序号'
	    		 }, {
		    		 field: 'user_name',
		    		 title: '用户账号'
	    		 }, {
		    		 field: 'password',
		    		 title: '密码'
	    		 }, {
		    		 field: 'state',
		    		 title: '状态'
	    		 },{
		    		 field: 'create_time',
		    		 title: '创建时间'
	    		 },{
		    		 field: 'update_time',
		    		 title: '更新时间'
	    		 },{
		    		 field: 'operate',
		    		 title: '操作',
		    		 formatter: function (value, row, index) {
		    			
		    			 return '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#editUser" '+
		    			 'onclick="userManager2.editUser(' +row.id+
	                        ')"  value="编辑">编辑</button>' +
	                        '&nbsp;&nbsp;&nbsp;&nbsp;' +
	                        '<button type="button" class="btn btn-primary" data-toggle="modal"  onclick="userManager2.delUser(' + row.id + 
	                        ')" value="删除">删除</button>'+
		    			 '&nbsp;&nbsp;&nbsp;&nbsp;' +
	                        '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#ztree_1" onclick="userManager2.giveFunction(' + row.id + 
	                        ')" value="权限">权限</button>';
		    		 }
	    		 }
	    	]
	    });
    },
    queryParams: function (params) {
    	var temp = { //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
    		limit: params.limit, //页面大小
    		offset: params.offset, //起始数
    		pagesize: params.pageSize,   //页面大小
    		pageNumber: params.pageNumber,  
    		page: params.page, //页吗
    		user_name: $("#search_user_name").val(),
    		state: $("#search_state").val()
    	};
		 return temp;
    },
    delUser: function (id) {
    	console.log(id);
    	 swal({
             title: "温馨提示",
             text: "确定删除?"+id,
             type: "info",
             showCancelButton: true,
             confirmButtonText: "确定",
             cancelButtonText: "取消",
             closeOnConfirm: true,
             closeOnCancel: true
         }, function (isConfirm) {
             if (isConfirm) {
                 bison.post({
                     url: "user/delUser.do",
                     data: {
                    	 id: id
                     },
                     success: function (data) {
                         if (data.errorCode == "0000") {
                        	 $("#table_list_1").bootstrapTable('remove', {
                                 field: 'id',
                                 values: [id]
                             });
                        	 toastr.success(data.errorMessage);
                         } else {
                             toastr.error(data.errorMessage);
                         }
                     }
                 });
             } else {
                 $("button[name='refresh'").click();
             }
         });

   },
   editUser: function (id) {
	   bison.post({
           url: "user/queryUserById.do",
           data: {
          	 id: id
           },
           success: function (data) {
               if (data.errorCode == "0000") {
            	   $("#id").val(data.res.id);
            	   $("#user_name").val(data.res.user_name);
            	   $("#password").val(data.res.password);
            	   $("#state").val(data.res.state);
            	   $("#create_time").val(data.res.create_time);
            	   $("#update_time").val(data.res.update_time);
               } else {
                   toastr.error(data.errorMessage);
               }
           }
       });
  },
  giveFunction: function (id) {
	  userManager2.id = id;
	  setting = {
              view: {
                  dblClickExpand: false,
                  showLine: false,
                  selectedMulti: false, 
                  nameIsHTML: true, //为了可以使用fontawesome
                  expandSpeed: "fast",
                  showIcon: true,
                  fontCss: getFontCss
              }, 
              check: {  
                  enable: true,  
                  chkStyle: "checkbox",  
                  chkboxType : {  "Y" : "ps", "N" : "ps" }    
              },  
              data: {
                  simpleData: {
                      enable: true ,
                      idKey : "id", // id编号命名     
          			pIdKey : "parent_id", // 父id编号命名      
              		rootId : 0  
                  }
              },
  			callback: {
  				beforeClick: beforeClick
  			}
          };
      	function beforeClick(treeId, treeNode) {
			if (treeNode.isParent) {
				return true;
			} else {
				return false;
			}
		};
		function getFontCss(treeId, treeNode) {
			return (!!treeNode.highlight) ? {color:"#A60000", "font-weight":"bold"} : {color:"#333", "font-weight":"normal"};
		};
		
	  	bison.post({
	          url: "user/getUserFuncs.do",
	          data: {
	              id: id
	          },
	          success: function (data) {
	              if (data.errorCode == "0000" && data.res) {
	              	$("#search_key").val("");
	              	$.fn.zTree.init($("#ztree"), setting, data.res.functions);
	              } else {
	                  toastr.error(data.errorMessage);
	              }
	          }
	     });
 
 },
    event: function () {
    	//关键字搜索
    	var key = $("#search_key");
		key.bind("focus", focusKey)
		.bind("blur", blurKey)
		.bind("propertychange", searchNode)
		.bind("input", searchNode);
		
		var nodeList = [];
		function focusKey(e) {
			if (key.hasClass("empty")) {
				key.removeClass("empty");
			}
		};
		function blurKey(e) {
			if (key.get(0).value === "") {
				key.addClass("empty");
			}
		};
		function searchNode(e) {
			var zTree = $.fn.zTree.getZTreeObj("ztree");
			var value = $.trim(key.get(0).value);
			if (key.hasClass("empty")) {
				value = "";
			};
			nodeList = zTree.getNodesByParamFuzzy("name", value);
			if (value == ""){
				updateNodes(false);
				return;
			}else{
				updateNodes(true);
			}
		};
		function updateNodes(highlight) {
			var zTree = $.fn.zTree.getZTreeObj("ztree");
			for( var i=0, l=nodeList.length; i<l; i++) {
				nodeList[i].highlight = highlight;
				zTree.updateNode(nodeList[i]);
			}
		};
    	//提交选中
        $('#save').on("click", function () {
	        	var zTree = $.fn.zTree.getZTreeObj("ztree"),
				nodes = zTree.getCheckedNodes(true);
	        	var selectIdArr = [];
				for (var i=0; i<nodes.length; i++) {
					selectIdArr.push(nodes[i].id);
				}
				var selectIdStr = selectIdArr.join(",");
				bison.post({
	                url: "user/assignTree.do",
	                data: {
	                    id: userManager2.id,
	                    selectIdStr: selectIdStr
	                },
	                success: function (data) {
	                	console.log(data);
	                	if (data.errorCode == "0000") {
	                        toastr.success("授权成功！");
	                        $("#close").click();
	                    } else {
	                        toastr.error(data.errorMessage);
	                        $("#close").click();
	                    }
	                }
	              })
        });
    	
    	
    	 $('#doAddUser').on("click", function () {
    		 var user_name =  $("#add_user_name").val();
    		 var password =  $("#add_password").val();
    		 var state =  $("#add_state").val();
    		 if(null == user_name&& "" == user_name){
    			 toastr.error("用户名不能为空！"); 
    			 return;
    		 }
    		 if(null == password&& "" == password){
    			 toastr.error("密码不能为空！"); 
    			 return;
    		 }
    		 if(null == state&& "" == state){
    			 toastr.error("状态不能为空！"); 
    			 return;
    		 }
    		 bison.post({
	             url: "user/addUser.do",
	             data: {
	            	 user_name: user_name,
	            	 password: password,
	            	 state: state,
	             },
	             success: function (data) {
	                 if (data.errorCode == "0000") {
	              	   toastr.success(data.errorMessage);
	              	   $("#closeAddUser").click();
	              	   $('#table_list_1').bootstrapTable('refresh', {url: 'user/getAllUsers2.do'});
	                 } else {
	                     toastr.error(data.errorMessage);
	                 }
	             }
	         });
    		 
    	 });
    	 $('#btn_edit').on("click", function () {
    		 
    	 });
    	 $('#btn_delete').on("click", function () {
    		 
    	 });
    	 $('#doUpdateUser').on("click", function () {
	      	 bison.post({
	             url: "user/editUser.do",
	             data: {
	            	 id: $("#id").val(),
	            	 user_name: $("#user_name").val(),
	            	 password: $("#password").val(),
	            	 state: $("#state").val(),
	            	 create_time: $("#create_time").val(),
	            	 update_time: $("#update_time").val()
	             },
	             success: function (data) {
	                 if (data.errorCode == "0000") {
	              	   toastr.success(data.errorMessage);
	              	   $("#closeUpdateUser").click();
	              	   $('#table_list_1').bootstrapTable('refresh', {url: 'user/getAllUsers2.do'});
	                 } else {
	                     toastr.error(data.errorMessage);
	                 }
	             }
	         });
    	 });
    }

}

$(document).ready(function () {
    userManager2.init();
    userManager2.event();
});
