/**
 * @author ChenMingDong
 * @desc 提示框的公共控件
 * Common-service-dialog
 * @return none
 */

 (function(){
    app.service("Dialog", ['$modal', dialog]);



    function dialog($modal) {


        var dialogController = function($scope, $modalInstance, opts) {
            
            $scope.msg = opts.msg;

            function close() {
                $modalInstance.dismiss('cancel');
            }
            setTimeout(close,1100);
        };



    	return {
    		/**
    		 *提示框
    		 */
    		 alert:function(message){
                
    		 	$modal.open({
                    templateUrl: 'function/expert/common/dialog.html',
                    controller: dialogController,
                    backdrop: 'static',
                    keyboard: false,
                    size:'sm',
                    resolve:{
                        opts:function(){
                            return {msg: message };
                        }
                    }
                });

    		 }
    	}


	}

})();