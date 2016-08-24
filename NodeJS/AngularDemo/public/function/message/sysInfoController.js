'use strict';

/*
 author：hanwj
 */
app.controller('SysInfoController', ['$scope', '$rootScope', '$modal','$http', '$modalInstance','message',
    function($scope, $rootScope, $modal, $http,$modalInstance,message) {
    $scope.cancel=function(){
       $modalInstance.close(true);
     }
    $scope.ok=function(){
        $modalInstance.close(true);
    }
     $scope.message=message;
}]);