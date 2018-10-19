var functionManage = {
	treeNode:null,	
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
        setting = {
                view: {
                    dblClickExpand: false,
                    expandSpeed: "fast",
                    showIcon: true,
                    fontCss: getFontCss  
                }, 
                data: {
                	key:{
                		children: "nodes"
                	},
                    simpleData: {
                        enable: true ,
                        idKey : "id", // id编号命名     
            			pIdKey : "parent_id", // 父id编号命名      
                		rootId : 0  
                    }
                },
                edit: {
            		enable: true,
            		showRemoveBtn : true,
            		showRenameBtn : false,
            		drag: {
            			isCopy: false,
            			isMove: true,
            			prev: true,
            			next: true,
            			inner: false
            		}
            	},
    			callback: {
                	onClick: onClick,//点击节点事件
                	beforeRemove: zTreeBeforeRemove,//删除事件
                	beforeDrop: zTreeBeforeDrop,//拖拽事件
    			}
        };
        bison.post({
            url: "function/getAllFunctions.do",
            success: function (data) {
                if (data.errorCode == "0000" && data.res) {               
                	$.fn.zTree.init($("#ztree"), setting, data.res.allFuncList);
                } else {
                    toastr.error(data.errorMessage);
                }
            }
        });
        
        function zTreeBeforeRemove(treeId, treeNode) {
        	var length = 0;
			if(typeof treeNode.nodes != "undefined"){
				length = treeNode.nodes.length;
			}
			console.log(treeNode);
			if(length == 0){
				console.log("您确定要删除吗?");
				swal({
					title:"您确定要删除这条信息吗",
					text:"删除后将无法恢复，请谨慎操作！",
					type:"warning",
					showCancelButton:true,
					confirmButtonColor:"#DD6B55",
					confirmButtonText:"是的，我要删除！",
					cancelButtonText:"让我再考虑一下…",
					closeOnConfirm:false,
					closeOnCancel:false},
				function(isConfirm){
					if(isConfirm){
						bison.post({
					        url: "function/deleteFunctions.do",
					        data: {
					            id: treeNode.id,
					            length: length
					        },
					        success: function (data, textStatus) {
					            if (data.res && data.errorCode == "0000") {
					                toastr.success(data.errorMessage); 
					                var treeObj = $.fn.zTree.getZTreeObj("ztree");
									treeObj.removeNode(treeNode,false);
									swal.close();
					            } else {           	
					                toastr.warning(data.errorMessage);
					            }
					        }
						});
					}else{
						swal.close();
					}
				});
			} else {
				toastr.error("该权限下含有子权限，请先删除子权限！");
			}
			return false;
		};
		
		function zTreeBeforeDrop(treeId, treeNodes, targetNode, moveType) {
			if(treeNodes[0].level == targetNode.level && treeNodes.length == 1){
				bison.post({
                url: "function/updateViewPos.do",
                data: {
                    id: treeNodes[0].id,
                    parent_id: targetNode.parent_id,
                    old_parent_id: treeNodes[0].parent_id,
                    view_pos: targetNode.getIndex(),
                    old_view_pos: treeNodes[0].getIndex(),
                    level:targetNode.level
                },
                success: function (data, textStatus) {
                	if(data && data.errorCode == "0000"){
                		functionManage.init();
                	}else{
                		swal({
                            title: "温馨提示",
                            text: data.errorMessage,
                            type: "error",
                            confirmButtonText: "确定"
                        });	
                	}
                }
             });
				return true;
			}else{
				toastr.error("不可以跨级拖拽！！！");
				return false;
			}
			
		};
        function getFontCss(treeId, treeNode) {
			return (!!treeNode.highlight) ? {color:"#A60000", "font-weight":"bold"} : {color:"#333", "font-weight":"normal"};
		};
		
		function onClick(event, treeId, treeNode) {
			functionManage.treeNode = treeNode ; 
			bison.post({
                url: "function/queryFunction.do",
                data: {
                    id: treeNode.id,
                    level:treeNode.level,
                    mothed:"query"
                },
                success: function (data, textStatus) {
                    if (data.errorCode == "0000") {
                    	$("#id").val(data.res.id);
                        $("#parent_id").val(data.res.parent_id);
                        $("#name").val(data.res.name);
                        $("#param").val(data.res.param);
                        $("#icon").val(data.res.icon);
                        $("input[name='state']").each(function (index) {
                            if ($("input[name='state']").get(index).value == data.res.state) {
                                $("input[name='state']").get(index).checked = true;
                            }
                        });
                        $("#type").val(data.res.type);
                        $("#view_pos").val(data.res.view_pos);
                    } else{
                    	
                    }
                }
            });

		};
    },
    initEvent :function(){
		//增加权限
		$('#addFcnBtn').on("click", function () {
			var treeNode = functionManage.treeNode;
			var length = 0;
			if(typeof treeNode.nodes != "undefined"){
				length = treeNode.nodes.length;
			}
			if(treeNode == null){
				swal({
                    title: "温馨提示",
                    text: "请先点击要添加子权限的权限节点！",
                    type: "error",
                    confirmButtonText: "确定"
                });
				return;
			}
			if(treeNode.level<3){
				bison.post({
                    url: "function/queryFunction.do",
                    data: {
                        id: treeNode.id,
                        level:treeNode.level,
                        mothed:"add"
                    },
                    success: function (data, textStatus) {
                        if (data.res.maxId != null) {
                            $("#id").val(data.res.maxId);
                            $("#parent_id").val(treeNode.id);
                            $("#view_pos").val(length+1);
                            $("#name").val("");
                        	$("#param").val("");
                        	$("#icon").val("");
                        	$("#state").val("");
                        	$("#type").val("");
                        } 
                    }
                });
			}else{
				toastr.warning("此权限下不能添加权限！");
			}
                
        });
		//修改权限
        $('#updateFcnBtn').on("click", function () {
        	var treeNode = functionManage.treeNode;
			if(treeNode == null){
				swal({
                    title: "温馨提示",
                    text: "请先点击要添加子权限的权限节点！",
                    type: "error",
                    confirmButtonText: "确定"
                });
				return;
			}
        	bison.post({
                url: "function/queryFunction.do",
                data: {
                    id: $("#id").val(),
                    level:treeNode.level,
                    mothed:"query"                     
                },
                success: function (data, textStatus) {
                    if (data.res != null) {
                    	bison.post({
                            url: "function/updateFunction.do",
                            data: {
                                id: $("#id").val(),
                                parent_id: $("#parent_id").val(),
                                name: $("#name").val(),
                                param: $("#param").val(),
                                icon: $("#icon").val(),
                                state: $('input[name="state"]:checked ').val(),
                                type: $("#type").val(),
                                view_pos: $("#view_pos").val()
                            },
                            success: function (data, textStatus) {
                            	if (data.errorCode == "0") {
                                    toastr.success(data.errorMessage);
                                    functionManage.init();
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
                    }else{
                    	bison.post({
                            url: "function/addFunction.do",
                            data: {
                                id: $("#id").val(),
                                parent_id: $("#parent_id").val(),
                                name: $("#name").val(),
                                param: $("#param").val(),
                                icon: $("#icon").val(),
                                state: $('input[name="state"]:checked ').val(),
                                type: $("#type").val(),
                                view_pos: $("#view_pos").val()
                            },
                            success: function (data, textStatus) {
                            	console.log(data);
                                if (data.errorCode == "0") {
                                    toastr.success(data.errorMessage);
                                    functionManage.init();
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
                }
            }); 			
        });
    }
}

$(document).ready(function () {
    functionManage.init(); 
    functionManage.initEvent(); 
});

