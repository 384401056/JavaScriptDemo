/**
 * Created by Administrator on 2016/4/10.
 */

var app = angular.module("myApp",[]);

app.controller("CartController",function($scope){
    $scope.bill = {};//定义帐单

    $scope.items = [
        {title: '商品1', quantity: 8, price: 3.95},
        {title: '商品1', quantity: 17, price: 12.95},
        {title: '商品1', quantity: 5, price: 6.95}
    ];

    $scope.totalCart = function(){
        var total = 0;
        for (var i = 0, len = $scope.items.length; i < len; i++) {
            total = total + $scope.items[i].price * $scope.items[i].quantity;
        }
        return total;
    };


    $scope.subtotal = function() {
        return $scope.totalCart() - $scope.bill.discount;
    };


    //监视totolCart返回的值。如果新的值大于100,则bill.discount=10，否则为0.
    $scope.$watch($scope.totalCart, calculateDiscount);

    function calculateDiscount(newValue, oldValue, scope) {
        $scope.bill.discount = newValue > 100 ? 10 : 0;
    }

});