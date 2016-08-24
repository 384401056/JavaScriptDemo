/**
 * 监控-照相机
 * @return {[type]} [description]
 */
(function(){
	'use strict';
	app.controller('CommonSetCameraController', [ '$scope','$cookieStore','$http','$modal','$stateParams','MonitorService','toaster',
		function($scope,$cookieStore,$http,$modal,$stateParams,MonitorService,toaster) {
			//目前写死 后期动态获取
			$scope.camera={};
			var vm = $scope.vm = {};
			vm.items = [];
			// var deviceId=110;
			var editFlag=false;
		    var deviceId=$stateParams.data;
			$scope.camera_device_name=$stateParams.diviceName;
 			var clientId=$stateParams.clientid;
			//初始化数据
			$scope.camera_ok=false;
			$scope.camera_cancel=false;

			$scope.beginTimeDis=true;
			$scope.endTimeDis=true;
			$scope.cutValueDis=true;
			$scope.isEnabledDis=true;
			$scope.camera.isEnabled=1;

			var oldBeginTime='';
			var oldEndTime='';

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
			//查询数据
			getCameraInfo(deviceId);
			function clear(){
				vm.items=[];
			}
			vm.checkAll = function(checked) {
		     angular.forEach(vm.items, function(item) {
					item.$checked = checked;
			 });
			};
			vm.selection = function(item) {
				 return _.where(vm.items, {$checked: true});
			};
			//赋值
			function setCameraInfo(item){
				$scope.camera.ruleid=item.id;
				$scope.camera.deviceid=deviceId;
				$scope.camera.intervals=item.intervals;
				oldBeginTime=item.begintime;
				oldEndTime=item.endtime;
				$scope.camera.beginTime=item.begintime;
				$scope.camera.endTime=item.endtime;
				$scope.camera.isEnabled=item.isenabled;
			}
		    function clearCameraInfo(){
				$scope.camera.intervals="";
				$scope.camera.beginTime= "";
				$scope.camera.endTime= "";
				$scope.camera.isEnabled =1;
			}
			var vCount=0;
			vm.getCameraInfo = function(item){
				 $scope.camera={};
				item.$checked =!item.$checked;
				setCameraInfo(item);
				if(!item.$checked){
					clearCameraInfo();
					for(var i=0;i<vm.items.length;i++){
							if(vm.items[i].$checked){
								vCount++;
								setCameraInfo(vm.items[i]);
								//break;
							}
					}
				}
				if(editFlag&&vCount==1){
					$scope.camera_ok=true;
					$scope.camera_cancel=true;
				}else{
					$scope.camera_ok=false;
					$scope.camera_cancel=false;
				}
			 }
		  function  getCameraInfo(deviceId){
				var promise = MonitorService.getCameraDeviceRuleList(deviceId);
				promise.then(function (data) {
					clear();
					if (data.flag == 1) {
						vm.items=eval(data.data);
					}
				});
			}
		  $scope.setCameraAdd=function(){
			 editFlag=false;
			 $scope.camera_ok=true;
			 $scope.camera_cancel=true;
			 $scope.cameraDis=false;
		     $scope.cutValueDis=false;
		 	 $scope.beginTimeDis=false;
			 $scope.isEnabledDis=false;
			 $scope.endTimeDis=false;
			  $scope.camera.ruleid='';
			 $scope.camera.deviceid=deviceId;
			  vm.checkAll(false);
		     clearCameraInfo();
		}
		//编辑
		$scope.setCameraEdit=function(){
			editFlag=true;
			$scope.cutValueDis=false;
			$scope.beginTimeDis=false;
			$scope.isEnabledDis=false;
			$scope.endTimeDis=false;
			$scope.cameraDis=false;
			 var ids=[];
			for(var i=0;i<vm.items.length;i++){
				if(vm.items[i].$checked){
					ids.push(vm.items[i].id);
				}
			}
			if(ids.length==0||ids.length>1){
				$scope.toasterType.body="请选择或编辑一条数据";
				$scope.camera_ok=false;
				$scope.camera_cancel=false;
				$scope.cutValueDis=true;
				$scope.beginTimeDis=true;
				$scope.isEnabledDis=true;
				$scope.endTimeDis=true;
				$scope.cameraDis=true;
				$scope.pop();
			}else{
				$scope.camera_ok=true;
				$scope.camera_cancel=true;
			}
		}
	    var _cancel = function() {
				editFlag=false;
		 };
		 var _ok= function (ruleid,clientid) {
			 var promise = MonitorService.delCameraDeviceRuleInfo(ruleid,clientid);
			 promise.then(function (data) {
				 if(data.flag==1) {
					 $scope.toasterType.type= 'success';
					 $scope.toasterType.body="删除成功";
					 getCameraInfo(deviceId);
					 clearCameraInfo();
				 }else{
					 $scope.toasterType.type= 'error';
					 $scope.toasterType.body="删除失败";
				 }
				 $scope.pop();
			 },function(data,status){
				 $scope.cameraDis=false;//保存失败可以再提交
				 $scope.toasterType.type= 'error';
				 $scope.toasterType.body="删除失败";
				 $scope.pop();
			 });
			};
/*
		 //编辑
		$scope.setCameraDelete=function(){
			editFlag=false;
			$scope.cutValueDis=true;
			$scope.beginTimeDis=true;
			$scope.isEnabledDis=true;
			$scope.endTimeDis=true;
			$scope.camera_ok=false;
			$scope.camera_cancel=false;
			var ids=[];
			for(var i=0;i<vm.items.length;i++){
				if(vm.items[i].$checked){
					ids.push(vm.items[i].id);
				}
			}
			if(ids.length==0){
				$scope.toasterType.body="请选择要删除的数据";
				$scope.pop();
			}else{
				//弹出确定框删除
				var tId=ids.join(",");
				console.log(tId);
				$scope.acpLayer.confirm("是否删除所选数据",function(){_ok(tId);},function(){_cancel();});
			}
		}*/
		$scope.cameraDelete=function(item,$event){
			vm.checkAll(false);

			var  ruleid=item.id;

			if(ruleid!=''&&ruleid!==null){
				$scope.acpLayer.confirm("是否删除所选数据",function(){_ok(ruleid,clientId);},function(){_cancel();});
			}
		}
		$scope.cameraSave=function() {
			$("#camera-form-horizontal").addClass("acp-form-check");
			//校验 间隔时间 空
			var flag=false;
			if($scope.camera.intervals==null||$scope.camera.intervals.length>0||$scope.camera.intervals<1){
				flag=false;
				return;
			}else{
				 flag=true;
			}
			if(flag){
				if($scope.camera.beginTime==null||$scope.camera.beginTime==''||$scope.camera.endTime==''||$scope.camera.endTime==null){
					flag=false;
				}else{
						var vTime1=$scope.camera.beginTime.split(":");
						var vTime2=$scope.camera.endTime.split(":");
						var time1= Number(vTime1[0]*60)+Number(vTime1[1]);
						var time2= Number(vTime2[0]*60)+Number(vTime2[1]);
						var vTime=time2-time1;
						if($scope.camera.intervals>=vTime){
							flag=false;
							$scope.toasterType.body="开始时间应小于结束时间";
							$scope.pop();
						}else{
							flag=true;
						}
				}
			}
			if(flag){
				if(oldBeginTime==$scope.camera.beginTime&&oldEndTime==$scope.camera.endTime){
					$scope.save();
				}else{
					var promiseValiTiem=MonitorService.valiTimeDevice(
						$scope.camera.beginTime,
						$scope.camera.endTime,
						deviceId,
						'camerasetting',
						$scope.camera.ruleid
					);
					promiseValiTiem.then(function(data) {
						if(data.flag == 1){
							if(data.data === 1){
								$scope.save();
							}else{
								$scope.toasterType.type= 'warning';
								$scope.toasterType.body="时间段交叉请重新选择";
								$scope.pop();
								flag=false;
							}
						}
					}, function(data) {
						$scope.toasterType.type= 'warning';
						$scope.toasterType.body="时间段交叉请重新选择";
						$scope.pop();
					}, function(data) {
						$scope.toasterType.type= 'warning';
						$scope.toasterType.body="时间段交叉请重新选择";
						$scope.pop();
					});
				}
			}
		}
		$scope.save=function(){
			$scope.camera.clientid=clientId;
			var promise = MonitorService.setCameraDeviceRuleInfo(JSON.stringify($scope.camera));
			 promise.then(function (data) {
				if(data.flag==1) {
					$scope.toasterType.type= 'success';
					editFlag=false;
					$scope.toasterType.body="保存成功";
					$("#camera-form-horizontal").removeClass("acp-form-check") ;
					$scope.cutValueDis=true;
					$scope.beginTimeDis=true;
					$scope.isEnabledDis=true;
					$scope.endTimeDis=true;
					$scope.camera_ok=false;
					$scope.camera_cancel=false;
					getCameraInfo(deviceId);
					clearCameraInfo();
				 }else{
					$scope.camera_ok=false;
					$scope.camera_cancel=false;
					$scope.toasterType.type= 'error';
					$scope.toasterType.body="保存规则失败";
				}
				$scope.pop();
			},function(data,status){
				$scope.camera_ok=true;
				$scope.camera_cancel=true;
				 $scope.toasterType.type= 'error';
				$scope.toasterType.body="保存规则失败";
				$scope.pop();
			});
		}
		$scope.cameraCancel=function(){
			$scope.cutValueDis=true;
			$scope.beginTimeDis=true;
			$scope.isEnabledDis=true;
			$scope.endTimeDis=true;
			$scope.camera_ok=false;
			$scope.camera_cancel=false;
			$("#camera-form-horizontal").removeClass("acp-form-check") ;
		}
	 } ]);
})();
