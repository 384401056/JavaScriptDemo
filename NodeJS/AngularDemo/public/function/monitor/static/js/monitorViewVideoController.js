'use strict';

/* 
  普通视图控制器 
*/
/*
  author：cunqinghe
 */

app.controller('ViewController', ['$scope', 'MonitorService','uiLoad', '$rootScope', '$http', '$state', '$modal', '$log', '$stateParams', 'videoService',
  function($scope, MonitorService,uiLoad, $rootScope, $http, $state, $modal, $log, $stateParams, videoService) {

    $rootScope.orgId = ($rootScope.orgId || $stateParams.data);
    //var orgId = $rootScope.orgId;
    var orgId = "10003";
    var diviceIdArray = new Array();
    var diviceArray = new Array();
    //设备分组用数组
    var diviceGroupArry = new Array();

    var locationValue = 200;
    var ddArray;

    initInfo();
    initdivice();

    /*
      初始化地块信息
     */
    function initInfo() {
      var promise = MonitorService.getOrgInfo(orgId);
      promise.then(function(data) {
        var obj = eval(data);
        if (obj.length > 0) {
          $scope.contactname = obj.data.contactname;
          $scope.orgname = obj.data.orgname;
          $scope.mobile = obj.data.mobile;
        }

      }, function(data) {
        //服务调用失败
      });
     
    }

    /*
      初始化设备信息
     */
    function initdivice() {
      var promise = MonitorService.getOrgDiviceInfoAll(orgId);
      promise.then(function(data) {
        var obj = eval(data);
        for (var i = 0; i < obj.data.length; i++) {
          diviceGroupArry.push(jQuery.parseJSON('{"id":' + obj.data[i].id + ',"deviceName":"' + obj.data[i].deviceName + '","deviceType":' + obj.data[i].deviceType + ',"typeName":"' + obj.data[i].typeName + '"}'));
          /*
            设置设备位置
            判断是否是第一次加载设备
           */

          if (obj.data[i].isUseCoord == 0) {
            locationValue += 40;
            obj.data[i].coordinateX = 200,
              obj.data[i].coordinateY = locationValue;
          }
          /*
            设置状态图标和信息窗口模板路径
           */
          switch (parseInt(obj.data[i].deviceType)) {
            case 1:
              // 空温
              obj.data[i].status = "equip-icon-min-0 equip-icon-min-0-1-" + obj.data[i].status + " icon";
              obj.data[i].length = 150;
              break;
            case 2:
              // 空湿
              obj.data[i].status = "equip-icon-min-0 equip-icon-min-0-2-" + obj.data[i].status + " icon";
              obj.data[i].length = 150;
              break;
            case 3:
              // 视频设备
              obj.data[i].status = "equip-icon-min-0 equip-icon-min-0-3-" + obj.data[i].status + " icon";
              obj.data[i].length = 200;
              obj.data[i].lastvalue = obj.data[i].deviceName;
              obj.data[i].unit = "";
              break;
            case 4:
              // 土壤温度
              obj.data[i].status = "equip-icon-min-0 equip-icon-min-0-4-" + obj.data[i].status + " icon";
              obj.data[i].length = 150;
              break;
            case 5:
              // 土壤湿度
              obj.data[i].status = "equip-icon-min-0 equip-icon-min-0-5-" + obj.data[i].status + " icon";
              obj.data[i].length = 150;
              break;
            case 6:
              //二氧化碳
              obj.data[i].status = "equip-icon-min-0 equip-icon-min-0-6-" + obj.data[i].status + " icon";
              obj.data[i].length = 150;
              break;
            case 7:
              // 风向
              obj.data[i].status = "equip-icon-min-0 equip-icon-min-0-7-" + obj.data[i].status + " icon";
              obj.data[i].length = 150;
              break;
            case 8:
              // 相机
              if (obj.data[i].status) {
                obj.data[i].status = "equip-icon-min-0 equip-icon-min-0-8-" + obj.data[i].status + " icon";
              } else {
                obj.data[i].status = "equip-icon-min-0 equip-icon-min-0-8-1 icon";
              }

              obj.data[i].length = 150;
              obj.data[i].lastvalue = obj.data[i].deviceName;
              obj.data[i].unit = "";
              break;
            case 9:
              // 光照
              obj.data[i].status = "equip-icon-min-0 equip-icon-min-0-9-" + obj.data[i].status + " icon";
              obj.data[i].length = 150;
              break;
            case 10:
              // 风速
              obj.data[i].status = "equip-icon-min-0 equip-icon-min-0-10-" + obj.data[i].status + " icon";
              obj.data[i].length = 150;
              break;
            case 11:
              // 风速
              obj.data[i].status = "equip-icon-min-0 equip-icon-min-0-11-" + obj.data[i].status + " icon";
              obj.data[i].length = 150;
              break;
            case 12:
              // 风速
              obj.data[i].status = "equip-icon-min-0 equip-icon-min-0-12-" + obj.data[i].status + " icon";
              obj.data[i].length = 150;
              break;
            case 13:
              // 风速
              obj.data[i].status = "equip-icon-min-0 equip-icon-min-0-13-" + obj.data[i].status + " icon";
              obj.data[i].length = 150;
              break;
            case 14:
              // 风速
              obj.data[i].status = "equip-icon-min-0 equip-icon-min-0-14-" + obj.data[i].status + " icon";
              obj.data[i].length = 150;
              break;
            case 15:
              // 风速
              obj.data[i].status = "equip-icon-min-0 equip-icon-min-0-15-" + obj.data[i].status + " icon";
              obj.data[i].length = 150;
              break;
            case 16:
              // 风速
              obj.data[i].status = "equip-icon-min-0 equip-icon-min-0-16-" + obj.data[i].status + " icon";
              obj.data[i].length = 150;
              break;
            case 17:
              // 风速
              obj.data[i].status = "equip-icon-min-0 equip-icon-min-0-17-" + obj.data[i].status + " icon";
              obj.data[i].length = 150;
              break;
            case 18:
              // 风速
              obj.data[i].status = "equip-icon-min-0 equip-icon-min-0-18-" + obj.data[i].status + " icon";
              obj.data[i].length = 150;
              break;
            case 19:
              // 风速
              obj.data[i].status = "equip-icon-min-0 equip-icon-min-0-19-" + obj.data[i].status + " icon";
              obj.data[i].length = 150;
              break;
            case 20:
              // 风速
              obj.data[i].status = "equip-icon-min-0 equip-icon-min-0-20-" + obj.data[i].status + " icon";
              obj.data[i].length = 150;
              break;
            case 21:
              // 电磁阀
              obj.data[i].status = "equip-icon-min-0 equip-icon-min-0-21-" + obj.data[i].status + " icon";
              obj.data[i].length = 150;
              obj.data[i].lastvalue = obj.data[i].deviceName;
              obj.data[i].unit = "";
              break;
              // default:
              //     // statements_def
              // break;

          }
          diviceIdArray[i] = obj.data[i].id;
        }

        ddArray = JSON.stringify(obj.data);
        $scope.items = eval(ddArray);
        
        
      }, function(data) {
        //服务调用失败
      });
    }


    /*
        锁定
        锁定之后可对设备位置进行拖动
       */
    $scope.lock = function() {
      for (var i = 0; i < diviceIdArray.length; i++) {
        $("div[id=" + diviceIdArray[i] + "]").draggable({
          disabled: false
        });
        $("div[id=" + diviceIdArray[i] + "]").unbind("click");
      }
    };
    /*
      解锁
      解锁之后可对拖动的设备位置进行保存
     */
    $scope.unlock = function() {
      var modalInstance = $modal.open({
        templateUrl: 'function/monitor/devicePop.html',
        controller: dialogController,
        backdrop: 'static',
        keyboard: false,
        resolve: {
          //传递参数
          items: function() {
            return angular.copy($scope.items);
          },
          url: function() {
            return angular.copy($scope.app.monitorUrl);
          }

        }

      });
      modalInstance.opened.then(function() {
        //模态窗口打开之后执行的函数

      });
      modalInstance.result.then(function(item) {
        $scope.items = eval(ddArray);
      }, function(reason) {
        //点击空白区域，总会输出backdrop click，点击取消，则会暑促cancel

      });

    };

    var dialogController = function($scope, $http, $modalInstance, url) {

      $scope.operateInfo = "是否保存修改？";

      //取消
      $scope.cancel = function() {
        //$modalInstance.dismiss('cancel');
        $scope.item = [];
        $modalInstance.close($scope.item); //关闭并返回当前选项
      };


      //保存
      $scope.ok = function() {
        var diviceLocation = new Array();
        var kegNew = new Object();

        for (var i = 0; i < diviceIdArray.length; i++) {
          var diviceData = new Object();

          $("div[id=" + diviceIdArray[i] + "]").draggable({
            disabled: true
          });
          $("#" + diviceIdArray[i]).bind("click", function() {


            var infoId = $(this).attr("id");
            for (var i = 0; i < diviceIdArray.length; i++) {
              $("#" + diviceIdArray[i] + "infoWindow").css({
                display: "none"
              });
              $("#" + diviceIdArray[i] + "infoWindow").removeClass("show");
            }


            $("#" + $(this).attr("id") + "infoWindow").css({
              left: (parseInt($(this).css("left")) - 60) + 'px'
            });
            $("#" + $(this).attr("id") + "infoWindow").css({
              top: (parseInt($(this).css("top")) - 130) + 'px'
            });
            $("#" + $(this).attr("id") + "infoWindow").css({
              display: "block"
            });
            $("#" + $(this).attr("id") + "infoWindow").addClass('show');
            //绑定信息窗口关闭事件，只绑定一次
            $("#" + $(this).attr("id") + "infoWindow .common-sensor-page-right-close").one("click", function() {
              $("#" + infoId + "infoWindow").css({
                display: "none"
              });
              $("#" + infoId + "infoWindow").removeClass('show');
            });

          });
          /*
            获取设备位置并保存
           */
          diviceData.id = diviceIdArray[i];
          diviceData.x = parseInt($("div[id=" + diviceIdArray[i] + "]").css("left"));
          diviceData.y = parseInt($("div[id=" + diviceIdArray[i] + "]").css("top"));
          diviceData.isUseCoord = 1;
          diviceLocation.push(diviceData);
          // diviceLocation.push({"id":diviceData.id,"x":diviceData.x,"y":diviceData.y,"isUseCoord":diviceData.isUseCoord});
        };

        kegNew.data = diviceLocation;
        var diviceInfoArray = {
          json: JSON.stringify(kegNew)
        }; //将数据转为json
        /*
          调用保存设备位置的服务
         */
        var promise = MonitorService.setDiviceInfo(diviceInfoArray);
        promise.then(function(data) {
          //保存成功
        }, function(data) {
          //保存失败
        });

        $modalInstance.dismiss('cancel'); //关闭模态窗
      };
    }


    /*
      选择查看分组
     */

    $scope.queryGroup = function() {
      //清除所有分组标志
      $(".icon-group").css({
        display: "none"
      });

      var modalInstance = $modal.open({
        templateUrl: 'function/monitor/chooseGroupDialog.html',
        backdrop: 'static',
        controller: queryGroupController,
        keyboard: false,
        resolve: {
          diviceGroupArry: function() {
            return diviceGroupArry;
          },
          orgId: function() {
            return angular.copy(orgId);
          }
        }
      });
      modalInstance.opened.then(function() {
        //模态窗口打开之后执行的函数

      });
      modalInstance.result.then(function(item) {
        var arr = item;
        angular.forEach(arr, function(data) {
          console.log("222: " + data);
          $("#" + data + "group").css({
            display: "block"
          });
        });
      }, function(reason) {
        //点击空白区域，总会输出backdrop click，点击取消，则会暑促cancel

      });
    };

    var queryGroupController = function($scope, MonitorService, $modalInstance, $state, orgId) {
      //设备分组用数组
      var groupArr = new Array();
      var diviceArr = new Array();
      var obj;
      var orgid = orgId;
      var promise = MonitorService.getDiviceGroupInfo(orgid);
      promise.then(function(data) {
          obj = eval(data);
          for (var i = 0; i < obj.data.length; i++) {
            groupArr.push(jQuery.parseJSON('{"id":' + obj.data[i].id + ',"groupName":"' + obj.data[i].groupName + '"}'));
          }

        },
        function(data) {
          //服务调用失败
        });

      $scope.deviceInfoData = groupArr;
      $scope.devices = groupArr;
      //取消
      $scope.cancel = function() {
        $modalInstance.close(); //关闭
      };
      //确定
      $scope.ok = function() {
        var selectDevices = $scope.devices;
        for (var i = 0; i < obj.data.length; i++) {
          if (obj.data[i].id == selectDevices.id) {
            diviceArr = obj.data[i].devices;
          }

        }
        $scope.item = diviceArr;
        $modalInstance.close($scope.item); //关闭并返回当前选项
      };

    }

    /*
      新增分组
     */
    $scope.addGroup = function() {
      var modalInstance = $modal.open({
        templateUrl: 'function/monitor/NewDeviceGroupDialog.html',
        backdrop: 'static',
        controller: 'deviceGroupCtrl',
        keyboard: false,
        resolve: {
          diviceGroupArry: function() {
            return diviceGroupArry;
          },
          url: function() {
            return angular.copy($scope.app.monitorUrl);
          },
          orgId: function() {
            return angular.copy(orgId);
          }
        }
      })

    };

    /*
      点击设备弹出信息窗口
     */
    $scope.click = function(id) {
      uiLoad.loadScript('function/monitor/static/js/webVideoCtrl.js');
      $scope.dId = id;
      var promise = MonitorService.getOrgDiviceInfoSingle(id);
      promise.then(function(data) {
        var obj1 = data;

        if (obj1.data) {
          switch (obj1.data.deviceType) {
            case 1:
              // 空温
              obj1.data.status = "equip-icon-0 equip-icon-0-1-" + obj1.data.status + " icon";
              break;
            case 2:
              // 空湿
              obj1.data.status = "equip-icon-0 equip-icon-0-2-" + obj1.data.status + " icon";
              break;
            case 3:
              // 视频设备
              obj1.data.status = "equip-icon-0 equip-icon-0-3-" + obj1.data.status + " icon";
              break;
            case 4:
              // 土壤温度
              obj1.data.status = "equip-icon-0 equip-icon-0-4-" + obj1.data.status + " icon";
              break;
            case 5:
              // 土壤湿度
              obj1.data.status = "equip-icon-0 equip-icon-0-5-" + obj1.data.status + " icon";
              break;
            case 6:
              // 二氧化碳
              obj1.data.status = "equip-icon-0 equip-icon-0-6-" + obj1.data.status + " icon";
              break;
            case 7:
              // 风向
              obj1.data.status = "equip-icon-0 equip-icon-0-7-" + obj1.data.status + " icon";
              break;
            case 8:
              // 相机
              obj1.data.status = "equip-icon-0 equip-icon-0-8-" + obj1.data.status + " icon";
              break;
            case 9:
              // 光照
              obj1.data.status = "equip-icon-0 equip-icon-0-9-" + obj1.data.status + " icon";
              break;
            case 10:
              // 风速
              obj1.data.status = "equip-icon-0 equip-icon-0-10-" + obj1.data.status + " icon";
              break;
            case 11:
              //雨量
              obj1.data.status = "equip-icon-0 equip-icon-0-11-" + obj1.data.status + " icon";
              break;
            case 12:
              // 氧含量
              obj1.data.status = "equip-icon-0 equip-icon-0-12-" + obj1.data.status + " icon";
              break;
            case 13:
              // 叶面水分
              obj1.data.status = "equip-icon-0 equip-icon-0-13-" + obj1.data.status + " icon";
              break;
            case 14:
              // 水溶氧
              obj1.data.status = "equip-icon-0 equip-icon-0-14-" + obj1.data.status + " icon";
              break;
            case 15:
              // 噪音
              obj1.data.status = "equip-icon-0 equip-icon-0-15-" + obj1.data.status + " icon";
              break;
            case 16:
              // 土壤张力
              obj1.data.status = "equip-icon-0 equip-icon-0-16-" + obj1.data.status + " icon";
              break;
            case 17:
              // 土壤PH
              obj1.data.status = "equip-icon-0 equip-icon-0-17-" + obj1.data.status + " icon";
              break;
            case 18:
              // 水压力
              obj1.data.status = "equip-icon-0 equip-icon-0-18-" + obj1.data.status + " icon";
              break;
            case 19:
              // 液位
              obj1.data.status = "equip-icon-0 equip-icon-0-19-" + obj1.data.status + " icon";
              break;
            case 20:
              // 流量
              obj1.data.status = "equip-icon-0 equip-icon-0-20-" + obj1.data.status + " icon";
              break;
            case 21:
              // 电磁阀
              obj1.data.status = "equip-icon-0 equip-icon-0-21-" + obj1.data.status + " icon";
              break;
              // default:
              //     // statements_def
              // break;

          }

          var infoType;
          switch (obj1.data.categoryId) {
            case 1:
              /*
                 传感类数值
              */
              infoType = "infoWindow"; //传感类
              $scope.state = obj1.data.status;
              $scope.diviceName = obj1.data.deviceName;

              if (obj1.data.lastvalue) {
                $scope.value = obj1.data.lastvalue[0].value + obj1.data.unit;
                $scope.lastValue1 = obj1.data.lastvalue[0].signaltime + obj1.data.deviceName + "为 " + obj1.data.lastvalue[0].value + obj1.data.unit;
                $scope.lastValue2 = obj1.data.lastvalue[1].signaltime + obj1.data.deviceName + "为 " + obj1.data.lastvalue[1].value + obj1.data.unit;
              } else {
                $scope.value = 0;
                $scope.lastValue1 = 0;
                $scope.lastValue2 = 0;
              }
              break;
            case 2:
              /*
                 控制类数值
              */
              infoType = "controllerinfoWindow"; //控制类
              $scope.state = obj1.data.status;
              $scope.diviceName = obj1.data.deviceName;

              $('input').lc_switch(); //初始化开关控件
              /*
                初始化设置控制器的开关状态
               */
              $('input').lcs_off();
              if (obj1.data.lastvalue) {
                $scope.value = obj1.data.lastvalue[0].value;
                $scope.lastValue1 = obj1.data.lastvalue[0].signaltime;
                $scope.lastValue2 = obj1.data.lastvalue[1].signaltime;
              } else {
                $scope.value = 0;
                $scope.lastValue1 = 0;
                $scope.lastValue2 = 0;
              }
              break;
            case 6:
              /*
                视频
              */
              infoType = "videofoWindow"; //视频
              //uiLoad.loadScript('function/monitor/static/js/webVideoCtrl.js');
              videoService.showVideo();
              break;
            case 7:
              /*
                 相机数值
               */
              infoType = "camerainfoWindow"; //相机
              //$scope.state = obj1.data.status;
              $scope.diviceName = obj1.data.deviceName;

              break;

            default:
              // statements_def
              break;
          }

          /*
            根据设备类型打开信息窗口，定位信息窗口的展现位置
           */



          $("#" + infoType).css({
            left: (parseInt(($("#" + id)).css("left")) - 60) + 'px'
          });
          $("#" + infoType).css({
            top: (parseInt(($("#" + id)).css("top")) - 130) + 'px'
          });
          $("#" + infoType).css({
            display: "block"
          });
          $("#" + infoType).addClass('show');

          /*
            计算弹出窗顶部的距离，不让弹窗遮挡
           */
          var ddd = parseInt($("#img_map").css("top")) + parseInt($("#" + id).css("top"));
          var ccc = parseInt($("#" + infoType).css("height"));
          if (ddd < ccc) {
            $("#img_map").css({
              top: ccc - ddd
            });
          }

          /*
            计算弹出窗左侧的距离，不让弹窗遮挡
           */
          var eee = parseInt($("#img_map").css("left"));
          var fff = parseInt($("#" + infoType).css("left"));
          if ((fff + eee) < 0) {
            $("#img_map").css({
              left: eee - (eee + fff)
            });
          }
          /*
            计算弹出窗右侧的距离，不让弹窗遮挡
           */
          var ggg1 = parseInt($("#img_map").css("left"));
          var ggg2 = parseInt($("#" + infoType).css("left"));
          var ggg3 = parseInt($("#" + infoType).css("width"));
          var hhh = parseInt($("#img_map").css("width"));
          if ((ggg1 + ggg2 + ggg3) > hhh) {
            $("#img_map").css({
              left: hhh - (ggg1 + ggg2 + ggg3)
            });
          }

          //绑定设备关闭事件
          $(".common-monitor-device-page-right-close").one("click", function() {
            $("#" + infoType).css({
              display: "none"
            });
            $("#" + infoType).removeClass('show');

          });
        }


      }, function(data) {
        //服务调用失败
      });
    };


    /*
      设置传感设备规则
     */
    $scope.sensorSet = function(divceId, diviceName) {
      var navItem = {
        href: 'app.sensorSet',
        text: diviceName + "设置",
      }
      $scope.addNavItem(navItem);
      $state.go('app.sensorSet', {
        "data": divceId,
        "diviceName": diviceName
      });
    };

    /*
      查看传感设备报表
     */
    $scope.sensorReport = function(divceId, diviceName) {
      var navItem = {
        href: 'app.charts',
        text: diviceName + "报表",
      }
      $scope.addNavItem(navItem);
      $state.go('app.charts', {
        "data": divceId
      });
    };

    /*
      设置控制设备规则
     */
    $scope.controllerSet = function(divceId, diviceName) {
      var navItem = {
        href: 'app.sensorSet',
        text: diviceName + "设置",
      }
      $scope.addNavItem(navItem);
      $state.go('app.sensorSet', {
        "orgId": orgId,
        "data": divceId,
        "diviceName": diviceName
      });
    };

    /*
      查看控制设备报表
     */
    $scope.sensorReport = function(divceId, diviceName) {
      var navItem = {
        href: 'app.charts',
        text: diviceName + "报表",
      }
      $scope.addNavItem(navItem);
      $state.go('app.charts', {
        "data": divceId
      });
    };

    /*
      控制设备操作（打开或关闭）
     */
    $scope.open = function(divceId) {
      console.log("1111111: " + divceId);

      var status = ($(".lcs_check").is(':checked')) ? 'unchecked' : 'checked';

      alert(status);


    };



    /*
      设置相机规则
     */
    $scope.cameraSet = function(divceId, diviceName) {
      var navItem = {
        href: 'app.sensorSet',
        text: diviceName + "设置",
      }
      $scope.addNavItem(navItem);
      $state.go('app.sensorSet', {
        "data": divceId,
        "diviceName": diviceName
      });
    };

    /*
      查看相机报表
     */
    $scope.cameraReport = function(divceId, diviceName) {
      var navItem = {
        href: 'app.charts',
        text: diviceName + "报表",
      }
      $scope.addNavItem(navItem);
      $state.go('app.charts', {
        "data": divceId
      });
    };

    /*
      相机设备操作（拍摄）
     */
    $scope.cameraOperate = function(divceId) {
      // console.log("1111111: " + divceId);
      // console.log("2222222: " + $rootScope.userNameId);
      //
      // var status = ($(".lcs_check").is(':checked')) ? 'unchecked' : 'checked';

      alert(divceId);


    };



    /*
      Jquery实现部分
     */
    (function() {

      $("#img_map").draggable();
      // $("#img_map").draggable({
      //   drag: function() {
      //       if (parseInt($("#img_map").css("top")) > 0) {
      //         $("#img_map").css({
      //           top: "0px"
      //         });
      //         return false;
      //       }
      //       if (parseInt($("#img_map").css("left")) > 0) {
      //         $("#img_map").css({
      //           left: "0px"
      //         });
      //         return false;
      //       }
      //     }
      // });

      /*
        底部信息栏展现和隐藏图标切换
       */
      $("#upDown").click(function() {
        if ($("#demo").hasClass("in")) {
          $("#upDown").removeClass("icon-chevron-down");
          $("#upDown").addClass("icon-chevron-up");
        } else {
          $("#upDown").removeClass("icon-chevron-up");
          $("#upDown").addClass("icon-chevron-down");
        }
      });

    })();



  }

]);