/**
 * 显示视频列表
 *
 */
app.controller('vediosInforController', ['$scope', '$stateParams','videoAllService','$timeout',
	function($scope, $stateParams, videoAllService,$timeout) {
		$scope.OrgID = $stateParams.orgid;
		/*
		  延迟加载视窗，等待框架视图改变之后再加载海康威视插件
		 */
		$timeout(function() {
			 videoAllService.show();
		},100);
	}
]);