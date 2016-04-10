/**
 * Created by Administrator on 2016/4/10.
 */

var app = angular.module("myApp",[]);

//文本绑定
app.controller("textController",function($scope){
    $scope.someText = "这是一段绑定的文字.......";
});

//复选框绑定
app.controller("checkBoxController",function($scope){
    $scope.youCheckedIt1 = true;
    $scope.youCheckedIt2 = true;
});

//输入框绑定1
app.controller("inputController1",function($scope){
    $scope.funding = {
        startingEstimate:0
    };

    $scope.computeNeeded = function(){
        $scope.funding.needed = $scope.funding.startingEstimate *10;
    };
});

//输入框绑定2
app.controller("inputController2",function($scope){
    $scope.funding = {
        startingEstimate:0
    };
    $scope.computeNeeded = function(){
        $scope.funding.needed = $scope.funding.startingEstimate *10;
    };
    //当startingEstimate数据改变时，就执行computeNeeded方法
    $scope.$watch("funding.startingEstimate", $scope.computeNeeded);
});


//输入框绑定3
app.controller("inputController3",function($scope){
    $scope.funding = {
        startingEstimate:0
    };
    $scope.computeNeeded = function() {
        $scope.funding.needed = $scope.startingEstimate * 10;
    };
    $scope.requestFunding = function() {
        window.alert("Sorry, please get more customers first.");
    };
    $scope.reset = function() {
        $scope.startingEstimate = 0;
    };
});

//列表
app.controller("tableController",function($scope){

    $scope.items = [
        {title: 'Paint pots', quantity: 8, price: 3.95},
        {title: 'Polka dots', quantity: 17, price: 12.95},
        {title: 'Pebbles', quantity: 5, price: 9.95},
        {title: 'Pebbles', quantity: 5, price: 9.95},
        {title: 'Pebbles', quantity: 5, price: 9.95},
        {title: 'Pebbles', quantity: 5, price: 9.95},
    ];
    $scope.remove = function (index) {
        $scope.items.splice(index, 1);
    }

});

//无序列表
app.controller("listController",function($scope){
    $scope.students = [
        {name:"张三丰",id:1001},
        {name:"李小龙",id:1002},
        {name:"霍元甲",id:1003},
        {name:"叶问",id:1004}
    ];
    $scope.insert = function(){
      $scope.students.splice(0,0,{name:"刘德华",id:1005})
    };
});









