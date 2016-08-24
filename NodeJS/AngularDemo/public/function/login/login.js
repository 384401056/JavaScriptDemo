'use strict';
/* Controllers */
app.controller('SigninFormController', ['commonUtil', '$scope','$rootScope','$http','$state','$modal','$log','$cookieStore','SystemService',
    function(commonUtil,$scope,$rootScope,$http, $state,$modal,$log,$cookieStore,SystemService) {
        $scope.user = {};
        $scope.warning = {};
        $scope.authError = null;


        $scope.user.name="test";
        $scope.user.password="123456";

        $rootScope.loginName=null;
        $scope.login = function() {

            if($scope.user.name ==null && $scope.user.password!=null )  {
                $scope.warning.info = "用户名为空";
                return;
            }
            if($scope.user.name!=null && $scope.user.password==null )  {
                $scope.warning.info = "密码为空";
                return;
            }
            if($scope.user.name ==null || $scope.user.password==null){
                $scope.warning.info = "用户名或密码不能为空";
            }else {
                var username = $scope.user.name;
                var password = $scope.user.password;
                var promise = SystemService.login(username, password);
                promise.then(function (data) {
                    if(data.flag) {

                        $cookieStore.remove("acp_system_nav");
                        $rootScope.loginName=data.user.loginName;
                        $cookieStore.put("name", data.user.loginName);
                        $cookieStore.put("id", data.user.id);
                        $cookieStore.put("orgId", data.user.orgId);
                        $cookieStore.put("token", data.token);

                       /* // Encrypt
                        var encrypt = CryptoJS.AES.encrypt(data.user.id.toString(), 'secret key 123');
                        console.log(encrypt);
                        // Decrypt
                        var bytes  = CryptoJS.AES.decrypt(encrypt.toString(), 'secret key 123');
                        var decrypt = parseInt(bytes.toString(CryptoJS.enc.Utf8));

                        console.log(decrypt);*/

                        $rootScope.menus = data.menuList;
                        $cookieStore.put("functionId", 2100);
                        var promiseOpt = SystemService.getOperatePermissions(2100);
                        promiseOpt.then(function (data) {
                            if(data.flag){
                                $cookieStore.put("userPermission", data.data);
                            }

                        },function(data,status){

                        });
                        $state.go('app.monitor');
                    }else{
                        $scope.warning.info = data.msg;
                    }
                },function(data,status){
                    $scope.warning.info ="网络连接失败";
                });
            }
        };


        //判断用户是否已经登录
        $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
            if(toState.name == 'login') return;// 如果是进入登录界面则允许
            // 如果用户不存在
            if(!$rootScope.loginName){
                event.preventDefault();// 取消默认跳转行为
                $state.go("login",{from:fromState.name,w:'notLogin'});//跳转到登录界面
            }
        });


    } ]);

