/**
 * @author  ZhangEnwang
 * 指令
 * 开始和停止按钮,每个按钮有可用和禁用两种状态
 * @return {[type]} [description]
 */
(function(){
	'use strict';
	angular.module('app')
		.directive("operatingActiveStart",function(){
			return {
				restrict: 'E',
				template: '<span class="composite-button-active"><span class="operating-icon operating-icon-start-active icon"></span>打开</span>'
			}
		});

	angular.module('app')
		.directive("operatingDisableStart",function(){
			return {
				restrict: 'E',
				template: '<span class="composite-button-disable"><span class="operating-icon operating-icon-start-disable icon"></span>打开</span>'
			}
		});	

	angular.module('app')
		.directive("operatingActiveStop",function(){
			return {
				restrict: 'E',
				template: '<span class="composite-button-active"><span class="operating-icon operating-icon-stop-active icon"></span>关闭</span>'
			}
		});	

	angular.module('app')
		.directive("operatingDisableStop",function(){
			return {
				restrict: 'E',
				template: '<span class="composite-button-disable"><span class="operating-icon operating-icon-stop-disable icon"></span>关闭</span>'
			}
		});	
})();