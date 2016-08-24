/**
 * @author ChenMingDong
 * 专家在线controller
 * @return none
 */
 (function(){
    'use strict';
    angular.module('app')
    .controller('expertSearch',['$scope','$state','$http','$stateParams','ExpertService','Dialog',expertSearch]);

    function expertSearch($scope,$state,$http,$stateParams,ExpertService,Dialog) {
    	var expertSearch = $scope;
    	//查询内容
    	var searchField = $stateParams.searchField || '';
    	//查询技术领域
		var skilledField = $stateParams.skilledField || '';
		//提供给隐藏域使用
		$scope.skilledField = $stateParams.skilledField || '';

		$scope.tempSkikkedField = "";

    	//查询类别
    	expertSearch.searchTypes = [];
 

    	expertSearch.aboutWords = [];

    	expertSearch.results = [];

		expertSearch.result4Expert = [];

		expertSearch.checkValue = false;


		/**
	  	 * @author chenmd
	  	 * @desc 根据关键词-检索专家文章
	  	 * @return 
	  	 */
	  	 $scope.getArticles4SearchResult = function(keyword, skilledField) {

	  	 	$scope.searchField = keyword;

	  	 	$scope.tempSkikkedField = keyword;

	  	 	var promise = ExpertService.getArticles4SearchResult(keyword, skilledField);

	  	 	promise.then(function(data) {
	  	 		expertSearch.results = data.data;
	  	 	});
	  	 };

	  	 /*执行*/
	  	 $scope.getArticles4SearchResult(searchField, skilledField);


	  	 /**
	  	 * @author chenmd
	  	 * @desc 根据关键词-检索专家
	  	 * @return 
	  	 */
	  	 $scope.getExperts4SearchResult = function(keyword,skilledField) {
	  	 	var promise = ExpertService.getExperts4SearchResult(keyword, skilledField);

	  	 	promise.then(function(data) {
	  	 		expertSearch.result4Expert = data.data;

	  	 		$scope.checkresult4Expert();
	  	 	});
	  	 };

	  	 /*执行*/
	  	 $scope.getExperts4SearchResult(searchField);

	  	 $scope.checkresult4Expert = function() {
	  	 	if(expertSearch.result4Expert.length == 0) {
	  	 		expertSearch.checkValue = true;
	  	 	}else {
	  	 		expertSearch.checkValue = false;
	  	 	}
	  	 };


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

	  	 	var searchTypeValue = item.dictcode;

	  	 	$("#searchTypeValue").val(searchTypeValue);


	  	 }; 	

	  	 /**
	  	 * 选择检索功能
	  	 * @param  
	  	 * @return none
	  	 */

	  	 $scope.doSearch = function() {
	  	 	var searchField = $scope.searchField || '';

	  	 	var skilledField = $("#searchTypeValue").val() || '';
			//全部的类型-处理为空-不然查询服务出错
			if(skilledField == "0") {
				skilledField = "";
			}

			if(!searchField) {
				Dialog.alert("请输入想搜索的内容！");
				$("#searchField").focus();
			}else {
				$scope.getArticles4SearchResult(searchField, skilledField);

				$scope.getExperts4SearchResult(searchField, skilledField);
			}
	  	 	
	  	 };

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
		 * 获取专家在线-专家介绍信息
		 * @param  
		 * @return 
		 */
		 $scope.viewExpertIntroduction = function(idValue) {
		 	var navItem = {
		 		href: 'app.viewExpertIntroduction',
				text: "查看专家介绍",
				idValue:idValue
		 	};

		 	$scope.addNavItem(navItem);
			$state.go(navItem.href, navItem);

		 };

		 /**
		 * 根据搜索词-获取相关词条
		 * @param  
		 * @return 
		 */
		 $scope.getFamiliarTitle = function(title) {
		 	var promise = ExpertService.getFamiliarTitle(title, 5);

		 	promise.then(function(data) {
	  	 		expertSearch.aboutWords = data.data;
	  	 	});

		 };

		 /*执行*/
		 $scope.getFamiliarTitle(searchField);


	  	 /**
	  	 * 选择查看文章-更多
	  	 * @param  type
	  	 * @param  words 
	  	 * @return none
	  	 */
	  	 $scope.viewArticle4Type = function(type, words) {
	  	 	//console.log();
	  	 	//$state.go();
	  	 };

	  	 /**
		 * 获取专家在线-所有检索类型
		 * @param  
		 * @return 
		 */
		$scope.getSearchTypes4Article = function(skilledField) {

			var defaultValue = "0";


			if(skilledField == "" || typeof skilledField == 'undefined') {
				skilledField = defaultValue;
			}

			var promise = ExpertService.getSearchTypes4Article(skilledField);

			promise.then(function(data) {
				expertSearch.searchTypes = data.data;
			});
		};

		//执行
		$scope.getSearchTypes4Article(skilledField);


		/**
		 * 获取更多-技术领域文章
		 * @param  
		 * @return 
		 */
		$scope.getMoreArticles = function(skilledField) {
			var navItem = {
				"text":"专家文章列表",
				"href":"app.expertArticleList",
				"skilledField": skilledField,
				"searchField": $scope.searchField
			};
			$scope.addNavItem(navItem);
			$state.go(navItem.href, navItem);
		};


		/**
		 * 获取更多-专家信息
		 * @param  
		 * @return 
		 */
		$scope.getMoreExperts = function() {

			var navItem = {
				"text":"专家列表",
				"href":"app.expertList",
				"skilledField": $scope.skilledField,
				"searchField": $scope.searchField
			};
			$scope.addNavItem(navItem);
			$state.go(navItem.href, navItem);
		};

		/**
		 * 获取专家在线-监听搜索按键事件
		 * @param  
		 * @return 
		 */
		 $scope.searchFieldKeypress = function($event) {
		 	
		 	var keyValue = $event.keyCode || 0;
		 	if(keyValue == 13) {
		 		$scope.doSearch();
		 	}
		 };


    }
    
 })();