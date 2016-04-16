/**
 * Created by Administrator on 2016/4/9.
 */
//angular.module("myApp",[]).run(function($rootScope){
//   $rootScope.name = "World";
//});

var app = angular.module("myApp",[]);

//自定义过滤器1
app.filter("customFillerByPrice",function(){
   //objs为传入的将要对其进行过滤的对象数组
   return function(objs){

      var newData = [];

      //对象数组的循环
      angular.forEach(objs,function(obj){
         //将价格大于3000的数据加入新的数组
         if(obj.price > 3000){
            newData.push(obj);
         }
      });

      return newData;
   }
});

//自定义过滤器2
app.filter("customFillerByQuantity",function(){
   //objs为传入的将要对其进行过滤的对象数组
   return function(objs){

      var newData = [];

      //对象数组的循环
      angular.forEach(objs,function(obj){
         //将商品大于3000的数据加入新的数组
         if(obj.quantity > 10){
            newData.push(obj);
         }
      });

      return newData;
   }
});


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
});























