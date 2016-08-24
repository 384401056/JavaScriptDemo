/**
 * 专家在线  服务
 */
(function() {
	app.service("ExpertService",['$http','$q','WebHost',expertService]);
	function expertService($http, $q, WebHost) {
		var url = WebHost.expert;
		var picServiceUrl = "";

		return {
			/**
			 * 获取专家在线-所有检索类型
			 * @param  
			 * @return 
			 */
			getSearchTypes:function(skilledField ) {
				var deferred = $q.defer();

				$http({
					url: url + "searchType/getSearchTypes/" + skilledField ,
					method: "POST"
				}).success(function(data, status, header, config) {
					deferred.resolve(data);
				}).error(function(data, status, header, config) {
					deferred.reject(data);
				});

				return deferred.promise;
			},

			/**
			 * 所有文章检索-获取专家在线-所有检索类型
			 * @param  
			 * @return 
			 */
			getSearchTypes4Article:function(skilledField ) {
				var deferred = $q.defer();

				$http({
					url: url + "searchType/getSearchTypes4Article/" + skilledField ,
					method: "POST"
				}).success(function(data, status, header, config) {
					deferred.resolve(data);
				}).error(function(data, status, header, config) {
					deferred.reject(data);
				});

				return deferred.promise;
			},
			/**
			 * 所有文章检索-获取专家在线-所有检索类型
			 * @param  
			 * @return 
			 */
			getCounselTypes:function(skilledField ) {
				var deferred = $q.defer();

				$http({
					url: url + "searchType/getCounselTypes/" + skilledField ,
					method: "POST"
				}).success(function(data, status, header, config) {
					deferred.resolve(data);
				}).error(function(data, status, header, config) {
					deferred.reject(data);
				});

				return deferred.promise;
			},
			/**
			 *@author chenmd
			 *@desc 根据关键词-检索专家文章
			 */
			 getArticles4SearchResult:function(keyword, skilledField) {
			 	var deferred = $q.defer();

			 	$http({
					url: url + "article/getArticles4SearchResult",
					data:{"keyword":keyword,"skilledField":skilledField},
					method: "POST"
				}).success(function(data, status, header, config) {
					deferred.resolve(data);
				}).error(function(data, status, header, config) {
					deferred.reject(data);
				});

			 	return deferred.promise;
			 },

			 /**
			 *@author chenmd
			 *@desc 根据关键词-检索专家
			 */
			 getExperts4SearchResult:function(keyword, skilledField) {
			 	var deferred = $q.defer();

			 	$http({
					url: url + "expert/getExperts4SearchResult",
					data:{"keyword":keyword, "skilledField": skilledField},
					method: "POST"
				}).success(function(data, status, header, config) {
					deferred.resolve(data);
				}).error(function(data, status, header, config) {
					deferred.reject(data);
				});

			 	return deferred.promise;
			 },


			 /**
			 * 根据搜索词-获取相关词条
			 * @param  
			 * @return 
			 */
			 getFamiliarTitle: function(title, size) {
			 	var deferred = $q.defer();

			 	$http({
					url: url + "article/getFamiliarTitle",
					data:{"title":title, "size":size},
					method: "POST"
				}).success(function(data, status, header, config) {
					deferred.resolve(data);
				}).error(function(data, status, header, config) {
					deferred.reject(data);
				});

			 	return deferred.promise;
			 },


			  /**
			 * 根据搜索词-获取文章列表
			 * @param  
			 * @return 
			 */
			 getArticleList: function(jsonParam) {
			 	var deferred = $q.defer();
			 	
			 	$http({
					url: url + "article/getArticleList",
					data: {
					"currentPage":jsonParam.currentPage,
					"pageSize":jsonParam.pageSize,
					"skilledfield":jsonParam.skilledfield,
					"keywords":jsonParam.keywords
					},
					method: "POST"
				}).success(function(data, status, header, config) {
					deferred.resolve(data);
				}).error(function(data, status, header, config) {
					deferred.reject(data);
				});

			 	return deferred.promise;
			 },

			 /**
			 *@author chenmd
			 *@desc 根据ID-获取专家文章
			 */
			 getArticleById:function(id) {
			 	var deferred = $q.defer();

			 	$http({
					url: url + "article/getExpertArticleById?id=" + id,
					method: "POST"
				}).success(function(data, status, header, config) {
					deferred.resolve(data);
				}).error(function(data, status, header, config) {
					deferred.reject(data);
				});

			 	return deferred.promise;
			 },


			 viewExpertIntroduction: function(idValue) {
			 	var deferred = $q.defer();

			 	$http({
					url: url + "expert/getExpertInforById?id=" + idValue,
					method: "POST"
				}).success(function(data, status, header, config) {
					deferred.resolve(data);
				}).error(function(data, status, header, config) {
					deferred.reject(data);
				});

			 	return deferred.promise;
			 },

			//默认链接前缀
			getDefaultUrl:function() {
				return url;
			},

			//获取图片服务地址
			getPicServiceUrl: function() {
				return picServiceUrl;
			},

			/**
			 * 提交订单
			 * @param Object 表单数据
			 * @return promise
			 */
			submitOrder: function(formData) {
				var deferred = $q.defer();
				$http({
					url: url + "eOrder/setBook",
					method: "POST",
					data:formData
				}).success(function(data, status, header, config) {
					deferred.resolve(data);
				}).error(function(data, status, header, config) {
					deferred.reject(data);
				});
				return deferred.promise;
			},
			/**
			 * 通过id查询专业信息
			 * @param  expertid
			 * @return promise
			 */
			getExpertInfoById: function(expertid) {
				var deferred = $q.defer();
				$http({
					url: url + "expert/getExpertInforById?id="+expertid,
					method: "GET"
				}).success(function(data, status, header, config) {
					deferred.resolve(data);
				}).error(function(data, status, header, config) {
					deferred.reject(data);
				});
				return deferred.promise;
			},
			/**
			 * 从服务器删除已上传的文件
			 * @param {Array} 文件名称数组
			 * @return promise
			 */
			delFiles: function(filenames) {
				var deferred = $q.defer();
				$http({
					url: url + "upload/deleteMultipleFile/"+filenames,
					method: 'GET'
				}).success(function(data, status, header, config) {
					deferred.resolve(data);
				}).error(function(data, status, header, cofnig) {
					deferred.reject(data);
				});
				return deferred.promise;
			},
			/**
			 * 提交提问内容
			 * @param  {[type]} askContent [description]
			 * @return {[type]}            [description]
			 */
			submitAskContent: function(askContent) {
				var deferred = $q.defer();
				$http({
					url: url + 'askinfo/setaskcontent',
					method:'POST',
					data: askContent
				}).success(function(data,status, header, config) {
					deferred.resolve(data);
				}).error(function(data, status, header, config) {
					deferred.reject(data);
				});
				return deferred.promise;
			},

			getExpertByTagsId: function(tags) {
				var deferred = $q.defer();
				$http({
					url: url + 'askAndReplyrecord/expertBySkillField/'+tags,
					method:'GET',
				}).success(function(data, status, header, config) {
					deferred.resolve(data);
				}).error(function(data, status, header, config) {
					deferred.reject(data);
				});
				return deferred.promise;
			},
			getPagedExpertInfo: function(skill, currentpage, pagesize) {
				var deferred = $q.defer();
				$http({
					url: url + 'expert/getExpertInfors',
					method:'POST',
					data:{skilledfield:skill,currentpage:currentpage,pagesize:pagesize}
				}).success(function(data, status, header, config) {
					deferred.resolve(data);
				}).error(function(data, status, header, config) {
					defered.reject(data);
				});
				return deferred.promise;
			},
			
		}
	};
})();