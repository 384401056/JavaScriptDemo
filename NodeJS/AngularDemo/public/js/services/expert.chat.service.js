/**
 * 专家在线-在线咨询-服务
 */

//通知服务
app.service('GeneralNotificationService', function($rootScope){
    this.displayGeneralError = function (httpResponse) {
        if(httpResponse) {
            if(httpResponse.data) {
                if(httpResponse.data.message) {
                    $rootScope.generalError = httpResponse.data.message;
                } else {
                    $rootScope.generalError = httpResponse.data;
                }
            } else if(httpResponse.message) {
                $rootScope.generalError = httpResponse.message;
            } else {
                $rootScope.generalError = httpResponse;
            }
        }
    };

    this.displayGeneralNotification = function(message) {
        $rootScope.generalMessage = message;
    }

    this.clearGeneralNotification = function() {
        delete $rootScope.generalError;
        delete $rootScope.generalMessage;
    };
});

//房间服务
app.service('UserRoomsService', function(Room, ParticipantService, GeneralNotificationService){

    this.addRoomToUserRoomsList = function(userRooms, roomToJoin) {
        var indexOf = userRooms.indexOf(roomToJoin);
        if(indexOf == -1){
            userRooms.push(roomToJoin);
            userRooms.sort();
        }
    };

    this.removeRoomFromUserRoomsList = function(userRooms, roomToLeave) {
        var indexOf = userRooms.indexOf(roomToLeave);
        if(indexOf > -1){
            userRooms.splice(indexOf,1);
        }
    }

    this.deleteRoomWithParticipants = function(room,$scope) {
        return new Room({participants:room.participants.map(function(p){return p.login})})
            .$delete({roomName: room.roomName})
            .catch(function(httpResponse){
                GeneralNotificationService.displayGeneralError(httpResponse);
                Room.load({roomName:room.roomName})
                    .$promise
                    .then(function(currentRoom){
                        $scope.state.currentRoom = currentRoom.data;
                        $scope.state.currentRoom.participants.sort(ParticipantService.sortParticipant);
                    })
                    .catch(GeneralNotificationService.displayGeneralError);
            });
    }

});

//房间用户列表服务
app.service('ParticipantService', function(){
    var self = this;
    this.sortParticipant = function(participantA,participantB){
        return participantA.username.localeCompare(participantB.username);
    };

    this.addParticipantToCurrentRoom = function(currentRoom, participantToAdd) {
        currentRoom.participants.push(participantToAdd);
        currentRoom.participants.sort(self.sortParticipant);
    };

    this.removeParticipantFromCurrentRoom = function(currentRoom, participantToRemove) {
        var indexToRemove = currentRoom.participants.map(function(p){return p.login}).indexOf(participantToRemove.login);
        currentRoom.participants.splice(indexToRemove, 1);
    };
});

//导航服务
app.service('NavigationService', function(Room, ParticipantService, UserRoomsService, GeneralNotificationService){

    this.enterRoom = function($scope, roomToEnter) {
        Room.load({roomID:roomToEnter})
            .$promise
            .then(function(currentRoom){
            	
                $scope.state.currentRoom = currentRoom.data;
                $scope.state.currentRoom.participants.sort(ParticipantService.sortParticipant);
               $scope.getMsgRecord();
               
            })
            .catch(GeneralNotificationService.displayGeneralError);
    };

    this.quitRoomBackHome = function($scope, roomToLeave) {
        new Room($scope.getLightModel())
            .$removeParticipant({roomName:roomToLeave})
            .then(function(){
                UserRoomsService.removeRoomFromUserRoomsList($scope.user.chatRooms, roomToLeave);
                $scope.section = 'home';
            })
            .catch(GeneralNotificationService.displayGeneralError);
    };

});

//websocket服务
app.service('WebSocketService', function(ParticipantService, UserRoomsService, GeneralNotificationService){

    var self = this;
    this.notifyNewMessage = function($scope,message) {
        $scope.$apply(function(){
            /*验证消息是否属于该用户*/
            if(self.verifyMessage(message,$scope)) {
                $scope.messages.push(angular.fromJson(message.body));
            }
        });
    };
    /*验证消息是否属于该用户*/
    this.verifyMessage = function(messageItem,$scope) {
        var msgBody = angular.fromJson(messageItem.body);

        var msgFromId = msgBody.fromuserid;

        var msgToId = msgBody.touserid || false ;

        var loginUserId = $scope.loginUserId;
       // console.log(msgToId + "::" +msgBody.touser);
        /*设置专家当前正在聊天客户名称*/
        if(loginUserId == msgBody.roomid) {
            $scope.currentCustomer = msgBody.touser;
        }
        

        if(loginUserId == msgFromId || loginUserId == msgToId || !msgToId) {
            return true;
        }

        return false;
        
    };

    this.notifyParticipant = function($scope,message) {
        var participant = angular.fromJson(message.body);
        var status = message.headers.status;
        $scope.$apply(function(){
            if(status == 'JOIN') {
                ParticipantService.addParticipantToCurrentRoom($scope.state.currentRoom, participant);
            } else if(status == 'LEAVE') {
                ParticipantService.removeParticipantFromCurrentRoom($scope.state.currentRoom, participant);
            }
        });
    };

    this.notifyRoomAction = function($scope,message) {
        var action = message.headers.action;
        $scope.$apply(function(){
            if(action == 'DELETE') {
                var roomName = message.headers.room;
                var creator = message.headers.creator;
                UserRoomsService.removeRoomFromUserRoomsList($scope.user.chatRooms, roomName);
                $scope.home();
                if($scope.user.login != creator) {
                    GeneralNotificationService.displayGeneralNotification(message.body);
                }
            }
        });
    };

    this.initSockets = function($scope) {
    	
        self.closeSocket($scope);
        var roomID = $scope.state.currentRoom.roomid;
        $scope.socket.client = new SockJS('http://10.88.20.104:8084/acp-web-expert/chat');
        var stomp = Stomp.over($scope.socket.client);
        stomp.debug = function(str) {};
        stomp.connect({}, function() {
            stomp.subscribe('/topic/messages/'+roomID,
                function(message){
                 //  console.info("websocket服务:",message)
                    self.notifyNewMessage($scope,message);
                });
            stomp.subscribe('/topic/participants/'+roomID,
                function(message) {
                   
                    self.notifyParticipant($scope, message);
                });

            stomp.subscribe('/topic/action/'+roomID,
                function(message) {
                    
                    self.notifyRoomAction($scope, message);
                });
        });

        $scope.socket.stomp = stomp;
    };

    this.closeSocket = function($scope) {
        if($scope.socket.client) {
            $scope.socket.client.close();
        }
        if($scope.socket.stomp) {
            $scope.socket.stomp.disconnect();
        }
    };
});

//聊天服务
app.service('ChatService', function(Message, WebSocketService, GeneralNotificationService){

    this.loadInitialRoomMessages = function($scope) {
    	if($scope.state.currentRoom!=null){
           var promise = Message.load({roomID:$scope.state.currentRoom.roomid, fetchSize: 20});
        promise.$promise.then(function(message){
            $scope.messages = message.data;
            WebSocketService.initSockets($scope);
        })
        .catch(GeneralNotificationService.displayGeneralError);
        }
       
    };

    this.loadPreviousMessages = function($scope) {
        var promise = Message.load({roomID:$scope.state.currentRoom.roomid, fromMessageId: $scope.messages[0].messageId, fetchSize: 20}).$promise;
        promise.then(function(messages) {
            messages.reverse().forEach(function(message){
                $scope.messages.unshift(message.data);

            });
        }).catch(GeneralNotificationService.displayGeneralError);

        return promise;
    };

    this.postMessage = function($scope){
    	
        if($scope.newMessage.content){
            new Message($scope.newMessage)
                .$create({roomID:$scope.state.currentRoom.roomid})
                .then(function(){
                 $scope.setContentNull();
                })
                .catch(GeneralNotificationService.displayGeneralError);
        } else {
            GeneralNotificationService.displayGeneralError('消息不能为空 ...');
        }
    };

    this.getMessageRecord = function($scope){
       
            new Message($scope.pageInfo)
                .$getmsgrecord({roomID:$scope.state.currentRoom.roomid})
                .then(function(msg){
                 $scope.msgrecords=msg.data;
                 $scope.pageInfo.currentPage = msg.data.pageNum;
                    $scope.pageInfo.pageSize = msg.data.pageSize;
                    $scope.pageInfo.totalRecord = msg.data.pageTotal;
                })
                .catch(GeneralNotificationService.displayGeneralError);
       
    };

    this.setMessageIsRead = function($scope) {
        new Message($scope.lastMsg)
        .$setMessageIsRead()
        .then(function() {
            console.log("OK");
        }).catch(GeneralNotificationService.displayGeneralError);
    };

});

//房间服务
app.service('RoomService', function(ParticipantService){

    var self = this;
    this.findMatchingRoom = function(rooms,matchingRoom) {
        return rooms.filter(function(room){
            return matchingRoom.roomID == room.roomID;
        })[0];
    };

    this.sortRooms = function(roomA,roomB){
        return roomA.roomID.localeCompare(roomB.roomID);
    };

    this.addMeToThisRoom = function(me, allRoomsList, targetRoom) {
        var roomInExistingList = self.findMatchingRoom(allRoomsList, targetRoom);

        roomInExistingList.participants.push({
            username:me.name,
           
        });
        roomInExistingList.participants.sort(ParticipantService.sortParticipant);
    };

    this.removeMeFromThisRoom = function(participant, allRoomsList, targetRoom) {
        var roomInExistingList = self.findMatchingRoom(allRoomsList, targetRoom);
        if(roomInExistingList) {
            ParticipantService.removeParticipantFromCurrentRoom(roomInExistingList, participant);
        }
    };

    this.addRoomToUserRoomsList = function(userRooms, roomToJoin) {
        var indexOf = userRooms.indexOf(roomToJoin);
        if(indexOf == -1){
            userRooms.push(roomToJoin);
            userRooms.sort();
        }
    };

    this.removeRoomFromUserRoomsList = function(userRooms, roomToLeave) {
        var indexOf = userRooms.indexOf(roomToLeave);
        if(indexOf > -1){
            userRooms.splice(indexOf,1);
        }
    };

});

//专家在线房间列表服务
app.service('ListAllRoomsService', function(Room, RoomService, ParticipantService, GeneralNotificationService){

    this.loadInitialRooms = function($scope) {
        Room.list({fetchSize:100})
        .$promise
        .then(function(allRooms){

            $scope.allRooms = allRooms.data;
          //  $scope.allRooms.sort(RoomService.sortRooms);
           /* $scope.allRooms.forEach(function(room){
                room.participants.sort(ParticipantService.sortParticipant);
            });*/
        })
        .catch(GeneralNotificationService.displayGeneralError);
    };

    this.joinRoom = function($scope, roomToJoin) {
        new Room()
            .$addParticipant({roomID:roomToJoin.roomID,participant:roomToJoin.userid})
            .then(function(){
               // RoomService.addMeToThisRoom($scope.currentUser, $scope.allRooms, roomToJoin);
               // RoomService.addRoomToUserRoomsList($scope.user.chatRooms, roomToJoin.roomName);
                $scope.enterRoom(roomToJoin.roomID);
                
            })
            .catch(GeneralNotificationService.displayGeneralError);
    };

    this.quitRoom = function($scope, roomToLeave) {
        new Room()
            .$removeParticipant({roomID:roomToLeave.roomID,participant:roomToLeave.userid})
            .then(function(){
               // RoomService.removeMeFromThisRoom($scope.currentUser, $scope.allRooms, roomToLeave);
               // RoomService.removeRoomFromUserRoomsList($scope.user.chatRooms, roomToLeave.roomID);

                $scope.state.currentRoom = null;
            })
            .catch(GeneralNotificationService.displayGeneralError);
    };

    /**
     * 设置专家进入房间
     */
    this.ExpertJoinRoom = function($scope, roomToLeave) {

        this.joinRoom($scope, roomToLeave);

        this.setExpertIsOnline(roomToLeave);


    };

    /**
     * 设置专家在线状态
     */
    this.setExpertIsOnline = function(roomToLeave) {
        new Room()
        .$setExpertIsOnline({roomid:roomToLeave.roomID, userid:roomToLeave.userid})
        .then(function() {
            console.log("专家在线");
        })
        .catch(GeneralNotificationService.displayGeneralError);
    };


    this.ExpertQuitRoom = function(roomToJoin){
        new Room()
        .$setExpertIsOffline({roomid:roomToLeave.roomID, userid:roomToLeave.userid})
        .then(function() {
            console.log("专家离线");
        })
        .catch(GeneralNotificationService.displayGeneralError);
    };

});

//创建房间服务
app.service('RoomCreationService', function(Room){

      this.createNewRoom = function($scope) {
       new Room({userid:"379",banner:"养猪专家"})
           .$create({roomName: "379"})
           .then(function(){
               //$scope.user.chatRooms.push($scope.newRoom.roomName);
               //$scope.user.chatRooms.sort();
              // delete $scope.newRoom.roomName;
              // delete $scope.newRoom.payload.banner;
           })
           .catch(function(httpResponse){
               $scope.room_form_error = httpResponse.data;
           });
   };
});
