/**
 * 监控-列表视图-控制器
 * @return {[type]} [description]
 */
(function(){
	'use strict';
	angular.module('app')
		.controller('ListView',['$scope','$http','$compile','$modal','$state','$rootScope','MonitorService', '$stateParams','$cookieStore','toaster',ListView]);
	function ListView($scope,$http,$compile,$modal,$state,$rootScope,MonitorService, $stateParams, $cookieStore,toaster) {
		var orgid = $stateParams.data;
		var listView = $scope;
		//采集类设备数据
		listView.captureEquip = [];
		listView.url = $scope.app.monitorUrl;
		// http://10.88.20.104:8079/acp-web-monitor/device/getDevStatusByMultId/10000
		//控制类设备数据
		listView.controlEquip = [];
		//分组设备数据
		listView.groupEquip = [];
		//测试数据
		listView.testData = ['1','2'];
		listView.showListView = showListView;
		listView.showMapView = showMapView;
		listView.showAddGroupDialog = showAddGroupDialog;
		listView.showEquips = showEquips;
		listView.rowClick = rowClick;
		listView.captureSetting = captureSetting;
		listView.captureReport = captureReport;
		listView.controlSetting = controlSetting;
		listView.controlReport = controlReport;
		listView.controlStart = controlStart;
		listView.controlStop = controlStop;
		listView.groupSetting = groupSetting;
		listView.groupDelete = groupDelete;

		//打开提示框
		$scope.toasterType={type: 'info', title: "提示信息", body:""};
		$scope.pop=function(){
			toaster.pop($scope.toasterType);
		}
		$scope.toasterType.type= 'warning';

		getData();
		// var timer = setInterval(getData,30*1000);//定时更新
		/**
		 * 获取设备分组数据
		 * @return none
		 */
		function getData() {
			//var promise = MonitorService.getDeviceList(orgid);
			var promise = MonitorService.getOrgDiviceInfoAll(orgid);
			promise.then(function(data) {
				listView.captureEquip=[];
				listView.controlEquip=[];
				if(data.flag==1){
					for(var i=0;i<data.data.length;i++){
						var obj=data.data[i];
						if(obj.categoryId==1){
							listView.captureEquip.push(obj);
						}else{
							listView.controlEquip.push(obj);
						}
					}
				}
				/*
				采集类设备数据解析
				 */
				angular.forEach(listView.captureEquip,function(value,key) {
					if(value.status==null||value.status==''){
						value.statuClass = 'state-icon-'+(-1);
					}else{
						value.statuClass = 'state-icon-'+(value.status);
					}
					value.statuText = getStatus(value.status);
					value.rowClass = (key % 2 == 0)?'tr-even content-row':'tr-odd content-row';
				});
				/*
				控制类设备数据解析
				 */
				angular.forEach(listView.controlEquip,function(value,key) {
					if(value.status==null||value.status==''){
						value.statuClass = 'state-icon-'+(-1);
					}else{
						value.statuClass = 'state-icon-'+(value.status);
					} 
					value.statuText = getStatus(value.status);
					value.rowClass = (key % 2 == 0)?'tr-even content-row':'tr-odd content-row';
				});
				
			},function(data) {
				console.log(data);
			},function(data) {
				console.log(data);
			});

			var p = MonitorService.getGroupDevicesData(orgid);
			p.then(function(data) {
				if(data.flag == 1) {
					/*
					分组设备数据解析
					 */
					angular.forEach(data.data,function(value,key) {
						
						value.statuClass = 'state-icon-'+((value.devices[0] && (value.devices[0].status)) || '-1');

						// value.statuText = getStatus(value.status);
						value.rowClass = (key % 2 == 0)?'tr-even content-row':'tr-odd content-row';
						// value.categoryid = 2;
						//组内设备是否为控制类
						value.isControl = value.category == 2?true:false;

					});
					listView.groupEquip = data.data;
					//console.log(listView.groupEquip);
				}
			},function(data) {
				console.log(data);
			});
		};
		/**
		 * 显示列表视图
		 * @return none
		 */
		function showListView() {
		};
		/**
		 * 显示地图视图
		 * @return none
		 */
		function showMapView (){
			//地图视图切换按钮点击事件
			// clearInterval(timer);
			$state.go('app.mapView',{data:orgid});
		};

		/**
		 * 显示添加分组弹窗
		 */
		function showAddGroupDialog() {
			var userid = $cookieStore.get('id')
			var promise = MonitorService.getDeviceGroupList(orgid);
			promise.then(function(data) {
					//console.log( data.data.devices);
 				    if(data.flag==1){
						var modalInstance = $modal.open({
							templateUrl: 'function/monitor/group/NewDeviceGroupDialog.html',
							backdrop: 'static',
							controller: 'deviceGroupCtrl',
							keyboard: false,
							resolve: {
								diviceGroupArry: function() {
									return data.data.devices;
								},
								url: function() {
									return angular.copy($scope.app.monitorUrl);
								},
								orgId: function() {
									return angular.copy(orgid);
								},
								userid: function() {
									return angular.copy(userid);
								},
								optType: function() {
									return 1;
								},
								groupName: function() {
									return "";
								},
								groupId: function() {
									return '';
								}
							}
						});
						modalInstance.result.then(function(data) {
							 getData();
						});
					}
			 }
			);
		};

		/**
		 * 显示组内设备详情弹窗
		 * @param  当前组内的设备列表
		 * @return none
		 */
		function showEquips(equipList) {
			var modalInstance = $modal.open({templateUrl: 'function/monitor/group/equipInfo.html',
				controller: 'equipInfoController',
				backdrop: 'static',
				keyboard: false,
				resolve: {equipList: function(){return equipList}}
			});
		};
		/**
		 * 返回设备状态的文字描述
		 * @param  状态代码
		 * @return 状态文字描述
		 */
		function getStatus(s) {
			return (s == 0?'正常':(s==201?'预警':(s==200?'告警':(s==202?'运行':(s == -1?'离线':'设备未连接')))));
		};
		/**
		 * 采集类和控制类设备列表 行点击事件
		 * @param  {[type]} id [description]
		 * @return {[type]}    [description]
		 */
		function rowClick(id) {
		}
		/**
		 * 采集类设备设置
		 * @param  设备id
		 * @return noen
		 */
		function captureSetting(equipname,equipid,$event) {
			$event.stopPropagation();
			var navItem = {
        href: 'app.sensorSet',
        text: equipname + "设置",
      }
      $scope.addNavItem(navItem);
			$state.go('app.sensorSet', {
        "data": equipid,
        "diviceName": equipname
      });
		}
		/**
		 * 采集类设备报表
		 * @param  设备id
		 * @return none
		 */
		function captureReport(equipname,equipid,devicetype,$event) {
			$event.stopPropagation();
			var navItem = {
        href: 'app.reportPage',
        text: equipname + "报表",
      }
      $scope.addNavItem(navItem);
      $state.go('app.reportPage', {
        "orgId": orgid,
        "deviceType": devicetype,
        "deviceLst": [equipid],
        "isCompare": true,
      });
		}
		/**
		 * 控制类设备设置
		 * @param  设备id
		 * @return none
		 */
		function controlSetting(devicename,equipid,$event) {
			$event.stopPropagation();
			var navItem = {
        href: 'app.controlSet',
        text: devicename + "设置",
      }
      $scope.addNavItem(navItem);
      $state.go('app.controlSet', {
        "data": equipid,
        "diviceName": devicename
      });
		}
		/**
		 * 控制类设备报表
		 * @param  设备id
		 * @return none
		 */
		function controlReport(devicename,deviceid,devicetype,$event) {
			$event.stopPropagation();
			var navItem = {
        href: 'app.reportPage',
        text: devicename + "报表",
      }
      $scope.addNavItem(navItem);
      $state.go('app.reportPage', {
        "orgId": orgid,
        "deviceType": devicetype,
        "deviceLst": [deviceid],
        "isCompare": false,
      });
		}
		/**
		 * 控制类设备 开始操作
		 * @param  category 应该为 组id??
		 * @return true 成功  false 失败
		 */
		function controlStart(category,$event) {
			$event.stopPropagation();
		}
		/**
		 * 控制类设备 停止操作
		 * @param  category 应该为 组id??
		 * @return true 成功 false 失败
		 */
		function controlStop(category,$event) {
			$event.stopPropagation();
		}

		/**
		 * 加载设备分组信息
		 *  @param  groupId  分组ID
		 *  @param  orgId    组织ID
		 */
		function  getDeviceGroupEditInfo(groupId,groupName){
			var userid = $cookieStore.get('id')
			var promise = MonitorService.getOneDeviceGroupList(groupId);
				promise.then(function(data) {
					if(data.flag==1){
						var modalInstance = $modal.open({
							templateUrl: 'function/monitor/group/NewDeviceGroupDialog.html',
							backdrop: 'static',
							controller: 'deviceGroupCtrl',
							keyboard: false,
							resolve: {
								diviceGroupArry: function() {
									return data.data.devices;
								},
								url: function() {
									return angular.copy($scope.app.monitorUrl);
								},
								orgId: function() {
									return angular.copy(orgid);
								},
								userid: function() {
									return angular.copy(userid);
								},
								optType: function() {
									return 2;
								},
								groupName: function() {
									return groupName;
								},
								groupId: function() {
									return groupId;
								}
							}
						});
						modalInstance.result.then(function(data) {
							 getData();
						});
					}
			});
		}

		//xtn打开控制器

		$scope.oneController=function (item,$event) {
			if(item.status==-1){
				$scope.toasterType.body="设备处于离线状态,禁止操作！";
				$scope.toasterType.type= 'error';
				$scope.pop();
				return;
			}
			//打开弹窗
			var modalInstance = $modal.open({
				templateUrl: 'function/monitor/contro/oneDeviceDialog.html',
				backdrop: 'static',
				controller: 'oneDeviceController',
				keyboard: false,
				resolve: {
					userId:function () {
						return $cookieStore.get("id");
					},
					_devicesId:function () {
						return item.id;
					}
				}
			});
			modalInstance.opened.then(function() {
				getData();
			});
			modalInstance.result.then(function() {
				getData();
			}, function(reason) {
				//点击空白区域，总会输出backdrop click，点击取消，则会暑促cancel

			});
		}


		$scope.groupListController=function (item,$event) {
			//打开弹窗
			var modalInstance = $modal.open({
				templateUrl: 'function/monitor/contro/tapDialog.html',
				backdrop: 'static',
				controller: 'tapController',
				keyboard: false,
				resolve: {
					userId:function () {
						return $cookieStore.get("id");
					},
					_groupId:function () {
						return item.id;
					}
				}
			});
			modalInstance.opened.then(function() {

			});
			modalInstance.result.then(function() {

			}, function(reason) {
				//点击空白区域，总会输出backdrop click，点击取消，则会暑促cancel

			});
		}


		/**
		 * 组设置
		 * @param  category 应该为 组id??
		 * @return none
		 */
		function groupSetting(item,$event) {
			getDeviceGroupEditInfo(item.id,item.groupName)
			$event.stopPropagation();
		}

		var _cancel = function() {
		};
		var _ok= function (groupId) {

			var promise = MonitorService.delDeviceGroupInfo(groupId);
			promise.then(function (data) {
				if(data.flag==1) {
					$scope.toasterType.body="删除成功";
					$scope.toasterType.type= 'success';
					getData();
				}else{
					$scope.toasterType.type= 'error';
					$scope.toasterType.body="删除失败";
				}
				$scope.pop();
			},function(data,status){
				$scope.toasterType.type= 'error';
				$scope.toasterType.body="删除失败";
				$scope.pop();
			});
		};

		/**
		 * 删除分组
		 * @param  category 应该为 组id??
		 * @return true 成功 false 失败
		 */
		function groupDelete(item,$event) {
			$scope.acpLayer.confirm("是否删除所选数据",function(){_ok(item.id );},function(){_cancel();});
			$event.stopPropagation();
		}
	}
})();