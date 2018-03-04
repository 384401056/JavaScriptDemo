/**
 * Created by Administrator on 2016/4/10.
 */

var app = angular.module("myApp",[],function(){
});

app.controller('copyController', ['$scope', function($scope) {
    $scope.master = {};

    $scope.reset = function() {
        $scope.user = angular.copy($scope.master);//将master中的内容复制到user中。
    };

    $scope.update = function(user) {
        angular.copy($scope.user, $scope.master);//将user中内容复制master
    };

    $scope.reset();//第一次运行时复制{}.
}]);


app.controller("forEachController",['$scope',function($scope){
    $scope.person1 = {
        name:"Blueice",
        age:20,
        sex:"男"
    };

    $scope.person2 = {
        name:"Henrry",
        age:30,
        sex:"女"
    };
    $scope.persons = [];
    $scope.persons.push($scope.person1);
    $scope.persons.push($scope.person2);

    $scope.outObject = "";
    $scope.outKeyValue = "";

    //循环输出数组中的对象.
    angular.forEach($scope.persons,function(value){
        $scope.outObject += angular.toJson(value)+"\n";

        //循环输出对象中的键和值
        angular.forEach(value,function(val,key){
           $scope.outKeyValue += key+":"+val +"\n";
        });

        $scope.outKeyValue+="\n"
    });

}]);





