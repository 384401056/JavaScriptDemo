(function(){


    app.controller("TraceInfoController",['$scope','TraceCommonService',function($scope,TraceCommonService){
        TraceCommonService.queryOrgsWithProv().then(function (resultWrap) {
            console.info(resultWrap);
        })
        console.info(TraceCommonService.getLoginUser());
    }])



})()