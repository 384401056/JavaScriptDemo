/**
 * 消息js
 */
app.controller('msgCtrl', function($scope,  $cookieStore,$http, $stateParams) {
	var navItem = {
		href:'',
		text:''
	}
	$scope.clearAllNav();
	if ($stateParams.type == 1) {
		$scope.tab1 = true;
		$scope.tab2 = false;
		$scope.tab3 = false;
		$scope.tab4 = false;
		navItem.text="告警信息";
	}
	if ($stateParams.type == 2) {
		$scope.tab1 = false;
		$scope.tab2 = true;
		$scope.tab3 = false;
		$scope.tab4 = false;
		navItem.text="设备异常信息";
	}
	if ($stateParams.type == 3) {
		$scope.tab1 = false;
		$scope.tab2 = false;
		$scope.tab3 = true;
		$scope.tab4 = false;
		navItem.text="任务信息";
	}
	if ($stateParams.type == 4) {
		$scope.tab1 = false;
		$scope.tab2 = false;
		$scope.tab3 = false;
		$scope.tab4 = true;
		navItem.text="用户信息";
	}
	$scope.addNavItem(navItem);
	$scope.changeTab=function(flag){
		$scope.delNavItem();
		if(flag==1){
			navItem.text="告警信息";
		}else if(flag==2){
			navItem.text="设备异常信息";
		}else if(flag==3){
			navItem.text="任务信息";
		}else if(flag==4){
			navItem.text="用户信息";
		}
		$scope.addNavItem(navItem);
	}

});
app.controller('messageCtrl',[ '$scope','$http','$cookieStore','SystemService', function($scope, $http,$cookieStore,SystemService) {

	$scope.pageInfo = {
		currentPage: 1,
		pageSize: 4,
		totalRecord: 0
	};
	//load();
	function load() {
		var currentPage = $scope.pageInfo.currentPage;
	    var userId=$cookieStore.get("id");
		//var userId=123;
		var promise = SystemService.getUserMessageList(userId,currentPage,$scope.pageInfo.pageSize);
		promise.then(function (data) {
			if (data.flag == 1) {
				var data = data.data;
				$scope.allmessage = data.list;
				$scope.pageInfo.currentPage = data.pageNum;
				$scope.pageInfo.pageSize = data.pageSize;
				$scope.pageInfo.totalRecord = data.pageTotal;
				$scope.totalMessageRecords=0;
			}else {
				console.log("获取用户消息失败！");
			}
		});
	}
	$scope.reloadData = function() {
		load();
	}
}]);
app.controller('alarmCtrl', [ '$scope','$http','$cookieStore','SystemService','toaster','$modal', function($scope, $http,$cookieStore,SystemService,toaster,$modal) {

	//打开提示框
	$scope.toasterType={type: 'info', title: "提示信息", body:""};
	$scope.pop=function(){
		toaster.pop($scope.toasterType);
	}
	$scope.toasterType.type= 'warning';
	//关闭提示框
	$scope.clear = function(){
		toaster.clear();
	};
	$scope.toasterType.type= 'warning';
	$scope.pageInfo = {
		currentPage: 1,
		pageSize: 5,
		totalRecord: 0
	};
	load();
	var _count=0;
	function load() {
		var currentPage = $scope.pageInfo.currentPage;
	 	var userId=$cookieStore.get("id");
		var promise = SystemService.getAlarmMessageList(userId,currentPage,$scope.pageInfo.pageSize);
		promise.then(function (data) {
			if (data.flag == 1) {
				if(data.data!='' && data.data!=null){
					var data = eval(data.data);
					$scope.alarms = data.dataList;
					$scope.pageInfo.currentPage = data.curPage;
					//$scope.pageInfo.pageSize = pageInfo.pageSize;
					$scope.totalAlarmRecords= data.totalRecords;
					$scope.$emit("FromAlarmChild", { divName: "alarmCtrl", description:data.totalRecords});
					$scope.pageInfo.totalRecord = data.totalRecords;
				}
			}else {
				console.log("获取告警信息失败！");
			}
		});
	}
	var _cancel = function() {

	};

	var _ok= function (ids) {
		var userId=$cookieStore.get("id");
		var promise = SystemService.delAlarmInfo(userId,ids);
		promise.then(function (data) {
			if (data.flag == 1) {
				$scope.toasterType.body="删除数据成功";
				load();
			}else{
				$scope.toasterType.body="删除数据失败";
			}
			$scope.pop();
		});
	};

	$scope.alarmDelete=function(){
		var ids=[];
		for(var i=0;i<$scope.alarms.length;i++){
			if($scope.alarms[i].$checked){
				ids.push($scope.alarms[i].alarmId);
			}
		}
		if(ids.length==0){
			$scope.toasterType.body="请选择要删除的数据";
			$scope.pop();
		}else{
			//弹出确定框删除
			$scope.acpLayer.confirm("是否删除选择数据",function(){_ok(ids.join(","));},function(){_cancel();});
		}
	}

	$scope.reloadData = function() {
		load();
	}



	$scope.seeAlarmInfo=function(message){
		$scope.seeSysInfo(message);
	}
	/*
	 添加推荐用户
	 */
	$scope.seeSysInfo = function(alarm) {
		var id=alarm.alarmId;
		console.log(id);
		var modalInstance = $modal.open({
			templateUrl: 'function/message/sysInfoDialog.html',
			backdrop: 'static',
			controller: 'SysInfoController',
			keyboard: false,
			resolve:{
				message:function(){
					return  alarm.message;
				}
			}
		})
		modalInstance.result.then(function(data){
			_ok(id);
		});

	};

	$scope.checkAll = function(checked) {
		angular.forEach($scope.alarms, function(item) {
			console.log(item);
			item.$checked = checked;
		});
	};
	$scope.selection = function() {
		return _.where($scope.alarms, {$checked: true});
	};
	$scope.getControlInfo = function(item){
		item.$checked =!item.$checked;
	}
}]);

app.controller('exceptionCtrl',  [ '$scope','$http','$cookieStore','SystemService', function($scope, $http,$cookieStore,SystemService) {

	$scope.pageInfo = {
		currentPage: 1,
		pageSize: 5,
		totalRecord: 0
	};
	//load();
	function load() {
		var currentPage = $scope.pageInfo.currentPage;
		var userId=$cookieStore.get("id");
		//var userId=123;
		var promise = SystemService.getExceptionMessageList(userId,currentPage,$scope.pageInfo.pageSize);
		promise.then(function (data) {
			if (data.flag == 1) {
				var data = data.data;
				$scope.allexception = data.list;
				$scope.pageInfo.currentPage = data.pageNum;
				$scope.pageInfo.pageSize = data.pageSize;
				$scope.pageInfo.totalRecord = data.pageTotal;
			}else {
				console.log("获取告警信息失败！");
			}
		});
	}
	$scope.reloadData = function() {
		load();
	}

}]);