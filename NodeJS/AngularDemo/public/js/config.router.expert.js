 'use strict';

/**
 * 专家路由router
 */
app.config(
    [          '$stateProvider', '$urlRouterProvider','$locationProvider',
      function ($stateProvider,   $urlRouterProvider, $locationProvider) {
          
    	 // 新增 专家在线-主页
    	 $stateProvider
           .state('app.expert', {
             url: '/expert',
            // templateUrl: 'function/expert/expertBase.html',
             template: '<div ui-view class="fade-in-up"></div>',
             resolve: {
               deps: ["$ocLazyLoad", function($ocLazyLoad) {
                 return $ocLazyLoad.load([
                   'function/expert/js/Global.js',
                   'function/expert/js/service.js',
                   'function/expert/js/expert.controller.js'
                 ])
               }]
             }
           })
           
           //咨询
           .state('app.expert.consult', {
             url: '/consult',
             templateUrl: 'function/expert/expertBase.html',
             resolve: {
               deps: ["$ocLazyLoad", function($ocLazyLoad) {
                 return $ocLazyLoad.load([
                   'function/expert/js/technology/expert.technology.controller.js'
            
                 ])
               }]
             }
           }) 

            //智能诊断
           .state('app.expert.diagnosis', {
             url: '/diagnosis',
             templateUrl: 'function/expert/expertTechnology.html',
             resolve: {
               deps: ["$ocLazyLoad", function($ocLazyLoad) {
                 return $ocLazyLoad.load([
                  'function/expert/css/at.css',
                'function/expert/js/jquery.SuperSlide.2.1.1.js'
            
                 ])
               }]
             }
           })  

            //农技辅导
           .state('app.expert.technology', {
             url: '/technology',
             templateUrl: 'function/expert/AgriculturalTechnique.html',
             resolve: {
               deps: ["$ocLazyLoad", function($ocLazyLoad) {
                 return $ocLazyLoad.load([
                  'function/expert/css/at.css'
                 ])
               }]
             }
           }) 

           //农技辅导-图片列表
           .state('app.expert.technology-piclist', {
             url: '/technology-pl',
             templateUrl: 'function/expert/AgriculturalTechnique_picinfo.html',
             resolve: {
               deps: ["$ocLazyLoad", function($ocLazyLoad) {
                 return $ocLazyLoad.load([
                  'function/expert/css/at.css'
                 ])
               }]
             }
           }) 

           //农技辅导-视频列表
           .state('app.expert.technology-videolist', {
             url: '/technology-vl',
             templateUrl: 'function/expert/AgriculturalTechnique_videoinfo.html',
             resolve: {
               deps: ["$ocLazyLoad", function($ocLazyLoad) {
                 return $ocLazyLoad.load([
                  'function/expert/css/at.css'
                 ])
               }]
             }
           }) 


            //找专家
           .state('app.expert.searchExpert', {
             url: '/searchExpert',
             templateUrl: 'function/expert/html/searchExpert/main.html',
             resolve: {
               deps: ["$ocLazyLoad", function($ocLazyLoad) {
                 return $ocLazyLoad.load([
                   'function/expert/css/expert.searchExpert.css',
                   'function/expert/js/searchExpert/expert.searchExpert.controller.js',
                   'function/expert/js/directive/repeat.finish.directive.js'
                 ])
               }]
             }
           })  

                 //专家详情
           .state('app.expert.expinfo', {
             url: '/expinfo',
             templateUrl: 'function/expert/expertIntroduction.html',
             resolve: {
               deps: ["$ocLazyLoad", function($ocLazyLoad) {
                 return $ocLazyLoad.load([
               'function/expert/css/at.css',
                'function/expert/js/jquery.SuperSlide.2.1.1.js'
                 ])
               }]
             }
           })  
			        
      }
    ]
  );