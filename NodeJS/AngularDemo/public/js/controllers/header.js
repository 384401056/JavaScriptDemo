'use strict';

/* HeaderController */
app.controller('HeaderController', ['$scope', '$rootScope', '$cookieStore','SystemService',
  function($scope, $rootScope, $cookieStore, SystemService) {

    //初始化 
    $rootScope.userName = $cookieStore.get("name");
    $rootScope.userId = $cookieStore.get("id");

    /**
      * 获取统计系统消息
    */
    getSysMessageCount();
    
    function getSysMessageCount(){
        var userid= $cookieStore.get("id");
        var promise = SystemService.getSysMessageInfoCount(userid);
        promise.then(function (data) {
          if(data.flag==1) {
            $scope.messageall=data.data;
            $scope.alarm_amount=data.data.alarm_amount;
          }
        });
    }
    $scope.$on("FromAppCtrl", function (event, data) {
      $scope.alarm_amount=data.description;
    });
    /*
    退出登录
     */
    $scope.loginOut = function() {
      $cookieStore.remove("name");
      $cookieStore.remove("id");
      $cookieStore.remove("orgId");
      $cookieStore.remove("acp_system_nav");

      $cookieStore.remove("token");
      $cookieStore.remove("functionId");
      $cookieStore.remove("userPermission");


    };

  }

]);