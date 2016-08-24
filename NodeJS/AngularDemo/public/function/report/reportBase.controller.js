/**
 * @author ZhangEnwang
 * 报表统计controller
 * @return none
 */
(function() {
	'use strict';
	angular.module('app')
	  .controller('report',['$scope','$state','$http','ReportService','$stateParams', '$modal',report]);
	  function report($scope, $state, $http, ReportService, $stateParams, $modal ) {
	  	//初始化导航
	  	if($scope.getNavSize() === 0) {
	  		var navItem = {
	  			href:'app.report',
	  			text:'报表统计',
	  		}
	  		$scope.addNavItem(navItem);
	  	};

	  	var report = $scope;
	  	report.orgid = $stateParams.data || 10000;
		//所有候选设备类型
	  	report.allTypes = [];
	  	//已选择设备类型的id
	  	report.typeid = null;
	  	//org选择下拉是否展开
	  	report.isShow = {text:'选择',value:false};
	  	report.treeSetting = {
	  		treeId: 'org-select-tree',
			check: {
				enable: true,
				chkStyle: "checkbox",
				chkboxType: { "Y": "s", "N": "s" }
			},
			data: {
				simpleData: {
					enable: true
				}
			},
			callback: {
				onClick: zTreeOnClick,
				onCheck: zTreeOnCheck
			}
		};
	  	//org下拉树数据
	  	report.treeData = [];
	  	//已选org下的设备数据
	  	report.orgDeviceData = [];

		report.queryTypesByUserId = queryTypesByUserId;
	  	report.queryTypesByOrgId = queryTypesByOrgId;
		report.chooseType = chooseType;
		report.queryOrgTreeData = queryOrgTreeData;
		report.removeCurryOrgDeviceData = removeCurryOrgDeviceData;
		report.deviceClick = deviceClick;
		report.queryReport = queryReport;

		/**
	  	 * 通过用户id查询设备类型
	  	 * @param  userid
	  	 * @return none
	  	 */
	  	function queryTypesByUserId(userId) {
	  		//http://10.88.20.71:8081/report/deviceType/getDeviceTypeLstByUserId?userId={userId}
	  	};
	  	/**
	  	 * 通过orgId查询设备类型
	  	 * @param  orgId
	  	 * @return none
	  	 */
	  	function queryTypesByOrgId(orgId) {
	  		var pormise = ReportService.getDeviceTypeListByOrgId(orgId);
	  		pormise.then(function(data) {
	  			if(data.flag == 1) {
	  				angular.forEach(data.data,function(value,key) {
	  					value.class = 'equip-icon-0 equip-icon-0-'+value.xindex+'-0';
	  				});
	  				report.allTypes = data.data;
	  			}
	  		},function(data) {

	  		});
	  	};
	  	/**
	  	 * 选择设备类型
	  	 * @param  $event 点击事件
	  	 * @return none
	  	 */
	  	function chooseType($event) {
	  		var target = $event.target;
	  		if($(target).hasClass("selected") || $(target).closest(".equip-item").hasClass("selected")) {
	  			return;
	  		}
	  		
	  		if($(target).hasClass("equip-icon-999")) {
	  			var xindex = $(target).closest(".equip-item").data("xindex");
	  			$(target).closest(".equip-item").siblings(".selected").each(function(index, el) {
	  				var subX = $(this).data("xindex");
	  				$(this).removeClass("selected");
	  				$(this).find(".equip-icon-0").removeClass().attr('class', 'equip-icon-0 equip-icon-0-' + subX + '-0');
	  			});
	  			$(target).closest(".equip-item").addClass('selected');
	  			$(target).removeClass().attr('class', 'equip-icon-0 equip-icon-0-' + xindex + '-999');
	  			report.typeid = $(target).closest(".equip-item").attr('id');
	  		}else if($(target).hasClass("equip-item")) {
	  			var xindex = $(target).data("xindex");
	  			$(target).siblings('.selected').each(function(index, el) {
	  				var subX = $(this).data("xindex");
	  				$(this).removeClass("selected");
	  				$(this).find(".equip-icon-0").removeClass().attr('class', 'equip-icon-0 equip-icon-0-' + subX + '-0');
	  			});
	  			$(target).addClass('selected');
	  			$(target).find(".equip-icon-0").removeClass().attr('class', 'equip-icon-0 equip-icon-0-' + xindex + '-999');
	  			report.typeid = $(target).attr('id');
	  		}else {
	  			var xindex = $(target).closest(".equip-item").data("xindex");
	  			$(target).closest(".equip-item").siblings('.selected').each(function(index, el) {
	  				var subX = $(this).data("xindex");
	  				$(this).removeClass("selected");
	  				$(this).find(".equip-icon-0").removeClass().attr('class', 'equip-icon-0 equip-icon-0-' + subX + '-0');
	  			});
	  			$(target).closest(".equip-item").addClass('selected');
	  			$(target).closest(".equip-item").find(".equip-icon-0").removeClass().attr('class', 'equip-icon-0 equip-icon-0-' + xindex + '-999');
	  			report.typeid = $(target).closest(".equip-item").attr('id');
	  		}
	  		report.orgDeviceData.length = 0;
	  		$.fn.zTree.destroy("org-select-tree");
	  		report.queryOrgTreeData(report.orgid, report.typeid);
	  	};
	  	/**
		 * 显示下拉框
		 */
		var showDialog = function(e) {
			if(!report.isShow.value){
				report.isShow.value = true;
				$(document).bind('click.report', function(e) {
					var target = e.target;
			    	if(!$(target).hasClass('tree-dialog-panel') && $(target).closest('.tree-dialog-panel').length < 1) {
			    		hiddenDialog();
			    	}
				});
				$(document).bind('scroll.report', function(e){
					hiddenDialog();
				});
			}

			if(e) {
				e.stopPropagation();
			}
		};
		/**
		 * 收起下拉框
		 */
		var hiddenDialog = function(e) {
			if(report.isShow.value){
				report.isShow.value = false;
				$(document).unbind('click.report');
				$(document).unbind('scroll.report');
			}
			
			if(e) {
				e.stopPropagation();
			}
		};
		/**
		 * 下拉按钮点击
		 */
		report.dropDownClick = function($event) {
			var target = $event.target;
			if($(target).hasClass("opened") || $(target).closest(".dialog-btn").hasClass("opened")){
				hiddenDialog($event);
			}else{
				showDialog($event);
			}
		};
		/**
	  	 * 通过机构id,设备类型id查询机构树数据
	  	 */
	  	function queryOrgTreeData(orgid, typeid) {
	  		var promise = ReportService.getOrgTreeData(orgid, typeid);
	  		promise.then(function(rst) {
	  			if(rst.flag === 1) {
	  				if(rst.data && typeof(rst.data) == 'object'){
	  					if(isArray(rst.data)){
	  						report.treeData = rst.data;
	  					}else{
	  						report.treeData.push(rst.data);
	  					}
	  				}
	  				$.fn.zTree.init($("#org-select-tree"), report.treeSetting, report.treeData);
	  				showDialog();
	  			}else{
	  				hiddenDialog();
	  				console.log("机构树数据加载失败！");
	  			}
	  			
	  		},function(rst) {
	  			hiddenDialog();
  				console.log("机构树数据加载失败！");
	  		});
	  	};
	  	/**
	  	 * 树节点点击的事件回调函数
	  	 * @param  {[type]} event    [标准的 js event 对象]
	  	 * @param  {[type]} treeId   [对应节点的treeId，便于用户操控]
	  	 * @param  {[type]} treeNode [被点击的节点 JSON 数据对象]
	  	 */
	  	function zTreeOnClick(event, treeId, treeNode) {
		    var treeObj = $.fn.zTree.getZTreeObj(treeId);
		    if(treeNode.checked) {
		    	treeObj.checkNode(treeNode, false, true, true);
		    }else{
		    	treeObj.checkNode(treeNode, true, true, true);
		    }
		};
		/**
		 * 树节点被勾选或取消勾选的事件回调函数
		 * @param  {[type]} event    [标准的 js event 对象]
		 * @param  {[type]} treeId   [对应节点的treeId，便于用户操控]
		 * @param  {[type]} treeNode [被点击的节点 JSON 数据对象]
		 */
		function zTreeOnCheck(event, treeId, treeNode) {
			if(treeNode.checked) {
				queryOrgDeviceData(treeNode.id);
			}else {
				removeOrgDeviceInfoByTreeNode(treeNode);
			}
		};

		/**
		 * [根据orgId级联查询该机构及所有子机构设备列表]
		 * @param  {[type]} orgId [机构Id]
		 */
		function queryOrgDeviceData(orgId) {
			var promise = ReportService.getOrgDeviceData(report.orgid, orgId, report.typeid);
			promise.then(function(rst) {
	  			if(rst.flag == 1) {
	  				var orgDeviceLst = rst.data;
	  				if(orgDeviceLst && orgDeviceLst.length > 0){
	  					for(var index=0; index < orgDeviceLst.length; index++) {
	  						var addFlag = true;
	  						if(orgDeviceLst[index].orgFullName){
	  							orgDeviceLst[index].orgFullName = orgDeviceLst[index].orgFullName.split(',').join('>');
	  						}
	  						for(var i=0; i < report.orgDeviceData.length; i++) {
								if(orgDeviceLst[index].orgId == report.orgDeviceData[i].orgId) {
									addFlag = false;
									break;
								}
							}
							if(addFlag){
								report.orgDeviceData.push(orgDeviceLst[index]);
							}
	  					}
	  				}
				}else{
					console.log("该机构下设备信息加载失败！");
				}
			},function(data) {
				console.log("该机构下设备信息加载失败！");
			});
		};

		/**
		 * 级联删除某个树节点关联的设备数据
		 * @param  {[type]} treeNode [树节点]
		 */
		function removeOrgDeviceInfoByTreeNode(treeNode) {
			var orgId = treeNode.id;
			for(var i=0; i < report.orgDeviceData.length; i++) {
				if(orgId == report.orgDeviceData[i].orgId) {
					report.orgDeviceData.splice(i,1);
					break;
				}
			}
			//将未绑定设备的父节点也置为未选中状态
			uckParentNode(treeNode);
			//删除子节点数据
			if(treeNode.children && treeNode.children.length > 0) {
				for(var index in treeNode.children){
					removeOrgDeviceInfoByTreeNode(treeNode.children[index])
				}
			}
		};

		/**
		 * 移除当前机构下的全部设备数据
		 * @param  {[type]} $event [标准的 js event 对象]
		 */
		function removeCurryOrgDeviceData($event) {
			var target = $event.target;
			var orgId = $(target).closest(".nav-item").data("orgId");
			if(orgId) {
				for(var i=0; i < report.orgDeviceData.length; i++) {
					if(orgId == report.orgDeviceData[i].orgId) {
						report.orgDeviceData.splice(i,1);
						var treeObj = $.fn.zTree.getZTreeObj("org-select-tree");
						var node = treeObj.getNodeByParam("id", orgId, null);
						if(node && node.checked) {
					    	treeObj.checkNode(node, false, false, false);
					    	uckParentNode(node);
					    }
						break;
					}
				}
			}else {
				console.log("参数错误！");
			}
		};

		/**
		 * 级联将父节点置成未选中状态
		 * @param  {[type]} node [description]
		 * @return {[type]}      [description]
		 */
		function uckParentNode(node) {
			var parentNode = node.getParentNode();
			if(parentNode && parentNode.checked){
				var parentId = parentNode.id;
				var rckFlag = true;
				for(var i=0; i < report.orgDeviceData.length; i++) {
					if(parentId == report.orgDeviceData[i].orgId) {
						rckFlag = false;
						break;
					}
				}
				if(rckFlag) {
					var treeObj = $.fn.zTree.getZTreeObj("org-select-tree");
					treeObj.checkNode(parentNode, false, false, false);
			    	uckParentNode(parentNode);
				}
			}
		}
		/**
		 * 根据设备当前状态选中/取消选中当前设备
		 * @param  {[type]} $event [标准的 js event 对象]
		 */
		function deviceClick($event) {
			var target = $event.target;
			hiddenDialog();
			if($(target).hasClass("selected")) {
				$(target).removeClass("selected");
			}else {
				$(target).addClass("selected");
			}

		};
		/**
		 * 获取所有选中设备Id数组
		 * @return {[Arry]} [所有选中的设备Id数组]
		 */
		function getAllSelectedEquipLst() {
			var selectedDeviceIds = [];
			$(".report-equip-select-panel").find(".equip-item.selected").each(function(index, el) {
				var deviceId = $(this).data("deviceId");
	  			if(deviceId) {
	  				selectedDeviceIds.push(deviceId);
	  			}
	  		});
	  		return selectedDeviceIds;
		};
		/**
		 * 跳转到报表页面，显示报表信息
		 * @return {[type]} [description]
		 */
		function queryReport() {
			if(report.typeid && $(".report-equip-select-panel").find(".equip-item.selected").length > 0) {
				var deviceIdLst = getAllSelectedEquipLst();
				var deviceIdStr = deviceIdLst.join(",");
				var navItem = {
  					href:'app.reportPage',
  		  			text:(function() {
  		  				for(var i in report.allTypes) {
  		  					if(report.allTypes[i].typeId == report.typeid) {
  		  						return report.allTypes[i].typeName;
	  						}
		  				}
		  			})(),
		  			orgId: report.orgid,
		  			deviceType: report.typeid,
		  			deviceLst: deviceIdStr
  		  		}
  		  		$scope.addNavItem(navItem);
	  			$state.go('app.reportPage', {deviceLst:deviceIdStr, deviceType:report.typeid, orgId: report.orgid});
			}else{
				var modalInstance = $modal.open({
					templateUrl: 'function/report/dialog.html',
					controller: dialogController,
					backdrop: 'static',
					keyboard: false,
					size:'sm',
				});
			}
		};
		/**
		 * 错误提示信息弹出控制器
		 */
		function dialogController($modalInstance) {
	  		function close() {
	  			$modalInstance.dismiss('cancel');
	  		}
	  		setTimeout(close,1000);
	  	};
	  	/**
	  	 * 判断对象是不是数组对象
	  	 * @param  {[type]}  obj [description]
	  	 * @return {Boolean}     [description]
	  	 */
	  	function isArray (obj){
            return Object.prototype.toString.apply(obj, null) === '[object Array]';
        };

		/**
		 * 初始化设备类型图标列表
		 */
		report.queryTypesByOrgId(report.orgid);
	}
})();