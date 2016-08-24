'use strict';

/* 设备分组控制器 */
/*
 author：lsw
 */

app.controller('cameraController', ['$scope', '$rootScope', '$modal', '$modalInstance', '$http', 'toaster','userId','MonitorService','_devicesId',function($scope, $rootScope, $modal, $modalInstance, $http, toaster,userId,MonitorService,_devicesId) {

    //打开提示框
    $scope.title="相机控制";
    $scope.toasterType = {type: 'info', title: "提示信息", body: ""};
    $scope.pop = function() {toaster.pop($scope.toasterType);}
    $scope.toasterType.type = 'warning';
	

    //打开相机
    $scope.openTap=function () {
		var promise = MonitorService.photo(userId,_devicesId);
		promise.then(function(data) {
			console.log(data);
		 if(data.flag == 1){
            	$scope.toasterType.body="拍摄成功！";
				$scope.toasterType.type= 'success';
				$scope.pop();
            }else{
            	 $scope.toasterType.body="拍摄失败！";
	             $scope.toasterType.type = 'error';
	             $scope.pop();
            }
            $modalInstance.dismiss('cancel');
		}, function(data) {
			//服务调用失败
			 $scope.toasterType.body="网络连接失败！";
             $scope.toasterType.type = 'error';
             $scope.pop();
		});
    };

    //关闭阀门
/*    $scope.closeTap=function () {
         var promise = MonitorService.controller(userId, _devicesId, 0);
            promise.then(function(data) {
                if(data.flag == 1){
                	 $scope.toasterType.body=data.message;
		             $scope.toasterType.type = 'success';
		             $scope.pop();
                }else{
                	 $scope.toasterType.body=data.message;
		             $scope.toasterType.type = 'error';
		             $scope.pop();
                }
                $modalInstance.dismiss('cancel');
            }, function(data) {
				 $scope.toasterType.body="网络连接失败！";
	             $scope.toasterType.type = 'error';
	             $scope.pop();
            });
    };*/

    //判断字段是否为空
    function isEmpty() {
        var Code=$("#pinBox").val();
        if (Code=='' || Code==null){
            $scope.toasterType.body="PIN码不能为空！";
            $scope.pop();
            return false;
        }
        $scope.PINCode=Code;
    }

    //验证PinCode
    $scope.validatePin=function () {
        isEmpty();
        var promise = MonitorService.validatePinCode(parseInt(userId),parseInt($scope.PINCode));
        promise.then(function(data) {
            if (data.flag == 1){
                $scope.toasterType.body=data.message;
                $scope.toasterType.type = 'success';
                $scope.pop();
                $(".btns").slideDown();
            }else {
                $scope.toasterType.body=data.message;
                $scope.toasterType.type = 'error';
                $scope.pop();
            }
        }, function(data) {
            //服务调用失败
        });
    };


    // 关闭弹框js方法
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    }

    $scope.onCancle = function() {
        $modalInstance.dismiss('cancel');
    };

}]);