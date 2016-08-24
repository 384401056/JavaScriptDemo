/**
 * @author ZhangEnwang
 * 公用图标指令
 * @return none
 */
(function(){
	'use strict';
	angular.module('app')
		.directive("settingButton",function(){
			return {
				restrict: 'E',
				replace: true,
				template: '<span class="composite-button-active"><span class="setting-icon icon"></span>设置</span>'
			}
		})
		.directive("editButton",function(){
			return {
				restrict: 'E',
				replace: true,
				template: '<span class="composite-button-active"><span class="icon-edit icon"></span>编辑</span>'
			}
		})
		.directive("reportButton",function(){
			return {
				restrict: 'E',
				replace: true,
				template: '<span  class="composite-button-active"><span class="report-icon icon"></span>报表</span>'
			}
		})
		.directive("showButton",function(){
			return {
				restrict: 'E',
				replace: true,
				template: '<span class="composite-button-active"><i class="icon-eye-open"></i>查看</span>'
			}
		})
		.directive("deleteButton",function(){
			return {
				restrict: 'E',
				replace: true,
				template: '<span class="composite-button-active"><span class="delete-icon icon"></span>删除</span>'
			}
		})
		.directive("commonTable",function(){
			return {
				restrict: 'E',
				transclude: true,
				replace: true,
				scope: true,
				link: function(scope,element,attrs){
					scope.d = scope.$parent[attrs.datasource];
				},
				template: '<table style="width:100%;"><tr class="tr-odd"><th ng-repeat="th in  d.thead ">{{th}}</th></tr><tr ng-repeat="tr in d.tbody" ><td ng-repeat="td in tr">{{tr[td]}}</td></tr></table>'
			}
		})
		.directive("stateConnected",function(){//状态:连接正常
			return {
				restrict: 'E',
				replace: true,
				template: '<span class="state-icon-0"></span>'
			}
		})
		.directive("stateConnectedWithText",function(){//状态:连接正常(带文字)
			return {
				restrict: 'E',
				replace: true,
				template: '<span><span class="state-icon-0 icon"></span>连接正常</span>'
			}
		})
		.directive("statePreAlarm",function(){//状态:预警
			return {
				restrict: 'E',
				replace: true,
				template: '<span class="state-icon-1"></span>'
			}
		})
		.directive("statePreAlarmWithText",function(){//状态:预警(带文字)
			return {
				restrict: 'E',
				replace: true,
				template: '<span><span class="state-icon-1 icon"></span>设备预警</span>'
			}
		})
		.directive("stateWarning",function(){//状态:报警
			return {
				restrict: 'E',
				replace: true,
				template: '<span class="state-icon-2"></span>'
			}
		})
		.directive("stateWarningWithText",function(){//状态:报警(带文字)
			return {
				restrict: 'E',
				replace: true,
				template: '<span><span class="state-icon-2 icon"></span>设备告警</span>'
			}
		})
		.directive("stateRunning",function(){//状态:正在运行
			return {
				restrict: 'E',
				replace: true,
				template: '<span class="state-icon-3"></span>'
			}
		})
		.directive("stateRunningWithText",function(){//状态:正在运行(带文字)
			return {
				restrict: 'E',
				replace: true,
				template: '<span><span class="state-icon-3 icon"></span>正在运行</span>'
			}
		})
		.directive("stateDisconnected",function(){//状态:断开连接
			return {
				restrict: 'E',
				replace: true,
				template: '<span class="state-icon-4"></span>'
			}
		})
		.directive("stateDisconnectedWithText",function(){//状态:断开连接(带文字)
			return {
				restrict: 'E',
				replace: true,
				template: '<span><span class="state-icon-4 icon"></span>断开连接</span>'
			}
		})
		.directive("listen",function($compile){
			return function(scope,element,attrs) {
				scope.$watch(
					function(scope) {
						return scope.$eval(attrs.compile);
					},
					function(value) {
						element.html(value);
						$compile(element.contents())(scope);
					}
				);
			}
		})
})();