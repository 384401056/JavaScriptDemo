 'use strict';

/**
 * Config for the router
 */
angular.module('app')
  .run(
    [          '$rootScope', '$state', '$stateParams',
      function ($rootScope,   $state,   $stateParams) {
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;        
      }
    ]
  )
  .config(
    [          '$stateProvider', '$urlRouterProvider','$locationProvider',
      function ($stateProvider,   $urlRouterProvider, $locationProvider) {
          $urlRouterProvider
              .otherwise('login');//默认界面
          $stateProvider

              .state('app', {
                  abstract: true,
                  url: '/app',
                  templateUrl: 'templates/app.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                          function( $ocLazyLoad ){
                              return $ocLazyLoad.load(['js/controllers/nav.js','js/controllers/header.js']);
                          }]
                  }
              })
              .state('login', {
                  url: '/login',
                  templateUrl: 'function/login/login.html',
                  resolve: {
                    deps: ['$ocLazyLoad',
                      function( $ocLazyLoad ){
                        return $ocLazyLoad.load(['function/login/login.js','function/login/login.css','js/services/commonUtil.service.js']);
                    }]
                  }
              })
              .state('app.monitor', {
                params:{"orgId": null, "dataType": null},
                  url: '/monitor',
                  templateUrl: 'function/monitor/monitorBase.html',
                  resolve: {
                    deps:["$ocLazyLoad",function($ocLazyLoad){
                      return $ocLazyLoad.load(['function/monitor/static/js/monitorController.js','function/monitor/static/css/monitorBase.css']);
                    }]
                  }
              })
              .state('app.message', {
                  url: '/message?type',
                  templateUrl: 'templates/message.html',
                  resolve: {
                    deps: ['$ocLazyLoad',
                      function( $ocLazyLoad ){
                        return $ocLazyLoad.load([
                            'function/message/message.js',
                            'function/message/sysInfoController.js'
                        ]);
                    }]
                  }
              })
              //普通视图
              .state('app.mapView', {
                  params:{"data":null},
                  url: '/monitor/mapView',
                  templateUrl: 'function/monitor/monitorView.html',
                  resolve: {
                    deps:["$ocLazyLoad",function($ocLazyLoad){
                      return $ocLazyLoad.load(['ngGrid','plugins/jquery/jquery-ui-1.10.3.custom.min.js',
                        'plugins/lc.js',
                        'plugins/lc.css',
                        'function/monitor/static/js/monitorViewController.js',
                        'function/monitor/group/js/deviceGroupController.js',
                        'function/monitor/group/js/deviceSetGroupController.js',
                        'function/monitor/group/js/ctrSetGroupController.js',
                        'function/monitor/group/js/viewGroupController.js',
                        'function/monitor/group/js/editGroupController.js',
                        'function/monitor/contro/js/tapController.js',
                        'function/monitor/contro/js/oneDeviceController.js',
                        'function/monitor/contro/js/cameraController.js',
                        'function/report/jquery.mousewheel.js',
                        'function/report/jquery.jfMagnify.js',
                        'function/report/reportPage.css',
                        'function/monitor/static/css/monitorView.css',
                        'function/monitor/static/css/monitorBase.css',
                        'function/monitor/static/css/monitorCommon.css',
                        'function/monitor/static/css/monitorMain.css',
                        'js/services/monitor.video.service.js',
                        ]);

                    }]
                  }
              })
			  //查看全部视频设备
              .state('app.allVedios', {
                  params:{"orgid":null},
                  url: '/monitor/allVedios',
                  templateUrl: 'function/monitor/allVedios.html',
                  resolve: {
                      deps:["$ocLazyLoad",function($ocLazyLoad){
                          return $ocLazyLoad.load([
                              'function/monitor/static/css/vedio/base.css',
                              //'function/monitor/static/css/vedio/jquery-ui.css',
                              //'function/monitor/static/css/vedio/jquery.Cloud.css',
                              //'function/monitor/static/css/vedio/jquery.loadmask.css',
                              //'function/monitor/static/css/vedio/vedioMonitor.css',
                              'function/monitor/static/css/vedio/monitor-video.css',
                              'function/monitor/static/js/allVedios.js',
                              'js/services/VedioMonitor.js',
                          ]);
                      }]
                  }
              })
              //新增 监控中心-列表视图
              .state('app.listView', {
                  params:{"data":null},
                  url: '/monitor/listView',
                  templateUrl: 'function/monitor/listView.html',
                  resolve: {
                   deps:["$ocLazyLoad",function($ocLazyLoad){
                     return $ocLazyLoad.load([
                       // 'function/monitor/static/js/addGroup.controller.js',
                       'function/monitor/group/js/deviceGroupController.js',
                       'function/monitor/group/js/deviceSetGroupController.js',
                       'function/monitor/group/js/ctrSetGroupController.js',
                       'function/monitor/group/js/equipInfo.controller.js',
                       'function/monitor/static/js/listView.controller.js',
                       'function/monitor/static/js/commons.directive.js',
                       'function/monitor/static/js/operating.directive.js',
                       'function/monitor/contro/js/tapController.js',
                       'function/monitor/contro/js/oneDeviceController.js',
                       'function/monitor/static/css/listView.style.css',
                       'function/monitor/static/css/monitorCommon.css',
                       'function/monitor/static/css/monitorBase.css']);
                   }]
                  }
              })
              .state('app.sensorSet', {
                  params:{"data":null,"diviceName":null,"orgId":null},
                  url: '/monitor/setSensor',
                  templateUrl: 'function/monitor/set/setSensor.html',
                  resolve: {
                      deps:["$ocLazyLoad",function($ocLazyLoad){
                          return $ocLazyLoad.load([
                              'function/monitor/set/css/commonSetSensor.css',
                              'function/monitor/set/js/set.sensor.controller.js',
                              'function/monitor/set/js/addSetSensorToUserCtl.js'
                          ]);
                      }]
                  }
              })
              //球机参数设置-界面设置和报警设置
              .state('app.parameterSet', {
                  params:{"deviceIP":null,"sdkPort":null,"userName":null,"password":null,"diviceName":null,"number":null},
                  url: '/app/monitor/setParameter',
                  templateUrl: 'function/monitor/set/setParameter.html',
                  resolve: {
                      deps:["$ocLazyLoad",function($ocLazyLoad){
                          return $ocLazyLoad.load([
                              'function/monitor/set/css/commonSetParameter.css',
                              'function/monitor/set/js/set.parameter.controller.js'
                          ]);
                      }]
                  }
              })

              /*
                相机规则设置
               */
              .state('app.cameraSet', {
                  params:{"data":null,"diviceName":null,"clientid":null},
                  url: '/monitor/cameraSet',
                  templateUrl: 'function/monitor/set/setCamera.html',
                  resolve: {
                      deps:["$ocLazyLoad",function($ocLazyLoad){
                          return $ocLazyLoad.load([
                              'function/monitor/set/css/commonSetCamera.css',
                              'function/monitor/set/js/set.camera.controller.js',
                              'function/monitor/static/js/commons.directive.js',
                              'function/monitor/static/js/operating.directive.js',
                              'function/monitor/static/css/listView.style.css'
                          ]);
                      }]
                  }
              })

              /*
                开关规则设置
               */
              .state('app.controlSet', {
                  params:{"data":null,"diviceName":null},
                  url: '/monitor/controlSet',
                  templateUrl: 'function/monitor/set/setController.html',
                  resolve: {
                      deps:["$ocLazyLoad",function($ocLazyLoad){
                          return $ocLazyLoad.load([
                              'function/monitor/set/css/commonSetController.css',
                              'function/monitor/set/js/set.controller.controller.js',
                              'js/services/monitor.service.js'
                          ]);
                      }]
                  }
              })

              //设备设置-联动
              .state('app.setLinkage', {
                  params:{"data":null,"diviceName":null,"orgId":null},
                  url: '/monitor/setLinkage',
                  templateUrl: 'function/monitor/set/setLinkage.html',
                  resolve: {
                      deps:["$ocLazyLoad",function($ocLazyLoad){
                          return $ocLazyLoad.load([
                              'js/services/commonUtil.service.js',
                              'js/services/monitor.service.js',
                              'function/monitor/set/js/set.linkage.controller.js'
                          ]);
                      }]
                  }
              })
              //xtn设备规则
              .state('app.deviceRule', {
                  params:{"allRules": null},
                  url: '/monitor/deviceRule',
                  templateUrl: 'function/monitor/rule/deviceRule.html',
                  resolve: {
                      deps:["$ocLazyLoad",function($ocLazyLoad){
                          return $ocLazyLoad.load([
                              'function/monitor/rule/ruleController.js',
                              'function/monitor/rule/addrule/addRuleController.js',
                              'function/monitor/rule/devices-rule.css',
                              'function/monitor/rule/fonts/iconfont.css',
                          ]);
                      }]
                  }
              })
          // $locationProvider.html5Mode(true);
      }
    ]
  );