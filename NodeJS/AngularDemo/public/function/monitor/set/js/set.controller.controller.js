/**
 * 监控-列表视图-传感器
 * @return {[type]} [description]
 */
(function(){
	'use strict';
	app.controller('CommonSetControlController', [ '$scope','$http','$modal','$stateParams','MonitorService','toaster',
		function($scope,$http,$modal,$stateParams,MonitorService,toaster) {
			//目前写死 后期动态获取
			//$scope.control_name='灌溉设置';
			 //var deviceId=110;
			var deviceId=$stateParams.data;
			$scope.control_name=$stateParams.diviceName;
			$scope.control={};
			var vm = $scope.vm = {};
			vm.items = [];
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

			//初始化数据
			disFlag(2);
			$scope.control.type=0;//1 智能 0 定时
			$scope.control.status=1;
			$scope.control.isRule=1;
			$scope.control.isEnabled=1;
			$scope.week=['一','二','三','四','五','六','日'];//初始化数据
			$scope.x= [false,false,false,false,false,false,false];
			setFixedStateFlag();
			function setFixedStateFlag(){
				$scope.controlStateDis=true;
				$scope.beginTimeDis=true;
				$scope.delayedTimeDis=true;
				$scope.spaceTimeDis=true;
				$scope.endTimeDis=true;
				$scope.atEndTimeDis=true;
				$scope.cycleTimeDis=true;
				$scope.timeDis=false;
				$scope.openConditionDis=false;
				$scope.closeConditionDis=false;
				$scope.control.type=0;
			}
			function setIcStateFlag(){
				$scope.controlStateDis=false;
				$scope.beginTimeDis=false;
				$scope.delayedTimeDis=false;
				$scope.spaceTimeDis=false;
				$scope.endTimeDis=false;
				$scope.atEndTimeDis=false;
				$scope.cycleTimeDis=false;
				$scope.timeDis=true;
				$scope.openConditionDis=true;
				$scope.closeConditionDis=true;
				$scope.control.type=1;
			}
			$scope.conditionFlag=function(flag){
				if(flag==1){
					setIcStateFlag();
				}else{
					setFixedStateFlag();
				}
			}
			//结束时间
			$scope.endTimeCondition= function (flag) {
				if(flag==0){
					$scope.control.endTime="";
					$scope.atTimeFlag=true;
					$scope.timesFlag=false;
				}
				else{
				   $scope.control.cycleTime="";
				   $scope.timesFlag=true;
					$scope.atTimeFlag=false;
				}
			}
			function clear(){
				vm.items=[];
			}
			vm.checkAll = function(checked) {
				angular.forEach(vm.items, function(item) {
					item.$checked = checked;
				});
			};
			vm.selection = function() {
				return _.where(vm.items, {$checked: true});
			};

			//赋值
			function setControlInfo(item){
				$scope.control.type=item.vtype;
				$scope.control.id=item.vid;
				$scope.control.deviceId=item.vdeviceId;
				$scope.control.status= item.vstatus;
				$scope.control.beginTime= item.vbeginTime;
				$scope.control.durationTime=item.vdurationTime;
				$scope.control.endTime= item.vendTime;
				$scope.control.intervals=item.vintervals;
				$scope.control.isRule= item.visRule;
				$scope.endTimeCondition(item.visRule);
				$scope.control.cycleTime= item.vcycleTime;
				$scope.control.execWeekDates=item.vexecWeekDates;
				$scope.control.isEnabled =item.visEnabled;
				if(item.vexecWeekDates!=""&&item.vexecWeekDates!=null){
					var vdays=item.vexecWeekDates.split(",");
					for(var j=0;j<vdays.length;j++){
						$scope.x[vdays[j]-1]=true;
					}
				}
				if(item.visRule==0){//循环次数
					$scope.atTimeFlag=true;
					$scope.timesFlag=false;
				}else{
					$scope.timesFlag=true;
					$scope.atTimeFlag=false;
				}
			}
		    function clearControlInfo(){
				$scope.control.status=1;
				$scope.control.isEnabled=1;
				$scope.control.isRule=1;
				$scope.control.id="";
				$scope.control.beginTime="";
				$scope.control.endTime="";
				$scope.control.durationTime="";
				$scope.control.intervals="";
				$scope.control.cycleTime="";
				$scope.control.deviceId=deviceId;
		 		for(var i=0;i<$scope.x.length;i++){
					$scope.x[i]=false;
				}
			}
			var vCount=0;
			var editFlag=false;
			vm.getControlInfo = function(item){
				 $scope.control={};
				item.$checked =!item.$checked;
				setControlInfo(item);
				if(!item.$checked){
					clearControlInfo();
					for(var i=0;i<vm.items.length;i++){
							if(vm.items[i].$checked){
								vCount++;
								setControlInfo(vm.items[i]);
								//break;
							}
					}
				}
				if(editFlag&&vCount>=1){
					$scope.control_ok=true;
					$scope.control_cancel=true;
				}else{
					$scope.control_ok=false;
					$scope.control_cancel=false;
				}
			 }
	 	      getControlInfo(deviceId);
			  function getControlInfo(deviceId){
				var promise = MonitorService.getControllerDeviceRuleInfo(deviceId);
				promise.then(function (data) {
						clear();
						if (data.flag == 1) {
							var vData = eval(data.data);
							for (var i = 0; i < vData.length; ++i) {
								vm.items.push({
									vid: vData[i].id,
									vdeviceId: vData[i].deviceID,
									vstatus: vData[i].status,
									vcycleTime: vData[i].cycleTime,
									vdurationTime: vData[i].durationTime,
									visRule: vData[i].isRule,
									vintervals: vData[i].intervals,
									vbeginTime: vData[i].beginTime,
									vendTime: vData[i].endTime,
									vexecWeekDates: vData[i].execWeekDates,
									visEnabled: vData[i].isEnabled,
									vtype: vData[i].type
								})
							}
						}
				});
			}
		 $scope.setControlAdd=function(){
			 if($scope.control.mode==1){
				 setIcStateFlag();
			 }else{
				 setFixedStateFlag();
			 }
		    disFlag(1);
		    $scope.control.operator=0;//新增操作类型
		    $scope.control.deviceId=deviceId;
	        $scope.control.id='';
			if($scope.control.isRule==0){//循环次数
				$scope.control.endTime="";
				$scope.atTimeFlag=true;
				$scope.timesFlag=false;
			}else{
				$scope.control.cycleTime="";
				$scope.timesFlag=true;
				$scope.atTimeFlag=false;
			}
	        clearControlInfo();
		    vm.checkAll(false);
		}
		//编辑
		$scope.setControlEdit=function(){
			if($scope.control.mode==1){
				setIcStateFlag();
			}else{
				setFixedStateFlag();
			}
			$scope.control.operator=1;
			var ids=[];
			for(var i=0;i<vm.items.length;i++){
				if(vm.items[i].$checked){
					ids.push(vm.items[i].vid)
				}
			}
			if(ids.length==0||ids.length>1){
				$scope.control_ok=false;
				$scope.control_cancel=false;
				$scope.toasterType.type= 'warning';
				$scope.toasterType.body="请选择或编辑一条数据";
				$scope.pop();
				disFlag(2);
			}else{
				disFlag(1);
			}
		}

	   var _cancel = function() {
				editFlag=false;
			};
	   var _ok= function (mode,ruleIds) {
				var promise = MonitorService.delControllerDeviceRuleInfo(mode,ruleIds);
				promise.then(function (data) {
					clear();
					if (data.flag == 1) {
						$scope.toasterType.type= 'success';
						$scope.toasterType.body="删除数据成功";
						disFlag(2);
						getControlInfo(deviceId);
						clearControlInfo();
					}else{
						$scope.toasterType.type= 'error';
						$scope.toasterType.body="删除数据失败";
					}
					$scope.pop();
				});
	   };
        //编辑
		$scope.setControlDelete=function(){
			$scope.cutValueDis=true;
			$scope.startTimeDis=true;
			$scope.endTimeDis=true;
			$scope.control_ok=false;
			$scope.control_cancel=false;
			var ids=[];
			for(var i=0;i<vm.items.length;i++){
				if(vm.items[i].$checked){
					ids.push(vm.items[i].vid);
				}
			}
			var mode=$scope.control.type;
			if(ids.length==0){
				$scope.toasterType.type= 'warning';
				$scope.toasterType.body="请选择要删除的数据";
				$scope.pop();
			}else{
				//弹出确定框删除
				$scope.acpLayer.confirm("是否删除选择数据",function(){_ok(mode,ids.join(","));},function(){_cancel();});
			}
		}
		$scope.controlSave=function() {
			$("#controller-form-horizontal").addClass("acp-form-check");
			//校验 临界值 空
		 	var flag=false;
			if($scope.control.beginTime==null||$scope.control.beginTime.length==0){
				flag=false;
				return;
			}else{
				flag=true;
			}
			if(flag){
				if($scope.control.durationTime==null||$scope.control.durationTime.length==0||$scope.control.durationTime<1){
					flag=false;
					return;
				}else{
				   flag=true;
				}
			}
			if(flag){
				if($scope.control.intervals==null||$scope.control.intervals.length==0||$scope.control.durationTime<1){
					flag=false;
					return;
				}else{
					flag=true;
				}
			}
			if(flag) {
				if($scope.control.isRule==0){
					$scope.control.endTime = '';
					if ($scope.control.cycleTime == null || $scope.control.cycleTime.length == 0 || $scope.control.cycleTime < 1) {
						flag = false;
						$scope.toasterType.type= 'warning';
						$scope.toasterType.body="循环次数不能为空";
						$scope.pop();
						return;
					} else {
						flag = true;
					}
				}
				if($scope.control.isRule==1){
					$scope.control.cycleTime="";
					if($scope.control.endTime==null||$scope.control.endTime.length==0){
						flag=false;
						$scope.toasterType.type= 'warning';
						$scope.toasterType.body="结束时间不能为空";
						$scope.pop();
						return;
					}else{
						var vTime1=$scope.control.beginTime.split(":");
						var vTime2=$scope.control.endTime.split(":");
						var time1= Number(vTime1[0]*60)+Number(vTime1[1]);
						var time2= Number(vTime2[0]*60)+Number(vTime2[1]);

						if(time1>=time2){
							$scope.toasterType.type= 'error';
							$scope.toasterType.body="开始时间应该小于结束时间";
							$scope.pop();
							flag=false;
						}else{
							flag=true;
						}
						if(flag){
							var vT=Number($scope.control.intervals)+Number($scope.control.durationTime);
							var vTime=time2-time1;
							if(vT>=vTime){
								$scope.toasterType.type= 'warning';
								$scope.toasterType.body="结束时间设置有误";
								$scope.pop();
								flag=false;
							}else{
								flag=true;
							}
						}
					}
				}
			}
			if(flag){
				var days=[];
				for(var i=0;i<$scope.x.length;i++){
					if($scope.x[i]){
						days.push((i+1));
					}
				}
				if(days.length==0){
					$scope.toasterType.body="选择循环周期";
					$scope.pop();
					flag=false;
					return ;
				}else{
					$scope.control.execWeekDates=days.join(',');
					flag=true;
				}
			}
			if(flag){
				$scope.controlDis=true;
				var promise = MonitorService.setControllerDeviceRuleInfo(JSON.stringify($scope.control));
				promise.then(function (data) {
					clear();
					if(data.flag==-1){
						$scope.toasterType.type= 'error';
						$scope.toasterType.body="时间段交叉请重新选择";
						getControlInfo(deviceId);
					}else{
						if (data.flag == 1) {
							$scope.toasterType.type= 'success';
							$scope.toasterType.body="保存成功";
							clearControlInfo();
							getControlInfo(deviceId);
							$("#controller-form-horizontal").removeClass("acp-form-check") ;
							disFlag(2);
						}else{
							$scope.toasterType.type= 'error';
							$scope.toasterType.body="保存失败";
							disFlag(1);
						}
					}
					$scope.pop();
				},function(){
					$scope.toasterType.type= 'error';
					$scope.toasterType.body="保存失败";
					disFlag(1);
					$scope.pop();
				});
			}
		}
		$scope.controlCancel=function(){
			disFlag(2);
			$("#controller-form-horizontal").removeClass("acp-form-check") ;
		}
		function disFlag(flag){
			if(flag==1){
				$scope.control_ok=true;
				$scope.control_cancel=true;
				$scope.cutValueDis=false;
				$scope.startTimeDis=false;
				$scope.beginTimeDisable=false;
				$scope.delayedTimeDisable=false;
				$scope.spaceTimeDisabe=false;
				$scope.endTimeDis=true;
				$scope.enableDis=true;
				$scope.atTimeFlag=false;
				$scope.timesFlag=false;
				$scope.cycleTimeFlag=false;
				$scope.disFlag=false;
			}else{
				$scope.control_ok=false;
				$scope.control_cancel=false;
				$scope.cutValueDis=true;
				$scope.startTimeDis=true;
				$scope.beginTimeDisable=true;
				$scope.delayedTimeDisable=true;
				$scope.spaceTimeDisabe=true;
				$scope.endTimeDis=true;
				$scope.enableDis=true;
				$scope.atTimeFlag=true;
				$scope.timesFlag=true;
				$scope.cycleTimeFlag=true;
				$scope.disFlag=true;
				//清除表单
			}
		}

		} ]);
})();
