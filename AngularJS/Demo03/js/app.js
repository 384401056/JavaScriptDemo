/**
 * Created by Administrator on 2016/4/10.
 */


var app = angular.module("myApp",[]);

//Angularjs控制隐藏和显示
app.controller("DeathrayMenuController",function($scope){
    $scope.menuState = {"show":false};
    $scope.isDisable = false;
    $scope.toggleMenu = function(){
        $scope.menuState.show = !$scope.menuState.show;
    };

    $scope.stun = function(){
        $scope.isDisable = true;
    };
    $scope.disintegrate = function(){

    };

    $scope.erase = function(){

    };
});


//Angularjs控制样式
app.controller("cssController",function($scope){
    $scope.isError = false;
    $scope.isWarning = false;
    $scope.showError = function(){
        $scope.isError = true;
        $scope.isWarning = false;
        $scope.messageText = 'This is an error!';
    };
    $scope.showWarning = function(){
        $scope.isError = false;
        $scope.isWarning = true;
        $scope.messageText = 'This is an warning!';
    }
});

//点击行高亮样式
app.controller("lineHightlightController",function($scope){
    $scope.directory = [
        {name:"erewrwwd",cuisine:"134214324"},
        {name:"fdsafdsafdsaf",cuisine:"6546543654"},
        {name:"vcxzvcxzvcxz",cuisine:"8758765876"},
        {name:"jkjhgjhgkjhgj",cuisine:"0987098709"}
    ];

    $scope.selectRestaurant = function(index){
        $scope.selectedRow = index;
    }
});

//src和href属性的Angularjs设置方法
app.controller("srchrefController",function($scope){
    $scope.candy = "1.png";
    $scope.imgClick = function(){
        $scope.candy = "2.png"
    };
});



















