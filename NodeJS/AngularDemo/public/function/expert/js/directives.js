
/**
 *在线咨询-显示组件
 */
app.directive('chatZone', function( WebSocketService, ChatService) {
    return {
        priority: 1,
        restrict: 'E',
        replace: true,
        templateUrl: 'function/expert/chatzone.html',
  
        controller: 'ChatCtrl',
        link: function (scope, root) {
            var scrollMode = 'display';
            var loadMoreData = true;
            var element = root[0];
            
            if(!element) {
            	console.log("在chatZone组件里找不到  id 为 'chat-scroll' 的元素。");
                return;
            }
            
            var wrappedElement = angular.element(element);
            

            scope.$watch(function(){ // watch on currentRoom
            	
                return scope.state.currentRoom;
                
            },
           function(){ // on change of room reset scroll state
                loadMoreData = true;
                scrollMode = 'display';
                WebSocketService.closeSocket(scope);
               
                ChatService.loadInitialRoomMessages(scope);
               
            });

             


            //Change in the list of chat messages should be intercepted
     /*       scope.$watchCollection(
                function() {  // watch on chat message
                    return scope.messages;
                },
                function(newMessages,oldMessages) { // on change of chat messages
                	
                    if(scrollMode === 'display') {
                        if(newMessages.length > oldMessages.length){
                       
                            element.scrollTop = element.scrollHeight;
                            if (scope.$last === true) {
                $timeout(function() {
                    element.scrollTop = element.scrollHeight;
                });
            }
                        }
                    } else if(scrollMode === 'loading') {
                        element.scrollTop = 10;
                    }
                }
            );*/

   /*         wrappedElement.bind('scroll', function() {
                if(element.clientHeight + element.scrollTop + 1 >= element.scrollHeight) {
                    scrollMode = 'display';
                } else if(element.scrollTop == 0 && loadMoreData) {
                    scope.$apply(function(){
                        usSpinnerService.spin('loading-spinner');
                        scrollMode = 'loading';
                        ChatService.loadPreviousMessages(scope)
                        .then(function(messages){
                            // if no more message found, stop loading messages on next calls
                            if(messages.length == 0) {
                                loadMoreData = false;
                            }
                            usSpinnerService.stop('loading-spinner');
                        });
                    });

                } else {
                    scrollMode = 'fixed';
                }
            });*/

            wrappedElement.on('$destroy', function() {
                WebSocketService.closeSocket(scope);
                wrappedElement.unbind('scroll');
            });
        }
    }
});
//ng-repeart 执行完成组件
app.directive('onFinishRenderFilters', function ($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function() {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    };
});
//loadding组件

app.directive('loading',   ['$http',function ($http)
    {
        return {
            restrict: 'A',
            link: function (scope, elm, attrs)
            {
                scope.isLoading = function () {
                    return $http.pendingRequests.length > 0;
                };

                scope.$watch(scope.isLoading, function (v)
                {
                    if(v){
                       
                        elm.show();
                       
                    }else{
                        
                        elm.hide();

                         
                    }
                });
            }
        };

    }]);