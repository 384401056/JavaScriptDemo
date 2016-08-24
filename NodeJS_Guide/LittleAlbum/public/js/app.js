/**
 * Created by Administrator on 2016/4/9.
 */
var app = angular.module("myApp",[]);

app.controller('albumController', function($scope, $http) {
    $scope.albums = [];
    $scope.getAllFile = function getAllFile(){
        $http({
            url : '/getFile',
            dataType : 'json',
            method : 'GET'
        }).success(function(data) {
            $scope.albums = data;
        }).error(function() {
            console.log("网络连接错误!");
        });
    };
    $scope.getAllFile();

    $scope.getAllFileParams = function getAllFile(item){
        $http({
            url : '/getFileParams',
            dataType : 'json',
            method : 'GET',
            params:{
                'name':item
            }
        }).success(function(data) {
            $scope.albums = data;
        }).error(function() {
            console.log("网络连接错误!");
        });
    };

});