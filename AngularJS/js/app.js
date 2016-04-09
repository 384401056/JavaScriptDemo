/**
 * Created by Administrator on 2016/4/9.
 */

//function MyController($scope, $timeout) {
//    var updateClock = function() {
//        //$scope.clock代表DOM元素中的clock.
//        $scope.clock = new Date();
//        $timeout(function() {
//            updateClock();
//        }, 1000);
//    };
//    updateClock();
//};


function MyController($scope) {
    //$scope.clock代表DOM元素中的clock.
    $scope.clock = {
        now:new Date()
    };

    //设置clock.now的值
    var updateClock = function(){
        $scope.clock.now = new Date();
    };

    //每秒执行一次updateClock()方法.
    setInterval(function(){
       $scope.$apply(updateClock());
    },1000);

    //updateClock();
};