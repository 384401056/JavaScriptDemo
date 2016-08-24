/**
 * @author chenmd
 * 专家在线-农技辅导
 * @return none
 */

 (function(){
    'use strict';
    angular.module('app')
    .controller('searchExpertController',['$scope','$state','$http','SearchExpertService','AnimateService',searchExpertController]);

    function searchExpertController($scope,$state,$http,SearchExpertService, AnimateService) {


    	/**
    	 * 分页实体
    	 */
    	$scope.pageInfo = {
    		totalCount	:10,
    		pageSize	:5,
    		currentPage	:1,

    	}

    	$scope.industryCategoryList = [];
    	$scope.subCategoryList = [];
    	$scope.CropsList = [];

    	/**
    	 * 获取行业类别
    	 */
		 $scope.getIndustryCategory = function() {
		 	var promise = SearchExpertService.getIndustryCategory();

		 	promise.then(function(data) {
		 		$scope.industryCategoryList = data.data;
		 	});
		 }

		 /**
    	 * 获取行业类别/作物
    	 */
		 $scope.getIndustryCategoryById = function(idValue, type) {
		 	
		 	if(type == 1) {
		 		var promise = SearchExpertService.getIndustryCategoryById(idValue);

			 	promise.then(function(data) {
			 		$scope.subCategoryList = data.data;
			 	});

		 	}else if(type == 2) {
		 		var promise = SearchExpertService.getCropsById(idValue);

			 	promise.then(function(data) {
			 		$scope.CropsList = data.data;console.log(data.data);
			 	});
		 	}
		 	
		 }


		 /**
    	 * 菜单动画-初始化
    	 */
    	 $scope.animateInit = function(){
    		AnimateService.menu($scope, 'getIndustryCategoryById');
    	 }

    	$scope.menuLeftInit = function(parentId) {
    		AnimateService.menuLeftInit($scope, 'getIndustryCategoryById', parentId);
    	}

    	$(document).ready(function() {
    		$scope.getIndustryCategory();
    	});
    	
    	

    	
	}

})();