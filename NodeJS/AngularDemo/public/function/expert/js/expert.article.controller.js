/**
 * @author ChenMingDong
 * 专家在线controller
 * @return none
 */

 (function(){
    'use strict';
    angular.module('app')
    .controller('expertArticle',['$scope','$state','$http','$stateParams','ExpertService',expertArticle]);

    function expertArticle($scope,$state,$http,$stateParams,ExpertService) {
    	var ExpertArticle = $scope;
    	//查询参数- 技术领域
    	ExpertArticle.skilledField = $stateParams.skilledField;
    	//查询参数-搜索的词
    	ExpertArticle.searchField = $stateParams.searchField;

    	//服务地址-前缀
    	ExpertArticle.url = ExpertService.getDefaultUrl();

    	//图片服务地址
    	ExpertArticle.picServiceUrl = ExpertService.getPicServiceUrl();

    	//文章信息
    	ExpertArticle.articleItems = [];

    	//所有专家检索查询类别
    	ExpertArticle.searchTypes = [];
		
		//查询ID
		ExpertArticle.idValue = $stateParams.idValue;

		/**
	  	 * 选择查看文章
	  	 * @param  id 
	  	 * @return none
	  	 */
	  	 $scope.viewArticle = function(id) {
	  	 	var promise = ExpertService.getArticleById(id);

	  	 	promise.then(function(data) {
	  	 		ExpertArticle.articleItems = data.data;
	  	 	});
	  	 };

	  	 /*执行*/
	  	 $scope.viewArticle($scope.idValue);


		 
	  	 /**
		 * 获取专家在线-所有检索类型
		 * @param  
		 * @return 
		 */
		$scope.getSearchTypes4Article = function(skilledField) {

			/*var defaultValue = "skilledField";


			if(skilledField == "" || typeof skilledField == 'undefined') {
				skilledField = defaultValue;
			}

			var promise = ExpertService.getSearchTypes4Article(skilledField);

			promise.then(function(data) {
				$scope.searchTypes = data.data;
			});*/
		};

		//执行
		//$scope.getSearchTypes4Article();


		/**
	  	 * 选择检索类型
	  	 * @param  $event 点击事件
	  	 * @return none
	  	 */
	  	 $scope.chooseType4Search = function($event, item, objectId) {
	  	 	/*切换选项卡*/
	  	 	var selectId = "searchType_" + item.dictcode;

	  	 	$("."+objectId +" > span").each(function() {
	  	 		if($(this).attr("class") == "expert-search-type-all-active") {
	  	 			$(this).attr("class", "expert-search-type-all");
	  	 		}
	  	 		
	  	 	});

	  	 	$("."+objectId +" > #"+selectId).attr("class","expert-search-type-all-active");

	  	 	ExpertArticle.skilledField = item.dictdata;


	  	 };
	  	 $scope.pageInfo = {};

	  	 

	}

})();