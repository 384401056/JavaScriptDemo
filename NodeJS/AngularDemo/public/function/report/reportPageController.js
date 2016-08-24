app.controller('reportPageController', function($scope, $http, $stateParams, ReportService) {
	$scope.orgId = $stateParams.orgId || "";
	$scope.deviceLst = $stateParams.deviceLst || "";
	$scope.deviceType = $stateParams.deviceType || "";
	$scope.isCompare = $stateParams.isCompare || "";

	$scope.gridType = $stateParams.gridType || "";
	
	// $scope.gridType = $stateParams.gridType;
	
	$scope.pageLoadType = "0";  //图表类型：0; 图片列表类型：1; 数据网格列表类型:2;
	if('8' === $scope.deviceType){
		$scope.pageLoadType = "1"
	}else if('3' === $scope.deviceType || '21' === $scope.deviceType){
		$scope.pageLoadType = "2";
		if('21' === $scope.deviceType){
			// $scope.gridType = 0;
		}
	}

	$scope.chartReportDataLoad = function(param, callback) {
		var paramObj = {
			orgId: $scope.orgId,
			deviceLstStr: $scope.deviceLst,
			deviceTypeId: $scope.deviceType,
			reportType: param.reportType,
			isCompare: param.isCompare,
			fastDateType: param.fastDateType,
			startDate: param.startDate,
			endDate: param.endDate
		}
		var pormise = ReportService.loadChartReportData(paramObj);
		pormise.then(function(data) {
			if(data && data.data){
				data.data.isCompare = $scope.isCompare;
			}
			if(callback && typeof(callback) == "function") {
				callback(data);
			}
  		},function(data) {
  			var rstData = {
  				flag: 0,
  				message: "调用后台服务出错，页面加载失败！",
  				data: null
  			};
  			if(callback && typeof(callback) == "function") {
				callback(data);
			}
  		});
	};
	
	$scope.chartExpExcel = function(param) {
		var paramObj = {
			orgId: $scope.orgId,
			deviceLstStr: $scope.deviceLst,
			deviceTypeId: $scope.deviceType,
			reportType: param.reportType,
			isCompare: param.isCompare,
			fastDateType: param.fastDateType,
			startDate: param.startDate,
			endDate: param.endDate
		};
		ReportService.chartExpExcel(paramObj);
	};
	
	$scope.imgReportDataLoad = function(param, callback) {
		var paramObj = {
			orgId: $scope.orgId,
			deviceLstStr: $scope.deviceLst,
			deviceTypeId: $scope.deviceType,
			fastDateType: param.fastDateType,
			startDate: param.startDate,
			endDate: param.endDate
		}
		var pormise = ReportService.loadImgReportData(paramObj);
		pormise.then(function(data) {
			if(callback && typeof(callback) == "function") {
				callback(data);
			}
  		},function(data) {
  			var rstData = {
  				flag: 0,
  				message: "调用后台服务出错，页面加载失败！",
  				data: null
  			};
  			if(callback && typeof(callback) == "function") {
				callback(data);
			}
  		});
	};

	$scope.gridReportDataLoad = function(param, callback) {
		var paramObj = {
			orgId: $scope.orgId,
			deviceId: $scope.deviceLst,
			deviceTypeId: $scope.deviceType,
			reportType: $scope.gridType,
			isCompare: $scope.isCompare,
			fastDateType: param.fastDateType,
			startDate: param.startDate,
			endDate: param.endDate,
			currentPage:param.currentPage,
			pageSize: param.pageSize
		};
		var promise = ReportService.getGridListData(paramObj);
		promise.then(function(data) {
			if(data.flag === 1) {
				callback(data);
			}
		},function() {
			console.log(data);
		});
	};
	$scope.gridExcelReport = function(param){
		var paramObj = {
			orgId: $scope.orgId,
			deviceId: $scope.deviceLst,
			deviceTypeId: $scope.deviceType,
			reportType: $scope.gridType,
			isCompare: $scope.isCompare,
			fastDateType: param.fastDateType || null,
			startDate: param.startDate || null,
			endDate: param.endDate || null
		};
		console.log(paramObj);
		ReportService.exportExcel(paramObj);
	};
});