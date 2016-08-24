/**
 * 报表统计功能用到的指令
 * @return none
 */
(function() {
	angular.module('app')
	  .directive("controlList",function() {
	  	return {
	  		restrict: 'E',
	  		scope: true,
	  		replace: true,
	  		link: function(scope, element, attrs) {
	  			if(scope.$parent.pageInfo.totalPages == 1){
	  				$($('.icon-caret-right')[0]).addClass('inavailable');
	  			}
	  			

	  		},
	  		template: '<div><div class="acp-report-cdts">'+
	  			'<div class="fast-btn-group" ng-click="fastBtnClick($event);"><span class="fast-today active">本日</span>'+
	  			'<span class="fast-seven">近7天</span><span class="fast-thirty">近30天</span></div>'+
	  			'<div class="dateTime-pick-panel"><span><input id="startDate" class="dateTime-picker start-data-picker" size="16" type="text" value="">'+
	  			'</span><span>&nbsp;至&nbsp;</span><span><input id="endDate" class="dateTime-picker end-data-picker" size="16" type="text" value="">'+
	  			'</span></div><div class="form-btn-panel" ng-click="formBtnClick($event);"><span class="search-btn">查询</span>'+
	  			'<span class="compare-btn" ng-show="{{compareShow == true}}">与历史均值对比</span></div></div>'+
	  			'<div class="acp-report-content"><div class="report-content-top"><div class="opt-panel">'+
					'<span class="combo-button-active" ng-click="saveAs()"><span class="export-icon icon-save" style="color:#00A65A;line-height: 35px;"></span>另存为Excel文件</span>'+
					'</div><div class="title-panel"><span class="icon-angle-right"></span><span class="title">灌溉第一排报表</span>'+
					'<span class="date-time">2016-03-15 至 2016-03-15</span></div></div><div class="report-content-bottom">'+
					'<div id="" class="report-panel"><div><table style="width:100%"><tr class="tr-odd">'+
					'<th>序号</th><th>启动时间</th><th>控制类型</th><th>开关类型</th><th>灌溉时长</th><th>结束时间</th></tr>'+
					'<tr class=" {{ item.rowClass }}" ng-model="record" ng-repeat="item in record">'+
					'<td>{{ $index }}</td><td>{{ item.startTime }}</td><td>{{ item.controlType }}</td><td>{{ item.type }}</td><td>{{ item.hours }}</td><td>{{ item.endTime }}</td></tr>'+
					'</table></div>'+
					'<div class="acp-card-pagination"><div class="pageInfo col-md-3 col-sm-4 col-xs-4 pull-right">'+
			    '<span class="icon-caret-left inavailable" style="color:#00a65a" ng-click="prePage()"></span>&nbsp;'+
			    '<span class="curry-page-panel">第 <input class="curry-page-ipt" ng-model="pageInfo.currentPage" type="text" ng-keyup="selectpage($event);" /> 页</span>'+
			    '<span>共&nbsp;{{ pageInfo.totalPages }}&nbsp;页</span>&nbsp;<span class="icon-caret-right available" style="color:#00a65a" ng-click="nextPage()"></span>'+
			    '<span class="total-items-panel">【共 {{pageInfo.totalRecord}} 条】</span>'+
			    '</div></div></div></div></div></div>'
	  	}
	  })
	  .directive("alarmLog",function() {
	  	return {
	  		restrict: 'E',
	  		scope: true,
	  		replace: true,
	  		link: function(scope, element, attrs) {
	  			console.log(scope.record);
	  			/**
	  			 * 上一页
	  			 * @return {[type]} [description]
	  			 */
	  			scope.prePage = function() {
	  				if($($('.icon-caret-left')[0]).hasClass('inavailable')) {
	  					return;
	  				}
	  				console.log('上一页');
	  				$($('.icon-caret-right')[0]).removeClass('inavailable');
	  				scope.$parent.pageInfo.currentPage--;
	  				if(scope.pageInfo.currentPage == 1) {
			        $($('.icon-caret-left')[0]).addClass('inavailable');
  			    }
	  			};
	  			/**
	  			 * 下一页
	  			 * @return {[type]} [description]
	  			 */
	  			scope.nextPage = function() {
	  				if($($('.icon-caret-right')[0]).hasClass('inavailable')) {
	  					return;
	  				}
	  				console.log('下一页');
	  				$($('.icon-caret-left')[0]).removeClass('inavailable');
	  				scope.$parent.pageInfo.currentPage++;
	  				if(scope.$parent.pageInfo.currentPage == scope.$parent.pageInfo.totalPages) {
	  					$($('.icon-caret-right')[0]).addClass('inavailable');
	  				}
	  			};
	  			scope.selectpage = function(pageNumber) {
  			    if(pageNumber == 0){
  			        return;
  			    }
  			    if(pageNumber) {
  			    	console.log(pageNumber);
  			      scope.pageInfo.currentPage = pageNumber;
  			    }
  			    if(scope.pageInfo.currentPage > 1) {
  			        console.log($('.icon-caret-left'));
  			        $($('.icon-caret-left')[0]).removeClass('inavailable');
  			    }
	  			};
	  			scope.saveAs = function() {
	  				console.log('另存为Excel文件');
	  			};

	  		},
	  		template: '<div><div class="acp-report-cdts">'+
	  			'<div class="fast-btn-group" ng-click="fastBtnClick($event);"><span class="fast-today active">本日</span>'+
	  			'<span class="fast-seven">近7天</span><span class="fast-thirty">近30天</span></div>'+
	  			'<div class="dateTime-pick-panel"><span><input id="startDate" class="dateTime-picker start-data-picker" size="16" type="text" value="">'+
	  			'</span><span>&nbsp;至&nbsp;</span><span><input id="endDate" class="dateTime-picker end-data-picker" size="16" type="text" value="">'+
	  			'</span></div><div class="form-btn-panel" ng-click="formBtnClick($event);"><span class="search-btn">查询</span>'+
	  			'<span class="compare-btn" ng-show="{{compareShow == true}}">与历史均值对比</span></div></div>'+
	  			'<div class="acp-report-content"><div class="report-content-top"><div class="opt-panel">'+
					'<span class="combo-button-active" ng-click="saveAs()"><span class="export-icon icon-save" style="color:#00A65A;line-height: 35px;"></span>另存为Excel文件</span>'+
					'</div><div class="title-panel"><span class="title">银河之星球机4的预警记录</span>'+
					'<span class="date-time">2016-03-15 至 2016-03-15</span></div></div><div class="report-content-bottom">'+
					'<div id="" class="report-panel"><div><table style="width:100%"><tr class="tr-odd">'+
					'<th>时间</th><th>内容</th><th>事件</th></tr>'+
					'<tr class=" {{ item.rowClass }}" ng-model="record" ng-repeat="item in record">'+
					'</td><td>{{ item.startTime }}</td><td>{{ item.controlType }}</td><td>{{ item.type }}</td></tr>'+
					'</table></div>'+
					'<div class="acp-card-pagination"><div class="pageInfo col-md-3 col-sm-4 col-xs-4 pull-right">'+
			    '<span class="icon-caret-left inavailable" style="color:#00a65a" ng-click="prePage()"></span>&nbsp;'+
			    '<span class="curry-page-panel">第 <input class="curry-page-ipt" ng-model="pageInfo.currentPage" type="text" ng-keyup="selectpage($event);" /> 页</span>'+
			    '<span>共&nbsp;{{ pageInfo.totalPages }}&nbsp;页</span>&nbsp;<span class="icon-caret-right available" style="color:#00a65a" ng-click="nextPage()"></span>&nbsp;'+
			    '<span class="total-items-panel">【共 {{pageInfo.totalRecord}} 条】</span>'+
			    '</div></div></div></div></div></div>'
	  	}
	  })
	  .directive("linkage",function() {
	  	return {
  		restrict: 'E',
  		scope: true,
  		replace: true,
  		link: function(scope, element, attrs) {
  			console.log(scope.record);
  			/**
  			* 上一页
  			* @return {[type]} [description]
  			*/
  			scope.prePage = function() {
  				if($($('.icon-caret-left')[0]).hasClass('inavailable')) {
  					return;
  				}
  				console.log('上一页');
  				$($('.icon-caret-right')[0]).removeClass('inavailable');
  				scope.$parent.pageInfo.currentPage--;
  				if(scope.pageInfo.currentPage == 1) {
		        $($('.icon-caret-left')[0]).addClass('inavailable');
			    }
  			};
  			/**
  			 * 下一页
  			 * @return {[type]} [description]
  			 */
  			scope.nextPage = function() {
  				if($($('.icon-caret-right')[0]).hasClass('inavailable')) {
  					return;
  				}
  				console.log('下一页');
  				$($('.icon-caret-left')[0]).removeClass('inavailable');
  				scope.$parent.pageInfo.currentPage++;
	  				if(scope.$parent.pageInfo.currentPage == scope.$parent.pageInfo.totalPages) {
	  					$($('.icon-caret-right')[0]).addClass('inavailable');
	  				}
	  		};
  			scope.selectpage = function(pageNumber) {
			    if(pageNumber == 0){
			        return;
			    }
			    if(pageNumber) {
			    	console.log(pageNumber);
			      scope.pageInfo.currentPage = pageNumber;
			    }
			    if(scope.pageInfo.currentPage > 1) {
		        console.log($('.icon-caret-left'));
		        $($('.icon-caret-left')[0]).removeClass('inavailable');
			    }
  			};
  			scope.saveAs = function() {
  				console.log('另存为Excel文件');
  			};
  		},
  		template: '<div><div class="acp-report-cdts">'+
  			'<div class="fast-btn-group" ng-click="fastBtnClick($event);"><span class="fast-today active">本日</span>'+
  			'<span class="fast-seven">近7天</span><span class="fast-thirty">近30天</span></div>'+
  			'<div class="dateTime-pick-panel"><span><input id="startDate" class="dateTime-picker start-data-picker" size="16" type="text" value="">'+
  			'</span><span>&nbsp;至&nbsp;</span><span><input id="endDate" class="dateTime-picker end-data-picker" size="16" type="text" value="">'+
  			'</span></div><div class="form-btn-panel" ng-click="formBtnClick($event);"><span class="search-btn">查询</span>'+
  			'<span class="compare-btn" ng-show="{{compareShow == true}}">与历史均值对比</span></div></div>'+
  			'<div class="acp-report-content"><div class="report-content-top"><div class="opt-panel">'+
				'<span class="combo-button-active" ng-click="saveAs()"><span class="export-icon icon-save" style="color:#00A65A;line-height: 35px;"></span>另存为Excel文件</span>'+
				'</div><div class="title-panel"><span class="title">视频联动记录</span>'+
				'<span class="date-time">2016-03-15 至 2016-03-15</span></div></div><div class="report-content-bottom">'+
				'<div id="" class="report-panel"><div><table style="width:100%"><tr class="tr-odd">'+
				'<th>序号</th><th>启动时间</th><th>开关类型</th><th>联动时长</th><th>结束时间</th><th>操作</th></tr>'+
				'<tr class=" {{ item.rowClass }}" ng-model="record" ng-repeat="item in record">'+
				'<td>{{ $index }}</td><td>{{ item.startTime }}</td><td>{{ item.controlType }}</td><td>{{ item.type }}</td><td>{{ item.hours }}</td><td>{{ item.endTime }}</td></tr>'+
				'</table></div>'+
				'<div class="acp-card-pagination"><div class="pageInfo col-md-3 col-sm-4 col-xs-4 pull-right">'+
		    '<span class="icon-caret-left inavailable" style="color:#00a65a" ng-click="prePage()"></span>&nbsp;'+
		    '<span class="curry-page-panel">第 <input class="curry-page-ipt" ng-model="pageInfo.currentPage" type="text" ng-keyup="selectpage($event);" /> 页</span>'+
		    '<span>共&nbsp;{{ pageInfo.totalPages }}&nbsp;页</span>&nbsp;<span class="icon-caret-right available" style="color:#00a65a" ng-click="nextPage()"></span>&nbsp;'+
		    '<span class="total-items-panel">【共 {{pageInfo.totalRecord}} 条】</span>'+
		    '</div></div></div></div></div></div>'
	  	}
	  });
})();