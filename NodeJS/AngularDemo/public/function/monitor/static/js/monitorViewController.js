'use strict';

/* 
  普通视图控制器 
*/
/*
  author：cunqinghe
 */

app.controller('ViewController', ['$scope', 'MonitorService', '$cookieStore', '$rootScope', '$http', '$state', '$modal', '$log', '$stateParams', 'videoService','toaster','ReportService',
	function($scope, MonitorService, $cookieStore, $rootScope, $http, $state, $modal, $log, $stateParams, videoService,toaster,ReportService) {

		$rootScope.orgId = ($rootScope.orgId || $stateParams.data);
		$rootScope.isEye = false;
		$rootScope.showAddGroup=true;
		$rootScope.showGroup=true;//xtn控制添加分组和保存分组图标显示
		$rootScope.addGroupList=[];//xtn数组列表
		$rootScope.showEditGroup=true;//xtn保存编辑分组
		//$rootScope.isShowIco=true;
		var arrayGroupId=[];//分组id


		//删除数组方法
		Array.prototype.indexOf = function(val) {
			for (var i = 0; i < this.length; i++) {
				if (this[i] == val) return i;
			}
			return -1;
		};
		Array.prototype.remove = function(val) {
			var index = this.indexOf(val);
			if (index > -1) {
				this.splice(index, 1);
			}
		};

		//移除相同的数组
		function unique(arr) {
			var result = [], hash = {};
			for (var i = 0, elem; (elem = arr[i]) != null; i++) {
				if (!hash[elem]) {
					result.push(elem);
					hash[elem] = true;
				}
			}
			return result;
		}


		var userid = $cookieStore.get("id");
		var orgId = $rootScope.orgId;
		//var orgId = "10003";
		var diviceIdArray = new Array();
		var diviceArray;
		//设备分组用数组
		var diviceGroupArry = new Array();

		//提示框
		$scope.toasterType={type: 'info', title: "提示信息", body:""};
		$scope.toasterType.type= 'warning';
		$scope.pop=function(){
			toaster.pop($scope.toasterType);
		}

		var ddArray;
		var videoParams; //视频参数
		$rootScope.isLock = true;
		initInfo();
		initdivice();

		// $scope.timer = setInterval(function() {
		// 	$scope.$apply(initdivice());
		// }, 30000);

		/*
		  初始化地块信息
		 */
		function initInfo() {
			var promise = MonitorService.getOrgInfo(orgId);
			promise.then(function(data) {
				var obj = eval(data);
				$scope.contactname = obj.data.contactname;
				$scope.orgname = obj.data.orgname;
				$scope.mobile = obj.data.mobile;
				//获取地块底图
				$scope.backImg = "http://10.88.20.95/resource/" + obj.data.planImagePath;
			}, function(data) {
				//服务调用失败
			});

		}

		/*
		  初始化设备信息
		 */
		function initdivice() {
			var locationValue = 100;//未被拖动过的设备的默认横坐标
			var count = 0;
			var promise = MonitorService.getOrgDiviceInfoAll(orgId);
			$scope.ddd = 0;
			promise.then(function(data) { 
				var obj = eval(data);
				for (var i = 0; i < obj.data.length; i++) {
					diviceGroupArry.push(jQuery.parseJSON('{"id":' + obj.data[i].id + ',"deviceName":"' + 
						obj.data[i].deviceName + '","categoryId":"' + obj.data[i].categoryId + '","deviceType":' 
						+ obj.data[i].deviceType + ',"typeName":"' + obj.data[i].typeName + '"}'));

					/*
					  设置设备位置
					  判断是否是第一次加载设备，即未被拖动过位置
					 */
					
					if (obj.data[i].isUseCoord == 0) {
						count = count+1;
						var val = Math.ceil(count/5);
						if(count%6 == 0){
							locationValue = 100;
						}
						locationValue = locationValue + 40;
						obj.data[i].coordinateX = 200*val;
						obj.data[i].coordinateY = locationValue;
					}
					/*
					  设置状态图标和信息窗口模板路径
					 */
					

					if (obj.data[i].status) {
						obj.data[i].statValue = obj.data[i].status;
						obj.data[i].status = "equip-icon-min-0 equip-icon-min-0-" + parseInt(obj.data[i].iconPath) + "-" + obj.data[i].status + " icon";
					} else {
						obj.data[i].status = "equip-icon-min-0 equip-icon-min-0-" + parseInt(obj.data[i].iconPath) + "--1 icon";
						obj.data[i].statValue = "-1";
					}

					switch (parseInt(obj.data[i].deviceType)) {
						case 3:
							// 视频设备
							obj.data[i].lastvalue = obj.data[i].deviceName;
							obj.data[i].unit = "";
							break;
						case 7:
							// 风向传感器
							obj.data[i].unit = "";
							break;
						case 8:
							// 相机
							obj.data[i].lastvalue = obj.data[i].deviceName;
							obj.data[i].unit = "";
							break;
						case 17:
							// 土壤PH值
							obj.data[i].unit = "";
							break;
						case 21:
							// 电磁阀
							obj.data[i].lastvalue = obj.data[i].deviceName;
							obj.data[i].unit = "";
							break;
						case 28:
							// 状态开发
							obj.data[i].lastvalue = obj.data[i].deviceName;
							obj.data[i].unit = "";
							break;
						case 29:
							// 控制开关
							obj.data[i].lastvalue = obj.data[i].deviceName;
							obj.data[i].unit = "";
							break;
						case 30:
							// 触发开关
							obj.data[i].lastvalue = obj.data[i].deviceName;
							obj.data[i].unit = "";
							break;
							// default:
							//     // statements_def
							// break;

					}
					diviceIdArray[i] = obj.data[i].id;



					/*
					  动态设置设备位置
					 */


					obj.data[i].style = {
						"width": "auto",
						"height": 25 + 'px',
						"left": obj.data[i].coordinateX + 'px',
						"top": obj.data[i].coordinateY + 'px'
					};

				}
				ddArray = JSON.stringify(obj.data);
				$scope.items = eval(ddArray);
				

        //图片缩放开始
			//判断事件兼容性
			function myAddEvent(obj, sEvent, fn) {
				if (obj.attachEvent) {
					obj.attachEvent('on' + sEvent, fn);
				} else {
					obj.addEventListener(sEvent, fn, false);
				}
			}

			//获取元素
			var oImg =document.getElementById('img_map');
			var infoWindow=document.getElementById('infoWindow');
			var controllerinfoWindow=document.getElementById('controllerinfoWindow');
			var camerainfoWindow=document.getElementById('camerainfoWindow');
			var videoWindow=document.getElementById('videoWindow');
			var iNum = 1;
			var scale=1;
			//滚轮控制缩放
			function handMouseWheel(ev) {
				var oEvent = ev || event;
				var oBtn = true;
				var oX=oEvent.pageX+'px';
				var oY=oEvent.pageY+'px';
				oBtn = oEvent.wheelDelta ? oEvent.wheelDelta < 0 : oEvent.detail > 0;
				if (oBtn) {
					//向下滚动触发事件
					iNum += 0.05;
					if(iNum>1){
						iNum=1;
						$(".icon-lock").bind('click',function () {
							unlock();
						});
					}

					oImg.style.transform='scale(' + iNum + ')';
					oImg.style.webkitTransform='scale(' + iNum + ')';
					oImg.style.MozTransform='scale(' + iNum + ')';

					infoWindow.style.transform='scale('+iNum+')';
					infoWindow.style.webkitTransform='scale('+iNum+')';
					infoWindow.style.MozTransform='scale('+iNum+')';

					controllerinfoWindow.style.transform='scale('+iNum+')';
					controllerinfoWindow.style.webkitTransform='scale('+iNum+')';
					controllerinfoWindow.style.MozTransform='scale('+iNum+')';

					camerainfoWindow.style.transform='scale('+iNum+')';
					camerainfoWindow.style.webkitTransform='scale('+iNum+')';
					camerainfoWindow.style.MozTransform='scale('+iNum+')';

					videoWindow.style.transform='scale('+iNum+')';
					videoWindow.style.webkitTransform='scale('+iNum+')';
					videoWindow.style.MozTransform='scale('+iNum+')';

					for (var i=0;i<diviceIdArray.length;i++) {
						$("#"+diviceIdArray[i]+"value").show();
						$("#"+diviceIdArray[i]).css("width","auto");
					}
				} else {
					//向上滚动触发事件
					iNum -= 0.05;
					scale +=0.05;
					if (iNum <= 0.7) {
						iNum = 0.7;
						if ($rootScope.isLock == false){
							$rootScope.isLock = true;
							for (var i=0;i<diviceIdArray.length;i++) {
								$("#" + diviceIdArray[i]).draggable({
									disabled: true,

								});
							}
						}
						for (var i=0;i<diviceIdArray.length;i++) {
							$(".icon-lock").unbind('click');
							$("#"+diviceIdArray[i]).css("width","0px");
							$("#"+diviceIdArray[i]+"value").hide();
						}
					}
					oImg.style.transform='scale(' + iNum + ')';
					oImg.style.webkitTransform='scale(' + iNum + ')';
					oImg.style.MozTransform='scale(' + iNum + ')';

					infoWindow.style.transform='scale(1.5)';
					infoWindow.style.webkitTransform='scale(1.5)';
					infoWindow.style.MozTransform='scale(1.5)';

					controllerinfoWindow.style.transform='scale(1.5)';
					controllerinfoWindow.style.webkitTransform='scale(1.5)';
					controllerinfoWindow.style.MozTransform='scale(1.5)';

					camerainfoWindow.style.transform='scale(1.5)';
					camerainfoWindow.style.webkitTransform='scale(1.5)';
					camerainfoWindow.style.MozTransform='scale(1.5)';

					videoWindow.style.transform='scale(1.5)';
					videoWindow.style.webkitTransform='scale(1.5)';
					videoWindow.style.MozTransform='scale(1.5)';


					infoWindow.style.transformOrigin='18% bottom';
					infoWindow.style.mozTransformOrigin='18% bottom';
					infoWindow.style.webkitTransformOrigin='18% bottom';


					controllerinfoWindow.style.transformOrigin='18% bottom';
					controllerinfoWindow.style.mozTransformOrigin='18% bottom';
					controllerinfoWindow.style.webkitTransformOrigin='18% bottom';

					camerainfoWindow.style.transformOrigin='20% bottom';
					camerainfoWindow.style.mozTransformOrigin='20% bottom';
					camerainfoWindow.style.webkitTransformOrigin='20% bottom';

					videoWindow.style.transformOrigin='20% bottom';
					videoWindow.style.mozTransformOrigin='20% bottom';
					videoWindow.style.webkitTransformOrigin='20% bottom';

				}
				if (oEvent.preventDefault) {
					oEvent.preventDefault();
				}
				return false;
			}

			myAddEvent(oImg,'mousewheel', handMouseWheel);
			myAddEvent(oImg,'DOMMouseScroll', handMouseWheel);
			//图片缩放结束

			}, function(data) {
				//服务调用失败
			});

		}

		/*
		    锁定
		    锁定之后可对设备位置进行拖动
		   */
		$scope.lock = function() {
			var modalInstance = $modal.open({
				templateUrl: 'function/monitor/devicePop.html',
				controller: dialogController,
				backdrop: 'static',
				keyboard: false,
				resolve: {
					//传递参数
					items: function() {
						return angular.copy($scope.items);
					},
					url: function() {
						return angular.copy($scope.app.monitorUrl);
					}

				}

			});
			modalInstance.opened.then(function() {
				//模态窗口打开之后执行的函数

			});
			modalInstance.result.then(function(item) {
				$scope.items = eval(ddArray);
			}, function(reason) {
				//点击空白区域，总会输出backdrop click，点击取消，则会暑促cancel
			  $scope.toasterType.body="设备布局成功！";
				$scope.toasterType.type= 'success';
				$scope.pop();
			});

		};
		/*
		  解锁
		  解锁之后可对拖动的设备位置进行保存
		 */

		$scope.unlock = unlock;

		function unlock() {
			$rootScope.isLock = false;
			
			$scope.toasterType.body="解锁成功,可以任意拖动位置！";
			$scope.toasterType.type= 'success';
			$scope.pop();
			
			for (var i = 0; i < diviceIdArray.length; i++) {
				$("div[id=" + diviceIdArray[i] + "]").draggable({
					disabled: false,
					containment: "#imgbg", 
					scroll: false
				});
				$("#iconBox" + diviceIdArray[i]).unbind("click");

				$("div[id=" + diviceIdArray[i] + "]").mousedown(function () {
					$(this).removeClass('animal');
				});

				$("div[id=" + diviceIdArray[i] + "]").mousemove(function () {
					$(this).removeClass('animal');
				});

				$("div[id=" + diviceIdArray[i] + "]").mouseup(function () {
					$(this).addClass('animal');
				})
			}
		}

		var dialogController = function($scope, $http, $modalInstance, url) {

			$scope.operateInfo = "是否保存修改？";

			//取消
			//取消
			$scope.cancel = function() {
				$rootScope.isLock = true;
				$scope.item = [];
				$modalInstance.close($scope.item); //关闭并返回当前选项
				for (var i = 0; i < diviceIdArray.length; i++) {
					$("div[id=" + diviceIdArray[i] + "]").removeClass('animal');
				}
			};

			//保存
			$scope.ok = function() {
				$rootScope.isLock = true;
				var diviceLocation = new Array();
				var kegNew = new Object();

				for (var i = 0; i < diviceIdArray.length; i++) {
					var diviceData = new Object();

					$("div[id=" + diviceIdArray[i] + "]").draggable({
						disabled: true
					});
					/*
					  获取设备位置并保存
					 */
					diviceData.id = diviceIdArray[i];
					diviceData.x = parseInt($("div[id=" + diviceIdArray[i] + "]").css("left"));
					diviceData.y = parseInt($("div[id=" + diviceIdArray[i] + "]").css("top"));
					diviceData.isUseCoord = 1;
					diviceLocation.push(diviceData);
					// diviceLocation.push({"id":diviceData.id,"x":diviceData.x,"y":diviceData.y,"isUseCoord":diviceData.isUseCoord});
				};

				kegNew.data = diviceLocation;
				var diviceInfoArray = {
					json: JSON.stringify(kegNew)
				}; //将数据转为json
				/*
				  调用保存设备位置的服务
				 */
				var promise = MonitorService.setDiviceInfo(diviceInfoArray);
				promise.then(function(data) {
					//保存成功
					$(".iconBox" + diviceIdArray[i]).bind("click");
					initdivice();
				}, function(data) {
					//保存失败
				});

				$modalInstance.dismiss('cancel'); //关闭模态窗

			};
		}

		/*
		  选择查看分组
		 */

		$scope.queryGroup = function() {
			//清除所有分组标志
			// $(".icon-group").css({
			//   display: "none"
			// });

			var modalInstance = $modal.open({
				templateUrl: 'function/monitor/chooseGroupDialog.html',
				backdrop: 'static',
				controller: queryGroupController,
				keyboard: false,
				resolve: {
					diviceGroupArry: function() {
						return diviceGroupArry;
					},
					orgId: function() {
						return angular.copy(orgId);
					}
				}
			});
			modalInstance.opened.then(function() {
				//模态窗口打开之后执行的函数

			});
			modalInstance.result.then(function(item) {
				var arr = item;

				angular.forEach(arr, function(data) {
					$("#" + data + "group").css({
						display: "block"
					});
					//隐藏分组图标
				});

				$scope.hideGroup = function() {
					angular.forEach(arr, function(data) {
						$("#" + data + "group").css({
							display: "none"
						});
						//隐藏分组图标
					});
					$rootScope.isEye = true;
				};
			}, function(reason) {
				//点击空白区域，总会输出backdrop click，点击取消，则会暑促cancel

			});
		};

		var queryGroupController = function($scope, MonitorService, $modalInstance, $state, orgId) {
			//设备分组用数组
			var groupArr = new Array();
			var diviceArr = new Array();
			var obj;
			var orgid = orgId;
			var promise = MonitorService.getDiviceGroupInfo(orgid);
			promise.then(function(data) {
					obj = eval(data);
					for (var i = 0; i < obj.data.length; i++) {
						groupArr.push(jQuery.parseJSON('{"id":' + obj.data[i].id + ',"groupName":"' + obj.data[i].groupName + '"}'));
					}

				},
				function(data) {
					//服务调用失败
				});

			$scope.deviceInfoData = groupArr;
			$scope.devices = groupArr;
			//取消
			$scope.cancel = function() {
				$modalInstance.close(); //关闭
			};
			//确定
			$scope.ok = function() {
				$rootScope.isEye = false;
				var selectDevices = $scope.devices;
				for (var i = 0; i < obj.data.length; i++) {
					if (obj.data[i].id == selectDevices.id) {
						diviceArr = obj.data[i].devices;
					}

				}
				$scope.item = diviceArr;
				$modalInstance.close($scope.item); //关闭并返回当前选项
			};

		}


		// xtn查看分组
		function getDiviceGroup() {
			var _orgid = orgId;
			var promise = MonitorService.getDiviceGroupInfo(_orgid);
			promise.then(function(data) {

					//获取分组名称
					angular.forEach(data.data,function (data) {
						angular.forEach(data.devices,function (item) {
							if (item.status == -1){
								$scope.devicesStatue="部分设备已经停止工作！";
							}else {
								$scope.devicesStatue="设备运转正常！";
							}
						});
						arrayGroupId.push(data.id);
					});
					$rootScope.grouplist = data.data;
				},
				function(data) {
					console.log("服务调用失败");
				});

		}
		
		$scope.showGroupInfor=function () {
			getDiviceGroup();
		};

		//xtn分组图标显示隐藏
		$scope.showGroupIco=function (id) {
			//$rootScope.isShowIco=false;
			angular.forEach(diviceIdArray,function (data,index) {
				$("#"+data+"group").hide();
				//$("#"+data+"red").hide();
			});
			angular.forEach(arrayGroupId,function (data,index) {
				$("#eye-open"+data).next('a').hide();
				$("#eye-open"+data).show();
			});
			$("#eye-open"+id).hide();
			$("#eye-open"+id).next('a').show();

			//$(".myCheck").hide();
			var promise = MonitorService.getOneDeviceGroupList(id);
			promise.then(function(data) {
				if (data.flag == 1){

					angular.forEach(data.data.devices,function (item) {
						angular.forEach(item.deviceList,function (device) {

							if (device.ischecked == true){
								$("#"+device.id+"group").show();
							}

							//$("#"+device.id+"red").hide();

						})
					});
				}

			}, function(data) {

			});
		};
		
		
		//隐藏分组图标
		$scope.hideGroupIco=function (id) {
			//$(".myCheck").hide();
			angular.forEach(diviceIdArray,function (data,index) {
				$("#"+data+"group").hide();
				//$("#"+data+"red").hide();
			});
			$("#eye-open"+id).show();
			$("#eye-open"+id).next('a').hide();
		}


		$scope.showdl=function (id) {
			angular.forEach(diviceIdArray,function (data,index) {
				//$("#"+data+"group").hide();
				$("#"+data+"red").hide();
			});
			//$("#"+id+"group").show();
			$(".myCheck").hide();
			angular.forEach(arrayGroupId,function (data,index) {
				$(".group-content"+data).next('dl').slideUp();
			});
			$(".group-content"+id).next('dl').slideDown();
		};

		/**
		 * xtn判断是不是同一分组,并返回diviceType和diviceId
		 * @type {Array}
         * @private
		 * _diviceType设备类型
		 * _diviceId同一类型的id
         */
		var _diviceType=[];
		var _diviceId=[];
		var _diviceName=[];
		var xtnArray=new Array();
		$scope.isAlikeGroup=function (id,diviceType,diviceName,typeName) {
			var typeName=typeName;
			if ($("#"+id+"check").is(':checked') ){
				_diviceType.push(diviceType);
				_diviceId.push(id);
				_diviceName.push(diviceName);
				xtnArray.push({'id':id, 'deviceName':diviceName, 'deviceType':diviceType});
				if (_diviceType.length > 1){
					if (diviceType != _diviceType[0] && _diviceType.length != 0){
						$scope.toasterType.body="请勾选同一类型";
						$scope.toasterType.type= 'warning';
						$scope.pop();
						$("#"+id+"check").prop({checked:false});
						_diviceId.pop(id);
						_diviceName.pop(diviceName);
						_diviceType.pop(diviceType);
						xtnArray.pop({'id':id, 'deviceName':diviceName, 'deviceType':diviceType});
					}
				}
			}else {
				_diviceId.remove(id);
				if (_diviceId.length <= 0){
					//_diviceType.pop(diviceType);
					_diviceType.length = 0;
				}
				_diviceName.pop(diviceName);
				xtnArray.pop({'id':id, 'deviceName':diviceName, 'deviceType':diviceType});
			}
			$rootScope.addGroupList=xtnArray;

		};


		//保存分组
		$scope.saveGroup=function(){
			var _orgid = orgId;
			if($rootScope.groupname!=''){
				 $rootScope.groupname='';
			}
			if (_diviceId.length > 0 && xtnArray.length > 0){
				var modalInstance = $modal.open({
					templateUrl: 'function/monitor/group/addDeviceGroupDialog.html',
					backdrop: 'static',
					controller: 'viewGroupCtrl',
					keyboard: false,
					resolve: {
						diviceGroupArry: function() {
							return diviceGroupArry;
						},
						url: function() {
							return angular.copy($scope.app.monitorUrl);
						},
						orgId:function () {
							return _orgid;
						},
						diviceTypes:function () {
							return _diviceType[0];
						},
						divicIds:function () {
							return _diviceId;
						},
						diviceIdArr:function () {
							return diviceIdArray;
						}

					}
				});
				modalInstance.opened.then(function() {
						
				});
				modalInstance.result.then(function(data) {

				}, function(reason) {

					//点击空白区域，总会输出backdrop click，点击取消，则会暑促cancel
					angular.forEach(_diviceId,function (data,index) {
						$("#"+data+"check").prop({checked:false});
					});
					xtnArray.length=0;

				});
			}else {
				$scope.toasterType.body="请至少勾选一个设备！";
				$scope.toasterType.type= 'warning';
				$scope.pop();
			}

		}

		//xtn新增分组
		$scope.addGroup = function() {
			$(".myCheck").toggle();

			 _diviceType.length=0;
			 _diviceId.length=0;
			 _diviceName.length=0;
			 xtnArray.length=0;

			$rootScope.showGroup=false;
			$rootScope.showAddGroup=false;
		};

		//xtn取消分组
		$scope.cancelGroup=function () {
			$rootScope.showGroup=true;
			$rootScope.showAddGroup=true;
			$rootScope.showEditGroup=true;
			$(".myCheck").hide();
			// $(".groupbox").toggle();
			// $(".see-group").toggleClass('see-group-active');
			_diviceType.length=0;
			_diviceId.length=0;
			xtnArray.length=0;
			for (var i=0;i < diviceIdArray.length; i++){
				$("#"+diviceIdArray[i]+"check").prop({checked:false});
				$("#"+diviceIdArray[i]+"red").hide();
			}
			angular.forEach(arrayGroupId,function (data,index) {
				$(".group-content"+data).removeClass('green');
				$(".group-handle"+data).removeClass('color-whrite');
			})
		}
		
		// xtn删除分组
		var _ok= function (id,$scope) {
			var promise = MonitorService.delDeviceGroupInfo(id);
			promise.then(function(data) {
				if (data.flag == 1){
					$scope.toasterType.type= 'success';
					$scope.toasterType.body="删除成功！";
					$scope.pop();
					$("#"+id+"grouplist").remove();
				}

			}, function(data) {
				$scope.toasterType.body="删除失败！";
				$scope.toasterType.type= 'error';
				$scope.pop();
			});

		};
		var _cancel = function() {};
		$scope.delDeviceGroup=function (id) {
			$scope.acpLayer.confirm(
				"是否删除选择数据",
				function(){_ok(id,$scope);},
				function(){_cancel();}
			);
		};


		//xtn编辑分组
		$scope.editDeviceGroup=function(groupId){
			$rootScope._groupId=groupId;
			xtnArray.length=0;
			_diviceId.length=0;
			_diviceType.length=0;
			$rootScope.showGroup=false;
			$rootScope.showEditGroup=false;
			$rootScope.showAddGroup=true;
			$(".myCheck").hide();
			for (var i=0;i < diviceIdArray.length; i++){
				$("#"+diviceIdArray[i]+"check").prop({checked:false});
				$("#"+diviceIdArray[i]+"red").hide();

			}


			angular.forEach(arrayGroupId,function (data,index) {
				$(".group-content"+data).removeClass('green');
			})

			$(".group-content"+groupId).addClass('green');

			var promise = MonitorService.getOneDeviceGroupList(groupId);
			promise.then(function(data) {
				if (data.flag == 1){
					$rootScope.groupname=data.data.groupname;
					angular.forEach(data.data.devices,function (item) {
						angular.forEach(item.deviceList,function (device) {

							$("#"+device.id+"myCheck").show();
							$("#"+device.id+"red").show().css({"opacity":"1","animation":"myanimal 3s infinite"});
							if (device.ischecked){
								$("#"+device.id+"check").prop({checked:true});
								xtnArray.push(device);
								_diviceId.push(device.id);
								_diviceType.push(device.deviceType);
							}

						})
					});
				}
			}, function(data) {
				$scope.toasterType.body="编辑失败！";
				$scope.toasterType.type= 'error';
				$scope.pop();
			});

		}


		//xtn保存分组编辑

		$scope.saveEditGroup=function () {
			var _orgid = orgId;
/*			if (_diviceType.length==0){
				$scope.toasterType.body="请至少勾选一项！";
				$scope.toasterType.type= 'error';
				$scope.pop();
			}else{
				_diviceType.push(xtnArray[0].deviceType);
			}*/
			if (_diviceId.length==0){
				angular.forEach(xtnArray,function (data,index) {
					_diviceId.push(data.id);
				});
			}

			if (xtnArray.length > 0){
				var modalInstance = $modal.open({
					templateUrl: 'function/monitor/group/editDeviceGroupDialog.html',
					backdrop: 'static',
					controller: 'editGroupCtrl',
					keyboard: false,
					resolve: {
						diviceGroupArry: function() {
							return diviceGroupArry;
						},
						url: function() {
							return angular.copy($scope.app.monitorUrl);
						},
						orgId:function () {
							return _orgid;
						},
						diviceTypes:function () {
							return _diviceType[0];
						},
						divicIds:function () {
							return unique(_diviceId);
						},
				        groupId:function () {
							return $rootScope._groupId;
						},
						diviceIdArr:function () {
							return diviceIdArray;
						}

					}
				});
				modalInstance.opened.then(function() {
					$rootScope.addGroupList=xtnArray;
				});
				modalInstance.result.then(function() {

				}, function(reason) {
					//点击空白区域，总会输出backdrop click，点击取消，则会暑促cancel

					angular.forEach(diviceIdArray,function (data,index) {
						//$("#"+data+"check").prop({checked:false});
						$("#"+data+"red").hide();
					});
					//xtnArray.length=0;

				});
			}else {
				$scope.toasterType.body="请至少勾选一个设备！";
				$scope.toasterType.type= 'warning';
				$scope.pop();
			}
		};
		
		//xtn打开组控制器

		$scope.groupController=function (groupId) {

			//打开弹窗
			var modalInstance = $modal.open({
				templateUrl: 'function/monitor/contro/tapDialog.html',
				backdrop: 'static',
				controller: 'tapController',
				keyboard: false,
				size:'sm',
				resolve: {
					userId:function () {
						return $cookieStore.get("id");
					},
					_groupId:function () {
						return groupId;
					}
				}
			});
			modalInstance.opened.then(function() {

			});
			modalInstance.result.then(function() {

			}, function(reason) {
				//点击空白区域，总会输出backdrop click，点击取消，则会暑促cancel

			});
		}
		
		//xtn打开单个开关
		$scope.openOneDevice=function(devicesId,mystatValue){
			if(mystatValue == -1){
				$scope.toasterType.body="设备处于离线状态,禁止操作！";
				$scope.toasterType.type= 'error';
				$scope.pop();
			}else{
				//打开弹窗
				var modalInstance = $modal.open({
					templateUrl: 'function/monitor/contro/oneDeviceDialog.html',
					backdrop: 'static',
					controller: 'oneDeviceController',
					keyboard: false,
					resolve: {
						userId:function () {
							return $cookieStore.get("id");
						},
						_devicesId:function () {
							return devicesId;
						}
					}
				});
				modalInstance.opened.then(function() {
	
				});
				modalInstance.result.then(function() {
	
				}, function(reason) {
					//点击空白区域，总会输出backdrop click，点击取消，则会暑促cancel
	
				});
			}
		}
		
		
		/*
		  点击设备弹出信息窗口
		 */
		var _pageWidth=parseInt($("#mainPage").css('width'));
		var _windowWidth=parseInt($(window).width());
		$(window).resize(function () {
			_pageWidth=parseInt($("#mainPage").css('width'));
			_windowWidth=parseInt($(window).width());
		});

		var btns=[21,22,23,24,25,28,29,30,8];
		$scope.click = function(id, type, iconPath, statValue, categoryId,deviceType) {

			$scope.dId = id;

			$scope.mystatValue=statValue;
			/*
			  设置信息窗口设备状态图标
			 */
			$scope.state = "equip-icon-0 equip-icon-0-" + parseInt(iconPath) + "-" + statValue + " icon";

			var promise;
			var infoType;
			switch (categoryId) {
				case 1:
					// 传感类
					infoType = "infoWindow"; //传感类信息窗口
					promise = MonitorService.getOrgDiviceInfoSingle(id);
					promise.then(function(data) {
						var obj1 = data;
						if (obj1.data) {
							$scope.diviceName = obj1.data.deviceName;
							$scope.diviceType = obj1.data.deviceType;

							if (obj1.data.lastvalue) {

								if(obj1.data.deviceType == 7 || obj1.data.deviceType == 17){
									//风速和PH传感器无单位
									$scope.value = obj1.data.lastvalue[0].value;
									$scope.lastValue1 = obj1.data.lastvalue[0].signaltime + "为 " + obj1.data.lastvalue[0].value;
									$scope.lastValue2 = obj1.data.lastvalue[1].signaltime + "为 " + obj1.data.lastvalue[1].value;
								}else{
									$scope.value = obj1.data.lastvalue[0].value + obj1.data.unit;
									$scope.lastValue1 = obj1.data.lastvalue[0].signaltime + "为 " + obj1.data.lastvalue[0].value + obj1.data.unit;
									$scope.lastValue2 = obj1.data.lastvalue[1].signaltime + "为 " + obj1.data.lastvalue[1].value + obj1.data.unit;
								}
								
							} else {
								$scope.value = "--";
								$scope.lastValue1 = "--";
								$scope.lastValue2 = "";
							}
						}
						/*
						  根据设备类型打开信息窗口，定位信息窗口的展现位置
						*/
						$("#infoWindow").css({
							left: (parseInt(($("#" + id)).css("left")) - 90) + 'px'
						});
						$("#infoWindow").css({
							top: (parseInt(($("#" + id)).css("top")) - 130) + 'px'
						});
						$("#infoWindow").css({
							display: "block"
						});
						$("#infoWindow").addClass('show');

						/*
						  隐藏其他类型设备弹窗
						 */
						$("#controllerinfoWindow").css({
							display: "none"
						});
						$("#controllerinfoWindow").removeClass('show');
						$("#videoWindow").css({
							display: "none"
						});
						$("#videoWindow").removeClass('show');
						$("#camerainfoWindow").css({
							display: "none"
						});
						$("#camerainfoWindow").removeClass('show');

					}, function(data) {
						//服务调用失败
					});
					break;
				case 5:
					// 状态开关
					infoType = "controllerinfoWindow"; //控制类
					promise = MonitorService.getOrgControllerInfoSingle(id);
					promise.then(function(data) {
						var obj1 = data;
						//if (obj1.data.length>0) {
						$scope.diviceName = obj1.data.deviceName;
						$scope.diviceType = obj1.data.deviceType;
						$('input[name=check-1]').lc_switch(); //初始化开关控件
						/*
						  初始化设置控制器的开关状态
						 */

						if (obj1.data.lastvalue.length > 0) {
							if (obj1.data.lastvalue[0].currentStatus == 1) {
								$('input').lcs_on();
							} else {
								$('input').lcs_off();
							}
							$scope.lastValue1 = obj1.data.lastvalue[1].recordMessage;
							$scope.lastValue2 = obj1.data.lastvalue[2].recordMessage;
						} else {
							$scope.lastValue1 = "--";
							$scope.lastValue2 = "";
						}
						/*}else{
						  $('input').lc_switch(); //初始化开关控件
						  $('input').lcs_off();
						  $scope.diviceName = obj1.data.deviceName;
						  $scope.diviceType = obj1.data.deviceType;
						  $scope.lastValue1 = 0;
						  $scope.lastValue2 = 0;
						}*/
						/*
						  根据设备类型打开信息窗口，定位信息窗口的展现位置
						*/
						$("#controllerinfoWindow").css({
							left: (parseInt(($("#" + id)).css("left")) - 90) + 'px'
						});
						$("#controllerinfoWindow").css({
							top: (parseInt(($("#" + id)).css("top")) - 130) + 'px'
						});
						$("#controllerinfoWindow").css({
							display: "block"
						});
						$("#controllerinfoWindow").addClass('show');

						/*
						  隐藏其他类型设备弹窗
						 */

						$("#infoWindow").css({
							display: "none"
						});
						$("#infoWindow").removeClass('show');
						$("#videoWindow").css({
							display: "none"
						});
						$("#videoWindow").removeClass('show');
						$("#camerainfoWindow").css({
							display: "none"
						});
						$("#camerainfoWindow").removeClass('show');

					}, function(data) {
						//服务调用失败
					});
					break;
				case 6:
					// 视频
					infoType = "videoWindow"; //视频
					$scope.diviceName = $("#" + id).attr("title");
					// $("#videoWindow").css({
					//   display: "block"
					// });
					// $("#videoWindow").addClass('show');
					//获取球机参数
					promise = MonitorService.getVedioParams(id);

					promise.then(function(data) {
						$scope.diviceType = data.data.deviceType;
						var obj1 = data.data.params;
						videoParams = data.data.params;
						if(statValue ==0){
							videoService.showVideo(obj1); //设备在线才去请求视频
						}

					}, function(data) {
						//服务调用失败

					});

					/*
					  根据设备类型打开信息窗口，定位信息窗口的展现位置
					*/
					$("#videoWindow").css({
						left: (parseInt(($("#" + id)).css("left")) - 90) + 'px'
					});
					$("#videoWindow").css({
						top: (parseInt(($("#" + id)).css("top")) - 360) + 'px'
					});
					$("#videoWindow").css({
						display: "block"
					});
					$("#videoWindow").addClass('show');

					/*
					    隐藏其他类型设备弹窗
					   */

					$("#infoWindow").css({
						display: "none"
					});
					$("#infoWindow").removeClass('show');
					$("#controllerinfoWindow").css({
						display: "none"
					});
					$("#controllerinfoWindow").removeClass('show');
					$("#camerainfoWindow").css({
						display: "none"
					});
					$("#camerainfoWindow").removeClass('show');
					break;
				case 7:
					// 相机
					infoType = "camerainfoWindow"; //相机信息窗口
					promise = MonitorService.getOrgCameraInfoSingle(id);
					promise.then(function(data) {
						var obj1 = data;
						if (obj1.data) {
							$scope.diviceName = obj1.data.deviceName;
							$scope.diviceType = obj1.data.deviceType;
							var dd = JSON.parse(obj1.data.params);
							$scope.clientid = dd.clientid;
							if (obj1.data.lastvalue) {
								$scope.value = obj1.data.lastvalue[0].value + obj1.data.unit;
								$scope.lastValue1 = "http://10.88.20.95/cameraphoto/" + obj1.data.lastvalue[0].minPhotoID;
								$scope.lastValue2 = "http://10.88.20.95/cameraphoto/" + obj1.data.lastvalue[1].minPhotoID;
								$scope.lastValue3 = "http://10.88.20.95/cameraphoto/" + obj1.data.lastvalue[2].minPhotoID;
								$scope.lastValue4 = "http://10.88.20.95/cameraphoto/" + obj1.data.lastvalue[3].minPhotoID;
							} else {
								$scope.value = 0;
								$scope.lastValue1 = 0;
								$scope.lastValue2 = 0;
							}
						}
						/*
						  根据设备类型打开信息窗口，定位信息窗口的展现位置
						*/
						$("#camerainfoWindow").css({
							left: (parseInt(($("#" + id)).css("left")) - 90) + 'px'
						});
						$("#camerainfoWindow").css({
							top: (parseInt(($("#" + id)).css("top")) - 130) + 'px'
						});
						$("#camerainfoWindow").css({
							display: "block"
						});
						$("#camerainfoWindow").addClass('show');

						/*
						  隐藏其他类型设备弹窗
						 */

						$("#infoWindow").css({
							display: "none"
						});
						$("#infoWindow").removeClass('show');
						$("#controllerinfoWindow").css({
							display: "none"
						});
						$("#controllerinfoWindow").removeClass('show');
						$("#videoWindow").css({
							display: "none"
						});
						$("#videoWindow").removeClass('show');

					}, function(data) {
						//服务调用失败
					});
					break;
				default:
					// statements_def
					break;
			}

			//xtn判断是否超过边缘
			var _top=parseInt($("#mainPage").offset().top);
			var _left=parseInt($("#mainPage").offset().left);
			var _mapTop=parseInt($("#img_map").offset().top);
			var _mapLeft=parseInt($("#img_map").css('left'));
			var _typeHeight=parseInt($("#" + infoType).css("height"));
			var _devTop=parseInt($("#"+id).css('top'));
			var _devLeft=parseInt($("#"+id).css('left'));
			
			var _devWidth=parseInt($("#"+id).width());

			var oTop=_devTop-_typeHeight;
			
			var oLeft=_devLeft-90;


			//判断顶部距离
			if(_mapTop >= 0 || _mapTop==NaN){
				if(oTop < 0 || oTop==NaN ){
					$("#img_map").addClass('animal');
					$("#img_map").css('top',(Math.abs(oTop)+40+'px'));
				}
			}else{
				if(oTop > 0 && (_devTop+_mapTop < _typeHeight)){

						$("#img_map").addClass('animal');
						$("#img_map").css('top','20px');

						
				}
				
					$("#img_map").addClass('animal');
				  $("#img_map").css('top',_mapTop+40+'px');
				
			}
			

			
			//判断距离左边距离
			if(_mapLeft <= 0 || _mapLeft==NaN){
				if(oLeft<0){
						$("#img_map").addClass('animal');
				    $("#img_map").css('left',Math.abs(oLeft)+40+'px');
				}
				$("#img_map").addClass('animal');
				$("#img_map").css('left','20px');
			} else{
					if(oLeft <= 0 || oLeft==NaN){
							$("#img_map").addClass('animal');
					    $("#img_map").css('left',Math.abs(oLeft)+40+'px');
					}
			}
			
		//判断右边距
		var smallLfet=_devLeft-_pageWidth/2;
		switch (_windowWidth){
			case 768:
				$("#img_map").css('left',-smallLfet-80+'px');
				break;
			case 1366:
			
				$("#img_map").css('left',-smallLfet-200+'px');
				break;
			default:
				if(_mapLeft < 0){
					if(_pageWidth-_devWidth < _devLeft){
						$("#img_map").css('left',-80+'%');
					}
				}else{
					if((_mapLeft+_devLeft ) > _pageWidth/2){
						$("#img_map").css('left','-100px');
					}
				};
		}


		$("#"+id).mouseout(function(){
				$("#img_map").removeClass('animal');
		});
			
			
			
			
			
			


			/*
			  计算弹出窗顶部的距离，不让弹窗遮挡
			 */
			// var ddd = parseInt($("#img_map").css("top")) + parseInt($("#" + id).css("top"));
			// var ccc = parseInt($("#" + infoType).css("height"));
			// if (ddd < ccc) {
			//   $("#img_map").css({
			//     top: ccc - ddd
			//   });
			// }

			/*
			  计算弹出窗左侧的距离，避免弹窗遮挡
			 */
			// var eee = parseInt($("#img_map").css("left"));
			// var fff = parseInt($("#" + infoType).css("left"));
			// if ((fff + eee) < 0) {
			//   $("#img_map").css({
			//     left: eee - (eee + fff)
			//   });
			// }
			/*
			  计算弹出窗右侧的距离，不让弹窗遮挡
			 */
			// var ggg1 = parseInt($("#img_map").css("left"));
			// var ggg2 = parseInt($("#" + infoType).css("left"));
			// var ggg3 = parseInt($("#" + infoType).css("width"));
			// var hhh = parseInt($("#img_map").css("width"));
			// if ((ggg1 + ggg2 + ggg3) > hhh) {
			//   $("#img_map").css({
			//     left: hhh - (ggg1 + ggg2 + ggg3)
			//   });
			// }

			//绑定设备关闭事件
			$(".common-monitor-device-page-right-close").one("click", function() {
				$("#" + infoType).css({
					display: "none"
				});
				$("#" + infoType).removeClass('show');
			});
			//绑定设备关闭事件
			$(".common-monitor-video-page-right-close").one("click", function() {
				$("#" + infoType).css({
					display: "none"
				});
				$("#" + infoType).removeClass('show');
			});
			
			
			if (statValue == -1){
           $(".mycamera").addClass('gray');
            }else {
                $(".mycamera").removeClass('gray');
                 if(btns.indexOf(deviceType) != -1){
	                 	if(statValue == 202){
	                 		$("#controllerClass").addClass(' myrotate');
	                 	}else{
	                 		$("#controllerClass").removeClass(' myrotate');
	                 	}
                }else{
                	$("#controllerClass").removeClass(' myrotate');
                }
            }

		};

		/*
		  设置传感设备规则
		 */
		$scope.sensorSet = function(divceId, diviceName) {
			var navItem = {
				href: 'app.sensorSet',
				text: diviceName + "设置",
			}
			$scope.addNavItem(navItem);
			$state.go('app.sensorSet', {
				"data": divceId,
				"diviceName": diviceName,
				"orgId":orgId
			});
		};

		/*
		  查看传感设备报表
		 */
		$scope.sensorReport = function(divceId, diviceName, diviceType) {
			var navItem = {
				href: 'app.reportPage',
				text: diviceName + "报表",
			}
			$scope.addNavItem(navItem);
			$state.go('app.reportPage', {
				"orgId": orgId,
				"deviceType": diviceType,
				"deviceLst": [divceId],
				"isCompare": true,
			});
		};

		/*
		  设置控制设备规则
		 */
		$scope.controllerSet = function(divceId, diviceName) {
			var navItem = {
				href: 'app.controlSet',
				text: diviceName + "设置",
			}
			$scope.addNavItem(navItem);
			$state.go('app.controlSet', {
				"data": divceId,
				"diviceName": diviceName
			});
		};

		/*
		  查看控制设备报表
		 */
		$scope.controllerReport = function(divceId, diviceName, diviceType) {
			var navItem = {
				href: 'app.reportPage',
				text: diviceName + "报表",
			}
			$scope.addNavItem(navItem);
			$state.go('app.reportPage', {
				"orgId": orgId,
				"deviceType": diviceType,
				"deviceLst": [divceId],
				"isCompare": false,
			});
		};

		/*
		  控制设备操作（打开或关闭）
		 */
		$scope.open = function(divceId) {
			var act;
			var status = ($(".lcs_check").is(':checked')) ? 'unchecked' : 'checked';
			if (status == "unchecked") {
				act = 0;
			} else {
				act = 1;
			}
			var promise = MonitorService.controller(userid, divceId, act); //开关控制
			promise.then(function(data) {

			}, function(data) {
				//服务调用失败
			});

		};

		/*
		  设置相机规则
		 */
		$scope.cameraSet = function(divceId, diviceName,clientid) {
			var navItem = {
				href: 'app.cameraSet',
				text: diviceName + "设置",
			}
			$scope.addNavItem(navItem);
			$state.go('app.cameraSet', {
				"data": divceId,
				"diviceName": diviceName,
				"clientid":clientid
			});
		};

		/*
		  查看相机报表
		 */
		$scope.cameraReport = function(divceId, diviceName, diviceType) {
			var navItem = {
				href: 'app.reportPage',
				text: diviceName + "报表",
			}
			$scope.addNavItem(navItem);
			$state.go('app.reportPage', {
				"orgId": orgId,
				"deviceType": diviceType,
				"deviceLst": [divceId],
				"isCompare": false,
			});
		};

		/*
		  相机设备操作（拍摄）
		 */
		$scope.cameraOperate = function(clientid,mystatValue) {
			if (mystatValue == -1){
				$scope.toasterType.body="设备处于离线状态,禁止拍照！";
				$scope.toasterType.type= 'error';
				$scope.pop();
			}else {
			  //打开弹窗
				var modalInstance = $modal.open({
					templateUrl: 'function/monitor/contro/cameraDialog.html',
					backdrop: 'static',
					controller: 'cameraController',
					keyboard: false,
					resolve: {
						userId:function () {
							return $cookieStore.get("id");
						},
						_devicesId:function () {
							return clientid;
						}
					}
				});
			}
		};
		/*
			查看图片详情
		 */
		$scope.queryPhoto = function(divceId, diviceType){
			var paramObj = {
				orgId: orgId,
				deviceId: divceId,
				deviceTypeId: diviceType,
				count:6
			}
			var pormise = ReportService.queryNowImgDataByDeviceId(paramObj);
				pormise.then(function(data) {
					if(data && data.flag === 1 && data.data) {
		    			$scope.deviceLst = data.data;
			    	}

					var dialogTemplate = [];
					dialogTemplate.push('<div id="img-show-dialog" class="dialog-panel">');
					dialogTemplate.push('<div class="dialog-top-bar">');
    				dialogTemplate.push('<div class="dialog-close-btn" ng-click="cancel();"></div>');
					dialogTemplate.push('<div class="dailog-title">');
        			dialogTemplate.push('<span class="split">&gt;</span>');
        			dialogTemplate.push('<span class="title">{{dialogTitle}}</span>');
					dialogTemplate.push('</div>');
					dialogTemplate.push('</div>');
					dialogTemplate.push('<div class="dialog-content">');
					dialogTemplate.push('<div class="report-img-dialog">');
					dialogTemplate.push('<div class="dialog-tool-bar">');
					dialogTemplate.push('<div class="dialog-title">');
					dialogTemplate.push('<span class="title-icon"></span>');
					dialogTemplate.push('<span class="title-text">拍摄时间:{{curryImgTitle}}</span>');
					dialogTemplate.push('</div>');
					dialogTemplate.push('</div>');
					dialogTemplate.push('<div class="dialog-content-panel">');
					dialogTemplate.push('<div id="img-show-panel" class="img-show-panel">');
					dialogTemplate.push('<div class="element_to_magnify" style="width:100%; height:100%;">');
					dialogTemplate.push('<img src="{{imgBaseUrl}}{{imgLst[0].maxImg}}">');
					dialogTemplate.push('</div>');
					dialogTemplate.push('</div>');
					dialogTemplate.push('<div class="img-lst-panel">');
					dialogTemplate.push('<ul class="img-lst">');
					dialogTemplate.push('<li ng-class="{\'active\': $index === 0}" ng-repeat="imgObj in imgLst" ng-click="imgChange($event);" data-title="{{imgObj.title}}" data-tip="{{imgObj.tip}}" data-min-img="{{imgObj.minImg}}" data-mid-img="{{imgObj.midImg}}" data-max-img="{{imgObj.maxImg}}">');
					dialogTemplate.push('<div class="img-item">');
					dialogTemplate.push('<div class="img-tip">{{imgObj.title}}</div>');
					dialogTemplate.push('<img class="img" src="{{imgBaseUrl}}{{imgObj.minImg}}">');
					dialogTemplate.push('</div>');
					dialogTemplate.push('</li>');
					dialogTemplate.push('</ul>');
					dialogTemplate.push('</div>');
					dialogTemplate.push('</div>');
					dialogTemplate.push('</div>');
					dialogTemplate.push('</div>');
					dialogTemplate.push('</div>');

					$scope.curryImgTitle = "";
					$scope.imgLst = [];

					//var groupKey = data.closest('li').data("groupKey");

			    	var modalInstance = $modal.open({
		            	template : dialogTemplate.join(''),  //指向上面创建的视图
		            	controller : reportImgDialogController,// 初始化模态范围
		            	resolve : {
		                	dialogParam : function(){
		                    	return {
		                       		imgBaseUrl: 'http://10.88.20.95/cameraphoto/',
		                        	deviceLst: $scope.deviceLst
		                    	}
		                	}
		            	}
		        	});
		        	modalInstance.opened.then(function () {
		           		setTimeout(function() {
		           			$("#img-show-dialog").closest(".modal-dialog").css({
		           				"width": "844px",
		           				"margin-top": "60px",
		           				"margin-bottom": "200px",
		           			});
		           			$("#img-show-dialog").closest(".modal-content").css({
		           				"margin-top":"60px"
		           			});

		            		$("#img-show-panel").jfMagnify();
		            	}, 100);
		            	
		        	});
		            modalInstance.result.then(function (result) {
		              //console.log(result);
		            	}, function (reason) {
		              	//$log.info('Modal dismissed at: ' + new Date());
		       		});
  			}, function(data) {

  			});
		};
		var reportImgDialogController = function($scope, $http, $modalInstance, dialogParam) {
	    	$scope.dialogTitle = "图片放大浏览";
	    	$scope.curryImgTitle = "";
	    	$scope.imgBaseUrl = dialogParam.imgBaseUrl;
	    	$scope.imgLst = dialogParam.deviceLst;
	    	
			$scope.imgChange = function($event) {
				var target = $event.target;
				if($(target).closest("li.active").length == 0) {
					$(target).closest("li").siblings().removeClass('active');
		    		$(target).closest("li").addClass("active");
		    		var imgUrl = $scope.imgBaseUrl + $(target).closest("li").data("maxImg");
		    		$scope.curryImgTitle = $(target).closest("li").data("title");
		    		if($("#img-show-panel").data("jfMagnify")){
		    			$("#img-show-panel").data("jfMagnify").destroy();
		    		}
		    		$("#img-show-panel").find("img").attr("src", imgUrl);
		    		if(imgUrl){
		    			$("#img-show-panel").jfMagnify();
		    		}
				}
			};
			$scope.cancel = function() {
				if($("#img-show-panel").data("jfMagnify")){
					$("#img-show-panel").data("jfMagnify").destroy();
				}
	            $modalInstance.dismiss('cancel'); // 退出
	        };
    	};

		/*
		  视频设备查看全部
		 */
		$scope.queryAllVideo = function(diviceName) {
				var navItem = {
					href: 'app.allVedios',
					text: "查看全部",
				}
				$scope.addNavItem(navItem);
				$state.go('app.allVedios', {
					"orgid": orgId
				});
			}
			/*
			  视频设备联动规则设置
			 */
		$scope.videoSet = function(divceId, diviceName) {
			var navItem = {
				href: 'app.setLinkage',
				text: diviceName + "设置",
			}
			$scope.addNavItem(navItem);
			$state.go('app.setLinkage', {
				"data": divceId,
				"diviceName": diviceName,
				"orgId": orgId
			});
		};

		/*
		  视频设备硬件参数设置
		 */
		$scope.videoParamSet = function(divceId, diviceName) {
			var navItem = {
				href: 'app.parameterSet',
				text: diviceName + "设置",
			}
			$scope.addNavItem(navItem);
			$state.go('app.parameterSet', {
				"diviceName": diviceName,
				"deviceIP": videoParams.serviceIP,
				"sdkPort": '8000',
				"userName": videoParams.userName,
				"password": videoParams.password,
				"number": videoParams.channelID
			});

		};

		/*
		  查看视频预警记录
		 */
		$scope.videoAlarmRecord = function(divceId, diviceName, diviceType) {
			var navItem = {
				href: 'app.reportPage',
				text: diviceName + "报表",
			}
			$scope.addNavItem(navItem);
			$state.go('app.reportPage', {
				"orgId": orgId,
				"deviceType": diviceType,
				"deviceLst": [divceId],
				"isCompare": false,
				"gridType": 1
			});
		};

		/*
		  查看视频联动记录
		 */
		$scope.videoLinkRecord = function(divceId, diviceName, diviceType) {
			var navItem = {
				href: 'app.reportPage',
				text: diviceName + "报表",
			}
			$scope.addNavItem(navItem);
			$state.go('app.reportPage', {
				"orgId": orgId,
				"deviceType": diviceType,
				"deviceLst": [divceId],
				"isCompare": false,
				"gridType": 2
			});
		};

		/*
		  视图切换
		 */
		$scope.showListView = function() {

			$state.go('app.listView', {
				//"data":$rootScope.orgId
				"data": orgId
			});
		};

		
		/*
		  Jquery实现部分
		 */
		(function() {

			$("#img_map").draggable();
			/*if ($("#imgbg").width() < 100) {
				$("#img_map").css({
					width: 6000+"px",
				});
			} else {
				$("#img_map").css({
					width: ($("#imgbg").width() + 200) + 'px'
				});
			}*/

			/*
			  底部信息栏展现和隐藏图标切换
			 */
			$("#upDown").click(function() {
				if ($("#demo").hasClass("in")) {
					$("#upDown").removeClass("icon-chevron-down");
					$("#upDown").addClass("icon-chevron-up");
				} else {
					$("#upDown").removeClass("icon-chevron-up");
					$("#upDown").addClass("icon-chevron-down");
				}
			});


			

			//xtn查看分组信息
			$(".see-group").click(function () {
				$(this).toggleClass('see-group-active');
				$(".groupbox").toggle();
				if (!$(this).hasClass('see-group-active')){
					angular.forEach(diviceIdArray,function (device) {
						$("#"+device+"group").hide();
						$("#"+device+"red").hide();
						$("#"+device+"myCheck").hide();
						$("#"+device+"check").prop({checked:false});
					})
				}
			});
			
		})();

	}

]);


