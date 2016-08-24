'use strict';

/* 设备分组控制器 */
/*
 author：lsw
 */

app.controller('deviceSetGroupCtrl', ['$scope', '$rootScope', '$modalInstance', '$http', 'groupID', 'userId','$modal','$filter','toaster', function($scope, $rootScope, $modalInstance, $http, groupID, userId,$modal,$filter,toaster) {

	var url = 'http://10.88.20.104:8079/acp-web-monitor/';
	//设置默认值
	var jsonInfo={};
	$scope.getGroupList=[];
	$scope.allId = false;
	$scope.formData = {
		propertyvalue: '',
		operate: 1,
		isenabled: 1,
		groupid: groupID,
		touserid: userId,
	};
	$scope.disFlag=true;

	//打开提示框
	$scope.toasterType = {
		type: 'info',
		title: "提示信息",
		body: ""
	};
	$scope.pop = function() {
		toaster.pop($scope.toasterType);
	}
	$scope.formData.isenabled=1;
	$scope.formData.operate=1;

	//控制按钮显示
	$scope.isShowBtn = true;
	$scope.isShowedit=true;
	$scope.newDate = function() {
		$scope.isShowedit=true;
		$scope.isShowBtn = false;
		$scope.disFlag=false;
	}

	$scope.isCancel=function () {
		$scope.isShowBtn = true;
		$scope.isShowedit=true;
		$scope.disFlag=true;
	}

	// 关闭弹框js方法
	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	}

	//全选反选
	$scope.choseAll = function(check) {

		angular.forEach($scope.getGroupList,function (value,key) {
			value.check=check;
		});
	};
	//监听数据变化
	$scope.$watch('getGroupList',function (nValue,oValue) {
		if (nValue == oValue){
			return;
		}
		var choseAttr=[];
		angular.forEach(
			$filter('filter')(nValue,{check:true}),
			function (v) {
				choseAttr.push(v);
			}
		);
		$scope.allId=choseAttr.length==$scope.getGroupList.length;
	},true);


	//更新分组规则
	$scope.upData=function () {

		var ids = document.getElementsByName('deviceId');
		var a = [];
		for (var i = 0; i < ids.length; i++) {
			if (ids[i].checked == true) {
				a.push(ids[i].getAttribute('value'));
			}
		}
		$scope.formData.id=a[0];

		if ($scope.formData.propertyvalue > 80 || $scope.formData.propertyvalue < -40){
			//jsonInfo={'information':'临界值在-40~80之间,请重新填写！'};
			//showAddGroupDialog(jsonInfo);
			$scope.toasterType.type= 'warning';
			$scope.toasterType.body="临界值在-40~80之间,请重新填写！";
			$scope.pop();
			return;
		}else {
			$http({
				method: 'POST',
				url: url + 'device/rule/sensor/update',
				data:{
					jsonData: JSON.stringify($scope.formData)
				}
			}).success(function(response) {
				if (response.flag == 1) {
					//$scope.toasterType.type= 'success';
					//$scope.toasterType.body="分组规则编辑成功";
					//$scope.pop();
					$http.get(url + 'device/rule/sensor/query?groupid=' + $scope.formData.groupid)
						.success(function(response) {
							$scope.getGroupList = response.data;
							//jsonInfo={'information':response.message};
							//showAddGroupDialog(jsonInfo);
						}).error(function(response) {
						//jsonInfo={'information':response.message};
						//showAddGroupDialog(jsonInfo);
					});
				} else {
					//jsonInfo={'information':'分组规则编辑失败!'};
					//showAddGroupDialog(jsonInfo);
					$scope.toasterType.type= 'error';
					$scope.toasterType.body="分组规则编辑失败!";
					$scope.pop();
				}
			}).error(function(response) {
				jsonInfo={'information':response.message};
				showAddGroupDialog(jsonInfo);
			});
		}
	};

	//编辑规则
	$scope.editData = function() {
		$scope.isShowBtn = true;
		$scope.isShowedit=false;
		var ids = document.getElementsByName('deviceId');
		var a = [];

		if ( ids.length == 0){
			//jsonInfo={'information':'您好,请先添加规则!'};
			//showAddGroupDialog(jsonInfo);
			$scope.toasterType.type= 'warning';
			$scope.toasterType.body="您好,请先添加规则!";
			$scope.pop();
			return;
		}else {
			for (var i = 0; i < ids.length; i++) {
				if (ids[i].checked == true) {
					a.push(ids[i].getAttribute('value'));
				}
			}
			$scope.formData.id=a[0];
			if (a.length == 0){
				//jsonInfo={'information':'您好,请选择一个编辑!'};
				//showAddGroupDialog(jsonInfo);
				$scope.toasterType.type= 'warning';
				$scope.toasterType.body="您好,请先添加规则!";
				$scope.pop();
				return;
			}else {
				if (a.length > 1 || a.length <= 0) {
					//jsonInfo={'information':'您好,每次只能编辑一个,请重新选择!'};
					//showAddGroupDialog(jsonInfo);
					$scope.toasterType.type= 'warning';
					$scope.toasterType.body="您好,每次只能编辑一个,请重新选择!";
					$scope.pop();
					return;
				} else {
					$http.get(url + 'device/rule/sensor/find?id=' + $scope.formData.id)
						.success(function(response) {
								$scope.formData.propertyvalue=response.data.propertyvalue;
							    $scope.formData.operate=response.data.operate;
								$scope.formData.begintime=response.data.begintime;
								$scope.formData.endtime=response.data.endtime;
								$scope.formData.isenabled=response.data.isenabled;

						}).error(function(response) {
						    console.log(response.message);
					});
				}
			}
		}
	};

	var confirmDialogController = function($scope, $modalInstance, opts){
		$scope.opts = opts;
		$scope.opts.ensure = function() {
			// $modalInstance.dismiss('cancel');
			// return true;
			$modalInstance.close(true);
		};
		$scope.opts.cancel = function() {
			// $modalInstance.dismiss('cancel');
			$modalInstance.close(false);
			// return false;
		};
	};

	//删除规则
	$scope.delListData = function() {
		var a = [];
		var ids = document.getElementsByName('deviceId');
		for (var i = 0; i < ids.length; i++) {
			if (ids[i].checked == true) {
				a.push(ids[i].getAttribute('value'));
			}
		}
		if (a.length <= 0){
			//jsonInfo={'information':'请至少选择一条'};
			//showAddGroupDialog(jsonInfo);
			$scope.toasterType.type= 'warning';
			$scope.toasterType.body="请至少选择一条";
			$scope.pop();
			return;
		}else {

			var confirm = $modal.open({
				templateUrl: 'function/monitor/set/confirmDialog.html',
				controller: confirmDialogController,
				backdrop: 'static',
				keyboard: true,
				size:'sm',
				resolve: {
					opts: function(){return {msg:'确认删除吗?'}}
				}
			});

			confirm.result.then(function(result){
				if(result){
					$http({
						method: 'GET',
						url: url + 'device/rule/sensor/delete?ids=' + a,
					}).success(function(response) {
						if (response.flag == 1) {
							if (response.flag == 1) {
								$http.get(url + 'device/rule/sensor/query?groupid=' + $scope.formData.groupid)
									.success(function(response) {
										$scope.getGroupList = response.data;
										//jsonInfo={'information':response.message};
										//showAddGroupDialog(jsonInfo);
									}).error(function(response) {
										//jsonInfo={'information':response.message};
										//showAddGroupDialog(jsonInfo);
									});
								$scope.toasterType.type= 'success';
								$scope.toasterType.body="分组规则删除成功";
								$scope.pop();
							} else {
								//jsonInfo={'information':'分组规则删除失败!'};
								//showAddGroupDialog(jsonInfo);
								$scope.toasterType.type= 'error';
								$scope.toasterType.body="分组规则删除失败";
								$scope.pop();
							}

						} else {
							//jsonInfo={'information':'分组规则删除失败!'};
							//showAddGroupDialog(jsonInfo);

							$scope.toasterType.type= 'error';
							$scope.toasterType.body="分组规则删除失败";
							$scope.pop();
						}
					}).error(function(response) {
						jsonInfo={'information':response.message};
						showAddGroupDialog(jsonInfo);
					});
				}
			},function(){});
		}

	};

	//添加分组规则数据
	$scope.saveData = function() {
		valiteFrom();
		$http({
			method: 'POST',
			url: url + 'device/rule/sensor/save',
			data: {
				jsonData: JSON.stringify($scope.formData)
			},
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}).success(function(response) {
			if (response.flag == 1) {
				$http.get(url + 'device/rule/sensor/query?groupid=' + $scope.formData.groupid)
					.success(function(response) {
						$scope.getGroupList = response.data;
						angular.forEach($scope.getGroupList,function (data) {
							data.check=false;
						});
						//弹出调用
					}).error(function(response) {
					   //弹出调用
				});
				$scope.toasterType.type= 'success';
				$scope.toasterType.body="数据保存成功";
				$scope.pop();
			} else {
				//弹出调用
				$scope.toasterType.type= 'error';
				$scope.toasterType.body="数据保存失败";
				$scope.pop();
			}

		}).error(function(response) {
			//弹出调用
			$scope.toasterType.type= 'error';
			$scope.toasterType.body="数据保存失败";
			$scope.pop();
		});

	};

	//表单验证
	function  valiteFrom() {
		var oText=$("#setgroup_form").find('input[type=text]');
		//alert($(this).val()+'132')
		
		/*oText.each(function () {
			if ($(this).val() == ''){
				$(this).addClass('my-invalid');
				return;
			}else {
				$(this).removeClass('my-invalid');
			}
		});*/
	}

	/** 打开弹框 */
	function showAddGroupDialog(jsonData) {
		var modalInstance = $modal.open({
			templateUrl: 'function/monitor/gruopPop.html',
			controller: EditSensorController,
			backdrop: 'static',
			keyboard: false,
			size:'sm',
			resolve: {
				jsonData: function(){
					return jsonData
				}
			}
		});
	};

	/** 弹框 controller */
	var EditSensorController = function($scope,$modalInstance,jsonData,$http){
		var jsonInfo=eval(jsonData);
		$scope.operateInfo=jsonInfo.information;
		$scope.cancel = function() {
			$modalInstance.dismiss('cancel');
		}
		$scope.ok= function () {
			$scope.cancel();
		}
	}


}]);