/**
 * 专家在线 -在线咨询 Controller
 * author：lsw
 */


app.controller('ChatCtrl', function($scope, $cookieStore, ChatService, UserRoomsService, FileUploader,
	ListAllRoomsService, RoomCreationService, NavigationService,
	WebSocketService) {
	//当前登录人ID
	$scope.loginUserId = $cookieStore.get("id");
	$scope.loginUserName = $cookieStore.get("name");

 
	$scope.room_form_error = null;
	//创建房间参数
	/*$scope.newRoom = {
		roomName: "378",
		userid: "378",
		banner: "专家在线"

	};*/

	$scope.currentUser = {
		username: $scope.loginUserName,
		userid: $scope.loginUserId


	};
	//消息记录分页
	$scope.pageInfo = {
		userid: $scope.currentUser.userid,
		currentPage: "1",
		pageSize: "20",
		start: null,
		end: null

	};

	$scope.evaluate = {
		//初始化
		xx: 4, //专业度
		yy: 4, //服务态度
		zz: 4 //满意度

	};
	//评价
	$scope.postevaluate = function() {
		//TODO 调用评价服务
		console.info("评价信息", $scope.evaluate);
	};


	$scope.socket = {
		client: null,
		stomp: null
	};
	// RoomCreationService.createNewRoom($scope);//创建房间

	$scope.state = {
		currentRoom: {}
	};
	// 房间列表
	$scope.allRooms = [];


	// 进入房间

	$scope.enterRoom = function(roomToEnter) {
		NavigationService.enterRoom($scope, roomToEnter);

	};
	//选择专家
	$scope.changeExpert = function(roomid) {
		//  RoomCreationService.createNewRoom();
		var roomToJoin = {
			roomID: roomid,
			userid: $scope.currentUser.userid
		};
		ListAllRoomsService.joinRoom($scope, roomToJoin);
	};
	//退出专家房间
	$scope.goHome = function() {
		var roomToLeave = {
			roomID: $scope.state.currentRoom.roomid,
			userid: $scope.currentUser.userid
		};
		ListAllRoomsService.quitRoom($scope, roomToLeave);
		$("#uploadinfo").addClass('hide');
		$("#msgRecord").addClass('hide');
		$("#chart").removeClass('col-sm-8');
		$("#chart").addClass('col-sm-12');
	};

	$scope.messages = [];

	//发消息参数
	$scope.newMessage = {
		content: null,
		fromid: $scope.currentUser.userid,

	};

	//清空设置发消息文本框
	$scope.setContentNull = function() {

		$("#saytext").html("");

	};
	//消息体循环显示完毕后执行
	$scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {


		$("#scroll-chat")[0].scrollTop = $("#scroll-chat")[0].scrollHeight;

		$(".message_pic").one('load', function() {
			$("#scroll-chat")[0].scrollTop = $("#scroll-chat")[0].scrollHeight;
		}).each(function() {
			if (this.complete) $(this).load();
		});
	});

	//消息记录
	$scope.getMsgRecord = function() {
		$scope.pageInfo.start = $("#datetimepicker").val();
		$scope.pageInfo.end = $("#datetimepicker1").val();

		ChatService.getMessageRecord($scope);

	};

	//发送消息
	$scope.postMessage = function() {

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


	//传送文件
	var uploader = $scope.uploader = new FileUploader({
		//headers: {'Content-Type': 'multipart/form-data'},
		
		url: 'http://10.88.20.104:8084/acp-web-expert/upload/uploadFile'

	});


	//文件选择后执行
	uploader.onAfterAddingFile = function(fileItem) {
		if ($("#uploadinfo").hasClass("hide")) {
			showupload();
		}

		var index1 = fileItem.file.name.lastIndexOf(".");
		var index2 = fileItem.file.name.length;
		var suffix = fileItem.file.name.substring(index1, index2); //后缀名\

		if (suffix == '.exe') { //排除可执行文件

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
				$scope.newMessage.content = "<img src=\"http://10.88.20.104:8084/acp-web-expert/upload/getFile/" + response.data.fileName + "\" \ class=\"message_pic\"  />";
			} else {
				$scope.newMessage.content = "<a href=\"http://10.88.20.104:8084/acp-web-expert/upload/getFile/" + response.data.fileName + "\" target=\"_blank\">" + fileItem.file.name + "</a>";
			}


			ChatService.postMessage($scope);
		}
		//console.info('onSuccessItem', fileItem, response, status, headers);
	};



	uploader.onErrorItem = function(fileItem, response, status, headers) {
		//	console.info('onErrorItem', fileItem, response, status, headers);
	};
	// uploader.onCancelItem = function(fileItem, response, status, headers) {
	//     console.info('onCancelItem', fileItem, response, status, headers);
	// };
	uploader.onCompleteItem = function(fileItem, response, status, headers) {
		//	console.info('onCompleteItem', fileItem, response, status, headers);
	};
	uploader.onCompleteAll = function() {
		//	console.info('onCompleteAll');
	};

	//console.info('uploader', uploader);



});