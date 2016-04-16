/**
 * Created by Administrator on 2016/4/10.
 */


var app = angular.module("myApp",[],function(){

});

//隐式注入$scope,$http,$filter
app.controller("firstController",function($scope,$http,$filter){
    console.log($scope);
    console.log($http);
    console.log($filter('json')([1,2,3,4,5,6,7,8,9]))
});

//显式注入$scope,$http,$filter
app.controller("firstController",['$scope','$http','$filter',function(a,b,c){
    console.log(a);
    console.log(b);
    console.log(c('json')([1,2,3,4,5,6,7,8,9]))
}]);




















