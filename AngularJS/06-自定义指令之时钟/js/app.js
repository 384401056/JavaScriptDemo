/**
 * Created by Administrator on 2016/4/10.
 */


var app = angular.module("myApp",[],['$compileProvider',function($compileProvider){

    //定义指令形式1
    //$compileProvider.directive("gbTags",function(){
    //    return{
    //        //指令的风格，A:属性风格 E：元素风格 C:样式风格 M：注解风格
    //        restrict:'E',
    //        compile:function(){
    //            console.log("$compileProvider");
    //        },
    //        link:function(){
    //
    //        }
    //    }
    //});

}]);

app.service("DtimeService",['$interval','$rootScope',function($interval,$rootScope){
    console.log("Start Service!");
    var updateClock = function(){
        var date = new Date();
        var weekDay = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
        var week = weekDay[date.getDay()];
        var data = {
            date:date,
            week:week
        };
        $rootScope.$broadcast('dtime', data);
    };
    $interval(function(){
        updateClock()
    },1000);
    updateClock();
}]);

//定义指令形式2
app.directive("gbDatetime",['DtimeService','$filter',function(DtimeService,$filter){
    return{
        //指令的风格，A:属性风格 E：元素风格 C:样式风格 M：注解风格
        restrict:'E',
        templateUrl:"temp/Dtime.html",
        compile:function(){
            console.log("Start compile!");
            return{
                post:function postLink(scope){
                    console.log("Start postLink!");
                    scope.$on('dtime', function(event,data) {
                        scope.clock = {
                            date : data.date,
                            week : data.week
                        };
                    });
                }
            }
        }
    }
}]);


app.controller("myController",['$scope','DtimeService',function($scope,DtimeService){

}]);




















