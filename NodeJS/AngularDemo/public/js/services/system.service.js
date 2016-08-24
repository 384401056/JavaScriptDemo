/**
 * 系统服务
 * author : hanwj
 * serviceName:LoginService
*/
app.factory("SystemService",['WebHost','$http','$q','$state','$cookieStore','$rootScope','commonUtil',function(WebHost,$http,$q,$state,$cookieStore,$rootScope,commonUtil){
	var url=WebHost.monitorUrl;
	/*
		登录验证及权限获取
	 */
	return{
		login:function(username,password){

			var deferred = $q.defer();
			$http({
				method: 'POST',
				url:url+"/security/login",
				params:{
					"userName":username,
					"password":password
				}
			}).success(function(data, status, header, config) {
				deferred.resolve(data);
			}).error(function(data, status, header, config) {
				deferred.reject(data,status,header,config);
			});
			return deferred.promise;
		},
		//操作权限查询
		getOperatePermissions:function(functionId) {
			var deferred = $q.defer();
			var id = $cookieStore.get('id');
			//id=123;
			if ((typeof(id) == "undefined") || (functionId == "undefined")) {
				return;
			}
			$http({
				method: 'POST',
				url:url+"/security/getOperatePermission",
				params:{
					"userId":id,
					"functionId":functionId,
					"Access-Token":commonUtil.getToken()
				}
			}).success(function(data, status, header, config) {
				deferred.resolve(data);
			}).error(function(data, status, header, config) {

			});
			return deferred.promise;
		},
		//用户刷新查询菜单
		getMenus:function(){

			var deferred = $q.defer();
			var id = $cookieStore.get('id');
			if ((typeof(id) == "undefined")) {
				return;
			}

			$http({
				method: 'POST',
				url:url+"/security/getMenus",
				params:{
					"userId":id,
					"Access-Token":commonUtil.getToken()
				}
			}).success(function(data, status, header, config) {
				deferred.resolve(data);
			}).error(function(data, status, header, config) {

			});
			return deferred.promise;
		},
		/**
		 * 获取用户信息
		 * @param  userId 用户Id；currentPage 当前页数； pageSize 页数大小
		 * @return promise
		 */
		getUserMessageList: function(userId,currentPage,pageSize) {
			var deferred = $q.defer();
			$http({
				url: url + "/message/all",
				//url:  url2+"message/all",
				method: "POST",
				params: {
					"userid": userId,
					"currentPage": currentPage,
					"pageSize": pageSize,
					"Access-Token":commonUtil.getToken()
				}
			}).success(function(data, status, header, config) {
				deferred.resolve(data);
			}).error(function(data, status, header, config) {
				deferred.reject(data);
			});
			return deferred.promise;
		},
		/**
		 * 告警信息
		 * @param  userId 用户Id；currentPage 当前页数； pageSize 页数大小
		 * @return promise
		 */
		getAlarmMessageList: function(userId,currentPage,pageSize) {
			var deferred = $q.defer();
			$http({
				//url:"http://10.88.20.94:8080/alarm/query",
				 url: url + "/alarm/query", 
				method: "POST",
				params: {
					"userid": userId,
					"pageno": currentPage,
					"pageSize": pageSize,
					"Access-Token":commonUtil.getToken()
				}
			}).success(function(data, status, header, config) {
				deferred.resolve(data);
			}).error(function(data, status, header, config) {
				deferred.reject(data);
			});
			return deferred.promise;
		},
		/**
		 * 异常信息
		 * @param  userId 用户Id；currentPage 当前页数； pageSize 页数大小
		 * @return promise
		 */
		getExceptionMessageList: function(userId,currentPage,pageSize) {
			var deferred = $q.defer();
			$http({
				url: url + "/alarm/exception/all",
				//url: url2+"alarm/exception/all",
				method: "POST",
				params: {
					"userid": userId,
					"currentPage": currentPage,
					"pageSize": pageSize,
					"Access-Token":commonUtil.getToken()
				}
			}).success(function(data, status, header, config) {
				deferred.resolve(data);
			}).error(function(data, status, header, config) {
				deferred.reject(data);
			});
			return deferred.promise;
		},
		/**
		 * 告警信息删除
		 * @param  u
		 * @return promise
		 */
		delAlarmInfo: function(userId,ids) {
			var deferred = $q.defer();
			$http({
				//url:"http://10.88.20.94:8080/acp-web-monitor/alarm/delete",
				url:url+"/alarm/delete",
				method: "POST",
				params: {
					"userid":userId,
					"ids": ids,
					"Access-Token":commonUtil.getToken()
				}
			}).success(function(data, status, header, config) {
				deferred.resolve(data);
			}).error(function(data, status, header, config) {
				deferred.reject(data);
			});
			return deferred.promise;
		},
		/**
		 * 获取系统告警信息总数
		 * @param
		 * @return promise
		 */
		getSysMessageInfoCount: function(userId) {
			var deferred = $q.defer();
			$http({
				//url:"http://10.88.20.94:8080/acp-web-monitor/message/getAmount",
				url:url+"/message/getAmount",
				method: "POST",
				params: {
					"userid":userId
				}
			}).success(function(data, status, header, config) {
				deferred.resolve(data);
			}).error(function(data, status, header, config) {
				deferred.reject(data);
			});
			return deferred.promise;
		},
		/**
		 * 从百度获取天气信息
		 * @param
		 * @return promise
		 */
		getSysWeatherInfoFromBaidu: function(area) {
			var deferred = $q.defer();
			$http({
				//url:"http://10.88.20.104:8079/acp-web-monitor/weather/getBaidu",
				url:url+"/weather/getBaidu",
				method: "POST",
				params: {
					"area":area
				}
			}).success(function(data, status, header, config) {
				deferred.resolve(data);
			}).error(function(data, status, header, config) {
				deferred.reject(data);
			});
			return deferred.promise;
		} ,
		/**
		 * 从百度获取天气信息
		 * @param
		 * @return promise
		 */
		getSysWeatherNationInfo: function(area,proven) {
			var deferred = $q.defer();
			$http({
				//url:"http://10.88.20.104:8079/acp-web-monitor/weather/getNation",
				url:url+"/weather/getNation",
				method: "POST",
				params: {
					"area":area,
					"proven":proven
				}
			}).success(function(data, status, header, config) {
				deferred.resolve(data);
			}).error(function(data, status, header, config) {
				deferred.reject(data);
			});
			return deferred.promise;
		}
	}
}]);
