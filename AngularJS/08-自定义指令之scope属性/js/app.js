/**
 * Created by Administrator on 2016/4/10.
 */


var app = angular.module("myApp",[],['$compileProvider',function($compileProvider){

}]);

//定义一个列表指令
app.directive("bookList",function(){
    return{
        //指令的风格，A:属性风格 E：元素风格 C:样式风格 M：注解风格
        restrict:'E',
        templateUrl:'temp/bookList.html',
        //replace:true,
        //此controller就是用于bookList.html文件的
        controller:function($scope){
            console.log("bookList controller");
            $scope.books = [
                {name:'JavaScrip'},
                {name:'PHP'},
                {name:'Java'}
            ];

            //这里要用this.不能用$scope，否则外部指令找不到此方法
            this.addBook = function(){
                $scope.$apply(function(){
                    $scope.books.push({name:'AngularJS'});
                });
            }

            this.subBook = function(){
                $scope.$apply(function(){
                    $scope.books.splice($scope.books.length-1,1);
                });
            }

        },
        controllerAs:'bookListController',//给controller取的别名。
        //也可直接定义link属性，而不定义compile.这个link就是postLink.
        link:function(scope,iElement,iAttrs){
            console.log("bookList link");
        }
    }
});

app.directive("addBtn",function(){
    return{
        //指令的风格，A:属性风格 E：元素风格 C:样式风格 M：注解风格
        restrict:'E',
        template:'<button type="button" class="btn btn-primary">+</button>',
        replace:true,//进行替换
        require:'^bookList',//可使用共享数据的指定名。^代表在父元素中找bookList.

        //也可直接定义link属性，而不定义compile.这个link就是postLink.
        //bookListController是其它指令中的contorller
        link:function(scope,iElement,iAttrs,bookListController){
            //在本指令中调用bookList指令中的方法，来添加book
            //*这里的bookListController.addBook不能写().
            iElement.on("click", bookListController.addBook);

        }
    }
});

app.directive("subBtn",function(){
    return{
        //指令的风格，A:属性风格 E：元素风格 C:样式风格 M：注解风格
        restrict:'E',
        template:'<button type="button" class="btn btn-primary">-</button>',
        replace:true,//进行替换
        require:'^bookList',//可使用共享数据的指定名。^代表在父元素中找bookList.

        //也可直接定义link属性，而不定义compile.这个link就是postLink.
        //bookListController是其它指令中的contorller
        link:function(scope,iElement,iAttrs,bookListController){
            //在本指令中调用bookList指令中的方法，来添加book
            //*这里的bookListController.addBook不能写().
            iElement.on("click", bookListController.subBook);

        }
    }
});


app.controller("myController",['$scope',function($scope){

}]);




















