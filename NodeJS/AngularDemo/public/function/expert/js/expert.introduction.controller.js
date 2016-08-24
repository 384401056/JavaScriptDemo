/**
 * @author ChenMingDong
 * 专家在线controller
 * @return none
 */

 (function(){
    'use strict';
    angular.module('app')
    .controller('expertIntroduction',['$scope','$state','$http','$stateParams','ExpertService',ExpertIntroduction]);

    function ExpertIntroduction($scope,$state,$http,$stateParams,ExpertService) {

    	var idValue = $stateParams.idValue || '';

    	//服务地址-前缀
    	var url = ExpertService.getDefaultUrl();

    	//图片服务地址
    	$scope.picServiceUrl = ExpertService.getPicServiceUrl();

    	//介绍信息
    	$scope.intro = [];

		

		/**
	  	 * 选择查看文章
	  	 * @param  id 
	  	 * @return none
	  	 */
	  	 $scope.viewExpertIntroduction = function(id) {
	  	 	var promise = ExpertService.viewExpertIntroduction(id);

	  	 	promise.then(function(data) {
	  	 		$scope.intro = data.data;
	  	 	});
	  	 };

	  	 /*执行*/
	  	 $scope.viewExpertIntroduction(idValue);
		 

	}

})();