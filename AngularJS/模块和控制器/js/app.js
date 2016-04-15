/**
 * Created by Administrator on 2016/4/10.
 */

var app = angular.module("myApp",[]);

//myApp模块的controller.当ng-app="myApp"时起作用。
app.controller("firstController",function($scope){
    $scope.name = "李四";
});

//全局的controller,当ng-app =""时，起作用。
var firstController = function($scope){
    $scope.name = "张三";
};