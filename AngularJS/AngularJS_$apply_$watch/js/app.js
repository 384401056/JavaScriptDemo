/**
 * Created by Administrator on 2016/4/10.
 */

var app = angular.module("myApp",[],function(){

});

/**
 * $apply
 */
app.controller("FirstController",function($scope,$timeout){
    $scope.name = '张三';
    $scope.age = 200;
    //js定时器改变$scope.name的值时，需要例用$apply进行脏值检测
    setTimeout(function(){
        $scope.$apply(function(){
           $scope.name =  '李四-'+Math.random()*100;
        });
    },3000);

    //使用AngularJS中的定时器时，不用进行$applay，//$timeout.cancel(myTimeout);取消定时器
    var myTimeout = $timeout(function(){
        $scope.age = Math.random()*100;
    }, 1000);
});

/**
 * $watch
 */
app.controller("secondController",function($scope){
    $scope.phone = {
        money:0,
        num:0,
        fre:10
    }

    $scope.sum = function(){
        return ($scope.phone.money*$scope.phone.num);
    };

    $scope.$watch($scope.sum,function(newValue,oldValue){
        $scope.phone.fre = newValue>=100?0:10;//如果sum的值大于100，则fre为0，否则为10.
    });


});







