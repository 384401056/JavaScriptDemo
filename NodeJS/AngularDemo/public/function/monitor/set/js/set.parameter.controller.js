/**
 * 监控-球机设置参数
 * @return {[type]} [description]
 */
(function(){
	'use strict';
	app.controller('CommonSetParameterController', [ '$scope','$http','$modal','$stateParams','MonitorService','toaster',
		function($scope,$http,$modal,$stateParams,MonitorService,toaster) {
			//报警设置设置
			$scope.parameter={};
			$scope.nums=['1','2','3','4','5','6','7','8'];//初始化数据
			$scope.timeInfo=['','','','','','',''];//初始化数据
			var weeks=['一','二','三','四','五','六','日'];//初始化数据
			$scope.saveInfo="";
			//界面设置
			$scope.pageSet={};
  		    var deviceIP=$stateParams.deviceIP;
			var sdkPort=$stateParams.sdkPort;
			var userName=$stateParams.userName;
			var password=$stateParams.password;
			$scope.parameter_device_name=$stateParams.diviceName;
 			var number=$stateParams.number;
/*
 			$scope.parameter_device_name='球机设备参数';
			var deviceIP="220.165.93.50";
			var sdkPort="8000";
			var userName="admin";
			var password="yhzx1234";
			var number=4;//通道号
*/

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

			var times0=[
				{"h1":0,"m1":0,"h2":0,"m2":0},
				{"h1":0,"m1":0,"h2":0,"m2":0},
				{"h1":0,"m1":0,"h2":0,"m2":0},
				{"h1":0,"m1":0,"h2":0,"m2":0},
				{"h1":0,"m1":0,"h2":0,"m2":0},
				{"h1":0,"m1":0,"h2":0,"m2":0},
				{"h1":0,"m1":0,"h2":0,"m2":0},
				{"h1":0,"m1":0,"h2":0,"m2":0}
			];
			var times1=[
				{"h1":0,"m1":0,"h2":0,"m2":0},
				{"h1":0,"m1":0,"h2":0,"m2":0},
				{"h1":0,"m1":0,"h2":0,"m2":0},
				{"h1":0,"m1":0,"h2":0,"m2":0},
				{"h1":0,"m1":0,"h2":0,"m2":0},
				{"h1":0,"m1":0,"h2":0,"m2":0},
				{"h1":0,"m1":0,"h2":0,"m2":0},
				{"h1":0,"m1":0,"h2":0,"m2":0}
			];
			var times2=[
				{"h1":0,"m1":0,"h2":0,"m2":0},
				{"h1":0,"m1":0,"h2":0,"m2":0},
				{"h1":0,"m1":0,"h2":0,"m2":0},
				{"h1":0,"m1":0,"h2":0,"m2":0},
				{"h1":0,"m1":0,"h2":0,"m2":0},
				{"h1":0,"m1":0,"h2":0,"m2":0},
				{"h1":0,"m1":0,"h2":0,"m2":0},
				{"h1":0,"m1":0,"h2":0,"m2":0}
			];
		    var times3=[
				{"h1":0,"m1":0,"h2":0,"m2":0},
				{"h1":0,"m1":0,"h2":0,"m2":0},
				{"h1":0,"m1":0,"h2":0,"m2":0},
				{"h1":0,"m1":0,"h2":0,"m2":0},
				{"h1":0,"m1":0,"h2":0,"m2":0},
				{"h1":0,"m1":0,"h2":0,"m2":0},
				{"h1":0,"m1":0,"h2":0,"m2":0},
				{"h1":0,"m1":0,"h2":0,"m2":0}
			];
			var times4=[
				{"h1":0,"m1":0,"h2":0,"m2":0},
				{"h1":0,"m1":0,"h2":0,"m2":0},
				{"h1":0,"m1":0,"h2":0,"m2":0},
				{"h1":0,"m1":0,"h2":0,"m2":0},
				{"h1":0,"m1":0,"h2":0,"m2":0},
				{"h1":0,"m1":0,"h2":0,"m2":0},
				{"h1":0,"m1":0,"h2":0,"m2":0},
				{"h1":0,"m1":0,"h2":0,"m2":0}
			];
			var times5=[
				{"h1":0,"m1":0,"h2":0,"m2":0},
				{"h1":0,"m1":0,"h2":0,"m2":0},
				{"h1":0,"m1":0,"h2":0,"m2":0},
				{"h1":0,"m1":0,"h2":0,"m2":0},
				{"h1":0,"m1":0,"h2":0,"m2":0},
				{"h1":0,"m1":0,"h2":0,"m2":0},
				{"h1":0,"m1":0,"h2":0,"m2":0},
				{"h1":0,"m1":0,"h2":0,"m2":0}
			];
			var times6=[
				{"h1":0,"m1":0,"h2":0,"m2":0},
				{"h1":0,"m1":0,"h2":0,"m2":0},
				{"h1":0,"m1":0,"h2":0,"m2":0},
				{"h1":0,"m1":0,"h2":0,"m2":0},
				{"h1":0,"m1":0,"h2":0,"m2":0},
				{"h1":0,"m1":0,"h2":0,"m2":0},
				{"h1":0,"m1":0,"h2":0,"m2":0},
				{"h1":0,"m1":0,"h2":0,"m2":0}
			];
			//默认
			var times=[times0,times1,times2,times3,times4,times5,times6];
			$scope.parameter.times=times[0];
			$scope.parameter.ALMSensitivity=3;
			$scope.parameter.ArmTimeWeek=1;
			$scope.parameter.copyWeek=0;
			$scope.pageSet.imageDateFormat=0;
			$scope.pageSet.imageFontSize=0;
			$scope.pageSet.imageAttribute=0;
			$scope.pageSet.imageTimeFormat=0;
			$scope.saveInfoFlag=false;

		    disParameter();
			function disParameter(){
				$scope.timeDisableFlag=true;
			}
			function enbaleParameter(){
				$scope.timeDisableFlag=false;
			}

			$scope.parameter_show_ok=false;
			$scope.parameter_show_cancel=false;
			$scope.parameter.type=0;
			$scope.bSetShowFlag=true;
			$scope.pageSetShowFlag=false;
			$scope.weekDay='一';//默认值
			$scope.changeWeek=function(){
				$scope.parameter.times=times[$scope.parameter.ArmTimeWeek-1];
				$scope.weekDay=weeks[$scope.parameter.ArmTimeWeek-1];
				 $scope.timeInfo[$scope.parameter.ArmTimeWeek];
			}
			$scope.copyTime=function(){
				var ct=$scope.parameter.copyWeek;
				if(ct==-1){
					for(var  i=0;i<times.length;i++){
						times[i]=$scope.parameter.times;
					}
				}else if(ct!=-1&&ct!=0){
					times[ct-1]=$scope.parameter.times;
				}
			}
            $scope.conditionFlag=function(flag){
				if(flag==0){
					$scope.bSetShowFlag=true;
					$scope.pageSetShowFlag=false;
				}else{
					$scope.bSetShowFlag=false;
					$scope.pageSetShowFlag=true;
				}
			}
			$scope.edit=function(){
				$scope.parameter_show_ok=true;
				$scope.parameterDis=false;
				$scope.parameter_show_cancel=true;
				$scope.saveInfoFlag=true;
				//代开可用状态
				enbaleParameter();

			}
			var timeHourFlag=true;
			var timeMinuteFlag=true;
			$scope.hour=function(index,value){
				if(value==null||value==""||value==0){
					$scope.parameter.times[index].h1=0;
					//$scope.timeInfo[index]="";
					timeHourFlag=true;
				}else{
					  if(value<=24){
						  var minute=$scope.parameter.times[index].m1;
						   if(minute>0&&value==24){
							 // $scope.timeInfo[index]="设置了无效数字";
							   $scope.toasterType.body="设置了无效数字";
							   $scope.pop();
							   timeHourFlag=false;

						   }else{
							   timeMinuteFlag=true;
							   timeHourFlag=true;
							  // $scope.timeInfo[index]="";
						   }
						}else{
						   $scope.toasterType.body="请设置有效数字区间[0-24)";
						   $scope.pop();
						   //$scope.timeInfo[index]="请设置有效数字区间[0-24)";
							timeHourFlag=false;
					   }
				}
				prompt(index);
			}

			$scope.minute=function(index,value){
				if(value==null||value==""){
					$scope.parameter.times[index].m1=0;
					//$scope.timeInfo[index]="";
					timeMinuteFlag=true;
				}else{
					if(value<60){
						var hour=$scope.parameter.times[index].h1;
						if(value>0&&hour==24){
							//$scope.timeInfo[index]="设置无效数字";
							$scope.toasterType.body="设置了无效数字";
							$scope.pop();
							timeMinuteFlag=false;
						}
						if(hour<24&&value>=0){
							//$scope.timeInfo[index]="";
							timeMinuteFlag=true;
							timeHourFlag=true;
						}
						if(hour==24&&value==0){
							//$scope.timeInfo[index]="";
							timeMinuteFlag=true;
							timeHourFlag=true;
						}
					}else{
						//$scope.timeInfo[index]="请设置有效数字区间[0-60)";
						$scope.toasterType.body="请设置有效数字区间[0-60)";
						$scope.pop();
						timeMinuteFlag=false;
					}
				}
				prompt(index);
			}
			$scope.hour2=function(index,value){
				if(value==null||value==""){
					$scope.parameter.times[index].h2=0;
					//$scope.timeInfo[index]="";
					timeHourFlag=true;
				}else{
					if(value<=24){
						var minute=$scope.parameter.times[index].m2;
						if(minute>0&&value==24){
							//$scope.timeInfo[index]="设置了无效数字";
							$scope.toasterType.body="设置了无效数字";
							$scope.pop();
							timeHourFlag=false;
						}else{
							timeMinuteFlag=true;
							timeHourFlag=true;
							//$scope.timeInfo[index]="";
						}
					}else{
						//$scope.timeInfo[index]="请设置有效数字区间[0-24)";
						$scope.toasterType.body="请设置有效数字区间[0-24)";
						$scope.pop();
						timeHourFlag=false;
					}
				}
				prompt(index);
			}
			$scope.minute2=function(index,value){
				if(value==null||value==""){
					$scope.parameter.times[index].m2=0;
					//$scope.timeInfo[index]="";
					timeMinuteFlag=true;
				}else{
					if(value<60){
						var hour=$scope.parameter.times[index].h2;
						if(value>0&&hour==24){
							//$scope.timeInfo[index]="设置无效数字";
							$scope.toasterType.body="设置无效数字";
							$scope.pop();
							timeMinuteFlag=false;
						}
						if(hour<24&&value>=0){
							//$scope.timeInfo[index]="";
							timeMinuteFlag=true;
							timeHourFlag=true;
						}
						if(hour==24&&value==0){
							//$scope.timeInfo[index]="";
							timeMinuteFlag=true;
							timeHourFlag=true;
						}
					}else{
						//$scope.timeInfo[index]="请设置有效数字区间[0-60)";
						$scope.toasterType.body="请设置有效数字区间[0-60)";
						$scope.pop();
						timeMinuteFlag=false;
					}
				}
				prompt(index);
			}
			function prompt(index){
					var hour1=$scope.parameter.times[index].h1;
					var minute1=$scope.parameter.times[index].m1
					var time1=(hour1*60)+minute1;
					var hour2=$scope.parameter.times[index].h2;
					var minute2=$scope.parameter.times[index].m2;
					var time2=(hour2*60)+minute2;
					if((hour1==24&&minute1==0)||(hour2==24&&minute2==0)){
						timeMinuteFlag=true;
						timeHourFlag=true;
					}else if((hour1==24&&minute1==0)&&(hour2==24&&minute2==0)){
						timeMinuteFlag=true;
						timeHourFlag=true;
					} else{
						if(time1>time2){
							//$scope.timeInfo[index]="开始时间应小于结束时间";
							$scope.toasterType.body="开始时间应小于结束时间";
							$scope.pop();
							timeMinuteFlag=false;
							timeHourFlag=false;
						}else{
							timeMinuteFlag=true;
							timeHourFlag=true;
						}
					}
			}
			//报警参数设置--获取信息
			getParameterInfo(deviceIP,sdkPort,userName,password);
			function getParameterInfo(deviceIP,sdkPort,userName,password ){
				var promise = MonitorService.getPTZDeviceParameterInfo(deviceIP,sdkPort,userName,password);
				promise.then(function (data) {
					if (data.flag == 1) {
						var vData = eval(data.data);
						times=vData.timeList;
						$scope.parameter.ALMVedioFlag=vData.ALMVedioFlag;
						$scope.parameter.ALMUpLoadFlag=vData.ALMUpLoadFlag;
						$scope.parameter.ALMVoiceFlag=vData.ALMVoiceFlag;
						$scope.parameter.times=times[0];//默认周一
					}
				});
			}
			//界面参数设置--获取信息
			getPageParameterInfo(number,deviceIP,sdkPort,userName,password);
			function getPageParameterInfo(number,deviceIP,sdkPort,userName,password ){
				var promise = MonitorService.getPTZPageDeviceParameterInfo(number,deviceIP,sdkPort,userName,password);
				promise.then(function (data) {
					if (data.flag == 1) {
						var vData = eval(data.data);
						$scope.pageSet.imageTunnelNameFlag=vData.imageTunnelNameFlag;
						$scope.pageSet.imageTunnelName=vData.imageTunnelName;
						$scope.pageSet.imageTunnelX=vData.imageTunnelX;
						$scope.pageSet.imageTunnelY=vData.imageTunnelY;
						$scope.pageSet.imageShowOSDFlag=vData.imageShowOSDFlag;
						$scope.pageSet.imageShowWeekFlag=vData.imageShowWeekFlag;
						$scope.pageSet.imageTimeFormat=vData.imageTimeFormat;
						$scope.pageSet.imageDateFormat=vData.imageDateFormat;
					    $scope.pageSet.imageFontSize=vData.imageFontSize;
					    $scope.pageSet.imageAttribute=vData.imageAttribute;
						$scope.pageSet.imageAttributeX=vData.imageAttributeX;
						$scope.pageSet.imageAttributeY=vData.imageAttributeY;
						$scope.pageSet.imageAddStringFlag0=vData.imageAddStringFlag0;
						$scope.pageSet.imageAddString0=vData.imageAddString0;
						$scope.pageSet.imageAddStringX0=vData.imageAddStringX0;
						$scope.pageSet.imageAddStringY0=vData.imageAddStringY0;
						$scope.pageSet.imageAddStringFlag1=vData.imageAddStringFlag1;
						$scope.pageSet.imageAddString1=vData.imageAddString1;
						$scope.pageSet.imageAddStringX1=vData.imageAddStringX1;
						$scope.pageSet.imageAddStringY1=vData.imageAddStringY1;
						$scope.pageSet.imageAddStringFlag2=vData.imageAddStringFlag2;
						$scope.pageSet.imageAddString2=vData.imageAddString2;
						$scope.pageSet.imageAddStringX2=vData.imageAddStringX2;
						$scope.pageSet.imageAddStringY2=vData.imageAddStringY2;
					}
				});
			}
			$scope.cancel=function(){
				$scope.parameter_show_ok=false;
				$scope.parameter_show_cancel=false;
				$scope.saveInfoFlag=false;
				disParameter();
				$("#parameter-form-horizontal").removeClass("acp-form-check");
			}
			$scope.parameterSave=function() {
				//清除默认属性 $$hashKey
				for(var j=0;j<times.length;j++){
					 var obj=times[j];
					 for(var i=0;i<obj.length;i++){
						delete obj[i].$$hashKey;
					 }
				}
				var flag=false;
				var type=$scope.parameter.type;
				if(type==0){
					console.log(timeHourFlag);
					console.log(timeMinuteFlag);
					if(timeHourFlag&&timeMinuteFlag){
						flag=true
						//$scope.saveInfo="";
					}else{
						flag=false;
						//$scope.saveInfo="报警时段参数设置有误";
						$scope.toasterType.body="报警时段参数设置有误";
						$scope.pop();
						return;
					}
				}else{
					$("#parameter-form-horizontal").addClass("acp-form-check");
					if($scope.pageSet.imageTunnelNameFlag){
					    if($scope.pageSet.imageTunnelX==null||$scope.pageSet.imageTunnelX==''){
								flag=false;
								return;
							}else{
							 flag=true;
					 	}
						if($scope.pageSet.imageTunnelY==null||$scope.pageSet.imageTunnelY==''){
							flag=false;
							return;
						}else{
							flag=true;
						}
				    }
					if($scope.pageSet.imageAddStringFlag0){
						if($scope.pageSet.imageAddString0==null||$scope.pageSet.imageAddString0==''){
							//$scope.saveInfo="设置叠加字符串1";
							flag=false;
							return;
						}else{
							flag=true;
							//$scope.saveInfo="";
						}
					}
					if($scope.pageSet.imageAddStringFlag1){
						if($scope.pageSet.imageAddString1==null||$scope.pageSet.imageAddString1==''){
							//$scope.saveInfo="设置叠加字符串2";
							flag=false;
							return;
						}else{
							flag=true;
							//$scope.saveInfo="";
						}
					}
					if($scope.pageSet.imageAddStringFlag2){
						if($scope.pageSet.imageAddString2==''||$scope.pageSet.imageAddString2==null){
							//$scope.saveInfo="设置叠加字符串3";
							flag=false;
							return;
						}else{
							flag=true;
							//$scope.saveInfo="";
						}
					}
				}
				if(flag){
						$scope.parameter.timeList=times;
						var promise = MonitorService.setPTZDeviceParameterInfo(deviceIP,sdkPort,userName,password,JSON.stringify($scope.parameter));
						promise.then(function (data) {
							if(data.flag==1) {
								$scope.parameterDis=true;
								$scope.toasterType.body="报警参数保存成功";
								getParameterInfo(deviceIP,sdkPort,userName,password);
							}else{
								//$scope.saveInfo='保存失败';
								$scope.toasterType.body="保存失败";
							}
							$scope.pop();
						},function(data,status){
							$scope.parameterDis=false;//保存失败可以再提交
							//$scope.saveInfo="网络失败！";
							$scope.toasterType.body="网络失败！";
							$scope.pop();
						});
					var promise = MonitorService.setPTZPageDeviceParameterInfo(number,deviceIP,sdkPort,userName,password,JSON.stringify($scope.pageSet));
					promise.then(function (data) {
						if(data.flag==1) {
							$scope.parameterDis=true;
						    getPageParameterInfo(number,deviceIP,sdkPort,userName,password);
							$scope.toasterType.body="界面参数保存成功";
							$scope.parameter_show_ok=false;
							$scope.parameter_show_cancel=false;
							$("#parameter-form-horizontal").removeClass("acp-form-check");
						}else{
							$scope.parameterDis=false;
							$scope.parameter_show_ok=true;
							$scope.parameter_show_cancel=true;
							//$scope.saveInfo='保存失败';
							$scope.toasterType.body="网络失败！";
						}
						$scope.pop();
					},function(data,status){
						$scope.parameterDis=false;//保存失败可以再提交
						//$scope.saveInfo="网络失败！";
						$scope.toasterType.body="网络失败！";
						$scope.pop();
					});
				}
			}
		} ]);
})();
