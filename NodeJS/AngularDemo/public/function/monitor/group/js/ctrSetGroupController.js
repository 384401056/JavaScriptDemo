'use strict';

/* 设备分组控制器 */
/*
 author：lsw
 */

app.controller('ctrSetGroupController', ['$scope', '$rootScope', '$modalInstance', '$http', 'groupID', 'userId','$modal','toaster', function($scope, $rootScope, $modalInstance, $http, groupID, userId,$modal,toaster) {

	var url = 'http://10.88.20.104:8079/acp-web-monitor/';
	//设置默认值
	var jsonInfo={};
	$scope.enable=1;
	$scope.devicesId = false;
	$scope.begandgis=true;
	$scope.forTime=false;
	$scope.endTime=true;
	$scope.allId = false;
	$scope.form = {
		isrule:1,
		status: 1,
		isenabled: 1,
		groupid: groupID,
		touserid: userId,
	};


	//打开提示框
	$scope.toasterType = {
		type: 'info',
		title: "提示信息",
		body: ""
	};
	$scope.pop = function() {
		toaster.pop($scope.toasterType);
	}

	//判断是否可用、
	$scope.isLock=function () {
		if ($scope.enable == 1){
			$scope.forTime=false;
			$scope.endTime=true;
		}else {
			$scope.forTime=true;
			$scope.endTime=false;
		}
	};

	//控制按钮显示
	$scope.isShowBtn = true;
	$scope.isShowedit=true;
	$scope.newDate = function() {
		$scope.isShowedit=true;
		$scope.isShowBtn = false;
		$scope.begandgis=false;
		$scope.endgis=false;

	}

	// 关闭弹框js方法
	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	}

	//全选反选
	$scope.choseAll = function() {
		if ($scope.allId) {
			$scope.devicesId = $scope.allId;
		} else {
			$scope.devicesId = $scope.allId;
		}

	};
	
	//判断数字是否小于0
	$scope.isNum=function () {
		if ($scope.form.durationtime < 0){
			$scope.form.durationtime=0;
			//jsonInfo={'information':'持续时长不能小于0'};
			//showAddGroupDialog(jsonInfo);
			$scope.toasterType.type= 'warning';
			$scope.toasterType.body="持续时长不能小于0";
			$scope.pop();
			return;
		}else if ($scope.form.intervals < 0){
			$scope.form.intervals=0;
			//jsonInfo={'information':'每次间隔不能小于0'};
			//showAddGroupDialog(jsonInfo);
			$scope.toasterType.type= 'warning';
			$scope.toasterType.body="每次间隔不能小于0";
			$scope.pop();
			return;
		}else if($scope.form.cycletime < 0){
			$scope.form.cycletime=0;
			//jsonInfo={'information':'循环次数不能小于0'};
			//showAddGroupDialog(jsonInfo);
			$scope.toasterType.type= 'warning';
			$scope.toasterType.body="循环次数不能小于0";
			$scope.pop();
			return;
		}
	};
	
	

	//更新分组规则
	$scope.upData=function () {

		var ids = document.getElementsByName('deviceId');
		var a = [];
		for (var i = 0; i < ids.length; i++) {
			if (ids[i].checked == true) {
				a.push(ids[i].getAttribute('value'));
			}
		}
		$scope.form.id=a[0];

		$http({
			method: 'POST',
			url: url + 'device/rule/ctrl/update',
			data:{
				jsonData: JSON.stringify($scope.form)
			}
		}).success(function(response) {

			if (response.flag == 1) {
				$scope.toasterType.type= 'success';
				$scope.toasterType.body="分组规则编辑成功";
				$scope.pop();
				$http.get(url +'device/rule/ctrl/query?groupid=' + $scope.form.groupid)
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
			//jsonInfo={'information':response.message};
			//showAddGroupDialog(jsonInfo);
			$scope.toasterType.type= 'error';
			$scope.toasterType.body="分组规则编辑失败!";
			$scope.pop();
		});

	};

	//编辑规则
	$scope.editData = function() {
		$scope.begandgis=false;
		$scope.endgis=false;
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
			$scope.form.id=a[0];
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
					$http.get(url + 'device/rule/ctrl/find?id=' + $scope.form.id)
						.success(function(response) {
							$scope.form.isrule=response.data.isrule;
							$scope.form.status=response.data.status;
							$scope.form.begintime=response.data.begintime;
							$scope.form.endtime=response.data.endtime;
							$scope.form.durationtime=response.data.durationtime;
							$scope.form.intervals=response.data.intervals;
							$scope.form.cycletime=response.data.cycletime;
							$scope.form.execweekdates=response.data.execweekdates;
							$scope.form.isenabled=response.data.isenabled;

						}).error(function(response) {

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
						url: url + 'device/rule/ctrl/delete?ids=' + a,
					}).success(function(response) {
						if (response.flag == 1) {
							$http.get(url + 'device/rule/ctrl/query?groupid=' + $scope.form.groupid)
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
							$scope.toasterType.body="分组规则删除失败!";
							$scope.pop();
						}
					}).error(function(response) {
						//jsonInfo={'information':response.message};
						//showAddGroupDialog(jsonInfo);
						$scope.toasterType.type= 'error';
						$scope.toasterType.body="分组规则删除失败!";
						$scope.pop();
					});
				}
			},function(){});
		}

	};
	

	//添加分组规则数据
	$scope.saveData = function() {

		var ids = document.getElementsByName('execweekdates');
		var a = [];
		for (var i = 0; i < ids.length; i++) {
			if (ids[i].checked == true) {
				a.push(ids[i].getAttribute('value'));
			}
		}

		$scope.form.execweekdates=a;

		$http({
			method: 'POST',
			url: url + 'device/rule/ctrl/save',
			data: {
				jsonData: JSON.stringify($scope.form)
			},
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}).success(function(response) {

			if (response.flag == 1) {
				$scope.toasterType.type= 'success';
				$scope.toasterType.body="数据保存成功";
				$scope.pop();
				$http.get(url + 'device/rule/ctrl/query?groupid=' + $scope.form.groupid)
					.success(function(response) {
						$scope.getGroupList = response.data;
						//jsonInfo={'information':response.message};
						//showAddGroupDialog(jsonInfo);

					}).error(function(response) {
						//jsonInfo={'information':response.message};
						//showAddGroupDialog(jsonInfo);
				});
			} else {
				//jsonInfo={'information':'分组规则添加失败!'};
				//showAddGroupDialog(jsonInfo);
				$scope.toasterType.type= 'error';
				$scope.toasterType.body="数据保存失败";
				$scope.pop();
			}

		}).error(function(response) {
			//jsonInfo={'information':response.message};
			//showAddGroupDialog(jsonInfo)
			// $scope.toasterType.type= 'error';
			$scope.toasterType.body="数据保存失败";
			$scope.pop();;
		});
	};


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
