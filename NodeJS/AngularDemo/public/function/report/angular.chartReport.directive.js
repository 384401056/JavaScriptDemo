(function(angular) {
	angular.module("app").constant('chartConfig', {
		loadingText:'正在加载图表数据...',
		noDataLoadingText:'图表数据为空...',
		errorLoadingText: '图表数据请求出错，图表加载失败...',
		timeOutText: '数据请求超时，图表加载失败...'
	});
	angular.module("app").directive('chartReport', ['chartConfig', function(chartConfig) {
		var template = [];
		template.push('<div class="report-chart-main">');
		template.push('<input id="chart_error_msg" type="hidden" value="111111" ng-click="showErrorMsg($event);" />');
		template.push('<div class="acp-report-cdts">');
		template.push('<div class="fast-btn-group" ng-click="fastBtnClick($event);">');
		template.push('<span class="fast-today active" style="border-right: 0px;">本日</span>');
		template.push('<span class="fast-seven">近7天</span>');
		template.push('<span class="fast-thirty" style="border-left: 0px;">近30天</span>');
		template.push('</div>');
		template.push('<div class="dateTime-pick-panel">');
		template.push('<span>');
		template.push('<input id="startDate" class="dateTime-picker start-data-picker" size="16" type="text" value="" readonly="true" onclick="$(this).blur();">');
		template.push('</span>');
		template.push('<span>&nbsp;至&nbsp;</span>');
		template.push('<span>');
		template.push('<input id="endDate" class="dateTime-picker end-data-picker" size="16" type="text" value="" readonly="true" onclick="$(this).blur();">');
		template.push('</span>');
		template.push('</div>');
		template.push('<div class="form-btn-panel" ng-click="formBtnClick($event);">');
		template.push('<span class="search-btn">查询</span>');
		template.push('<span class="compare-btn" ng-show="compareShow">与历史均值对比</span>');
		template.push('</div>');
		template.push('</div>');

		template.push('<div class="report-panel report-chart-panel">');
		template.push('<div class="report-panel-top">');
		template.push('<div class="report-title-icon"></div>');
		template.push('<div class="opt-panel">');
		template.push('<select class="report-type-select" ng-if="reportTypeShow" ng-model="reportType" ng-options="typeObj.id as typeObj.text for typeObj in reportTypeArry" ng-change="reloadChartReport();"></select>');
		template.push('</div>');
		template.push('<div class="title-panel">');
		template.push('<span class="title">{{reportTitle}}</span>');
		template.push('<span class="date-time">{{reportDateStr}}</span>');
		template.push('</div>');
		template.push('</div>');
		template.push('<div class="report-panel-content">');
		template.push('<div id="chart-box" class="chart-box"></div>');
		template.push('</div>');
		template.push('</div>');
		template.push('</div>');

		var directiveDefinitionObject = {
			priority: 1,
			terminal: false,
			scope: {
				chartReportDataLoad: '&',
				chartExpExcel: '&'
			},
			controller: function($scope, $element, $attrs, $transclude, $modal) {
				$scope.showErrorMsg = function($event) {
					var target = $event.target;
					var errorMsg = $(target).val();
					if(errorMsg){
						$scope.openMsgDialog(errorMsg);
					}
				};
				
				$scope.openMsgDialog = function(msg) {
					var template = [];
					template.push('<style>');
					template.push('.dialog-content{');
					template.push('margin-bottom:-10px;');
					template.push('}');
					template.push('</style>');
					template.push('<div id="msg_dialog" class="dialog-panel">');
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
					modalInstance.opened.then(function () {
						setTimeout(function(){
							$("#msg_dialog").closest(".modal-dialog").css({
								'width': '300px',
								'min-width': '300px',
								'margin-top': '15%' 
							});;
						}, 100)
					});
				};
			},
			restrict: 'E',
			template: template.join(''),
			replace: true,
			transclude: false,
			// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
			link: function($scope, iElm, iAttrs, controller) {
				// 折线图、柱状图模板
				var option_line = {
					title: {
						text: '',
						link:'',
						subtext: '',
						sublink:'',
						x: 'center'
					},
				    legend: {
				    	x: 'center',
				    	y: '88%',
				    	data: []
				    },
				    dataZoom: [{
				    	x: 'center',
				    	y:'82%',
						show: true,
						realtime: true,
						start: 0,
						end: 100
					},{
						type: 'inside'
					}],
					grid: [{
						left: 50,
						right: 50,
						top: '10%',
						height: '66%'
					}],
				    xAxis: {
				        data: []
				    },
				    yAxis: {
						type: 'value'
					},
					series: []
				};
				
				// 饼图，环形图模板
				var option_pie = {
					title: {
						text: '',
						link:'',
						subtext: '',
						sublink:'',
						x: 'center'
					},
					tooltip : {
				        trigger: 'item',
				        formatter: "<b>{a}</b> <br/>{b}: {c} <br/> 百分比: {d}%"
				    },
				    legend: {
				    	x: 25,
				        y: 15,
				        orient: 'vertical',
				        data:[]
				    },
				    series: []
				};
				
				var option_radar = {
					title: {
						text: '',
						link:'',
						subtext: '',
						sublink:'',
						x: 'center'
					},
				    tooltip: {
		                trigger: 'item'
		            },
				    legend: {
				    	x: 'center',
				    	y: 'bottom',
				    	data: []
				    },
				    radar: {
						indicator: []
					},
			       series: []
				};
				var now = new Date();
				var nowStr = (now.getFullYear()) + "-" + (now.getMonth() + 1) + "-" + (now.getDate());
				$scope.reportTitle = "统计图表";
				$scope.chartImgName = '统计报表图片(' + nowStr + ')';
				$scope.reportDateStr = nowStr + " 00:00 至 " + nowStr + " 23:59";
				$scope.fastDateType = "1";
				$scope.startDate = $("#startDate").val();
				$scope.endDate = $("#endDate").val();
				$scope.compareShow = false;
				$scope.compareFlag = "0";
				$scope.reportType = "1";
				$scope.reportTypeShow = false;
				$scope.reportTypeArry = [
					{
						id: "0",
						text: "最小"
					},
					{
						id: "1",
						text: "平均"
					},
					{
						id: "2",
						text: "最大"
					},
				];
				$scope.chart = echarts.init(document.getElementById('chart-box'));
				window.onresize = function () {
					$scope.chart.resize(); 
				};

				$('.report-chart-main .dateTime-picker').datetimepicker({
					format: 'yyyy-mm-dd hh:ii',
			        language: 'zh-CN',
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
						$scope.reloadChartReport();
			    	}
			    };

			    $scope.formBtnClick = function(event) {
			    	var target = event.target;
			    	if($(target).hasClass("compare-btn")){
			    		$scope.compareFlag = "1";
			    	}else {
			    		$scope.compareFlag = "0";
			    	}
			    	$scope.reloadChartReport();
			    };

			    $scope.reloadChartReport = function() {
			    	if(cdtCheck()) {
			    		$scope.chart.showLoading({
							text : chartConfig.loadingText,
					   		effect :'spin',
					   		textStyle : {
								color:' #CCCCCC',
								fontSize : '25',
								fontWeight : 'bolder'
							}
						});
			    		var data = {
			    			reportType: $scope.reportType,
			    			isCompare: $scope.compareFlag,
			    			fastDateType: $scope.fastDateType,
			    			startDate: $scope.startDate,
			    			endDate: $scope.endDate
			    		};
			    		$scope.chartReportDataLoad({param:data, callback: doInit});
			    	}
			    };

			    var cdtCheck = function() {
			    	if($scope.startDate || $scope.endDate) {
			    		if($scope.startDate && $scope.endDate) {
			    			return true;
			    		}else {
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
			    
			    String.prototype.startWith=function(str) {     
			    	var reg=new RegExp("^"+str);     
			    	return reg.test(this);        
		    	}  

		    	String.prototype.endWith=function(str) {     
		    		var reg=new RegExp(str+"$");     
		    		return reg.test(this);        
		    	}

			    var doInit = function(rstData) {
			    	$scope.chart.clear();
			    	if(rstData && rstData.flag === 1 && rstData.data) {
			    		var chartReportData = rstData.data;
			    		$scope.reportTypeText = chartReportData.reportTypeText;
			    		if(chartReportData.reportTypeText) {
			    			$scope.reportTypeShow = true;
			    			for(i=0; i<$scope.reportTypeArry.length; i++){
			    				if(!$scope.reportTypeArry[i].text.endWith(chartReportData.reportTypeText)){
			    					$scope.reportTypeArry[i].text = $scope.reportTypeArry[i].text + chartReportData.reportTypeText;
			    				}
			    			}
			    		}else{
			    			$scope.reportTypeShow = false;
			    			$scope.reportTypeArry.length = 0;
			    		}
			    		$scope.compareShow = chartReportData.isCompare ? true : false;
			    		$scope.reportTitle = chartReportData.reportTitle;
		    			$scope.reportDateStr = chartReportData.reportDateStr;
		    			if(chartReportData.deviceTypeName){
		    				$scope.chartImgName = chartReportData.deviceTypeName + '统计报表图片(' + nowStr + ')';
			    		}
		    			var base_opt = {
	    					title: {
								text: chartReportData.text,
								link: chartReportData.link,
								subtext: chartReportData.subText,
								sublink:chartReportData.subLink,
								x: 'center'
							},
							toolbox: {
						        show : true,
						        padding: [6, 50],
						        itemSize: 20,
						        itemGap: 15,
						        feature : {
						            dataView : {show: false, readOnly: true},
						            magicType : {show: chartReportData.chartType === "line" || chartReportData.chartType === "bar", type: ['line', 'bar']},
						            saveAsImage : {show: true, name: $scope.chartImgName},
						            myExcel:{
						            	show:true,
						            	title:'导出EXCEL',
						            	icon:'image://function/report/image/icon_excel.png',
						            	option:{},
						            	onclick:function(option) {
						            		doExpExcel(option);
					            		}
					            	},
						        }
						    },
						    legend: {
						    	data: chartReportData.legendData
						    },
						    color:[
						       '#8BBC21',
						       '#F28000',
						       '#B00B0F',
						       '#1AADCE',
						       '#48596A',
						       '#379D53',
						       '#2F7ED8',
						       '#663300',
						       '#330066',
						       '#D24DFF'
					       ],
					       series:[]
		    			};
			    		if(chartReportData.chartType === "line") {
			    			$scope.chart.hideLoading();
							$scope.chart.setOption(option_line);
							var opt = {
							    tooltip: {
							    	trigger: 'axis',
									axisPointer: {
										animation: false
									}
							    },
							    xAxis: {
							    	name: chartReportData.xAxisName,
							    	type: 'category',
									boundaryGap: false,
							        data: chartReportData.xAxisData
							    },
							    yAxis: {
									name: chartReportData.yAxisName
								}
							};
							opt = $.extend({}, base_opt, opt);
							for(var i=0; i<chartReportData.series.length; i++) {
			    				var item = {
		    						name:'',
		    						type:'line',
		    						smooth: true,
		    						symbolSize: 8,
		    						hoverAnimation: false,
		    						data:[]
		    					};
			    				item.name = chartReportData.series[i].seriesName;
			    				item.data = chartReportData.series[i].seriesData;
			    				opt.series.push(item);
			    			}
							$scope.chart.setOption(opt);
			    		}else if(chartReportData.chartType === "bar") {
			    			$scope.chart.hideLoading();
							$scope.chart.setOption(option_line);
							var opt = {
							    tooltip: {
							    	trigger: 'axis'
							    },
							    xAxis: {
							    	name: chartReportData.xAxisName,
							    	type: 'category',
							        data: chartReportData.xAxisData
							    },
							    yAxis: {
									name: chartReportData.yAxisName
								}
							};
							opt = $.extend({}, base_opt, opt);
							for(var i=0; i<chartReportData.series.length; i++){
			    				var item = {
		    						name:'',
		    						type:'bar',
		    						smooth: true,
		    						hoverAnimation: false,
		    						data:[]
		    					};
			    				item.name = chartReportData.series[i].seriesName;
			    				item.data = chartReportData.series[i].seriesData;
			    				opt.series.push(item);
			    			}
							$scope.chart.setOption(opt);
			    		}else if(chartReportData.chartType === "pie") {
			    			$scope.chart.hideLoading();
							$scope.chart.setOption(option_pie);
							var opt = base_opt
							for(var i=0; i<chartReportData.series.length; i++){
			    				var item = {
		    				    	name:'',
		    				    	type:'pie',
		    				    	radius: '80%',
		    				    	center: ['50%', '50%'],
		    				    	avoidLabelOverlap: false,
		    				    	label: {
		    				    		emphasis: {
		    				    			show: true,
		    				    			textStyle: {
		    				    				fontSize: '20',
		    				    				fontWeight: 'bold'
		    				    			}
		    				    		}
		    				    	},
		    				    	data:[]
		    					};
			    				item.name = chartReportData.series[i].seriesName;
			    				item.data = chartReportData.series[i].seriesData;
			    				opt.series.push(item);
			    			}
							$scope.chart.setOption(opt);
			    		}else if(chartReportData.chartType === "dount") {
			    			$scope.chart.hideLoading();
							$scope.chart.setOption(option_pie);
							var opt = base_opt
							for(var i=0; i<chartReportData.series.length; i++){
			    				var item = {
		    				    	name:'',
		    				    	type:'pie',
		    				    	radius: ['50%', '80%'],
		    				    	center: ['50%', '50%'],
		    				    	avoidLabelOverlap: false,
		    				    	label: {
		    				    		emphasis: {
		    				    			show: true,
		    				    			textStyle: {
		    				    				fontSize: '20',
		    				    				fontWeight: 'bold'
		    				    			}
		    				    		}
		    				    	},
		    				    	data:[]
		    					};
			    				item.name = chartReportData.series[i].seriesName;
			    				item.data = chartReportData.series[i].seriesData;
			    				opt.series.push(item);
			    			}
							$scope.chart.setOption(opt);
			    		}else if(chartReportData.chartType === "radar") {
			    			$scope.chart.hideLoading();
							$scope.chart.setOption(option_radar);
							var opt = {
							    radar: {
									indicator: chartReportData.radarIndicator
								}
							};
							opt = $.extend({}, base_opt, opt);
							for(var i=0; i<chartReportData.series.length; i++){
			    				var item = {
		    						name: '',
		    						type: 'radar',
		    						data : []
		    					};
			    				item.name = chartReportData.series[i].seriesName;
			    				item.data = chartReportData.series[i].seriesData;
			    				opt.series.push(item);
			    			}
							$scope.chart.setOption(opt);
			    		}
			    	}else if(rstData) {
			    		$scope.chart.hideLoading();
			    		$scope.chart.showLoading({
							text : rstData.message || chartConfig.errorLoadingText,
					   		effect :'spin',
					   		textStyle : {
								color:' #CCCCCC',
								fontSize : '25',
								fontWeight : 'bolder'
							}
						});
			    	}else {
			    		$scope.chart.hideLoading();
			    		$scope.chart.showLoading({
							text : chartConfig.timeOutText,
					   		effect :'spin',
					   		textStyle : {
								color:' #CCCCCC',
								fontSize : '25',
								fontWeight : 'bolder'
							}
						});
			    	}
			    };
			    
			    var doExpExcel = function() {
			    	var data = {
		    			reportType: $scope.reportType,
		    			isCompare: $scope.compareFlag,
		    			fastDateType: $scope.fastDateType,
		    			startDate: $scope.startDate,
		    			endDate: $scope.endDate
		    		};
			    	$scope.chartExpExcel({param:data});
			    };

			    $scope.colon = function(obj) {
					var o;
					if(typeof obj == "object") {
						if(obj === null) {
							o = null;
						}else{
							if(obj instanceof Array) {
								o = [];
								for(var i = 0, len = obj.length; i < len; i++) {
									o.push($scope.colon(obj[i]));
								}
							}else {
								o = {};
								for(var k in obj) {
									o[k] = $scope.colon(obj[k]);  
								}
							}
						}
					}else {
						o = obj;
					}
					return o;
				};

			    //控件加载时初始化图标
			    $scope.reloadChartReport();
			}
		};

		return directiveDefinitionObject;
	}]);
})(angular);