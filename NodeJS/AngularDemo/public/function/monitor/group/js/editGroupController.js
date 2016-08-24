'use strict';

/* 设备分组控制器 */
/*
 author：lsw
 */

app.controller('editGroupCtrl', ['$scope', '$rootScope', '$modal', '$modalInstance', '$http', 'diviceGroupArry', 'url', 'orgId', 'toaster','MonitorService','diviceTypes','divicIds','groupId','diviceIdArr', function($scope, $rootScope, $modal, $modalInstance, $http, diviceGroupArry, url, orgId, toaster,MonitorService,diviceTypes,divicIds,groupId,diviceIdArr) {

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

				//获取分组名称
				$rootScope.grouplist = data.data;
			},
			function(data) {
				console.log("服务调用失败");
			});

	}

	$scope.showGroupInfor=function () {
		getDiviceGroup();
	};

	//xtn编辑分组开始
	$scope.onSubmit = function() {
		valiteFrom();
		var name=$scope.groupname;
		var _orgid=orgId;
		var promise = MonitorService.editDeviceGroupInfo(groupId,name,divicIds,diviceTypes);
		promise.then(function(data) {

			if (data.flag == 1){
				$scope.toasterType.type= 'success';
				$scope.toasterType.body=data.message;
				$scope.pop();
				$modalInstance.dismiss('cancel');
				getDiviceGroup();
				for (var i=0;i < diviceIdArr.length; i++){
					$("#"+diviceIdArr[i]+"check").prop({checked:false});
					$("#"+diviceIdArr[i]+"myCheck").hide();
				}
				$rootScope.showEditGroup=true;
				$rootScope.showGroup=true;
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