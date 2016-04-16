/**
 * Created by Administrator on 2016/4/9.
 */
//angular.module("myApp",[]).run(function($rootScope){
//   $rootScope.name = "World";
//});

var app = angular.module("myApp",[]);

//提交数据的服务
app.service("productData",function(){
   return [
      {
         id:123,
         name: "笔记本电脑",
         quantity:1,
         price:7260.00
      },
      {
         id:34566,
         name: "台式电脑",
         quantity:12,
         price:2720.00
      },
      {
         id:6667,
         name: "Ipad",
         quantity:20,
         price:2270.00
      },
      {
         id:8767,
         name: "Iphone",
         quantity:45,
         price:6560.00
      },
      {
         id:34344,
         name: "Iwach",
         quantity:29,
         price:3260.00
      }
   ];
});


app.controller("productContorller",function($scope,productData){
   $scope.products = productData;

   //列表默认为id字段升序排列.
   $scope.order = "";
   $scope.orderType = "id";

   $scope.changeOrder = function(type){
      //根据输入的值改变排序字段.
      $scope.orderType = type;

      //点击切换排序的升降模式.
      if($scope.order===""){
         $scope.order = "-"
      }else{
         $scope.order=""
      }
   }


});























