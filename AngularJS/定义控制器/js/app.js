/**
 * Created by Administrator on 2016/4/9.
 */

//function MyController($scope, $timeout) {
//    var updateClock = function() {
//        //$scope.clock代表DOM元素中的clock.
//        $scope.clock = new Date();
//        $timeout(function() {
//            updateClock();
//        }, 1000);
//    };
//    updateClock();
//};


//function MyController($scope) {
//    //$scope.clock代表DOM元素中的clock.
//    $scope.clock = {
//        now:new Date()
//    };
//
//    //设置clock.now的值
//    var updateClock = function(){
//        $scope.clock.now = new Date();
//    };
//
//    //每秒执行一次updateClock()方法.
//    setInterval(function(){
//       $scope.$apply(updateClock());
//    },1000);
//
//    //updateClock();
//};


//在模型中创建控制器。（最佳实践）
//angular.module("myApp",[]).controller("myControl",function($scope){
//    $scope.name = "World";
//});


//Controller中的ng-click
//var app = angular.module("myApp",[]);
//app.controller("FirstController",function($scope){
//    $scope.counter = 0;
//    $scope.add  = function(){
//      $scope.counter +=1;
//    };
//    $scope.subtract = function(){
//        $scope.counter -=1;
//    }
//});

//var app = angular.module("myApp", []);
//app.controller("MyController", function($scope) {
//    //数据模型
//    $scope.person = {
//        name:"Gaoyanbin",
//        age:35,
//        sex:"man"
//    };
//});

//控制器的嵌套
//var app = angular.module("myApp", []);
//
//app.controller('ParentController', function($scope) {
//    $scope.person = {
//        greeted: "false"
//    };
//});
//
//app.controller('ChildController', function($scope) {
//    $scope.sayHello = function() {
//        $scope.person.name = "gaoyaobin";
//    };
//});


var app = angular.module("myApp", []);
app.controller('MyController', function ($scope, $parse) {
    $scope.$watch('expr', function (newVal, oldVal, scope) {
        if (newVal !== oldVal) {
            // 用该表达式设置parseFun
            var parseFun = $parse(newVal);
            // 获取经过解析后表达式的值
            $scope.parsedValue = parseFun(scope);
        }
    });
});












