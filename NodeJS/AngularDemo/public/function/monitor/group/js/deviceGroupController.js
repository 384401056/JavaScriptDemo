'use strict';

/* 设备分组控制器 */
/*
 author：lsw
 */

app.controller('deviceGroupCtrl', ['$scope', '$rootScope', 'MonitorService','$modal', '$modalInstance', '$http', 'diviceGroupArry', 'url', 'orgId', 'userid', 'toaster','optType','groupName','groupId', function($scope, $rootScope, MonitorService,$modal, $modalInstance, $http, diviceGroupArry, url, orgId, userid, toaster,optType,groupName,groupId) {

	//打开提示框
	$scope.toasterType={type: 'info', title: "提示信息", body:""};
	$scope.pop=function(){
		toaster.pop($scope.toasterType);
	}
	$scope.toasterType.type= 'warning';

	$scope.deviceInfoData = diviceGroupArry;
	$scope.devices = diviceGroupArry;
	var vm = $scope.vm = {};
	vm.value = $scope.devices[0];
	if(optType==1){
		$scope.name = "新增分组";
		$scope.groupDis=false;
		$scope.groupname="";
	}else{
		$scope.name = "编辑分组";
		$scope.groupDis=true;
		$scope.groupname=groupName;

	}

	$scope.change=function(){
		if($scope.groupname){
			$('#groupname').parent().removeClass('has-error');
		}else{
			$('#groupname').parent().addClass('my-invalid');
		}
		if($scope.devices){
			$('#devicestype').parent().removeClass('has-error');
		}else{
			$('#devicestype').parent().addClass('has-error');
		}
	};
	//表单验证
	function valiteFrom() {
		var flag=false;
		var oText = $("#devicegroup").find('input[name=groupname]');

		oText.each(function() {
			if ($(this).val() == '') {
				$(this).parent().addClass('has-error');
				flag=false;
			} else {
				$(this).parent().removeClass('has-error');
				flag=true;
			}
		});
		if(flag){
			var selectDevices = vm.value.deviceList;
			var postids = new Array();
			angular.forEach(selectDevices, function (item) {
				if (item.ischecked) {
					postids.push(item.id);
				}
			});
			if (postids.length == 0) {
				$scope.toasterType.body="请选择设备!";
				$scope.pop();
				flag=false;
			}else{
				flag=true;
			}
		}
		return  flag;
	 }

	$scope.onSubmit = function() {
		 var flag=  valiteFrom();
		if(flag){
			var deviceTypeId = vm.value.deviceType;
			var selectDevices = vm.value.deviceList;
			var postids = new Array();
			if (selectDevices.length > 0) {
				angular.forEach(selectDevices, function (data) {
					if (data.ischecked) {
						postids.push(data.id);
					}
				});
				// console.log( postids.join(","));
				if(optType==1){
					var promise = MonitorService.setDeviceGroupInfo($scope.groupname, orgId, postids.join(","), deviceTypeId);
					promise.then(function (data) {
						if (data.flag == 1) {
							$scope.toasterType.body = '添加分组成功';
							$scope.toasterType.type= 'success';
							$scope.pop();
							 $modalInstance.close(true);
						} else {
							$scope.toasterType.body = '添加分组失败';
							$scope.toasterType.type= 'error';
							$scope.pop();
						}
					});
				}else{
					var promise = MonitorService.editDeviceGroupInfo(groupId,$scope.groupname,postids.join(","), deviceTypeId);
					promise.then(function (data) {
						if (data.flag == 1) {
							$scope.toasterType.body = '分组修改成功';
							$scope.toasterType.type= 'success';
							$scope.pop();
							$modalInstance.close(true);
						} else {
							$scope.toasterType.type= 'error';
							$scope.toasterType.body = '分组修改失败';
							$scope.pop();
							//$modalInstance.close(true);
						}
					});
				}
		    }
		}
	};
	$scope.onCancle = function() {
		$modalInstance.close(true);
	};
	$scope.setPagingData = function(data) {
		$scope.myData = data;
		if (!$scope.$$phase) {
			$scope.$apply();
		}
	};
	// 关闭弹框js方法
	$scope.cancel = function() {
		//全部取消
		$scope.checkAll(false);
		$modalInstance.dismiss('cancel');
	}
	//全选按钮方法
	$scope.checkAll = function(checked) {
		angular.forEach(vm.value.deviceList, function(item) {
			 item.ischecked=checked;
		});
	};
	//当选按钮方法
	$scope.selection = function() {
		return _.where( vm.value.deviceList, {$checked: true});
	};
	$scope.getDviceGroupInfo = function(item){
		item.ischecked=!item.ischecked;
	}
	$scope.deviceSelection=function(){
		$scope.allChecked=false;
		$scope.checkAll(false);
	}
}]);