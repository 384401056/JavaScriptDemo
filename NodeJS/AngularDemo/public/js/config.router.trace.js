'use strict';

/**
 * 溯源档案路由
 */
app.config(
    [          '$stateProvider', '$urlRouterProvider','$locationProvider',
        function ($stateProvider,   $urlRouterProvider, $locationProvider) {

            $stateProvider
                //溯源档案列表
                .state('app.traceinfo', {
                    params:{"orgId": null, "dataType": null},
                    url: '/traceinfo',
                    templateUrl: 'function/trace/traceinfo.html',
                    resolve: {
                        deps:["$ocLazyLoad",function($ocLazyLoad){
                            return $ocLazyLoad.load(['function/trace/static/js/traceService.js','function/trace/static/js/traceinfoController.js','css/bootstrap.css']);
                        }]
                    }
                })
                //新增溯源档案
                .state('app.archiveCreate', {
                    //params:{"orgId": null, "dataType": null},
                    url: '/archive/create',
                    templateUrl: 'function/trace/archive-create.html',
                    resolve: {
                        deps:["$ocLazyLoad",function($ocLazyLoad){
                            return $ocLazyLoad.load(['function/trace/static/js/traceService.js','function/trace/static/js/archiveController.js','css/bootstrap.css']);
                        }]
                    }
                })
                //新增批次
                .state('app.batchCreate', {
                    //params:{"orgId": null, "dataType": null},
                    url: '/batch/create',
                    templateUrl: 'function/trace/batch-create.html',
                    resolve: {
                        deps:["$ocLazyLoad",function($ocLazyLoad){
                            return $ocLazyLoad.load(['function/trace/static/js/batchController.js','css/bootstrap.css']);
                        }]
                    }
                })
                //批次列表
                .state('app.batchList', {
                    //params:{"orgId": null, "dataType": null},
                    url: '/batch/list',
                    templateUrl: 'function/trace/batch-list.html',
                    resolve: {
                        deps:["$ocLazyLoad",function($ocLazyLoad){
                            return $ocLazyLoad.load(['function/trace/static/js/batchController.js','css/bootstrap.css']);
                        }]
                    }
                })
                .state('app.tracearchive', {
                url: '/tracearchive',
                templateUrl: 'function/trace/trace_archive.html',
                resolve: {
                    deps:["$ocLazyLoad",function($ocLazyLoad){
                        return $ocLazyLoad.load([
                            'function/trace/trace_archive.js',
                            'function/trace/trace_archive.css'
                        ]);
                    }]
                }
            })
        }
    ]
);