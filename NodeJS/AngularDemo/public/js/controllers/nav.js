'use strict';

/* Controllers */
app.controller('NavController', ['$scope', '$rootScope','$cookieStore','SystemService','$state','$timeout',
  function($scope, $rootScope, $cookieStore,SystemService,$state,$timeout) {

    /*
        初始化导航菜单
     */
    $scope.navbar = $rootScope.menus;

    /*
      初始化或者刷新页面时设置导航菜单的选中状态
      params:当前路由地址
     */
    $timeout(function() {
       menuSet($state.current.url);
    },100);
    
    function menuSet(stateParams){
      if($rootScope.menus){
        for(var i=0;i<$rootScope.menus.length;i++){
          var sub = stateParams.split("/");
          if($rootScope.menus[i].link !=null){
            if($rootScope.menus[i].link.indexOf(sub[1])>=0){
              $("a[ui-sref='"+$rootScope.menus[i].link+"']").parent().addClass('active');
            }
          }
      }
      }
      
    }

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {      
      /*
        路由切换时设置导航菜单的选中状态
       */
      if(toState.url.indexOf(fromState.url)>=0 || fromState.url.indexOf(toState.url)>=0){
        menuSet(toState.url);
      }

      if($scope.navClickFlag) {
        $scope.clearAllNav();
        $scope.navClickFlag = false;
      }
    });

    $scope.navClick = function(event,functionId) {
      $scope.navClickFlag = true;
      var selectFunctionId =  $cookieStore.get("functionId");
      if(typeof(functionId) !='undefined' && typeof(selectFunctionId) !='undefined'){
            if(functionId != selectFunctionId){
                var promise = SystemService.getOperatePermissions(functionId);
                promise.then(function (data) {
                    if(data.flag){
                        $cookieStore.remove("functionId");
                        $cookieStore.remove("userPermission");
                        $cookieStore.put("userPermission", data.data);
                        $cookieStore.put("functionId", functionId);
                    }
                },function(data,status){

                });
            }
      }
    };

  }

]);