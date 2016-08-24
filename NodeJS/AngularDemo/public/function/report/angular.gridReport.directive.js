(function() {
	Array.prototype.remove = function(val) {
		var array = this;
		for(var i in array) {
			if(array[i] == val) {
				array.splice(i,1);
				return array;
			}
		}
	};
	angular.module("app").constant('chartConfig', {
		loadingText:'正在加载图表数据',
		noDataLoadingText:'图表数据为空',
		errorLoadingText: '数据错误，图表加载失败'
	});

	angular.module("app").directive("gridReport",["chartConfig", function(chartConfig) {
		//控制记录
		var template = [];
		template.push('<div><div class="acp-report-cdts">');
		template.push('<div class="fast-btn-group" ng-click="fastBtnClick($event);">');
		template.push('<span class="fast-today active">本日</span>');
		template.push('<span class="fast-seven">近7天</span>');
		template.push('<span class="fast-thirty">近30天</span>');
		template.push('</div>');
		template.push('<div class="dateTime-pick-panel">');
		template.push('<span><input id="startTime" class="dateTime-picker start-data-picker" size="16" type="text" value="" readonly="true"  onclick="$(this).blur();"></span>');
		template.push('<span>&nbsp;至&nbsp;</span><span><input id="endTime" class="dateTime-picker end-data-picker" size="16" type="text" value="" readonly="true"  onclick="$(this).blur();"></span>');
		template.push('</div><div class="form-btn-panel" ng-click="formBtnClick($event);">');
		template.push('<span class="search-btn">查询</span>');
		template.push('</div></div>');
		template.push('<div class="report-panel"><div class="report-panel-top"><div class="report-title-icon"></div><div class="opt-panel">');
		template.push('<span class="combo-button-active" ng-click="saveAs()">');
		template.push('<span class="export-icon icon-save" style="color:#00A65A;line-height: 35px;"></span>另存为Excel文件</span>');
		template.push('</div>');
		template.push('<div class="title-panel">');
		template.push('<span class="title">{{ reportTitle }}</span>');
		template.push('<span class="date-time">{{ reportDateStr }}</span>');
		template.push('</div></div>');
		template.push('<div class="report-content-bottom">');
		template.push('<div id="" class="report-panel"><div>');
		template.push('<table style="width:100%"><tr class="tr-odd">');
		template.push('<th ng-if="gridType !== \'1\'">序号</th>');
		template.push('<th ng-if="gridType !== \'1\'">启动时间</th>');
		template.push('<th ng-if="gridType === \'1\'">时间</th>');
		template.push('<th ng-if="gridType === \'0\'">控制类型</th>');
		template.push('<th ng-if="gridType !== \'1\'">开关类型</th>');
		template.push('<th ng-if="gridType === \'0\'">灌溉时长</th>');
		template.push('<th ng-if="gridType === \'2\'">联动时长</th>');
		template.push('<th ng-if="gridType !== \'1\'">结束时间</th>');
		template.push('<th ng-if="gridType === \'1\'">内容</th>');
		template.push('<th ng-if="gridType !== \'0\'">操作</th>');
		template.push('</tr>');
		template.push('<tr class=" {{ item.rowClass }}" ng-model="record" ng-repeat="item in record">');
		template.push('<td ng-if="gridType !== \'1\'">{{ $index }}</td>');
		template.push('<td>{{ item.startTime }}</td>');
		template.push('<td ng-if="gridType === \'0\'">{{ item.controlType }}</td>');
		template.push('<td ng-if="gridType !== \'1\'">{{ item.switchType }}</td>');
		template.push('<td ng-if="gridType === \'0\' || gridType === \'2\'">{{ item.timeLength }}</td>');
		template.push('<td ng-if="gridType !== \'1\'">{{ item.endTime }}</td>');
		template.push('<td ng-if="gridType === \'1\'">{{ item.content }}</td>');
		template.push('<td ng-if="gridType !== \'0\'">{{ item.eve }}</td>');
		template.push('</tr>');
		template.push('</table></div>');
		template.push('<div class="acp-card-pagination"><div class="pageInfo col-md-3 col-sm-4 col-xs-4 pull-right">');
		template.push('<span class="icon-caret-left inavailable" style="color:#00a65a;font-size:14pt;" ng-click="prePage()"></span>&nbsp;');
		template.push('<span class="curry-page-panel">第 ');
		template.push('<input class="curry-page-ipt" ng-model="pageInfo.currentPage" type="text" ng-keyup="selectpage($event);" /> 页</span>');
		template.push('<span>共&nbsp;{{ pageInfo.totalPage }}&nbsp;页</span>&nbsp;');
		template.push('<span class="icon-caret-right available" style="color:#00a65a;font-size:14pt;" ng-click="nextPage()"></span>');
		template.push('<span class="total-items-panel">【共 {{pageInfo.totalRecord}} 条】</span>');
		template.push('</div></div></div></div></div></div>');

		return {
			priority: 1,
			terminal: false,
			scope: {
				gridReportDataLoad: '&'
			},
			controller: function($scope, $element, $attrs, $transclude, $modal) {
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
			replace: true,
			transclude: false,
			link:function(scope, element, attrs, controller) {
				scope.gridType = scope.$parent.gridType;
				
				//报表名称
				scope.reportTitle = '控制器报表';
				//快捷日期类型
				scope.fastDateType = "1";
				//开始日期
				scope.startTime = $("#startTime").val();
				//结束日期
				scope.endTime = $("#endTime").val();
				//分页信息
				scope.pageInfo = {
					currentPage: 1,
					totalPage: 1,
					pageSize: 10,
					totalRecords: 10
				};
				scope.gridReportDataLoad({param:{"fastDateType":scope.fastDateType,"startDate":scope.startDate,"endDate":scope.endDate,currentPage:scope.pageInfo.currentPage,pageSize:scope.pageInfo.pageSize}, callback:resolveData});
				//组织机构id
				var orgId = 10003;
				//设备id
				var deviceId = 245;
				//报表类型  1:监控设备预警数据  2:监控设备联动数据
				var reportType = scope.gridType;
				var now = new Date();
				var nowStr = (now.getFullYear()) + "-" + (now.getMonth() + 1) + "-" + (now.getDate());
				scope.reportDateStr = nowStr + " 00:00:00 至 " + nowStr + " 23:59:59";
				$('.dateTime-pick-panel .dateTime-picker').datetimepicker({
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
			    		scope.startTime = $(target).val();
			    		if(scope.endTime && scope.startTime > scope.endTime) {
			    			scope.startTime = null;
			    			$(target).val("");
			    			scope.openMsgDialog("对不起，开始时间不能晚于结束时间！");
			    			$(target).focus();
			    		}else {
			    			$("#endTime").datetimepicker("setstartTime", $(target).val());
			    			$(".fast-btn-group").find(".active").removeClass("active");
			    		}
			    	}else if($(target).hasClass("end-data-picker")) {
			    		scope.endTime = $(target).val();
			    		if(scope.startTime && scope.startTime > scope.endTime) {
			    			scope.endTime = null;
			    			$(target).val("");
			    			scope.openMsgDialog("对不起，结束时间不能早于起始时间！");
			    			$(target).focus();
			    		}else {
			    			$("#startTime").datetimepicker("setendTime", $(target).val());
			    			$(".fast-btn-group").find(".active").removeClass("active");
			    		}
			    	}
			    });
			  /**
			   * 解析数据
			   * @param  {[type]} data [请求到的数据]
			   * @return none
			   */
		    function resolveData(data) {
		    	if(data && data.flag === 1){
		    		angular.forEach(data.data.dataLst,function(value, key) {
		    			if(key % 2 == 0) {
		    				value.rowClass = 'tr-even';
		    			} else {
		    				value.rowClass = 'tr-odd';
		    			}
		    		});
		    		data.data.pageInfo.totalPage = Math.ceil(data.data.pageInfo.totalRecord / data.data.pageInfo.pageSize);
		    		scope.pageInfo = data.data.pageInfo;
		    		scope.record = data.data.dataLst
		    	}
		    };

  			/**
  			 * 上一页
  			 * @return {[type]} [description]
  			 */
  			scope.prePage = function() {
  				if($($('.icon-caret-left')[0]).hasClass('inavailable')) {
  					return;
  				}
  				$($('.icon-caret-right')[0]).removeClass('inavailable');
  				scope.pageInfo.currentPage--;
  				if(scope.pageInfo.currentPage == 1) {
		        $($('.icon-caret-left')[0]).addClass('inavailable');
			    }
			    scope.reloadGridReport();
  			};
  			/**
  			 * 下一页
  			 * @return {[type]} [description]
  			 */
  			scope.nextPage = function() {
  				if($($('.icon-caret-right')[0]).hasClass('inavailable')) {
  					return;
  				}
  				$($('.icon-caret-left')[0]).removeClass('inavailable');
  				scope.pageInfo.currentPage++;
  				if(scope.pageInfo.currentPage == scope.pageInfo.totalPage) {
  					$($('.icon-caret-right')[0]).addClass('inavailable');
  				}
  				scope.reloadGridReport();
  			};
  			scope.selectpage = function($event) {
  				if(scope.pageInfo.currentPage == '') {
  					scope.pageInfo.currentPage = 1;
  				}
  				if(scope.pageInfo.currentPage > scope.pageInfo.totalPage) {
  					var currentPage = scope.pageInfo.currentPage.toString().split('');
  					currentPage = currentPage.remove($event.key);
  					scope.pageInfo.currentPage = parseInt(currentPage.join('').toString());
  				}
  				if(scope.pageInfo.currentPage == scope.pageInfo.totalPage) {
  					$($('.icon-caret-right')[0]).addClass('inavailable');
  				}
			    if(scope.pageInfo.currentPage > 1) {
		        $($('.icon-caret-left')[0]).removeClass('inavailable');
			    }
			    scope.reloadGridReport();
  			};
  			scope.saveAs = function() {
  				scope.$parent.gridExcelReport({param:{"fastDateType":scope.fastDateType,"startDate":scope.startDate,"endDate":scope.endDate,currentPage:scope.pageInfo.currentPage,pageSize:scope.pageInfo.pageSize}});
  			};
  			scope.formBtnClick = function(event) {
		    	var target = event.target;
		    	if($(target).hasClass("compare-btn")){
		    		scope.compareFlag = "1";
		    	}else {
		    		scope.compareFlag = "0";
		    	}
		    	scope.reloadGridReport();
		    };

        scope.fastBtnClick = function(event) {
        	var target = event.target;
        	if(!$(target).hasClass("active")) {
        		$(target).siblings().removeClass('active');
        		$(target).addClass("active")
        		if($(target).hasClass("fast-thirty")) {
        			scope.fastDateType = "3";
        		}else if($(target).hasClass("fast-seven")) {
        			scope.fastDateType = "2";
        		}else {
        			scope.fastDateType = "1";
        		}
        		scope.startTime = null;
        		$("#startTime").val("");
    			scope.endTime = null;
    			$("#endTime").val("");
    			scope.reloadGridReport();
        	}
        };

		    scope.reloadGridReport = function() {
		    	cdtCheck();
					scope.gridReportDataLoad({param:{"fastDateType":scope.fastDateType,"startDate":scope.startDate,"endDate":scope.endDate,currentPage:scope.pageInfo.currentPage,pageSize:scope.pageInfo.pageSize}, callback:resolveData});
		    };
		    var cdtCheck = function() {
		    	if(scope.startTime || scope.endTime) {
		    		if(scope.startTime && scope.endTime) {
		    			return true;
		    		}else {
		    			if(scope.startTime) {
		    				scope.openMsgDialog("对不起，请正确选择结束时间！");
		    			}else if(scope.endTime) {
		    				scope.openMsgDialog("对不起，请正确选择开始时间！");
		    			}else {
		    				scope.openMsgDialog("对不起，请正确选择报表筛选条件！");
		    			}
		    			return false;
		    		}
		    	}else if($(".fast-btn-group").find(".active").length > 0) {
		    		return true;
		    	}else {
		    		scope.openMsgDialog("对不起，请正确选择报表筛选条件！");
		    		return false;
		    	}
		    };
		    
			},
			template: template.join('')
		}

	}]);
})();