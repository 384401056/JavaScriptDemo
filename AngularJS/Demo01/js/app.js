/**
 * Created by Administrator on 2016/4/10.
 */

var app = angular.module("myApp", []);

app.controller("carController",['$scope','$http',function($scope,$http){

    $scope.items = [
        {title: 'Paint pots', quantity: 8, price: 3.95},
        {title: 'Polka dots', quantity: 17, price: 12.95},
        {title: 'Pebbles', quantity: 5, price: 9.95}
    ];

    var message = {};
    message.someText = "You have started your journey";
    $scope.message = message;


    $scope.remove = function (index) {
        $scope.items.splice(index, 1);
    }

    $scope.data = {
        id:1,
        name:'Spring MVC'
    }

    $scope.clickme =   function(){
        $http({
            url:'http://127.0.0.1:7766/json/set',
            data:$scope.data,
            method: 'POST',
        }).success(function(data,header,config,status){
            //响应成功
            console.log(data);
        }).error(function(data,header,config,status){
            //处理响应失败
            console.log(data);
        });
    }

}]);

