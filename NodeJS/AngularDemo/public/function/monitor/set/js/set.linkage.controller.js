/**
 * 监控-列表视图-传感器
 * @return {[type]} [description]
 */
(function(){
	'use strict';
	app.controller('CommonSetLinkageController',['$rootScope','$scope','$http','$modal','$stateParams','commonUtil','MonitorService','toaster',CommonSetLinkageController]);
	function CommonSetLinkageController($rootScope,$scope,$http,$modal,$stateParams,commonUtil,monitorService,toaster) {

		$scope.sensor_name=$stateParams.diviceName+"设置";
		$scope.deviceId=$stateParams.data;
		$scope.orgId=$stateParams.orgId;
		/*$scope.sensor_name="联动设置";
		$scope.deviceId=23621;
		$scope.orgId=10003;*/
		commonUtil.formReadOnly('setLinkage_form');
		//设置类编辑和保存时显示编辑按钮
		$scope.editOrAddFlag=0;

		//打开提示框
		$scope.toasterType={type: 'info', title: "提示信息", body:""};
		$scope.pop=function(){
			toaster.pop($scope.toasterType);
		}
		//关闭提示框
		$scope.clear = function(){
			toaster.clear();
		};
		$('#begintime').datetimepicker({
			format: 'hh:ii',
			language:  'zh-CN',
			weekStart: 1,
			todayBtn:  1,
			autoclose: 1,
			todayHighlight: 1,
			startView: 1,
			minuteStep: 1,
			minView: 0,
			maxView: 1,
			forceParse: 0
		});
		$('#endtime').datetimepicker({
			format: 'hh:ii',
			language:  'zh-CN',
			weekStart: 1,
			todayBtn:  1,
			autoclose: 1,
			todayHighlight: 1,
			startView: 1,
			minuteStep: 1,
			minView: 0,
			maxView: 1,
			forceParse: 0
		});
		//打开条件
		$scope.openLinkCondition1 = [];
		$scope.openLinkCondition2 = [
			{
				code: 1,
				label: '大于'
			},
			{
				code: 0,
				label: '小于'
			}
		];
		//关闭条件
		$scope.closeLinkCondition1 = [];
		$scope.closeLinkCondition2 = [
			{
				code: 1,
				label: '大于'
			},
			{
				code: 0,
				label: '小于'
			}
		];
		//设备标识
		var deviceId=$stateParams.deviceId;
		//设备所属组织标识
		var orgId=$stateParams.orgId;
		//列表数据集合
		$scope.data=[];
		//循环周期
		$scope.cycleTimes=[
			{
				id: 1,
				label: '周一'
			},
			{
				id: 2,
				label: '周二'
			},
			{
				id: 3,
				label: '周三'
			},
			{
				id: 4,
				label: '周四'
			},
			{
				id: 5,
				label: '周五'
			},
			{
				id: 6,
				label: '周六'
			},
			{
				id: 7,
				label: '周日'
			}
		];
		//周期初始化
		$scope.cycleTimeInit=function(times){
			angular.forEach($scope.cycleTimes, function(t) {
				if(times.indexOf(t.id) > -1){
					t.$checked=true;
				}
			});
		}
		//周期初始化重置
		$scope.cycleTimeReset=function(){
			angular.forEach($scope.cycleTimes, function(c) {
				c.$checked=false;
			});
		}
		//规则对象
		$scope.linkage={
			isrecord:0,
			issum:0,
			isenable:1,
			openlinkcondition:0,
			closelinkcondition:0
		}
		//选中单行数据
		$scope.checkSingle=function(c){
			$("div").removeClass( "has-error").removeClass( "has-success" );
			//$("#setLinkage_form").validate().resetForm();
			commonUtil.formReadOnly('setLinkage_form');
			$scope.editOrAddFlag=0;
			c.$checked=!c.$checked;
			$scope.linkage={};
			$scope.cycleTimeReset();
			if(c.$checked) {
				$scope.editOrAddFlag = 0;
				$scope.linkage = angular.copy(c);
				$scope.cycleTimeInit($scope.linkage.cycletime);
			}else{
				$scope.linkage={
				 isrecord:0,
				 issum:0,
				 isenable:1,
				 openlinkcondition:0,
				 closelinkcondition:0
				 }
			}
		}
		// 全选
		$scope.checkAll = function(checked) {
			angular.forEach($scope.data, function(c) {
				c.$checked = checked;
			});
			$scope.editOrAddFlag=0;
			$scope.linkage={
				isrecord:0,
				issum:0,
				isenable:1,
				openlinkcondition:0,
				closelinkcondition:0
			}
			$("div").removeClass( "has-error").removeClass( "has-success" );
		};
		//打开条件传感器数据
		$scope.getOpenLinkDeviceIdData=function(){
			var promise=monitorService.getOpenLinkDeviceIdData($scope.orgId);
			promise.then(function(data) {
				//console.log('success:'+data);
				$scope.openLinkCondition1=angular.copy(data.data);
				$scope.closeLinkCondition1 = angular.copy(data.data);
			}, function(data) {

			}, function(data) {

			});
		}
		//初始化数据
		$scope.getOpenLinkDeviceIdData();
		//关闭条件传感器数据
		$scope.getCloseLinkConditionData=function(){
			var promise=monitorService.getCloseLinkConditionData($scope.orgId);
		}
		//查询规则列表
		$scope.getData=function(){
			var promise=monitorService.getlinkageData($scope.deviceId)
			promise.then(function(data) {
				//console.log('success:'+data);
				$scope.data=data.data;
			}, function(data) {

			}, function(data) {

			});
		}
		//初始化列表数据
		$scope.getData();
		//新建规则
		$scope.add=function(){
			//清理验证
			$("div").removeClass( "has-error").removeClass( "has-success" );
			//$("#setLinkage_form").validate().resetForm();
			commonUtil.formWritable('setLinkage_form');
			$("#begintime").css('backgroundColor', '#eee');
			$("#endtime").css('backgroundColor', '#eee');
			$scope.linkage2=null;
			//数据初始化
			$scope.linkage={
				isrecord:0,
				issum:0,
				isenable:1,
				openlinkcondition:0,
				closelinkcondition:0
			}

			$scope.cycleTimeReset();
			$scope.editOrAddFlag=1;

		}
		//编辑规则
		$scope.edit=function(){
			$scope.editOrAddFlag=0;
			$scope.linkage2=null;
			if(commonUtil.getSelArray($scope.data).length === 0){
				$scope.toasterType.type= 'warning';
				$scope.toasterType.body="请选择你要编辑的记录!";
				$scope.pop();
				return;
			}
			if(commonUtil.getSelArray($scope.data).length > 1){
				$scope.toasterType.type= 'warning';
				$scope.toasterType.body="一次只能编辑一条记录!";
				$scope.pop();
				return;
			}
			commonUtil.formWritable('setLinkage_form');
			$("#begintime").css('backgroundColor', '#eee');
			$("#endtime").css('backgroundColor', '#eee');
			$scope.linkage=angular.copy(commonUtil.getSelArray($scope.data)[0]);
			$scope.linkage2=commonUtil.getSelArray($scope.data)[0];
			$scope.cycleTimeInit($scope.linkage.cycletime);
			$scope.editOrAddFlag=1;
		}
		//删除规则
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
		$scope.del=function(){
			var dataSel=commonUtil.getSelArray($scope.data);
			if(dataSel.length === 0){
				$scope.toasterType.type= 'warning';
				$scope.toasterType.body="请选择要删除的数据！";
				$scope.pop();
				return;
			}
			var confirm = $modal.open({
				templateUrl: 'function/monitor/set/confirmDialog.html',
				controller: confirmDialogController,
				backdrop: 'static',
				keyboard: true,
				size:'sm',
				resolve: {
					opts: function(){return {msg:'确认删除该文件吗?'}}
				}
			});

			confirm.result.then(function(result){
				if(result){
					var promise=monitorService.delLinkage(commonUtil.getSelIds(dataSel));
					promise.then(function(data) {
						if(data.flag === 1){
							$scope.toasterType.type= 'success';
							$scope.toasterType.body="数据删除成功";
							$scope.pop();
							$scope.getData();
						}
					}, function(data) {
						$scope.toasterType.type= 'error';
						$scope.toasterType.body="数据删除失败";
						$scope.pop();
					}, function(data) {
						$scope.toasterType.type= 'error';
						$scope.toasterType.body="数据删除失败";
						$scope.pop();
					});
				}
			},function(){});
		}
		//取消
		$scope.cancel=function(){
			$("#setLinkage_form").validate().resetForm();
			//$("div.error").hide();
			$scope.editOrAddFlag=0;
			$scope.linkage={
				isrecord:0,
				issum:0,
				isenable:1,
				openlinkcondition:0,
				closelinkcondition:0
			};
			commonUtil.formReadOnly('setLinkage_form');
		}

		//验证
		$scope.validate=function(){
			$scope.linkage.cycletime=commonUtil.getSelIds(commonUtil.getSelArray($scope.cycleTimes));
			$scope.linkage.deviceid=$scope.deviceId;
			//删除 $checked 对象属性
			delete $scope.linkage.$checked;

			if($("#setLinkage_form" ).valid()){
				//校验循环周期不能必须大于1
				if($scope.linkage.cycletime === ''){
					$scope.toasterType.type= 'warning';
					$scope.toasterType.body="循环周期必须选一个";
					$scope.pop();
					return;
				}
				if($scope.linkage2 != null
					&& $scope.linkage2.begintime == $scope.linkage.begintime
					&& $scope.linkage2.endtime == $scope.linkage.endtime){
					$scope.save();
					return;
				}
				var promiseValiTiem=monitorService.valiTimeDevice(
					$scope.linkage.begintime,
					$scope.linkage.endtime,
					$scope.deviceId,
					'videolink',
					$scope.linkage.id
				);
				promiseValiTiem.then(function(data) {
					if(data.flag == 1){
						if(data.data === 1){
							$scope.save();
						}else{
							$scope.toasterType.type= 'warning';
							$scope.toasterType.body="时间段交叉请重新选择";
							$scope.pop();
							return;
						}

					}
				}, function(data) {
					$scope.toasterType.type= 'warning';
					$scope.toasterType.body="时间段交叉请重新选择";
					$scope.pop();
					return;
				}, function(data) {
					$scope.toasterType.type= 'warning';
					$scope.toasterType.body="时间段交叉请重新选择";
					$scope.pop();
					return;
				});
			}
		};
		//保存
		$scope.save=function(){
			var promise=monitorService.saveLinkage($scope.linkage);
			promise.then(function(data) {
				if(data.flag === 1){
					$scope.toasterType.type= 'success';
					$scope.toasterType.body="数据保存成功";
					$scope.pop();
					$scope.getData();
					$scope.editOrAddFlag=0;
					$scope.linkage={
						isrecord:0,
						issum:0,
						isenable:1,
						openlinkcondition:0,
						closelinkcondition:0
					};
					commonUtil.formReadOnly('setLinkage_form');
				}
			}, function(data) {
				$scope.toasterType.type= 'error';
				$scope.toasterType.body="数据保存失败";
				$scope.pop();
			}, function(data) {
				$scope.toasterType.type= 'error';
				$scope.toasterType.body="数据保存失败";
				$scope.pop();
			});
		};
		//表单验证
		$.validator.addMethod("timeVali",function(value1,element,value2){
			//debugger;
			var vTime1=$scope.linkage.begintime;
			var vTime2=$scope.linkage.endtime;

			if(vTime2 > vTime1){
				return true;
			}else{
				return false;
			}

		},"必须大于起始时间");

		$("#setLinkage_form" ).validate( {
			rules: {
				begintime: "required",
				endtime:{
					required:true,
					timeVali:[$scope.linkage.begintime,$scope.linkage.endtime]
				},
				openlinkdeviceid: {
					 required:true
				},
				openlinkvalue:"required",
				openlinkcondition:"required",
				closelinkdeviceid:{
					required:true
				},
				closelinkvalue:"required",
				closelinkcondition:"required",
				waringpoint:{
					required:true,
					digits:true
				},
				resetpoint:{
					required:true,
					digits:true
				}/*,
				cycleTiems:{
					required:true,
					minlength:1
				}*/
			},
			messages: {
				begintime: "起时间段不能为空",
				endtime:{
					required:"到时间段不能为空",
					timeVali:"必须大于起始时间"
				},
				openlinkdeviceid:"打开条件",
				openlinkvalue:"打开条件-值不能为空",
				openlinkcondition:"打开条件不能空",
				closelinkdeviceid:"关闭条件",
				closelinkvalue:"关闭条件-值不能为空",
				closelinkcondition:"关闭条件不能空",
				waringpoint:{
					required:"预警点值不能为空",
					digits:"预警点值必须为数字"
				},
				resetpoint:{
					required:"复位值不能为空",
					digits:"复位点值必须为数字"
				}/*,
				cycleTiems:{
					required:"循环周期不能为空",
					minlength:"循环周期必须选一个"
				}*/
			},
			//指定是否提交时验证
			onsubmit:false,
			//onfocusout:false,
			//指定使用什么标签标记错误
			errorElement: "em",
			//把错误信息统一放在一个容器里面
			//errorLabelContainer: $("div.error"),
			//指定使用什么标签再把上边的 errorELement 包起来
			//wrapper:"li",
			//可以自定义错误放到哪里
			errorPlacement: function ( error, element ) {
				/*error.addClass( "help-block" );

				// Add `has-feedback` class to the parent div.form-group
				// in order to add icons to inputs
				element.parents().addClass( "has-feedback" );

				if ( element.prop( "type" ) === "checkbox" ) {
					error.insertAfter( element.parent( "label" ) );
				} else {
					error.insertAfter( element );
				}

				// Add the span element, if doesn't exists, and apply the icon classes to it.
				if ( !element.next( "span" )[ 0 ] ) {
					$( "<span class='glyphicon glyphicon-remove form-control-feedback'></span>" ).insertAfter( element );
				}*/
			},
			//验证成功回调函数
			success: function ( label, element ) {
				/*if ( !$( element ).next( "span" )[ 0 ] ) {
					$( "<span class='glyphicon glyphicon-ok form-control-feedback'></span>" ).insertAfter( $( element ) );
				}*/
			},
			//验证没通过
			highlight: function ( element, errorClass, validClass ) {
				$( element ).parent().addClass( "has-error" );
				//$( element ).parent().addClass( "has-error" ).removeClass( "has-success" );
				//$( element ).next( "span" ).addClass( "glyphicon-remove" ).removeClass( "glyphicon-ok" );
			},
			//验证通过
			unhighlight: function ( element, errorClass, validClass ) {
				$( element ).parent().removeClass( "has-error" );
				//$( element ).parent().addClass( "has-success" ).removeClass( "has-error" );
				//$( element ).next( "span" ).addClass( "glyphicon-ok" ).removeClass( "glyphicon-remove" );
			}
		 });
	}
})();
