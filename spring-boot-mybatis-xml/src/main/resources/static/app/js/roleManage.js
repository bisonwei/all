var roleManage = {
    role_id: null,
    treeType: null,
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
        roleManage.getTable();
    },

    //获取全部角色
    //jqgrid
    getTable: function () {
        $.jgrid.defaults.styleUI = "Bootstrap";
        $("#table_list_1").jqGrid({
            url: "role/getAllRoles.do",
            datatype: 'json',
            mtype: "post",
            height: 450,
            autowidth: true,
            shrinkToFit: true,
            rowNum: 20,
            rowList: [10, 20, 30],
            colNames: ["id", "角色名称", "创建时间", "操作", "描述"],
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
                name: "name",
                index: "name",
                editable: true,
                search: true,
                width: 30,
                searchoptions: {
                    sopt: ["eq"]
                }
            }, {
                name: "create_time",
                index: "create_time",
                editable: false,
                search: false,
                width: 30,
            }, {
                name: "operation",
                index: "operation",
                editable: false,
                width: 32,
                search: false,
                formatter: function (cellvalue, options, rowObject) {
                    var role_id = rowObject.id;
                    var fuc = 101;
                    var user = 102;
                    return '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#ztree_1" onclick="roleManage.stockRoleId(' + fuc + ',' + role_id +
                        ')"  value="权限">权限</button>' +
                        '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
                        '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#ztree_1" onclick="roleManage.stockRoleId(' + user + ',' + role_id +
                        ')" value="用户">用户</button>';
                },
            }, {
                name: "description",
                index: "description",
                editable: true,
                search: false,
                width: 100,
            }],
            pager: "#pager_list_1",
            viewrecords: true,
            hidegrid: false,
            jsonReader: {
                root: "roles",
                page: "currPage",
                total: "totalPage",
                records: "totalCount",
                repeatitems: false,
                id: "id"
            },
            //caption: "角色管理",
            add: true,
            edit: true,
            cellEdit: true,
            cellurl: "role/editRole.do",
            addtext: "Add",
            edittext: "Edit",
            hidegrid: false,
            rownumbers: true,
            editurl: "role/editRole.do",
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

    },

    stockRoleId: function (oper, role_id) {
        roleManage.role_id = role_id;
        console.log(role_id);
        roleManage.createZtree(oper);
        
    },


    //ztree
    createZtree: function (oper) {
   		if(oper == 101){
			roleManage.treeType = "functionTree";
		}else if(oper == 102){
			roleManage.treeType = "userTree";
		};
    	setting = {
                view: {
                    dblClickExpand: false,
                    showLine: false,
                    selectedMulti: false,  
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
                role_id: roleManage.role_id,
                treeType: roleManage.treeType
            },
            success: function (data) {
                if (data.errorCode == "0" && data.res) {
                	$("#search_key").val("");
                	if(roleManage.treeType == "functionTree"){
                		$.fn.zTree.init($("#ztree"), setting, data.res.functions);
            		}else if(roleManage.treeType == "userTree"){
            			$.fn.zTree.init($("#ztree"), setting, data.res.users);
            		};
                } else {
                    toastr.error(data.errorMessage);
                }
            }
        });
    	
		 
    },

    invent: function () {
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
	                url: "role/assignTree.do",
	                data: {
	                    role_id: roleManage.role_id,
	                    selectIdStr: selectIdStr,
	                    treeType: roleManage.treeType
	                },
	                success: function (data) {
	                	console.log(data);
	                	if (data.errorCode == "0") {
	                        toastr.success("授权成功！");
	                        $("#close").click();
	                    } else {
	                        toastr.error(data.errorMessage);
	                        $("#close").click();
	                    }
	                }
	              })
        });
    }
}

$(document).ready(function () {
    roleManage.init();
    roleManage.invent();
});
