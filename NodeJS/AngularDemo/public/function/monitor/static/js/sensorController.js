'use strict';

/* monitorViewControllers */
/*
  author：cunqinghe
 */

app.controller('sensorController', ['$scope', '$rootScope', '$http', '$state', '$modal', '$log',
  function($scope, $rootScope, $http, $state, $modal, $log) {

    var diviceId = $rootScope.pId;
    console.log("diviceId:" + $rootScope.pId);
    var serviceUrl = "http://10.88.20.51:8081/monitor/";

    var diviceIdArray = new Array();
    var diviceArray = new Array();

    var locationValue = 200;

    //空温小图标
    var airTempHash = new Array();
    airTempHash['1'] = 'equip-icon-0 equip-icon-0-1-1 icon';
    airTempHash['2'] = 'equip-icon-0 equip-icon-0-1-2 icon';
    airTempHash['3'] = 'equip-icon-0 equip-icon-0-1-3 icon';
    airTempHash['4'] = 'equip-icon-0 equip-icon-0-1-4 icon';
    airTempHash['5'] = 'equip-icon-0 equip-icon-0-1-5 icon';
    //空湿小图标
    var airHumidityHash = new Array();
    airHumidityHash['1'] = 'equip-icon-0 equip-icon-0-2-1 icon';
    airHumidityHash['2'] = 'equip-icon-0 equip-icon-0-2-2 icon';
    airHumidityHash['3'] = 'equip-icon-0 equip-icon-0-2-3 icon';
    airHumidityHash['4'] = 'equip-icon-0 equip-icon-0-2-4 icon';
    airHumidityHash['5'] = 'equip-icon-0 equip-icon-0-2-5 icon';

    //视频小图标
    var videoHash = new Array();
    videoHash['1'] = 'equip-icon-0 equip-icon-0-3-1 icon';
    videoHash['2'] = 'equip-icon-0 equip-icon-0-3-2 icon';
    videoHash['3'] = 'equip-icon-0 equip-icon-0-3-3 icon';
    videoHash['4'] = 'equip-icon-0 equip-icon-0-3-4 icon';
    videoHash['5'] = 'equip-icon-0 equip-icon-0-3-5 icon';

    //土温小图标
    var soilTempHash = new Array();
    soilTempHash['1'] = 'equip-icon-0 equip-icon-0-4-1 icon';
    soilTempHash['2'] = 'equip-icon-0 equip-icon-0-4-2 icon';
    soilTempHash['3'] = 'equip-icon-0 equip-icon-0-4-3 icon';
    soilTempHash['4'] = 'equip-icon-0 equip-icon-0-4-4 icon';
    soilTempHash['5'] = 'equip-icon-0 equip-icon-0-4-5 icon';

    //土湿小图标
    var soilHumidityHash = new Array();
    soilHumidityHash['1'] = 'equip-icon-0 equip-icon-0-5-1 icon';
    soilHumidityHash['2'] = 'equip-icon-0 equip-icon-0-5-2 icon';
    soilHumidityHash['3'] = 'equip-icon-0 equip-icon-0-5-3 icon';
    soilHumidityHash['4'] = 'equip-icon-0 equip-icon-0-5-4 icon';
    soilHumidityHash['5'] = 'equip-icon-0 equip-icon-0-5-5 icon';

    //风向小图标
    var windDirectionHash = new Array();
    windDirectionHash['1'] = 'equip-icon-0 equip-icon-0-7-1 icon';
    windDirectionHash['2'] = 'equip-icon-0 equip-icon-0-7-2 icon';
    windDirectionHash['3'] = 'equip-icon-0 equip-icon-0-7-3 icon';
    windDirectionHash['4'] = 'equip-icon-0 equip-icon-0-7-4 icon';
    windDirectionHash['5'] = 'equip-icon-0 equip-icon-0-7-5 icon';

    //相机小图标
    var photoHash = new Array();
    photoHash['1'] = 'equip-icon-0 equip-icon-0-8-1 icon';
    photoHash['2'] = 'equip-icon-0 equip-icon-0-8-2 icon';
    photoHash['3'] = 'equip-icon-0 equip-icon-0-8-3 icon';
    photoHash['4'] = 'equip-icon-0 equip-icon-0-8-4 icon';
    photoHash['5'] = 'equip-icon-0 equip-icon-0-8-5 icon';

    //光照小图标
    var illuminationHash = new Array();
    illuminationHash['1'] = 'equip-icon-0 equip-icon-0-9-1 icon';
    illuminationHash['2'] = 'equip-icon-0 equip-icon-0-9-2 icon';
    illuminationHash['3'] = 'equip-icon-0 equip-icon-0-9-3 icon';
    illuminationHash['4'] = 'equip-icon-0 equip-icon-0-9-4 icon';
    illuminationHash['5'] = 'equip-icon-0 equip-icon-0-9-5 icon';

    //风速小图标
    var windVelocityHash = new Array();
    windVelocityHash['1'] = 'equip-icon-0 equip-icon-0-10-1 icon';
    windVelocityHash['2'] = 'equip-icon-0 equip-icon-0-10-2 icon';
    windVelocityHash['3'] = 'equip-icon-0 equip-icon-0-10-3 icon';
    windVelocityHash['4'] = 'equip-icon-0 equip-icon-0-10-4 icon';
    windVelocityHash['5'] = 'equip-icon-0 equip-icon-0-10-5 icon';

    $http({
      method: 'get',
      url: serviceUrl + 'deviceinfoatorg/getdevicelastinfo/' + diviceId,
    }).success(function(data) {
      var obj1 = eval(data);
      for (var i = 0; i < obj1.data.length; i++) {
        /*
          设置设备位置
          判断是否是第一次加载设备
         */
        if (obj1.data[i].isUseCoord == 0) {
          locationValue += 40;
          obj1.data[i].left = 200,
          obj1.data[i].top = locationValue;
        }

        /*
          设置状态图标和信息窗口模板路径
         */
        switch (obj1.data[i].deviceType) {
          case 1:
            // 空温
            obj1.data[i].status = airTempHash[obj1.data[i].status];
            //infoWindowUrl = "function/monitor/sensor.html";
            break;
          case 2:
            // 空湿
            obj1.data[i].status = airHumidityHash[obj1.data[i].status];
            break;
          case 3:
            // 视频设备
            obj1.data[i].status = videoHash[obj1.data[i].status];

            break;
          case 4:
            // 土壤温度
            obj1.data[i].status = obj1.data[i].status[state];
            break;
          case 5:
            // 土壤湿度
            obj1.data[i].status = soilHumidityHash[obj1.data[i].status];
            break;
          case 6:
            // 
            obj1.data[i].status = soilHumidityHash[obj1.data[i].status];
            break;
          case 7:
            // 风向
            obj1.data[i].status = windDirectionHash[obj1.data[i].status];
            break;
          case 8:
            // 相机
            obj1.data[i].status = photoHash[obj1.data[i].status];
            break;
          case 9:
            // 光照
            obj1.data[i].status = illuminationHash[obj1.data[i].status];
            break;
          case 10:
            // 风速
            obj1.data[i].status = windVelocityHash[obj1.data[i].status];
            break;
            // default:
            //     // statements_def
            // break;

        }
        diviceIdArray[i] = obj1.data[i].id;
      }

      var ddArray = JSON.stringify(obj1.data);
      $scope.items = eval(ddArray);

      $scope.click = function(id) {
      }

    }).error(function() {
      //$scope.warning.info = "网络连接失败";
    });

    /*
      Jquery实现
     */
    (function() {

    })();

  }

]);