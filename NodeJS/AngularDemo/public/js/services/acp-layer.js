"use strict";
app.factory('acpLayer', function ($modal, $rootScope, $modalStack) {
    return {
        close: function (reason) {
            $modalStack.dismissAll(reason);
        },
        tips: function (content, callback) {
            if (typeof content != 'string') {
                //第一个参数不是字符串
                callback = content;
                content = "操作成功！";
            }
            var scope = $rootScope.$new();
            scope.content = content;
            var modalInstance = $modal.open({
                templateUrl: "templates/acp-layer/acp-tips.html",
                scope: scope,
                size: "sm",
                backdrop: 'static',
                controller: function ($scope, $modalInstance, $timeout) {
                    $scope.ok = function () {
                        $modalInstance.close();
                    }
                    $timeout(function () {
                        $modalInstance.close();
                    }, 2000);
                }
            });
            modalInstance.result.then(function (result) {
                if (typeof callback == 'function') {
                    callback(result);
                }
            }, function (result) {
                if (typeof callback == 'function') {
                    callback(result);
                }
            });
        },
        alert: function (content, callback) {
            if (typeof content != 'string') {
                //第一个参数不是字符串
                callback = content;
                content = "操作成功！";
            }
            var scope = $rootScope.$new();
            scope.content = content;
            var modalInstance = $modal.open({
                templateUrl: "templates/acp-layer/acp-alert.html",
                scope: scope,
                size: "sm",
                backdrop: 'static',
                controller: function ($scope, $modalInstance) {
                    $scope.ok = function () {
                        $modalInstance.close();
                    }
                }
            });
            modalInstance.result.then(function (result) {
                if (typeof callback == 'function') {
                    callback(result);
                }
            }, function (result) {
                if (typeof callback == 'function') {
                    callback(result);
                }
            });
        },
        confirm: function (content, sure, cancel) {
            if (typeof content != 'string') {
                //第一个参数不是字符串
                cancel = sure;
                sure = content
                content = "确认操作?";
            }
            var scope = $rootScope.$new();
            scope.content = content;
            var modalInstance = $modal.open({
                templateUrl: "templates/acp-layer/acp-confirm.html",
                scope: scope,
                size: "sm",
                backdrop: 'static',
                controller: function ($scope, $modalInstance) {
                    $scope.ok = function () {
                        $modalInstance.close();
                    };
                    $scope.cancel = function () {
                        $modalInstance.dismiss();
                    }
                }
            });
            modalInstance.result.then(function () {
                if (typeof sure == 'function') {
                    sure();
                }
            }, function () {
                if (typeof cancel == 'function') {
                    cancel();
                }
            });
        },
    };
})