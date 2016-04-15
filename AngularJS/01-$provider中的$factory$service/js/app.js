/**
 * Created by Administrator on 2016/4/10.
 */

/**
 * 自定义服务
  *
 */

//其中function为模块的配置函数
var app = angular.module("myApp",[],function($provide){
    //当ng-app="myApp"时执行。
    //console.log("myApp config");

    //自定义服务1，定义的服务在myApp的所有controller中都可注入使用。
    //可通过provider的名字返回function中的返回值
    $provide.provider("CustomService",function(){
        this.$get = function(){
            return{
                message:"from CustomService"

            }
        }
    });

    //定义Provide工厂服务,第二个参数相当于上面的$get方法.factory可以返回任何数据类型。
    //也可使用myApp.factory();
    $provide.factory("factoryService",function(){
        return "Hello I'm FactoryService I can return anything!!!";

    });

    //自定义服务，service只可以返回对象数据类类型.
    //也可使用myApp.service();
    $provide.service("myService",function(){
        return {
            message:"from myService",
            array:[0,1,2,3,4,5,6,7,8,9]
        }
    });


});

//注入上面声明的服务,通过provider的名字返回message中的数据
app.controller("firstController",function($scope,CustomService,factoryService,myService){
    //当ng-controller="firstController时执行。
   //console.log("controller start.")
   console.log("CustomService:",CustomService);
   console.log("factoryService:",factoryService);
   console.log("myService:",myService);
});


//此处无法注入myApp中声明的服务CustomService
var firstController = function($scope,CustomService){
    //console.log("CustomService:",CustomService);
}