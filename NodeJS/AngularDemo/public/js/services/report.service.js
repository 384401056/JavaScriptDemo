/**
 * 报表统计  服务
 */
(function() {
	app.service("ReportService",['$http','$q','WebHost',reportService]);
	function reportService($http, $q,WebHost) {
		var url = WebHost.reportUrl;
		return {
			/**
			 * 通过组织机构id查询设备类型列表
			 * @param  orgid [组织机构id]
			 * @return promise
			 */
			getDeviceTypeListByOrgId: function(orgid) {
				var deferred = $q.defer();
				$http({
					url: url + "/deviceType/getDeviceTypeLstByOrgId?orgId=" + orgid,
					method: "GET"
				}).success(function(data, status, header, config) {
					deferred.resolve(data);
				}).error(function(data, status, header, config) {
					deferred.reject(data);
				});
				return deferred.promise;
			},
			/**
			 * 根据orgId和deviceTypeId查询机构树数据
			 * @param  {[type]} orgid  [description]
			 * @param  {[type]} deviceTypeId [description]
			 * @return {[type]}        [description]
			 */
			getOrgTreeData: function(orgid, deviceTypeId) {
				var deferred = $q.defer();
				$http({
					url: url+'/org/getOrgTreeData?orgId=' + orgid + '&deviceTypeId=' + deviceTypeId,
					method: 'GET'
				}).success(function(data, status, header, config) {
					deferred.resolve(data);
				}).error(function(data, status, header, config) {
					deferred.reject(data);
				});
				return deferred.promise;
			},
			/**
			 * 根据orgId和deviceTypeId级联查询该机构及所有子机构设备列表
			 * @param  {[type]} rootOrgId    [根节点OrgId]
			 * @param  {[type]} curryOrgid        [当前查询节点OrgId]
			 * @param  {[type]} deviceTypeId [设备类型Id]
			 */
			getOrgDeviceData: function(rootOrgId, curryOrgid, deviceTypeId) {
				var deferred = $q.defer();
				$http({
					url: url+'/deviceInfo/getTypeOfDeviceDataByOrgId?rootOrgId=' + rootOrgId + '&curryOrgid=' + curryOrgid + '&deviceTypeId= ' + deviceTypeId,
					method: 'GET'
				}).success(function(data, status, header, config) {
					deferred.resolve(data);
				}).error(function(data, status, header, config) {
					deferred.reject(data);
				});
				return deferred.promise;
			},
			/**
			 * 查询设备的报表数据
			 * @param  {[type]} paramObj 
			 * @return promise
			 */
			getGridListData: function(paramObj) {
				var deferred = $q.defer();
				$http({
					url: url + '/reportData/queryListReportData',
					method: 'POST',
					data: paramObj
				}).success(function(data, status, header, config) {
					deferred.resolve(data);
				}).error(function(data, status ,header, config) {
					deferred.reject(data);
				});
				return deferred.promise;
			},
			/**
			 * 向服务器请求图表类报表数据
			 * @param paramObj
			 * @return promise
			 */
			loadChartReportData: function(paramObj) {
				var deferred = $q.defer();
				var serviceUrl = url + "/reportData/queryChartReportData";
				$http({
			    	method: 'post',
			    	url: serviceUrl,
			    	data: paramObj,
			    	timeout: 5000
			    }).success(function(data, status, header, config) {
			    	deferred.resolve(data);
			    }).error(function(data, header, config, status) {
			    	deferred.reject(data);
			    });
				return deferred.promise;
			},
			/**
			 * 导出图表数据为Excel
			 * @param paramObj
			 * @return promise
			 */
			chartExpExcel: function(paramObj) {
				var serviceUrlArry = [];
				serviceUrlArry.push(url);
				serviceUrlArry.push('/reportData/expChartDataToExcel');
				serviceUrlArry.push('?orgId=');
				serviceUrlArry.push(paramObj.orgId);
				serviceUrlArry.push('&deviceLstStr=');
				serviceUrlArry.push(paramObj.deviceLstStr);
				serviceUrlArry.push('&deviceTypeId=');
				serviceUrlArry.push(paramObj.deviceTypeId);
				serviceUrlArry.push('&reportType=');
				serviceUrlArry.push(paramObj.reportType);
				serviceUrlArry.push('&isCompare=');
				serviceUrlArry.push(paramObj.isCompare);
				serviceUrlArry.push('&fastDateType=');
				serviceUrlArry.push(paramObj.fastDateType);
				serviceUrlArry.push('&startDate=');
				serviceUrlArry.push(paramObj.startDate);
				serviceUrlArry.push('&endDate=');
				serviceUrlArry.push(paramObj.endDate);
				var serviceUrl = serviceUrlArry.join('');
				var downLoadIframe = document.getElementById("downLoadIframe");

				if (!downLoadIframe) {
					downLoadIframe = document.createElement('iframe');
					downLoadIframe.id = "downLoadIframe";
				}
				downLoadIframe.src = serviceUrl;
				downLoadIframe.style.display = "none";
				document.body.appendChild(downLoadIframe);
			},
			exportExcel: function(paramObj){
				var serviceUrlArry = [];
				serviceUrlArry.push(url);
				serviceUrlArry.push('/reportData/expListReportDataToExcel');
				serviceUrlArry.push('?orgId=');
				serviceUrlArry.push(paramObj.orgId);
				serviceUrlArry.push('&deviceId=');
				serviceUrlArry.push(paramObj.deviceId);
				serviceUrlArry.push('&deviceTypeId=');
				serviceUrlArry.push(paramObj.deviceTypeId);
				serviceUrlArry.push('&reportType=');
				serviceUrlArry.push(paramObj.reportType);
				serviceUrlArry.push('&isCompare=');
				serviceUrlArry.push(paramObj.isCompare);
				serviceUrlArry.push('&fastDateType=');
				serviceUrlArry.push(paramObj.fastDateType);
				serviceUrlArry.push('&startDate=');
				serviceUrlArry.push(paramObj.startDate);
				serviceUrlArry.push('&endDate=');
				serviceUrlArry.push(paramObj.endDate);
				var serviceUrl = serviceUrlArry.join('');
				var downLoadIframe = document.getElementById("downLoadIframe");

				if (!downLoadIframe) {
					downLoadIframe = document.createElement('iframe');
					downLoadIframe.id = "downLoadIframe";
				}
				downLoadIframe.src = serviceUrl;
				downLoadIframe.style.display = "none";
				document.body.appendChild(downLoadIframe);
			},
			/**
			 * 向服务器请求图片列表类报表数据
			 * @param paramObj
			 * @return promise
			 */
			loadImgReportData: function(paramObj) {
				var deferred = $q.defer();
				var serviceUrl = url + "/reportData/queryImgReportData";
				$http({
			    	method: 'post',
			    	url: serviceUrl,
			    	data: paramObj,
			    	timeout: 5000
			    }).success(function(data, status, header, config) {
			    	deferred.resolve(data);
			    }).error(function(data, header, config, status) {
			    	deferred.reject(data);
			    });
				return deferred.promise;
			},
			/**
			 * 向服务器请求最新的图片数据
			 * @param paramObj
			 * @return promise
			 */
			queryNowImgDataByDeviceId: function(paramObj) {
				var deferred = $q.defer();
				var serviceUrl = url + "/reportData/queryNowImgDataByDeviceId";
				$http({
			    	method: 'post',
			    	url: serviceUrl,
			    	data: paramObj,
			    	timeout: 5000
			    }).success(function(data, status, header, config) {
			    	deferred.resolve(data);
			    }).error(function(data, header, config, status) {
			    	deferred.reject(data);
			    });
				return deferred.promise;
			}
			//ADD OTHER FUNCTIONS
		}
	};
})();