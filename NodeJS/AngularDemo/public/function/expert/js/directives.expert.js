/**
 * enter事件绑定
 */
app.directive('ngEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if(event.which === 13) {
                scope.$apply(function(){
                    scope.$eval(attrs.ngEnter, {'event': event});
                });
                event.preventDefault();
            }
        });
    };
});
/**
 *在线咨询-显示组件
 */
app.directive('chatZone', function( WebSocketService, ChatService) {
    return {
        priority: 1,
        restrict: 'E',
        replace: true,
        templateUrl: 'function/expert/chatzone.html',
  
        controller: 'Chat4ExpertCtrl',
        link: function (scope, root) {
            var scrollMode = 'display';
            var loadMoreData = true;
            var element = root[0];
           
            if(!element) {
            	
                return;
            }

            var wrappedElement = angular.element(element);
            element.scrollTop = 10;

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
            /*scope.$watchCollection(
                function() {  // watch on chat message
                    return scope.messages;
                },
                function(newMessages,oldMessages) { // on change of chat messages
                	
                    if(scrollMode === 'display') {
                        if(newMessages.length > oldMessages.length){
                        	
                        	
                            element.scrollTop = element.scrollHeight;
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