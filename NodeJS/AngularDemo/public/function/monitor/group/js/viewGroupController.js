'use strict';

/* 设备分组控制器 */
/*
 author：lsw
 */

app.controller('viewGroupCtrl', ['$scope', '$rootScope', '$modal', '$modalInstance', '$http', 'diviceGroupArry', 'url', 'orgId', 'toaster','MonitorService','diviceTypes','divicIds', 'diviceIdArr',function($scope, $rootScope, $modal, $modalInstance, $http, diviceGroupArry, url, orgId, toaster,MonitorService,diviceTypes,divicIds,diviceIdArr) {

	//打开提示框
	$scope.toasterType = {
		type: 'info',
		title: "提示信息",
		body: ""
	};
	$scope.pop = function() {
		toaster.pop($scope.toasterType);
	}
	$scope.toasterType.type = 'warning';

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


	//xtn表单验证
	function valiteFrom() {
		var oText = $("#groupname").val();
		if (oText == '' ||  oText== null){
			$scope.toasterType.body="分组名称不能为空!";
			$scope.toasterType.type = 'error';
			$scope.pop();
			return false;
		}
	}

	//xtn分组信息

	function getDiviceGroup() {
		var _orgid = orgId;
		var promise = MonitorService.getDiviceGroupInfo(_orgid);
		promise.then(function(data) {
				if(data.flag == 1){
					//获取分组名称
					$rootScope.grouplist = data.data;
				}else{
					$scope.toasterType.body=data.message;
					$scope.toasterType.type= 'error';
					$scope.pop();
				}
			},
			function(data) {
				$scope.toasterType.body="服务调用失败！";
				$scope.toasterType.type= 'error';
				$scope.pop();
			});

	}

	$scope.showGroupInfor=function () {
		getDiviceGroup();
	};

	//xtn添加分组开始
	$scope.onSubmit = function() {
		valiteFrom();
		var name=$scope.groupname;
		var _orgid=orgId;
		var promise = MonitorService.setDeviceGroupInfo(name,_orgid,divicIds,diviceTypes);
		promise.then(function(data) {
			if (data.flag == 1){
				$scope.toasterType.type= 'success';
				$scope.toasterType.body=data.message;
				$scope.pop();
				getDiviceGroup();

				for (var i=0;i < diviceIdArr.length; i++){
					$("#"+diviceIdArr[i]+"check").prop({checked:false});
					$("#"+diviceIdArr[i]+"myCheck").hide();
				}
				$rootScope.showGroup=true;
				$rootScope.showAddGroup=true;

				$modalInstance.dismiss('cancel');
			}

		}, function(data) {
			$scope.toasterType.body="添加失败！";
			$scope.toasterType.type= 'error';
			$scope.pop();
		});


	};


	// 关闭弹框js方法
	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	}

	$scope.onCancle = function() {
		$modalInstance.dismiss('cancel');
	};

}]);