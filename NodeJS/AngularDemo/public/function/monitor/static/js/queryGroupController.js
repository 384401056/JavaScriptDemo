app.controller('queryGroupController', ['$scope', 'MonitorService','$modalInstance', '$state','orgId',
	function($scope, MonitorService, $modalInstance, $state,orgId) {

		//设备分组用数组
		var diviceGroupArry = new Array();
		var orgid = orgId;
		var promise = MonitorService.getDiviceGroupInfo(orgid);
		promise.then(function(data) {
				var obj = eval(data);
				for (var i = 0; i < obj.data.length; i++) {
					diviceGroupArry.push(jQuery.parseJSON('{"id":' + obj.data[i].id + ',"groupName":"' + obj.data[i].groupName + '"}'));
				}

			},
			function(data) {
				//服务调用失败
			});

		$scope.deviceInfoData = diviceGroupArry;
		$scope.devices = diviceGroupArry;
		//取消
		$scope.cancel = function() {
			$modalInstance.close(); //关闭
		};
		//确定
		$scope.ok = function() {
			var selectDevices = $scope.gridOptions.selectedItems;
			console.log("selectDevices: "+selectDevices.id);
		};

	}
]);