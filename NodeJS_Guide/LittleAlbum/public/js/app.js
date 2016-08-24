/**
 * Created by Administrator on 2016/4/9.
 */
var app = angular.module("myApp",[]);

app.controller('albumController', function($scope, $http) {
    $scope.albums = [];

    $scope.getAllFile = function(){
        $http({
            url : '/getFile',
            dataType : 'json',
            method : 'GET',
        }).success(function(data) {
            $scope.albums = data;
        }).error(function() {
            console.log("网络连接错误!");
        });
    };

    $scope.getDirctor = function(){
        $http({
            url : '/getDirctor',
            dataType : 'json',
            method : 'GET',
        }).success(function(data) {
            $scope.albums = data;
        }).error(function() {
            console.log("网络连接错误!");
        });
    };

});