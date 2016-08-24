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
    	//分页对象
		ExpertArticle.pageInfo = {
			currentPage:1,
			pageSize:10
		};
		$scope.perPageOptions = [5,10,15,20,25,30];

		 /**
	  	 * 选择查看文章
	  	 * @param  id 
	  	 * @return none
	  	 */
	  	 $scope.viewArticle = function(id) {
	  	 	
	  	 	var navItem = {
		 		href: 'app.viewExpertArticle',
				text: "查看专家文章",
				idValue:id
		 	};

		 	$scope.addNavItem(navItem);
			$state.go(navItem.href, navItem);
	  	 };



		 
	  	 /**
		 * 获取专家在线-所有检索类型
		 * @param  
		 * @return 
		 */
		$scope.getSearchTypes4Article = function(skilledField) {

			var defaultValue = "skilledField";


			if(skilledField == "" || typeof skilledField == 'undefined') {
				skilledField = defaultValue;
			}

			var promise = ExpertService.getSearchTypes4Article(skilledField);

			promise.then(function(data) {
				$scope.searchTypes = data.data;
			});
		};

		//执行
		$scope.getSearchTypes4Article(ExpertArticle.skilledField);


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
	  	 

	  	 /**
		 * 根据搜索词-获取文章列表
		 * @param  
		 * @return 
		 */
		$scope.getArticleList = function(pageInfo) {

			
			var jsonParam = new Object();

			jsonParam.currentPage = pageInfo.currentPage;

			jsonParam.pageSize = pageInfo.pageSize;

			jsonParam.skilledfield = ExpertArticle.skilledField;

			jsonParam.keywords = ExpertArticle.searchField;

			var promise = ExpertService.getArticleList(jsonParam);

			promise.then(function(data) {
				$scope.articleItems = data.data.data;
				//设置分页对象值
				if(ExpertArticle.pageInfo.currentPage) {
					data.data.currentPage = ExpertArticle.pageInfo.currentPage;
				}else {
					data.data.currentPage = 1;
				}
				
				ExpertArticle.pageInfo = data.data;

				
			});
		};

		/*执行*/
		$scope.getArticleList($scope.pageInfo);

		/**
		 * 分页重载数据
		 */
		$scope.reloadData = function() {
			
			$scope.getArticleList($scope.pageInfo);
		}

	}

})();