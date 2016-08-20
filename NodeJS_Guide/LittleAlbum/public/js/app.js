/**
 * Created by Administrator on 2016/4/9.
 */
//angular.module("myApp",[]).run(function($rootScope){
//   $rootScope.name = "World";
//});

var app = angular.module("myApp",[]);

app.controller("carContorller",function($scope){

   $scope.cars = [
      {
         id:1000,
         name: "笔记本电脑",
         quantity:10,
         price:7260.00
      },
      {
         id:1001,
         name: "笔记本电脑",
         quantity:10,
         price:7260.00
      },
      {
         id:1002,
         name: "笔记本电脑",
         quantity:10,
         price:7260.00
      },
      {
         id:1003,
         name: "笔记本电脑",
         quantity:10,
         price:7260.00
      },
      {
         id:1004,
         name: "笔记本电脑",
         quantity:10,
         price:7260.00
      }
   ];

   //返回计算出的总价格。
   $scope.totalPrice = function(){
      var total = 0;
      angular.forEach($scope.cars,function(item){
         total +=item.quantity * item.price;
      });
      return total;
   }

   $scope.totalQuantyty = function(){
      var total = 0;
      angular.forEach($scope.cars,function(item){
         total +=item.quantity;
      });
      return total;
   };

   $scope.delItem = function(id){
      for(var i=0;i<$scope.cars.length;i++){
         if($scope.cars[i].id === id){
            $scope.cars.splice(i,1);
         }
      }
   };

   $scope.clearAll = function(){
      $scope.cars = null;
   }
});