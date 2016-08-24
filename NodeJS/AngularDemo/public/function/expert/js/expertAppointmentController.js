/**
 *专家在线-预约控制器
 */

String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, "");
};

app.controller('expertAppointmentController', ['$scope', 'ExpertService', '$rootScope', '$http', '$state', '$modal', '$log', '$stateParams','FileUploader','$cookieStore','$modal',
	function($scope, ExpertService, $rootScope, $http, $state, $modal, $log, $stateParams, FileUploader, $cookieStore, $modal) {
		var ea = $scope;
		//文件上传后返回的uuid
		var uuid = [];
		//文件是否已全部上传
		var isUploadAll = false;
		ea.formData = {};
		ea.warnningInfo = {};
		ea.nextStep = nextStep;
		ea.preStep = preStep;
		ea.next = next;
		ea.currentLength = 0;
		ea.getLength = getLength;
		ea.checkname = checkname;
		ea.checktel = checktel;
		ea.getExpertInfo = getExpertInfo;
		ea.fileTypeErrorInfo = null;
		ea.accpetFileType = ['audio/mpeg','image/gif','image/png','image/jpeg','text/plain','application/msword','application/vnd.ms-powerpoint',
			'application/vnd.ms-excel','application/x-gzip','application/zip','application/x-zip-compressed','image/bmp','audio/x-wav','video/x-msvideo',
			'application/vnd.openxmlformats-officedocument.wordprocessingml.document','application/x-rar-compressed',
			'application/vnd.openxmlformats-officedocument.presentationml.presentation','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
			'audio/mp4','video/mp4'];
		ea.typeStr = ea.accpetFileType.join(',')	
		//查询专家信息
		ea.getExpertInfo();
		//删除单个文件
		ea.delFile = delFile;
		//删除全部文件
		ea.delAll = delAll;
		//预约
		ea.appoint = appoint;
		ea.gotoProfile = gotoProfile;
		function gotoProfile(id, name) {
			var navItem = {
				href: 'app.viewExpertIntroduction',
				text: "预约专家"				
			}
			$scope.addNavItem(navItem);
			$state.go(navItem.href,{'idValue':id});
		};
		var uploader = ea.uploader = new FileUploader({
      // url: 'http://10.88.20.67:8093/expert/upload/uploadFile'
      url: 'http://10.88.20.104:8084/acp-web-expert/upload/uploadFile'
    });

		uploader.filters.push({
      name: 'customFilter',
      fn: function(item /*{File|FileLikeObject}*/, options) {
        return this.queue.length < 10;
      }
    });
		uploader.onSuccessItem = function(fileItem, response, status, headers) {
      
    };
    uploader.onAfterAddingFile = function(fileItem) {
      if(ea.typeStr.indexOf(fileItem.file.type) === -1 || fileItem.file.type === "") {
      	ea.fileTypeErrorInfo  += fileItem.file.name + ' ';
      	fileItem.remove();
      }
      setTimeout(function(){ea.fileTypeErrorInfo = '';},2000);
    };
    uploader.onErrorItem = function(fileItem, response, status, headers) {
      console.info('onErrorItem', fileItem, response, status, headers);
    };
		uploader.onCompleteItem = function(fileItem, response, status, headers) {
      if(response.flag === 1) {
      	uuid.push(response.data.fileName);
      	fileItem.uuid = response.data.fileName;
      }
    };
    uploader.onCompleteAll = function() {
      isUploadAll = true;
      if(ea.continueSubmit) {
      	submitFormData(callback);
      }
    };
		
		/**
		 * 提交订单页的下一步
		 * @return none
		 */
		function nextStep() {

			if(uploader.queue.length === 0) {
				submitFormData(callback);
				//直接上传表单数据
			} else if(uploader.queue.length > 0 && !isUploadAll){
				//文件没有全部上传,此时上传文件
				ea.continueSubmit = true;
				uploader.uploadAll();
				// setTimeout(callback,1000);
			} else {
				submitFormData(callback);
			}
			// 
		};
		function callback() {
				
				$('.bwizard-steps li').eq(2).addClass('active');
				$('.bwizard-steps li').eq(2).find("div").css({"background":"url('function/expert/img/flow.png') no-repeat scroll -184px 0px"});
				$('#step2').attr('class','hide').attr('aria-hidden',true);
				$('#step3').attr('class','bwizard-activated').attr('aria-hidden',false);
			};
		/**
		 * 提交表单数据
		 * @return {[type]} [description]
		 */
		function submitFormData(cb) {
			if(!(ea.formData.contactname) || ea.formData.contactname.trim().length === 0) {
				ea.warnningInfo.name = "*姓名不能为空"
				return;
			} else {
				ea.warnningInfo.name = ""
			}

			var reg = /^(0\d{2,3}\-)|(1[3|4|5|8]\d)\d{8}$/;
			if(!(reg.test(ea.formData.phoneno))) {
				ea.warnningInfo.tel = "*号码错误";
				return;
			}else {
				ea.warnningInfo.tel = "";
			}
			if(ea.currentLength === 0 || ea.currentLength > 200) {
				return;
			}
			ea.formData.createuserid = $cookieStore.get("id");
			ea.formData.attachments = uuid.join(',');
			ea.formData.euserid = ea.expertInfo.userid;
			ea.formData.ename = ea.expertInfo.username;
			var promise = ExpertService.submitOrder(ea.formData);
			promise.then(function(data) {
				if(data.flag === 1) {
					if(cb && typeof(cb) == 'function') {
						setTimeout(cb,500)
					}
				}
			});
		};


		/**
		 * 获取专家信息
		 * @return none
		 */
		function getExpertInfo() {
			var promise = ExpertService.getExpertInfoById($stateParams.userid);
			promise.then(function(data) {
				if(data.flag === 1) {
					ea.expertInfo = data.data;
					console.log(ea.expertInfo);
				}
			},function(data) {

			});
		};
		/**
		 * 删除文件
		 * @param  {[type]} item [description]
		 * @return {[type]}      [description]
		 */
		function delFile(item) {
			var confirm = $modal.open({
				templateUrl: 'function/expert/confirmDialog.html',
				controller: confirmDialogController,
				backdrop: 'static',
				keyboard: true,
				size:'sm',
				resolve: {
						opts: function(){return {msg:'确认删除该文件吗?'}}
					}
			});
			confirm.opened.then(function(result){
			});
			confirm.result.then(function(result){
				if(result) {
					if(!(item.isUploaded)) {
						item.remove();
					} else {
						var promise = ExpertService.delFiles(item.uuid);
						promise.then(function(data) {
							if(data.flag === 1) {
								console.log(item);
								for(var i in uuid) {
									if(uuid[i] == item.uuid) {
										uuid.splice(i,1);
										item.remove();
										break;
									}
								}
							}
						});
					}
				}
			},function(reason){
				
			});
			
		};
		/**
		 * 删除所有文件
		 * @return {[type]} [description]
		 */
		function delAll() {
			var confirm = $modal.open({
				templateUrl: 'function/expert/confirmDialog.html',
				controller: confirmDialogController,
				backdrop: 'static',
				keyboard: true,
				size:'sm',
				resolve: {
						opts: function(){return {msg:'删除全部文件?'}}
					}
			});
			confirm.result.then(function(result) {
				if(result) {
					if(uuid.length == 0) {
						uploader.clearQueue();
					}else {
						var promise = ExpertService.delFiles(uuid.join(','));
						promise.then(function(data) {
							if(data.flag === 1){
								uploader.clearQueue();
								uuid = [];
							}
						});
					}
				}
			});
			
		};

		function appoint() {
			ea.formData = {};
			$('.bwizard-steps li').eq(1).addClass('active');
			$('.bwizard-steps li').eq(1).find("div").css({"background":"url('function/expert/img/flow.png') no-repeat scroll -46px 0"});
			$('#step1').attr('class','hide').attr('aria-hidden',true);
			$('#step2').attr('class','bwizard-activated').attr('aria-hidden',false);
		}
		function preStep() {
			$('.bwizard-steps li').eq(1).removeClass('active');
			$('.bwizard-steps li').eq(1).find("div").css({"background":"url('function/expert/img/flow.png') no-repeat scroll -46px -52px"});
			$('#step2').attr('class','hide').attr('aria-hidden',true);
			$('#step1').attr('class','bwizard-activated').attr('aria-hidden',false);
		}

		function next() {
			$('.bwizard-steps li').eq(3).addClass('active');
			$('.bwizard-steps li').eq(3).find("div").css({"background":"url('function/expert/img/flow.png') no-repeat scroll -92px 0"});
			$('#step3').attr('class','hide').attr('aria-hidden',true);
			$('#step4').attr('class','bwizard-activated').attr('aria-hidden',false);
		}

		function checkname() {
			if(!(ea.formData.contactname) || ea.formData.contactname.trim().length === 0) {
				ea.warnningInfo.name = "*姓名不能为空"
				return;
			} else {
				ea.warnningInfo.name = ""
			}
		}

		function checktel() {
			var reg = /^(0\d{2,3}\-)|(1[3|4|5|8]\d)\d{8}$/;
			// console.log(reg.test('0871'));
			if(!(reg.test(ea.formData.phoneno))) {
				ea.warnningInfo.tel = "*号码错误";
				return;
			}else {
				ea.warnningInfo.tel = "";
			}
		}

		function getLength() {
			var timer = setInterval(function(){
				ea.currentLength = ea.formData.questioncontent?ea.formData.questioncontent.length:0;
				if(ea.currentLength > 200) {
					ea.warnningInfo.question = '您的提问超过200个字，请精简后再输入';
					$('#length').css('color','red')
				}else{
					ea.warnningInfo.question = '';
					$('#length').css('color','#000')
				}
			},200);
			$('#questionArea').bind("blur",function() {
				clearInterval(timer);
			});
		}

		var confirmDialogController = function($scope, $modalInstance, opts){
			$scope.opts = opts;
			$scope.opts.ensure = function() {
				// $modalInstance.dismiss('cancel');
				// return true;
				$modalInstance.close(true);
			};
			$scope.opts.cancel = function() {
				// $modalInstance.dismiss('cancel');
				$modalInstance.close(false);
				// return false;
			};
		};

//ADD FUNCTION HERE

	}

	]);