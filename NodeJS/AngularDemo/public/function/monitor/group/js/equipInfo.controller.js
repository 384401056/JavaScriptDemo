/**
 * 显示分组设备弹窗控制器
 * @return {[type]} [description]
 */
(function(){
	app.controller("equipInfoController",['$scope','$modalInstance','equipList',equipInfoController]);
	function equipInfoController($scope,$modalInstance,equipList) {
		$scope.list = equipList
		angular.forEach($scope.list,function(value,key) {
			value.s = getStatus(value.status);
			if(key%2 == 0){
				value.rowClass = 'tr-odd'
			}else{
				value.rowClass = 'tr-even'
			}
		});
		$scope.cancel = function() {
			$modalInstance.dismiss('cancel');
		};
		/**
		 * 返回设备状态的文字描述
		 * @param  状态代码
		 * @return 状态文字描述
		 */
		function getStatus(s) {
			return (s == 1?'正常连接':(s==2?'设备预警':(s==3?'设备告警':(s==4?'正在运行':'断开连接'))));
		};
	}
})();