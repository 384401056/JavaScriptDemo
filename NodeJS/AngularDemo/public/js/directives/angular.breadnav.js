/**
 * 面包屑导航插件
 * navItem格式：
 * {
 * 		href:'',                         路由地址  <必填>
 * 		text:'',                         导航文本  <必填> 
 * 		callBack: function(navItem){},    回调方法，参数为当前navItem对象  <可选>
 * 		...                               其他个性化参数<可选>
 * }
 */
angular.module("app").directive('breadNav', ['$state', function($state) {
	var template = [];
	template.push('<div class="bread-nav">');
	template.push('<div class="nav-label">您的位置：</div>');
	template.push('<div class="nav-content">');
	template.push('<ul class="nav-lst" ng-click="breadNavClick($event);">');
	template.push('<li class="{{navItem.activeClass}}" ng-repeat="navItem in breadNavDataArrys track by $index">');
	template.push('<a href="javascritp:void(0);" onclick="return false;" data-index="{{$index}}">{{navItem.text}}</a>');
	template.push('</li>');
	template.push('</ul>');
	template.push('</div>');
	template.push('</div>');

	var directiveDefinitionObject  = {
		restrict: 'E',
		priority: 0,
		replace: true,
		transclude: false,
		template: template.join(''),
		controller: function ($rootScope, $scope, $element, $attrs, $transclude) {
			$scope.breadNavDataArrys = [];
			var navJsonStr = $.cookie('acp_system_nav');
			if(navJsonStr) {
				$scope.breadNavDataArrys = $.parseJSON(navJsonStr);
			}
			
			$scope.addNavItem = function(navItem) {
				for(var i=0; i<$scope.breadNavDataArrys.length; i++) {
					$scope.breadNavDataArrys[i].activeClass = "";
				}
				navItem.activeClass = "active";
				$scope.breadNavDataArrys.push(navItem);
				$.cookie('acp_system_nav', JSON.stringify($scope.breadNavDataArrys)); 
			};
			$scope.delNavItem = function(index) {
				if($scope.breadNavDataArrys.length > 0){
					if(index && index > 0) {
						if(index <= $scope.breadNavDataArrys.length){
							$scope.breadNavDataArrys.splice(index - 1, 1);
							$.cookie('acp_system_nav', JSON.stringify($scope.breadNavDataArrys));
						}
					}else {
						var lastIndex = $scope.breadNavDataArrys.length - 1;
						$scope.breadNavDataArrys.splice(lastIndex, 1);
						$.cookie('acp_system_nav', JSON.stringify($scope.breadNavDataArrys));
					}
				}
			};
			$scope.clearAllNav = function() {
				$scope.breadNavDataArrys.length = 0;
				$.cookie('acp_system_nav', '');
			};

			$scope.getNavSize = function() {
				return $scope.breadNavDataArrys.length;
			};
		},
		link: function(scope, iElement, iAttrs, controller) {
			scope.breadNavClick = function($event) {
				var target = $event.target;
				if($(target).closest('li.active').length < 1) {
					var index = $(target).data('index');
					if(scope.breadNavDataArrys.length > (index + 1) && scope.breadNavDataArrys[index].href) {
						$state.go(scope.breadNavDataArrys[index].href, scope.breadNavDataArrys[index]);
						scope.breadNavDataArrys.splice(index + 1, scope.breadNavDataArrys.length - index + 1);
						scope.breadNavDataArrys[index].activeClass = "active";
						if(scope.breadNavDataArrys.length > 0){
							$.cookie('acp_system_nav', JSON.stringify(scope.breadNavDataArrys)); 
						}else{
							$.cookie('acp_system_nav', '');
						}
					}else{
						console.log('导航数据异常，导航跳转失败！');
					}
				}
			};
		}
	}

	return directiveDefinitionObject ;
}]);