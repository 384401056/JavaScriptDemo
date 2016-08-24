(function(){

    app.controller('TraceArchiveController',function(TraceAlertService,TraceCommonService,$scope,toaster){
        // TraceCommonService.queryOrgsWithProv().then(function (resultWrap) {
        //     console.info(resultWrap);
        // })

        //关闭提示框
        $scope.clear = function(){
            toaster.clear();
        };


        $scope.EditProductCertificate = function(){
            TraceAlertService.success("jskjsksjaksjas");
            TraceAlertService.info("jskjsksjaksjas");
            TraceAlertService.error("jskjsksjaksjas");
            TraceAlertService.warning("jskjsksjaksjas");
        }
    })
})();