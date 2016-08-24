 'use strict';

/**
 * 报表路由router
 */
app.config(
    [          '$stateProvider', '$urlRouterProvider','$locationProvider',
      function ($stateProvider,   $urlRouterProvider, $locationProvider) {
          
              //新增 报表统计-主页
            $stateProvider
            .state('app.report',{
                url: '/report',
                templateUrl: 'function/report/reportBase.html',
                resolve: {
                  deps:["$ocLazyLoad",function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                      'function/report/reportBase.controller.js',
                      'function/report/reportBase.directive.js',
                      'function/report/reportBase.css'
                      ])
                  }]
                }
              })

              //新增 报表展示页面
             .state('app.reportPage',{

              params:{"orgId":null, "deviceType": null, "deviceLst": null, "isCompare":null,"gridType":0},

                url: '/reportPage',
                templateUrl: 'function/report/reportPage.html',
                resolve: {
                  deps:["$ocLazyLoad",function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                      'function/report/echarts.min.js',
                      'function/report/angular.chartReport.directive.js',
                      'function/report/angular.gridReport.directive.js',
                      'function/report/reportPageController.js',
                      'function/report/jquery-ui.js',
                      'function/report/jquery.mousewheel.js',
                      'function/report/jquery.jfMagnify.js',
                      'function/report/angular.imgReport.directive.js',
                      'function/report/reportPage.css'])
                  }]
                }
              })
			        
      }
    ]
  );