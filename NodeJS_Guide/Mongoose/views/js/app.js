/**
 * Created by Administrator on 2016/4/9.
 */
var app = angular.module("myApp",[]);

app.controller('appController', function($scope, $http) {
    $scope.students = [];

    $scope.getStudents = function(){
        $http({
            url : '/find',
            dataType : 'json',
            method : 'GET'
        }).success(function(data) {
            $scope.students = data;
        }).error(function() {
            console.log("网络连接错误!");
        });
    };

    $scope.getStudents();

    $scope.newStudent = {
        "name":"张小黑",
        "age" :20,
        "sex" :"男"
    };

    $scope.createStu = function(){
        $http({
            url : '/create',
            dataType : 'json',
            method : 'GET',
            params:{
                "name":$scope.newStudent.name,
                "age":$scope.newStudent.age,
                "sex":$scope.newStudent.sex
            }
        }).success(function(data) {
            $scope.students = data;
        }).error(function() {
            console.log("网络连接错误!");
        });
    };

});