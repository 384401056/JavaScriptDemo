(function(angular) {
	angular.module("app").constant('imgReportConfig', {
		imgBaseUrl: 'http://10.88.20.95/cameraphoto/',
		dialogBtnText: '浏览',
		dialogTitle: '图片放大浏览',
		errorInfo: '数据错误，图片列表加载失败'
	});
	angular.module("app").directive("imgReport",["imgReportConfig", function(imgReportConfig){
		var formTemplate = [];
		formTemplate.push('<div class="report-img-main">');
		formTemplate.push('<div class="acp-report-cdts">');
		formTemplate.push('<div class="fast-btn-group" ng-click="fastBtnClick($event);">');
		formTemplate.push('<span class="fast-today active">本日</span>');
		formTemplate.push('<span class="fast-seven">近7天</span>');
		formTemplate.push('<span class="fast-thirty">近30天</span>');
		formTemplate.push('</div>');
		formTemplate.push('<div class="dateTime-pick-panel">');
		formTemplate.push('<span>');
		formTemplate.push('<input id="startDate" class="dateTime-picker start-data-picker" size="16" type="text" value="" readonly="true"  onclick="$(this).blur();">');
		formTemplate.push('</span>');
		formTemplate.push('<span>&nbsp;至&nbsp;</span>');
		formTemplate.push('<span>');
		formTemplate.push('<input id="endDate" class="dateTime-picker end-data-picker" size="16" type="text" value="" readonly="true"  onclick="$(this).blur();">');
		formTemplate.push('</span>');
		formTemplate.push('</div>');
		formTemplate.push('<div class="form-btn-panel" ng-click="formBtnClick($event);">');
		formTemplate.push('<span class="search-btn">查询</span>');
		formTemplate.push('<span class="compare-btn" ng-show="{{compareShow == \'1\'}}">与历史均值对比</span>');
		formTemplate.push('</div>');
		formTemplate.push('</div>');
		formTemplate.push('<div class="report-panel report-img-panel">');
		formTemplate.push('<div class="report-panel-top">');
		formTemplate.push('<div class="report-title-icon"></div>');
		formTemplate.push('<div class="opt-panel">');
		formTemplate.push('</div>');
		formTemplate.push('<div class="title-panel">');
		formTemplate.push('<span class="title">{{reportTitle}}</span>');
		formTemplate.push('<span class="date-time">{{reportDateStr}}</span>');
		formTemplate.push('</div>');
		formTemplate.push('</div>');
		formTemplate.push('<div class="report-panel-content">');
		formTemplate.push('<div id="report-img-box" class="img-box">');
		formTemplate.push('<div class="img-group-panel" ng-repeat="deviceObj in deviceLst">');
		formTemplate.push('<h3><em></em>{{deviceObj.deviceName}}</h3>');
		formTemplate.push('<ul class="img-lst">');
		formTemplate.push('<li ng-repeat="groupObj in deviceObj.imgGroupLst" data-device-id="{{deviceObj.deviceId}}" data-group-key="{{groupObj.groupKey}}">');
		formTemplate.push('<div class="img-item">');
		formTemplate.push('<img class="img" src="{{imgBaseUrl}}{{groupObj.dataLst[0].midImg}}">');
		formTemplate.push('<div class="img-bar">');
		formTemplate.push('<span class="img-opt" ng-click="openImgDialog($event);">{{dialogBtnText}}</span>');
		formTemplate.push('<span class="img-info">{{groupObj.groupKey}} 共{{groupObj.totalNum}}张 第1张</span>');
		formTemplate.push('</div>');
		formTemplate.push('</div>');
		formTemplate.push('</li>');
		formTemplate.push('</ul>');
		formTemplate.push('</div>');
		formTemplate.push('</div>');
		formTemplate.push('</div>');
		formTemplate.push('</div>');
		formTemplate.push('</div>');

		var dialogTemplate = [];
		dialogTemplate.push('<style type="text/css">');
		dialogTemplate.push('.modal-dialog {');
		dialogTemplate.push('width:844px;');
		dialogTemplate.push('margin:60px auto;');
		dialogTemplate.push('}');
		dialogTemplate.push('</style>');
		dialogTemplate.push('<div class="dialog-panel">');
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
		dialogTemplate.push('<div class="dialog-opts">');
		dialogTemplate.push('<div class="opt-item device-select-opt" ng-if="deviceOptArry.length > 1">');
		dialogTemplate.push('<select class="device-select" ng-model="deviceId" ng-options="deviceObj.id as deviceObj.name for deviceObj in deviceOptArry" ng-change="deliverChange(deviceId);"></select>');
		dialogTemplate.push('</div>');
		dialogTemplate.push('<div class="opt-item data-select-opt" ng-if="dateStrArry.length > 1">');
		dialogTemplate.push('<select class="date-select" ng-model="groupKey" ng-options="dateStr as dateStr for dateStr in dateStrArry" ng-change="dateChange(groupKey);"></select>');
		dialogTemplate.push('</div>');
		dialogTemplate.push('</div>');
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

		var directiveDefinitionObject = {
			priority: 1,
			terminal: false,
			scope: {
				imgReportDataLoad: '&'
			},
			controller: function($scope, $element, $attrs, $transclude, $modal) {
				$scope.curryImgTitle = "";
				$scope.imgLst = [];
				$scope.openImgDialog = function($event) {
					var target = $event.target;
					var deviceId = $(target).closest('li').data("deviceId");
					var groupKey = $(target).closest('li').data("groupKey");
			    	var modalInstance = $modal.open({
		                template : dialogTemplate.join(''),  //指向上面创建的视图
		                controller : reportImgDialogController,// 初始化模态范围
		                resolve : {
		                    dialogParam : function(){
		                        return {
		                        	imgBaseUrl: $scope.imgBaseUrl,
		                        	deviceId: deviceId,
		                        	groupKey: groupKey,
		                        	deviceLst: $scope.deviceLst
		                        }
		                    }
		                }
		            })
		            modalInstance.opened.then(function () {
		            	setTimeout(function() {
		            		$("#img-show-panel").jfMagnify();
		            	}, 100);
		            	
		            });
		            modalInstance.result.then(function (result) {
		              //console.log(result);
		            }, function (reason) {
		              //$log.info('Modal dismissed at: ' + new Date());
		            });
			    };

			    var reportImgDialogController = function($scope, $http, $modalInstance, dialogParam) {
			    	$scope.dialogTitle = imgReportConfig.dialogTitle;
			    	$scope.curryImgTitle = "";
			    	$scope.imgBaseUrl = dialogParam.imgBaseUrl;
			    	$scope.deviceId = dialogParam.deviceId;
			    	$scope.groupKey = dialogParam.groupKey;
			    	$scope.deviceLst = dialogParam.deviceLst;
			    	$scope.imgLst = [];
			    	$scope.deviceOptArry = [];
			    	$scope.dateStrArry = [];
			    	for(var i=0; i<$scope.deviceLst.length; i++) {
			    		var deviceObj = {
			    			id: $scope.deviceLst[i].deviceId,
							name: $scope.deviceLst[i].deviceName
			    		};
			    		$scope.deviceOptArry.push(deviceObj);
			    		if($scope.deviceId === $scope.deviceLst[i].deviceId && $scope.deviceLst[i].imgGroupLst && $scope.deviceLst[i].imgGroupLst.length > 0) {
			    			var imgGroupLst = $scope.deviceLst[i].imgGroupLst;
			    			for(var j=0; j<imgGroupLst.length; j++) {
			    				$scope.dateStrArry.push(imgGroupLst[j].groupKey);
			    				if($scope.groupKey === imgGroupLst[j].groupKey){
			    					if(imgGroupLst[j].dataLst) {
			    						$scope.imgLst = imgGroupLst[j].dataLst;
			    						if($scope.imgLst.length > 0){
			    							$scope.curryImgTitle = $scope.imgLst[0].title;
			    						}
			    					}
			    				}
			    			}
			    		}
			    	}

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

					$scope.deliverChange = function(deviceId) {
						if($("#img-show-panel").data("jfMagnify")){
			    			$("#img-show-panel").data("jfMagnify").destroy();
			    		}
						for(var i=0; i<$scope.deviceLst.length; i++) {
				    		if(deviceId === $scope.deviceLst[i].deviceId && $scope.deviceLst[i].imgGroupLst && $scope.deviceLst[i].imgGroupLst.length > 0) {
				    			$scope.dateStrArry.length = 0;
				    			var imgGroupLst = $scope.deviceLst[i].imgGroupLst;
				    			for(var j=0; j<imgGroupLst.length; j++) {
				    				$scope.dateStrArry.push(imgGroupLst[j].groupKey);
				    				if(j === 0) {
				    					$scope.groupKey = imgGroupLst[j].groupKey;
				    					if(imgGroupLst[j].dataLst) {
				    						$scope.imgLst = imgGroupLst[j].dataLst;
				    						if($scope.imgLst.length > 0){
				    							$scope.curryImgTitle = $scope.imgLst[0].title;
				    							if($scope.imgLst[0].maxImg) {
				    								setTimeout(function() {
				    									$("#img-show-panel").jfMagnify();
				    								}, 100);
				    							}
				    						}
				    					}
				    				}
				    			}
				    		}
			    		}
					};

					$scope.dateChange = function(groupKey) {
						if($("#img-show-panel").data("jfMagnify")){
			    			$("#img-show-panel").data("jfMagnify").destroy();
			    		}
						for(var i=0; i<$scope.deviceLst.length; i++) {
				    		if($scope.deviceId === $scope.deviceLst[i].deviceId && $scope.deviceLst[i].imgGroupLst && $scope.deviceLst[i].imgGroupLst.length > 0) {
				    			var imgGroupLst = $scope.deviceLst[i].imgGroupLst;
				    			for(var j=0; j<imgGroupLst.length; j++) {
				    				if(groupKey === imgGroupLst[j].groupKey){
				    					if(imgGroupLst[j].dataLst) {
				    						$scope.imgLst = imgGroupLst[j].dataLst;
				    						if($scope.imgLst.length > 0) {
				    							$scope.curryImgTitle = $scope.imgLst[0].title;
				    							if($scope.imgLst[0].maxImg) {
				    								setTimeout(function() {
				    									$("#img-show-panel").jfMagnify();
				    								}, 100);
				    							}
				    						}
				    					}
				    				}
				    			}
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
			    
			    $scope.openMsgDialog = function(msg) {
					var template = [];
					template.push('<style>');
					template.push('.modal-dialog{');
					template.push('margin-top:60px;');
					template.push('}');
					template.push('.dialog-content{');
					template.push('margin-bottom:-10px;');
					template.push('}');
					template.push('div.modal-dialog {');
					template.push('margin-top: 15%;');
					template.push('}');
					template.push('</style>');
					template.push('<div class="dialog-panel">');
					template.push('<div class="dialog-top-bar">');
					template.push('<div class="dialog-close-btn" ng-click="cancel();"></div>');
					template.push('<div class="dailog-title">');
					template.push('<span class="split">&gt;</span>');
					template.push('<span class="title">提示</span>');
					template.push('</div>');
					template.push('</div>');
					template.push('<div class="dialog-content">');
					template.push('<div style="float: left;margin-top: 30px;margin-left: 30px; text-align: center;">');
					template.push('<i class="icon-warning-sign"></i>');
					template.push('<span>');
					template.push(msg);
					template.push('</span>');
					template.push('</div>');
					template.push('</div>');
					template.push('</div>');
					var modalInstance = $modal.open({
						template : template.join(''), 
						controller: function($scope, $modalInstance) {
							$scope.cancel = function() {
								$modalInstance.dismiss('cancel');
							};
						},
						backdrop: 'static',
						keyboard: false,
						size:'sm',
					});
				};
			},
			restrict: 'E',
			template: formTemplate.join(''),
			replace: true,
			transclude: false,
			// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
			link: function($scope, iElm, iAttrs, controller) {
				var now = new Date();
				var nowStr = (now.getFullYear()) + "-" + (now.getMonth() + 1) + "-" + (now.getDate());
				$scope.imgBaseUrl = imgReportConfig.imgBaseUrl;
				$scope.reportDateStr = nowStr + " 00:00 至 " + nowStr + " 23:59";
				$scope.dialogBtnText = imgReportConfig.dialogBtnText;
				$scope.startDate = $("#startDate").val();
				$scope.endDate = $("#endDate").val();
				$scope.reportTitle = "图像采集";
				$scope.fastDateType = "1";
				$scope.compareShow = "0";
				$scope.compareFlag = "0";
				$scope.deviceLst = [];

				$('.report-img-main .dateTime-picker').datetimepicker({
					format: 'yyyy-mm-dd hh:ii',
			        language:  'zh-CN',
			        weekStart: 1,
			        todayBtn:  1,
					autoclose: 1,
					todayHighlight: 1,
					startView: 2,
					forceParse: 0,
			        showMeridian: 1
			    }).on('changeDate', function(event) {
			    	var target = event.target;
			    	if($(target).hasClass("start-data-picker")) {
			    		$scope.startDate = $(target).val();
			    		if($scope.endDate && $scope.startDate > $scope.endDate) {
			    			$scope.startDate = null;
			    			$(target).val("");
			    			$scope.openMsgDialog("对不起，开始时间不能晚于结束时间！");
			    			$(target).focus();
			    		}else {
			    			$("#endDate").datetimepicker("setStartDate", $(target).val());
			    			$(".fast-btn-group").find(".active").removeClass("active");
			    		}
			    	}else if($(target).hasClass("end-data-picker")) {
			    		$scope.endDate = $(target).val();
			    		if($scope.startDate && $scope.startDate > $scope.endDate) {
			    			$scope.endDate = null;
			    			$(target).val("");
			    			$scope.openMsgDialog("对不起，结束时间不能早于起始时间！");
			    			$(target).focus();
			    		}else {
			    			$("#startDate").datetimepicker("setEndDate", $(target).val());
			    			$(".fast-btn-group").find(".active").removeClass("active");
			    		}
			    	}
			    });
				
			    $scope.fastBtnClick = function(event) {
			    	var target = event.target;
			    	if(!$(target).hasClass("active")) {
			    		$(target).siblings().removeClass('active');
			    		$(target).addClass("active")
			    		if($(target).hasClass("fast-thirty")) {
			    			$scope.fastDateType = "3";
			    		}else if($(target).hasClass("fast-seven")) {
			    			$scope.fastDateType = "2";
			    		}else {
			    			$scope.fastDateType = "1";
			    		}
			    		$scope.startDate = null;
			    		$("#startDate").val("");
						$scope.endDate = null;
						$("#endDate").val("");
						$scope.reloadImgReport();
			    	}
			    };

			    $scope.formBtnClick = function(event) {
			    	var target = event.target;
			    	if($(target).hasClass("compare-btn")){
			    		$scope.compareFlag = "1";
			    	}else {
			    		$scope.compareFlag = "0";
			    	}
			    	$scope.reloadImgReport();
				};

			    $scope.reloadImgReport = function() {
					if(cdtCheck()) {
						var data = {
			    			fastDateType: $scope.fastDateType,
			    			startDate: $scope.startDate,
			    			endDate: $scope.endDate
			    		};
			    		$scope.imgReportDataLoad({param:data, callback: doInit});
					}
				};

			    var doInit = function(rstData) {
			    	if(rstData && rstData.flag === 1 && rstData.data) {
			    		var imgReportData = rstData.data;
			    		$scope.reportTitle = imgReportData.reportTitle ? imgReportData.reportTitle : $scope.reportTitle;
		    			$scope.reportDateStr = imgReportData.reportDateStr;
		    			$scope.deviceLst = imgReportData.deviceLst;
			    	}
			    	setTimeout(function() {
			    		$("#report-img-box").slide({ titCell:"h3", targetCell:"ul", effect:"slideDown", delayTime:300 , trigger:"click", triggerTime:150, defaultPlay:true, returnDefault:false,easing:"swing" });
			    	}, 100);
			    };

			    var cdtCheck = function() {
			    	if($scope.startDate || $scope.endDate) {
			    		if($scope.startDate && $scope.endDate) {
			    			return true;
			    		}else{
			    			if($scope.startDate) {
			    				$scope.openMsgDialog("对不起，请正确选择结束时间！");
			    			}else if($scope.endDate) {
			    				$scope.openMsgDialog("对不起，请正确选择开始时间！");
			    			}else {
			    				$scope.openMsgDialog("对不起，请正确选择报表筛选条件！");
			    			}
			    			return false;
			    		}
			    	}else if($(".fast-btn-group").find(".active").length > 0) {
			    		return true;
			    	}else {
			    		$scope.openMsgDialog("对不起，请正确选择报表筛选条件！");
			    		return false;
			    	}
			    };

			    //初始化图片报表
			    $scope.reloadImgReport();
			}
		};

		return directiveDefinitionObject;
	}]);
})(angular);