/**
 * Created by Administrator on 2016/4/10.
 */


var app = angular.module("myApp",[],['$compileProvider',function($compileProvider){

    //定义指令形式1
    //$compileProvider.directive("gbTags",function(){
    //    return{
    //        //指令的风格，A:属性风格 E：元素风格 C:样式风格 M：注解风格
    //        restrict:'E',
    //        template:'<div>custom-tags-html</div>',
    //        compile:function(){
    //            console.log("$compileProvider");
    //        }
    //    }
    //});

}]);

app.service("Data",function(){
   return [
       {
           id:1000,
           name: "笔记本电脑",
           quantity:10,
           price:7260.00
       },
       {
           id:1001,
           name: "笔记本电脑",
           quantity:10,
           price:7260.00
       },
       {
           id:1002,
           name: "笔记本电脑",
           quantity:10,
           price:7260.00
       },
       {
           id:1003,
           name: "笔记本电脑",
           quantity:10,
           price:7260.00
       },
       {
           id:1004,
           name: "笔记本电脑",
           quantity:10,
           price:7260.00
       }
   ];
});

//定义指令形式2
app.directive("gbHeader",function(){
    return{
        //指令的风格，A:属性风格 E：元素风格 C:样式风格 M：注解风格
        restrict:'E',
        //模板内容
        //template:'<div>custom-tags-html</div>',
        //模板URL
        templateUrl:"temp/Header.html",
        compile:function(){
            console.log("$compileProvider");
        }
    }
});

app.directive("gbMid",function(){
    return{
        //指令的风格，A:属性风格 E：元素风格 C:样式风格 M：注解风格
        restrict:'E',
        //模板内容
        //template:'<div>custom-tags-html</div>',
        //模板URL
        templateUrl:"temp/Mid.html",
        compile:function(){
            console.log("$compileProvider");
        }
    }
});

app.controller("midController",['$scope','Data',function($scope,Data){

    $scope.cars = Data;

}]);




















