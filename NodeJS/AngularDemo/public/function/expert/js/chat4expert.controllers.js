/**
 * 专家在线 -在线咨询 Controller
 */



/**
 * 聊天控制器
 */
app.controller('Chat4ExpertCtrl', function($scope,$http, $cookieStore, ChatService, UserRoomsService,FileUploader, ListAllRoomsService, RoomCreationService, NavigationService, WebSocketService) {

    //当前登录人ID
    //$scope.loginUserId = $cookieStore.get("id");
    $scope.loginUserId = 379;

    //消息-接收人IDs
    $scope.receiveUserIds = "";
    //最后一个接收消息的客户ID
    $scope.lastCustomerId = "";
    //当前接收消息的客户名称
    $scope.currentCustomer = "";

    $scope.getReceiveUserIds = function() {
        //初始化
        $scope.receiveUserIds = "";

        $("input[name=messageUser]:checked").each(function() {
            $scope.receiveUserIds += $(this).val() + ",";
        });

        $scope.newMessage.toid = $scope.receiveUserIds;
    };

    //聊天服务URL前缀
    var url = "http://10.88.20.75:8081/rooms";

    //创建房间
    $scope.room_form_error = null;
    $scope.newRoom = {
        roomName: $scope.loginUserId,
        userid: $scope.loginUserId,
        banner: "专家在线"

    };
    $scope.socket = {
        client: null,
        stomp: null
    };
    
    $scope.messages = [];
    
    $scope.lastMsg = [];

    $scope.newMessage = {
        fromid: $scope.loginUserId,
        toid : null

    };


    $scope.state = {
        currentRoom: {}
    };
    //房间列表
    $scope.allRooms = [];

    //消息-列表（人员队列）
    $scope.userList = [];

    $scope.getUserByRoomId = function(roomid) {

        $http({
                url: url + '/getUserByRoomId/' + roomid,
                method: 'POST'
            }).success(function(data, status, header, config) {
                $scope.userList = data.data;


            }).error(function(data, status, header, config) {
                
            });
    };
    /*执行
     *专家ID 就是房间ID，所以使用专家登录ID
     */
    $scope.getUserByRoomId($scope.loginUserId);



    //进入房间
    
    $scope.enterRoom = function(roomToEnter) {
        NavigationService.enterRoom($scope, roomToEnter);

    };

    /*切换交谈客户对象*/
    $scope.changeUser = function(item) {

        var userId = item.id;

        $scope.newMessage.toid = userId;

        /*改变当前接收消息客户样式*/
        $scope.toggleClass("#message_user_" + userId);

        /*var roomToJoin = {
            roomID : $scope.loginUserId,
            userid : $scope.loginUserId
        };
        ListAllRoomsService.joinRoom($scope, roomToJoin);*/
    };

    /*切换样式*/
    $scope.toggleClass = function(activeId) {

        $("li[class=message_user_active]").each(function() {
            $(this).attr("class", "message_user");
        });

        $(activeId).attr("class", "message_user_active");
    };

    /*专家-初始化进入房间*/

    $scope.expertJoinRoom = function() {
        var roomToJoin = {
            roomID : $scope.loginUserId,
            userid : $scope.loginUserId
        };

        //RoomCreationService.createNewRoom($scope.newRoom);
        ListAllRoomsService.ExpertJoinRoom($scope, roomToJoin);


    };

   $scope.expertJoinRoom();

   $scope.expertQuitRoom = function() {
        var roomToJoin = {
            roomID : $scope.loginUserId,
            userid : $scope.loginUserId
        };
        ListAllRoomsService.ExpertQuitRoom($scope, roomToJoin);


    };

   $scope.expertJoinRoom();

    $scope.setContentNull = function() {

       $("#saytext").html("");
        
    };

    /*在repeat 消息渲染完成后执行-把滚动条置于最底端*/
    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
              
            $("#scroll-chat")[0].scrollTop =  $("#scroll-chat")[0].scrollHeight;
    });


    $scope.loadInitialRoomMessages = function(roomToEnter) {
        ChatService.loadInitialRoomMessages($scope);

    };

    $scope.getMsgRecord = function() {
       /* $scope.pageInfo.start=$("#datetimepicker").val();
        $scope.pageInfo.end=$("#datetimepicker1").val();
          
          ChatService.getMessageRecord($scope);*/

    };

    /**
     *发送消息
     * 
     */
    $scope.postMessage = function() {
        //获取选中要发送给的用户Ids
        //$scope.getReceiveUserIds();

        $scope.newMessage.content = $("#saytext").html();
        ChatService.postMessage($scope);

    };

    $scope.deleteRoomWithParticipants = function(room) {
        UserRoomsService.deleteRoomWithParticipants(room, $scope);
    };



    $scope.joinRoom = function(roomToJoin) {
        ListAllRoomsService.joinRoom($scope, roomToJoin);
    };

    $scope.quitRoom = function(roomToLeave) {
        ListAllRoomsService.quitRoom($scope, roomToLeave);
    };

    $scope.$evalAsync(ListAllRoomsService.loadInitialRooms($scope));

    /**
    *切换全选状态
    */
    $scope.checkAll = function() {

        var allItem = $("#messageUser_all");

        var allCheckValue = allItem.is(':checked');

        if(!allCheckValue) {

            //当toid为空时，默认为发送给所有人,并记录最后接收消息的客户
            $scope.lastCustomerId = $scope.newMessage.toid
            $scope.newMessage.toid = "";

            allItem.prop("checked", true);

            $("input[type=checkbox][name=messageUser]").not("input:checked").each(function() {
                $(this).prop("checked",true);
            });
        }else {
            //将最后接收消息的客户当前接收消息客户
            $scope.newMessage.toid = $scope.lastCustomerId;

            allItem.prop("checked", false);

            $("input[type=checkbox][name=messageUser]:checked").each(function() {
                $(this).prop("checked",false);
            });
        }

        
        
    };


    //传送文件
    var uploader = $scope.uploader = new FileUploader({
        //headers: {'Content-Type': 'multipart/form-data'},
        url: 'http://10.88.20.98:8080/expert/upload/uploadFile'
    });

    

    uploader.onAfterAddingFile = function(fileItem) {
        if($("#uploadinfo").hasClass("hide")){
            showupload();
        }
        
        var index1 = fileItem.file.name.lastIndexOf(".");
        var index2 = fileItem.file.name.length;
        var suffix = fileItem.file.name.substring(index1, index2); //后缀名\

        if (suffix == '.exe') {

            uploader.queue.pop();
        } else {

            $scope.uploadFile = uploader.queue;
        }


        //console.info('onAfterAddingFile', fileItem);
    };

    uploader.onSuccessItem = function(fileItem, response, status, headers) {

        var index1 = fileItem.file.name.lastIndexOf(".");
        var index2 = fileItem.file.name.length;
        var suffix = fileItem.file.name.substring(index1, index2); //后缀名  
        if (response.flag === 1) {
            if (suffix == '.jpg' || suffix == '.png' || suffix == '.bmp' || suffix == '.gif') {
                $scope.newMessage.content = "<img src=\"http://10.88.20.95/resource/" + response.data.fileName + "\" \ class=\"message_pic\"  />";
            } else {
                $scope.newMessage.content = "<a href=\"http://10.88.20.95/resource/" + response.data.fileName + "\" >" + fileItem.file.name + "</a>";
            }


            ChatService.postMessage($scope);
        }
        //console.info('onSuccessItem', fileItem, response, status, headers);
    };



    uploader.onErrorItem = function(fileItem, response, status, headers) {
        //  console.info('onErrorItem', fileItem, response, status, headers);
    };
    // uploader.onCancelItem = function(fileItem, response, status, headers) {
    //     console.info('onCancelItem', fileItem, response, status, headers);
    // };
    uploader.onCompleteItem = function(fileItem, response, status, headers) {
        //  console.info('onCompleteItem', fileItem, response, status, headers);
    };
    uploader.onCompleteAll = function() {
        //  console.info('onCompleteAll');
    };

    //console.info('uploader', uploader);
    $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {


        $("#scroll-chat")[0].scrollTop = $("#scroll-chat")[0].scrollHeight;

        $(".message_pic").one('load', function() {
            $("#scroll-chat")[0].scrollTop = $("#scroll-chat")[0].scrollHeight;
        }).each(function() {
            if (this.complete) $(this).load();
        });

        $scope.tmpMsg = $scope.messages[$scope.messages.length - 1];

        $scope.lastMsg = {
            "fromuserid":$scope.tmpMsg.fromuserid,
            "msgid":$scope.tmpMsg.msgid,
            "roomid":$scope.tmpMsg.roomid
        };

       

        //设置已读状态
        ChatService.setMessageIsRead($scope);

    });

     $scope.getMsgRecord = function() {
        $scope.pageInfo.start=$("#datetimepicker").val();
        $scope.pageInfo.end=$("#datetimepicker1").val();
          
          ChatService.getMessageRecord($scope);

    };


});