// 'use strict';

/* Controllers */

angular.module('app')
  .controller('AppCtrl', ['WebHost','$scope','$rootScope', '$translate','$location', '$localStorage','$window', '$http','$interval','$cookieStore','acpLayer','MonitorService','SystemService','$state',
    function(              WebHost,$scope, $rootScope,  $translate, $location,  $localStorage, $window , $http,$interval,$cookieStore,acpLayer,MonitorService,SystemService,$state) {
      // add 'ie' classes to html
      var isIE = !!navigator.userAgent.match(/MSIE/i);
      isIE && angular.element($window.document.body).addClass('ie');
      isSmartDevice( $window ) && angular.element($window.document.body).addClass('smart');
      // config
      $scope.acpLayer = acpLayer;
      $scope.app = {
        name: '农业云v2.0',
        version: '1.3.3',
        color: {
          black:   '#1c2b36'
        },
        settings: {
          themeID: 1,
          navbarHeaderColor: '#00A65A',
          navbarCollapseColor: 'bg-white-only',
          asideColor: 'bg-black',
          headerFixed: true,
          asideFixed: false,
          asideFolded: false,
          asideDock: false,
          container: false
        }
      }

      // 初始化，如果用户已经登录了，则立即跳转到一个默认主页上去，无需再登录;没有登录则定向到登录界面
      // if($cookieStore.get("token")){
      //   $location.path('/app/monitor');
      // }else{
      //   $location.path('/login');
      // }

      // //路由状态切换时重定向
      // $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
      //     // 如果用户退出
      //     if(!fromState.name =='login'){
      //       if(!$cookieStore.get("token")){
      //         event.preventDefault();// 取消默认跳转行为
      //         //$state.go("login",{from:fromState.name,w:'notLogin'});//跳转到登录界面
      //         $location.path('/login');
      //       }
      //     }else{
      //       if($cookieStore.get("token")){
      //         $location.path('/app/monitor');
      //       }
      //     }
      // });

      /**
       * 读取配置重
       */
      // $http.get("config.json").success(function(data){
      //   WebHost.monitorUrl = data["acp-web-monitor-url"] || WebHost.monitorUrl || "";
      //   WebHost.reportUrl = data["acp-web-report-url"] || WebHost.reportUrl || "";
      //   WebHost.expert = data["acp-web-expert-url"] || WebHost.expert || "";
      //   WebHost.platformUrl = data["acp-support-platform-url"] || WebHost.platformUrl || "";
      //   WebHost.imageUrl= data["mongodb-images-url"] || WebHost.imageUrl || "";
      //   WebHost.traceUrl = data["acp-web-trace-url"] || WebHost.traceUrl || "";
      // });

      // save settings to local storage
      if ( angular.isDefined($localStorage.settings) ) {
        $scope.app.settings = $localStorage.settings;
      } else {
        $localStorage.settings = $scope.app.settings;
      }
      $scope.$watch('app.settings', function(){
        if( $scope.app.settings.asideDock  &&  $scope.app.settings.asideFixed ){
          // aside dock and fixed must set the header fixed.
          $scope.app.settings.headerFixed = true;
        }
        // save to local storage
        $localStorage.settings = $scope.app.settings;
      }, true);

      // angular translate
      $scope.lang = { isopen: false };
      $scope.langs = {en:'English', de_DE:'German', it_IT:'Italian'};
      $scope.selectLang = $scope.langs[$translate.proposedLanguage()] || "English";
      $scope.setLang = function(langKey, $event) {
        // set the current lang
        $scope.selectLang = $scope.langs[langKey];
        // You can change the language during runtime
        $translate.use(langKey);
        $scope.lang.isopen = !$scope.lang.isopen;
      };

      function isSmartDevice( $window )
      {
          // Adapted from http://www.detectmobilebrowsers.com
          var ua = $window['navigator']['userAgent'] || $window['navigator']['plugins'] || $window['opera'];
          // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
          return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
      }

      $scope.callAtInterval = function() {
        getWeather();
     }
     $scope.getTime = function() {
        $scope.nowtime=new Date();
    }

    $interval( function(){ $scope.callAtInterval(); }, 3000*60*60);
     $interval( function(){ $scope.getTime(); }, 1000);
          // 国家气象风力数组
          $scope.fl = {
            "0" : "无持续风向",
            "1" : "东北风",
            "2" : "东风",
            "3" : "东南风",
            "4" : "南风",
            "5" : "西南风",
            "6" : "西风",
            "7" : "西北分",
            "8" : "北风",
            "9" : "旋转风"
          };
          // 国家气象风向数组
          $scope.fx = {
            "0" : "微风",
            "1" : "3-4级",
            "2" : "4-5级",
            "3" : "5-6级",
            "4" : "6-7级",
            "5" : "7-8级",
            "6" : "8-9级",
            "7" : "9-10级",
            "8" : "10-11级",
            "9" : "11-12级"
          };

          // 国家气象天气数组
          $scope.tq = {
            "00" : "晴",
            "01" : "多云",
            "02" : "阴",
            "03" : "阵雨",
            "04" : "雷阵雨",
            "05" : "雷阵雨伴有冰雹",
            "06" : "雨夹雪",
            "07" : "小雨",
            "08" : "中雨",
            "09" : "大雨",
            "10" : "暴雨",
            "11" : "大暴雨",
            "12" : "特大暴雨",
            "13" : "阵雪",
            "14" : "小雪",
            "15" : "中雪",
            "16" : "大雪",
            "17" : "暴雪",
            "18" : "雾",
            "19" : "冻雨",
            "20" : "沙尘暴",
            "21" : "小到中雨",
            "22" : "中到大雨",
            "23" : "大到暴雨",
            "24" : "暴雨到大暴雨",
            "25" : "大暴雨到特大暴雨",
            "26" : "小到中雪",
            "27" : "中到大雪",
            "28" : "大到暴雪",
            "29" : "浮尘",
            "30" : "扬沙",
            "31" : "强沙尘暴",
            "53" : "霾",
            "99" : "无"

          };

           /**
            *获取天气信息
           */
          getWeather();

          function getWeather(){

            var area="昆明";
            var proven="云南";

            var promise = SystemService.getSysWeatherInfoFromBaidu(area);
            promise.then(function (response) {
              var resdata=response.data;   
              $scope.resdate =  JSON.parse(resdata).date;
              $scope.resweather =  JSON.parse(resdata).results;
              var promise2 = SystemService.getSysWeatherNationInfo(area,proven);
              promise2.then(function (response) {
                var resdata=response.data;
                $scope.resc = JSON.parse(resdata).c;
                $scope.resdatenation = JSON.parse(resdata).f;
                $scope.nowtime=new Date();
              });
            });
          }

      $scope.$on("FromAlarmChild", function (event, data) {
        $rootScope.alarm_amount=data.description;
        $scope.$broadcast("FromAppCtrl", { divName: "AppCtrl", description:data.description});
      });

    }]);