/**
 * 监控-列表视图-传感器
 * @return {[type]} [description]
 */
(function(){
	'use strict';
	app.controller('CommonSetSensorController', [ '$scope','$http','$modal','$stateParams','MonitorService','$cookieStore','toaster',
		function($scope,$http,$modal,$stateParams,MonitorService,$cookieStore,toaster) {
			//初始化数据
			$scope.sensor={};
			var vm = $scope.vm = {};
			vm.items = [];
	    	var deviceId=$stateParams.data;
			$scope.sensor_name=$stateParams.diviceName;
			var orgId=$stateParams.orgId;
			 //var deviceId="23598";
			 //var orgId=10003;
			$scope.sensor.toUserID=[];
			$scope.sensor.toUserNames="";
			var toUserName=[];
            var tmpToUserID=[];
			var tmpToUserNames="";

			$scope.pushTypes=['平台推送','手机短信推送'];//初始化数据
			$scope.x= [false,false];

			$scope.sensor_ok=false;
			$scope.sensor_cancel=false;
			$scope.sensorInfoFlag=false;
			$scope.cutValueDis=true;
			$scope.startTimeDis=true;
			$scope.endTimeDis=true;
			$scope.disFlag=true;
			$scope.pushPhoneFlagShow=false;
			$scope.sensor.orgId=orgId;
			$scope.sensor.operate=1;
			$scope.sensor.isEnabled=1;
			$scope.sensor.isPush=1;

			$scope.pushFlagShow=true;
			$scope.platFromFlag=true;

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
			//获取单位  范围 信息
			getSensorUnitInfo(deviceId);
			$scope.iPush=function(flag){
				if(flag==1){
					$scope.pushFlagShow=true;
				}else{
					$scope.pushFlagShow=false;
					$scope.pushPhoneFlagShow=false;
				}
			}
			//清除列表信息
			function clear(){
				vm.items=[];
			}
			//全选按钮方法
			vm.checkAll = function(checked) {
				angular.forEach(vm.items, function(item) {
					item.$checked = checked;
				});
			};
			//当选按钮方法
			vm.selection = function() {
				return _.where(vm.items, {$checked: true});
			};
			//set sensor
			function setSensorInfo(item){
				$scope.sensor.id=item.id;

				$scope.sensor.propertyValue =Number(item.propertyValue);
				oldBeginTime=item.beginTime;
				oldEndTime=item.endTime;
				$scope.sensor.beginTime= item.beginTime;
				$scope.sensor.endTime= item.endTime;
				$scope.sensor.smspushstarttime= item.smspushstarttime;
				$scope.sensor.smspushendtime= item.smspushendtime;
				$scope.sensor.operate =item.operate;
				$scope.sensor.isEnabled =item.isEnabled;
				$scope.sensor.deviceId=item.deviceId;
				$scope.sensor.typeName=item.typeName;
				$scope.sensor.groupId=item.groupId;
				$scope.sensor.maxRange=item.maxRange;
				$scope.sensor.minRange=item.minRange;
				$scope.sensor.unit=item.unit;
				$scope.sensor.orgId=item.orgId;
				for(var i=0;i<$scope.x.length;i++){
					$scope.x[i]=false;
				}
				if(item.pushType!=""&&item.pushType!=null){
					var vs=item.pushType.split(",");
					for(var j=0;j<vs.length;j++){
						$scope.x[vs[j]-1]=true;
						if($scope.x[vs[j]-1]){
							$scope.sensorClick(1);
						}
					}
				}
				$scope.sensor.isPush=item.isPush;
				$scope.iPush(item.isPush);
				$scope.sensor.toUserID=[];
				tmpToUserID=[];
				tmpToUserNames='';
				if($scope.sensor.isPush==1){
				  $scope.sensor.toUserNames=item.userNames;
					tmpToUserNames=item.userNames;
					if(item.toUserID!=null&&item.toUserID.length>0){
						$scope.sensor.toUserID=item.toUserID.split(",");
						  tmpToUserID=item.toUserID.split(",");
					}
				}
			}
			//清除表单数据
		    function clearSensorInfo(){
				$scope.sensor.propertyValue = "";
				$scope.sensor.beginTime= "";
				$scope.sensor.endTime= "";
				$scope.sensor.smspushendtime= "";
				$scope.sensor.smspushstarttime= "";
				$scope.sensor.operate =1;
				$scope.sensor.enable =1;
				$scope.sensor.toUserID=[];
				$scope.sensor.toUserNames="";
				for(var i=0;i<$scope.x.length;i++){
					$scope.x[i]=false;
				}
			}
			var vCount=0;
			vm.getSensorInfo = function(item){
				$scope.sensor={};
				item.$checked =!item.$checked;
				setSensorInfo(item);
				if(!item.$checked){
					vCount--;
					clearSensorInfo();
					for(var i=0;i<vm.items.length;i++){
						if(vm.items[i].$checked){
							setSensorInfo(vm.items[i]);
							//break;
						}
					}
				}else{
					vCount++;
				}

				if(vCount>=0){
					$scope.sensor_ok=false;
					$scope.sensor_cancel=false;
				}

			}
	     //查询设备数据列表
	 	  getSensorInfo(deviceId);
		  function getSensorUnitInfo(deviceId){
			  var promise = MonitorService.getSensorDeviceUnitInfo(deviceId);
			  promise.then(function (data) {
					  if(data.flag==1) {
						  $scope.minRange=data.data.minrange;
						  $scope.maxRange=data.data.maxrange;
						  $scope.unit=data.data.unit;
					  }
			  });
		  }
		    function  getSensorInfo(deviceId) {
			  var promise = MonitorService.getSensorDeviceRuleList(deviceId);
			  promise.then(function (data) {
						  clear();
						if (data.flag == 1) {
							vm.items=eval(data.data);
						}
				});
			}
		 $scope.setSensorAdd=function(){
		    $scope.sensorDis=false;
		    $scope.cutValueDis=false;
		    $scope.disFlag=false;
			$scope.startTimeDis=false;
			$scope.endTimeDis=false;
			$scope.sensor_ok=true;
			$scope.sensor_cancel=true;
		    $scope.sensorInfoFlag=false;
		    $scope.platFromFlag=false;
			 $scope.pushPhoneFlagShow=false;
			$scope.sensor.deviceId=deviceId;
			$scope.sensor.id='';
		    $scope.sensor.orgId=orgId;
			 tmpToUserID=[];
			 tmpToUserNames='';
			//清除数据
		    clearSensorInfo();
			 vm.checkAll(false);
		}
		//编辑
		$scope.setSensorEdit=function(){

			$scope.sensorDis=false;
			$scope.cutValueDis=false;
			$scope.disFlag=false;
			$scope.startTimeDis=false;
			$scope.endTimeDis=false;
			$scope.sensor_ok=true;
			$scope.sensor_cancel=true;
			$scope.sensorInfoFlag=false;
			$scope.sensorDis=false;
			$scope.platFromFlag=false;
			$scope.sensor.orgId=orgId;

			var ids=[];
			for(var i=0;i<vm.items.length;i++){
				if(vm.items[i].$checked){
					ids.push(vm.items[i].id)
				}
			}
			if(ids.length==0||ids.length>1){
				$scope.sensor_ok=false;
				$scope.sensor_cancel=false;
				disFlag(1);
				$scope.toasterType.type= 'warning';
				$scope.toasterType.body="请选择或编辑一条数据";
				$scope.pop();
			}else{
				$scope.sensor_ok=true;
				$scope.sensor_cancel=true
				disFlag(2);
			}
		}

	 var _cancel = function() {

     };
	// objId "12"; type:1 单个设备类型  2 组类型;ruleIds 规则Id
	 var _ok= function (objId,type,ruleIds) {
		 var promise = MonitorService.delSensorDeviceRuleInfo(objId,type,ruleIds);
		 promise.then(function (data) {
			 if(data.flag==1) {
				 getSensorInfo(deviceId);
				 $scope.toasterType.type= 'success';
				 $scope.toasterType.body="删除成功";
				 clearSensorInfo();
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
		 //编辑
		$scope.setSensorDelete=function(){
			$scope.cutValueDis=true;
			$scope.disFlag=true;
			$scope.startTimeDis=true;
			$scope.endTimeDis=true;
			$scope.sensor_ok=false;
			$scope.sensor_cancel=false;
			$scope.sensorInfoFlag=false;
			$scope.platFromFlag=false;
			tmpToUserID=[];
			tmpToUserNames='';
			var ids=[];
			for(var i=0;i<vm.items.length;i++){
				if(vm.items[i].$checked){
					ids.push(vm.items[i].id);
				}
			}
			if(ids.length==0){
				$scope.toasterType.type= 'warning';
				$scope.toasterType.body="请选择要删除的数据";
				$scope.pop();
			}else{
				//弹出确定框删除
				$scope.acpLayer.confirm("是否删除选择数据",function(){_ok(deviceId,1,ids.join(","));},function(){_cancel();});
			}
		}
		$scope.sensorSave=function() {
			$scope.sensorInfoFlag=true;
			$("#sensor-form-horizontal").addClass("acp-form-check");
			//校验 临界值 空
		 	var flag=false;
			if($scope.sensor.propertyValue==null||$scope.sensor.propertyValue.length==0){
				flag=false;
				return;
			}else{ //校验 临界值 区间范围
				if(($scope.minRange<=$scope.sensor.propertyValue)&&($scope.sensor.propertyValue<=$scope.maxRange)){
					flag=true;
				}else{
					$scope.toasterType.body="临界值超范围";
					$scope.pop();
					flag=false;
				}
			}
			if(flag){
				if($scope.sensor.beginTime==''||$scope.sensor.endTime==''){
					flag=false;
				}else{
					var vTime1=$scope.sensor.beginTime.split(":");
					var vTime2=$scope.sensor.endTime.split(":");
					var time1= Number(vTime1[0]*60)+Number(vTime1[1]);
					var time2= Number(vTime2[0]*60)+Number(vTime2[1]);
					if(time1>time2 ){
						flag=false;
						$scope.toasterType.body="开始时间应该小于结束时间";
						$scope.pop();
					}else{
						 flag=true;
					}
				}
			}
			if(flag){
				 if($scope.sensor.isPush==1){//启用
					 if($scope.sensor.toUserNames==null||$scope.sensor.toUserNames==''){
						 flag=false;
						 return ;
					 }else{
						 if($scope.sensor.toUserNames.trim().length>0){
							 $scope.sensor.userIds= $scope.sensor.toUserID.join(",");
							 flag=true;
						 }else{
							 flag=false;
							 return ;
						 }
					 }
					 if(flag){
						 var types=[];
						 for(var i=0;i<$scope.x.length;i++){
							 if($scope.x[i]){
								 types.push((i+1));
							 }
						 }
						 if(types.length==0){
							 $scope.toasterType.body="选择推送方式";
							 $scope.pop();
							 flag=false;
							 return ;
						 }else{
							 $scope.sensor.pushType=types.join(',');
							 // flag=true;
							 //推送时段为true
							 if($scope.x[1]){
								 if($scope.sensor.smspushstarttime==''||$scope.sensor.smspushendtime==''){
									 flag=false;
								 }else{
									 var vTime1=$scope.sensor.smspushstarttime.split(":");
									 var vTime2=$scope.sensor.smspushendtime.split(":");
									 var time1= Number(vTime1[0]*60)+Number(vTime1[1]);
									 var time2= Number(vTime2[0]*60)+Number(vTime2[1]);
									 if(time1>time2 ){
										 flag=false;
										 $scope.toasterType.body="推送时段应该小于结束时间";
										 $scope.pop();
									 }else{
										 flag=true;
									 }
								 }
							 }else{
								 $scope.sensor.smspushstarttime=='';
								 $scope.sensor.smspushendtime=='';
								 flag=true;
							 }
						 }
					 }
			    }else{
					 $scope.sensor.pushType='';
					 $scope.sensor.toUserID=[];
					 $scope.sensor.smspushstarttime=='';
					 $scope.sensor.smspushendtime=='';
					 flag=true;
				 }
			}
			if(flag){
				if(oldBeginTime==$scope.sensor.beginTime&&oldEndTime==$scope.sensor.endTime){
					$scope.save();
				}else{
					var promiseValiTiem=MonitorService.valiTimeDevice(
						$scope.sensor.beginTime,
						$scope.sensor.endTime,
						deviceId,
						'sensorsetting',
						$scope.sensor.id
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
			var promise = MonitorService.setSensorDeviceRuleInfo(JSON.stringify($scope.sensor));
			promise.then(function (data) {
				if(data.flag==1) {
					getSensorInfo(deviceId);
					clearSensorInfo();
					$scope.toasterType.type= 'success';
					$scope.toasterType.body="保存成功";
					$scope.sensor_ok=false;
					$scope.sensor_cancel=false;
					$("#sensor-form-horizontal").removeClass("acp-form-check");
					disFlag(1)
				}else{
					$scope.toasterType.body="保存失败";
					$scope.toasterType.type= 'error';
					$scope.sensor_ok=true;
					$scope.sensor_cancel=true;
					$("#sensor-form-horizontal").addClass("acp-form-check");
					disFlag(2)
				}
				$scope.pop();
			},function(data,status){
				$scope.toasterType.body="保存失败";
				$scope.toasterType.type= 'error';
				$scope.pop();
				$("#sensor-form-horizontal").addClass("acp-form-check");
				$scope.sensorDis=false;//保存失败可以再提交
				disFlag(2)
			});
		}

		$scope.sensorCancel=function(){
			disFlag(1);
			$("#sensor-form-horizontal").removeClass("acp-form-check");
		}
		function disFlag(flag){
			if(flag==1){
				$scope.cutValueDis=true;
				$scope.disFlag=true;
				$scope.startTimeDis=true;
				$scope.endTimeDis=true;
				$scope.sensor_ok=false;
				$scope.sensor_cancel=false;
				$scope.sensorInfoFlag=false;
			}else{
				$scope.cutValueDis=false;
				$scope.disFlag=false;
				$scope.startTimeDis=false;
				$scope.endTimeDis=false;
				$scope.sensor_ok=true;
				$scope.sensor_cancel=true;
				$scope.sensorInfoFlag=true;
			}
		}

		 /*
		  添加推荐用户
		  */
	    $scope.addUsers = function() {
	       var modalInstance = $modal.open({
					templateUrl: 'function/monitor/set/setSensorUsersDialog.html',
					backdrop: 'static',
					controller: 'SetSensorToUserController',
					keyboard: false,
					resolve:{
						toUsers:function(){
							return  $scope.sensor.toUserID;
						},
						orgId:function(){
							return  orgId;
						}
					}
		    })
			 modalInstance.result.then(function(data){
				  $scope.sensor.toUserID=[];
				  toUserName=[];
				 $scope.sensor.toUserNames="";
				 if(data==-1){
					 $scope.sensor.toUserID=tmpToUserID;
					 $scope.sensor.toUserNames=tmpToUserNames;
				 }else{
					 for(var i=0;i<data.length;i++){
						 $scope.sensor.toUserID.push(data[i].id);
						 toUserName.push(data[i].name);
					 }
					 if(toUserName.length>0){
						 $scope.sensor.toUserNames=toUserName.join(",");
					 }
				 }
			 });
	     };

		$scope.sensorClick=function(index){
			if(index==1&&$scope.x[index]){
				$scope.pushPhoneFlagShow=true;
			}
			if(index==1&&!$scope.x[index]){
				$scope.pushPhoneFlagShow=false;
			}
		}
		} ]);
})();
