app.directive('repeatFinish',function(){
    return {
        link: function(scope,element,attr){

            if(scope.$last == true){
                scope.$eval(attr.callback);
            }
        }
    }
})