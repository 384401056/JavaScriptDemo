(function(){
	app.controller("addGroupController",['$scope','$modalInstance','testData',addGroupController]);
	function addGroupController($scope,$modalInstance,testData) {
		$scope.cancel = function() {
			$modalInstance.dismiss('cancel');
		}
	}
})();