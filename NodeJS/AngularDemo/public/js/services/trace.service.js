/**
 * 系统服务
 * author : daixiaoman
 * serviceName:LoginService
 */

(function(){

    var baseHttpConfig  = {
        headers:{"Content-Type":"Application/json"},
        method: 'POST',
        transformRequest:function(data){
            return angular.toJson(data);
        }
    };


    /**
     * 弹窗服务
     */
    app.factory("TraceAlertService",function(toaster){
        
        return {
            info: function (body) {
                toaster.pop({type: 'info', title: "提示信息", body: body || ""})
            },
            error: function (body) {
                toaster.pop({type: 'error', title: "提示信息", body: body || ""})
            },
            warning: function (body) {
                toaster.pop({type: 'warning', title: "提示信息", body: body || ""})
            },
            success: function (body) {
                toaster.pop({type: 'success', title: "提示信息", body: body || ""})
            }

        };
        

    });


    app.factory("TraceCommonService",function(WebHost,$http,$q,$cookieStore){
        /*
         根据登录用户获取机构信息
         */
        var logUser = {"userId":$cookieStore.get("id"),"orgId":$cookieStore.get("orgId"),"userName":$cookieStore.get("name"),"token":$cookieStore.get("token")};
        return{
            queryOrgsWithProv:function(){
                var deferred = $q.defer();
                $http(
                    $.extend(baseHttpConfig,{
                        url:WebHost.traceUrl+"/adminCommon/queryOrgsWithProv",
                        data:logUser
                    })
                ).success(function(data, status, header, config) {
                    deferred.resolve(data);
                }).error(function(data, status, header, config) {
                    deferred.reject(data,status,header,config);
                });
                return deferred.promise;
            },
            getLoginUser:function(){
                return logUser;
            },
            /**
             * 更新公司简介
             * @param orgid
             * @param companyIntroduce
             */
            updateCompanyIntroduce:function(orgid,companyIntroduce){
                var deferred = $q.defer();
                $http(
                    $.extend(baseHttpConfig,{
                        url:WebHost.traceUrl+"/adminCommon/updateCompanyIntroduce",
                        data:{"orgid":orgid,"companyIntroduce":companyIntroduce}
                    })
                ).success(function(data, status, header, config) {
                    deferred.resolve(data);
                }).error(function(data, status, header, config) {
                    deferred.reject(data,status,header,config);
                });
                return deferred.promise;
            }
        }
    });



    app.factory("ProductArchiveService",function(WebHost,$http,$q,$cookieStore){
        /*
         根据登录用户获取机构信息
         */
        var logUser = {"userId":$cookieStore.get("id"),"orgId":$cookieStore.get("orgId"),"userName":$cookieStore.get("name"),"token":$cookieStore.get("token")};
        return{
            /**
             * 新增档案
             * @returns {Promise}
             */
            addProductArchive:function(requestParam){
                var deferred = $q.defer();
                $http(
                    $.extend(baseHttpConfig,{
                        url:WebHost.traceUrl+"/adminProductArchive/addProductArchive",
                        data:requestParam
                    })
                ).success(function(data, status, header, config) {
                    deferred.resolve(data);
                }).error(function(data, status, header, config) {
                    deferred.reject(data,status,header,config);
                });
                return deferred.promise;
            },
            updateProductIntroduce:function(productid,productIntroduce){

            }
        }
    });

})()

