// config

var app =  
angular.module('app')
  .config(
    [        '$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
    function ($controllerProvider,   $compileProvider,   $filterProvider,   $provide) {
        
        // lazy controller, directive and service
        app.controller = $controllerProvider.register;
        app.directive  = $compileProvider.directive;
        app.filter     = $filterProvider.register;
        app.factory    = $provide.factory;
        app.service    = $provide.service;
        app.constant   = $provide.constant;
        app.value      = $provide.value;
    }
  ])
  .config(['$translateProvider', function($translateProvider){
    // Register a loader for the static files
    // So, the module will search missing translation tables under the specified urls.
    // Those urls are [prefix][langKey][suffix].
    $translateProvider.useStaticFilesLoader({
      prefix: 'l10n/',
      suffix: '.js'
    });
    // Tell the module what language to use by default
    $translateProvider.preferredLanguage('en');
    // Tell the module to store the language in the local storage
    $translateProvider.useLocalStorage();
  }]);

    /*app.factory('TokenInterceptor', function ($q,$cookieStore) {
        return {
            request: function (config) {
                 config.headers = config.headers || {};
                 var token=$cookieStore.get("token");
                 if (token) {
                 if(config.headers.Authorization == 'xxx'){
                 config.headers.Authorization ='';
                 }else{
                 config.headers.Authorization = 'Bearer' +token;
                 }

                 }
                return config;
            },
            response: function (response) {
                return response || $q.when(response);
            },
            responseError: function(response) {
                if(response.status === 401 || response.status === 403) {
                    $location.path('/login ');
                }
                return $q.reject(response);
            }
        };
    });*/

    //解决表单提交后头取不到数据
    app.config(function($compileProvider){
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|javascript):/);
    });
    app.config(function($httpProvider) {

        //$httpProvider.interceptors.push('TokenInterceptor');

        $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

        // Override $http service's default transformRequest
        $httpProvider.defaults.transformRequest = [function(data) {
            /**
             * The workhorse; converts an object to x-www-form-urlencoded serialization.
             * @param {Object} obj
             * @return {String}
             */
            var param = function(obj) {
                var query = '';
                var name, value, fullSubName, subName, subValue, innerObj, i;

                for (name in obj) {
                    value = obj[name];

                    if (value instanceof Array) {
                        for (i = 0; i < value.length; ++i) {
                            subValue = value[i];
                            fullSubName = name + '[' + i + ']';
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + '&';
                        }
                    } else if (value instanceof Object) {
                        for (subName in value) {
                            subValue = value[subName];
                            fullSubName = name + '[' + subName + ']';
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + '&';
                        }
                    } else if (value !== undefined && value !== null) {
                        query += encodeURIComponent(name) + '='
                            + encodeURIComponent(value) + '&';
                    }
                }

                return query.length ? query.substr(0, query.length - 1) : query;
            };

            return angular.isObject(data) && String(data) !== '[object File]'
                ? param(data)
                : data;
        }];

        $httpProvider.interceptors.push(['$location','$q','$cookieStore','toaster',function($location,$q,$cookieStore,toaster) {
            return {
                response: function (response) {
                    var verification =0;
                    if(response.data && response.data.flag){
                        verification = response.data.flag;
                    }
                    if(verification === 3){
                        $cookieStore.remove("name");
                        $cookieStore.remove("id");
                        $cookieStore.remove("orgId");
                        $cookieStore.remove("acp_system_nav");

                        $cookieStore.remove("token");
                        $cookieStore.remove("functionId");
                        $cookieStore.remove("userPermission");
                        $location.path('/login');
                    }else if(verification === 4){
                        toaster.pop({
                            type: 'error', title: "提示信息", body:"你没有操作权限"
                        });
                    }
                    return response || $q.when(response);
                },
                responseError: function(response) {
                    var verification =0;
                    if(response.data && response.data.flag){
                        verification = response.data.flag;
                    }
                    if(verification === 3){
                        $cookieStore.remove("name");
                        $cookieStore.remove("id");
                        $cookieStore.remove("orgId");
                        $cookieStore.remove("acp_system_nav");

                        $cookieStore.remove("token");
                        $cookieStore.remove("functionId");
                        $cookieStore.remove("userPermission");
                        $location.path('/login');
                    }else if(verification === 4){
                        toaster.pop({
                            type: 'error', title: "提示信息", body:"你没有操作权限"
                        });
                    }
                    return $q.reject(response);
                }
            }
        }]);

    }
);
//权限操作按钮控制指令
app.directive('userPermission', ['$cookieStore','$http','$rootScope',function($cookieStore,$http,$rootScope) {
    return {
        restrict: 'E',
        template: '<span data-ng-if="hasPermission" ng-transclude></span>',
        transclude: true,
        scope:true,
        link: function(scope,element,attr) {
            scope.hasPermission = false;
            var userPermission = $cookieStore.get("userPermission");

            if(attr.code.length > 1 && (typeof(userPermission) != "undefined") && userPermission.length > 0){
                var  permission=userPermission.substring(1,userPermission.length-1).split(",");
                for(var i=0;i<permission.length;i++){
                    if(permission[i].trim()==attr.code){
                        scope.hasPermission = true;
                        break;
                    }
                }
            }
        }
    };
}]);


//权限操作按钮控制指令

app.directive('userGroupPermission', ['$cookieStore','$http','$rootScope',function($cookieStore,$http,$rootScope) {
    return {
        restrict: 'E',
        template: '<time data-ng-if="hasPermission" ng-transclude></time>',
        transclude: true,
        scope:true,
        link: function(scope,element,attr) {
            scope.hasPermission = false;
            var userPermission = $cookieStore.get("userPermission");

            if(attr.code.length > 1 && (typeof(userPermission) != "undefined") && userPermission.length > 0){
                var  permission=userPermission.substring(1,userPermission.length-1).split(",");
                for(var i=0;i<permission.length;i++){
                    if(permission[i].trim()==attr.code){
                        scope.hasPermission = true;
                        break;
                    }
                }
            }
        }
    };
}]);



//刷新
app.run(['$cookieStore','$rootScope','SystemService','$state',function($cookieStore,$rootScope,SystemService,$state){
    $rootScope.$on('$locationChangeStart',function(evt, next, previous){
        var id = $cookieStore.get('id');
        if(typeof(id) === "undefined"){
            return;
        }
        if($rootScope.menus == null || (typeof($rootScope.menus) == "undefined")){
            var promiseMenus = SystemService.getMenus();
            promiseMenus.then(function (data) {
                if(data.flag){

                    $rootScope.menus = data.data;
                    var selectFunctionId =  $cookieStore.get("functionId");
                    
                    var promiseOp = SystemService.getOperatePermissions(selectFunctionId);
                    promiseOp.then(function (data) {
                        if(data.flag){
                            $cookieStore.put("userPermission", data.data);
                        }
                    },function(data,status){

                    });
                }
            },function(data,status){

            });
        }
    });
}]);
