(function() {

	/**
	 * 取出字符串首位空格
	 * @return {[type]} [description]
	 */
	String.prototype.trim = function() {
		return this.replace(/(^\s*)|(\s*$)/g, "");
	};
	/**
	 * 获取字符串长度,包括中文,一个汉字长度为1,数字和字母长度为0.5
	 * @return {[type]} [description]
	 */
	String.prototype.gblen = function() { 
  var len = 0; 
	  for (var i=0; i<this.length; i++) { 
	    if (this.charCodeAt(i)>127 || this.charCodeAt(i)==94) { 
	       len += 1; 
	     } else { 
	       len += 0.5; 
	     } 
	   } 
	  return Math.ceil(len); 
	};

	function formatDate(v) {
		var y = v.getFullYear();
		var M = v.getMonth();
		var d = v.getDate();
		var h = v.getHours();
		var m = v.getMinutes();
		var s = v.getSeconds();
		return ''+y+'-'+M+'-'+d+' '+h+':'+m+':'+s;
	}

	app.controller("FreeAsk",["$scope","$state",'$modal','ExpertService','FileUploader','$cookieStore',FreeAsk]);
	function FreeAsk($scope, $state, $modal, ExpertService, FileUploader, $cookieStore) {
		var fs = $scope;
		//初始化导航
		if($scope.getNavSize() === 0) {
			var navItem = {
				href:'app.report',
				text:'提问',
			}
			$scope.addNavItem(navItem);
		};

		var uploader = fs.uploader = new FileUploader({
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
      if(fs.typeStr.indexOf(fileItem.file.type) === -1 || fileItem.file.type === "") {
      	fs.fileTypeErrorInfo  += fileItem.file.name + ' ';
      	fileItem.remove();
      }
      setTimeout(function(){fs.fileTypeErrorInfo = '';},2000);
    };
    uploader.onErrorItem = function(fileItem, response, status, headers) {
    };
		uploader.onCompleteItem = function(fileItem, response, status, headers) {
      if(response.flag === 1) {
      	uuid.push(response.data.fileName);
      	fileItem.uuid = response.data.fileName;
      }
    };
    uploader.onCompleteAll = function() {
    	for(let i in uploader.queue) {
    		if(!(uploader.queue[i].isUploaded)){
    			return;
    		}
    	}
      fs.isUploadAll = true;
      if(fs.continueSubmit) {
      	submitFormData(callback);
      }
    		
    };

    fs.accpetFileType = ['image/gif','image/jpeg','image/bmp','image/png'];
    fs.typeStr = fs.accpetFileType.join(',');;
    var uuid = [];
    fs.submitFormData = submitFormData;
    fs.isUploadAll = false;
		fs.formData = {};
		fs.verify = verify;
		fs.shrinkAdditionContent = shrinkAdditionContent;
		fs.addAdditionContent = addAdditionContent;
		fs.askcontentLength = 0;
		fs.isInvitation = false;
		fs.delFile = delFile;
		fs.delAll = delAll;
		fs.ask = ask;
		function ask() {
			if(!fs.isUploadAll && (fs.uploader.queue.length > 0) ) {
				fs.continueSubmit = true;
				uploader.uploadAll();
				return;
			}
			submitFormData(callback);
		};
		
		function submitFormData(callback) {
			if(fs.askcontentLength > 100 || fs.askcontentLength == 0){
				return;
			}
			
			fs.formData.askuserid = $cookieStore.get("id");
			fs.formData.asktime = formatDate(new Date());
			fs.formData.skilledfield = fs.selectedExpertId.join(',') || null;
			fs.formData.attachmentid = uuid.join(',') || null;
			fs.formData.addrname = fs.address?fs.address.title:'';
			fs.formData.longitude = fs.address?fs.address.point.lng:null;
			fs.formData.latitude = fs.address?fs.address.point.lat:null;
			fs.formData.expertuserid = fs.selectedExpertId.join(',');
			// fs.formData.selectedExpertId = fs.selectedExpertId || null;
			fs.formData.classify = 1;
			fs.formData.productid = 1;
			console.log(fs.formData);
			var promise = ExpertService.submitAskContent(fs.formData);
			promise.then(function(data) {
				callback(data);
			});
		};
		function callback(result) {
			if(result.flag == 1) {
				$state.go('app.expert');
			}
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
		fs.clean = function() {
			clearInterval(timer);
		};
		function verify() {
			timer = setInterval(function() {
				$("#askcontent").css("height",document.getElementById('askcontent').scrollHeight+'px');
				$("#inputbox").css("height",document.getElementById('askcontent').scrollHeight+7+'px');
				if(fs.formData.askcontent) {
					fs.askcontentLength = fs.formData.askcontent.trim().gblen();
					if(fs.askcontentLength > 100) {
						$('.count i').css({'color':'red'})
						fs.warnning = '您的提问标题超过100个字，请精简或将更多内容输入到问题补充中'
					} else {
						$('.count i').css({'color':'#000'})
						fs.warnning = '';
					}
				} else {
					fs.askcontentLength = 0;
				}
			},100);
		};
		/**
		 * 收起补充
		 * @return {[type]} [description]
		 */
		function shrinkAdditionContent(event) {
			$('#inputbox').css({"height":document.getElementById('inputbox').offsetHeight-100+'px'});
			$(event.currentTarget).css('display','none');
			$('.combo-button-active').eq(2).css('display','inline-block')
		};
		/**
		 * 补充问题
		 */
		function addAdditionContent(event) {
			console.log(document.getElementById('askcontent').offsetHeight);
			$('#inputbox').css({"height":document.getElementById('inputbox').offsetHeight+100+'px'});
			$(event.currentTarget).css('display','none');
			$('.combo-button-active').eq(1).css('display','inline-block')
		};
		fs.tagClick = tagClick;
		fs.addTags = addTags;
		fs.chooseImage = chooseImage;
		fs.getLocation = getLocation;
		fs.invitation = invitation;
		fs.expertItemClick = expertItemClick;
		fs.tags = [];
		fs.expertSearchResult = {};
		fs.expertList = [];
		fs.selectedExpertId = [];

/**
 * 标签点击事件  选择或取消选择
 * @return {[type]} [description]
 */
		function tagClick(tag, event) {
			tag.choose = !tag.choose;
			var item = $(event.currentTarget);
			if(item.hasClass('tag-item')){
				item.attr('class','tag-item-choose');
			} else {
				item.attr('class','tag-item');
			}
			invitation();
			//更新专家列表
		};
		/**
		 * 显示添加标签弹窗
		 * @return {[type]} [description]
		 */
		function addTags() {
			var tagDialog = $modal.open({
				templateUrl: 'function/expert/addTags.html',
				controller: addTagsController,
				backdrop: 'static',
				keyboard: false,
				size:'sm',
				resolve: {
					tags: function(){
						var temp = [];
						if(!fs.tags || fs.tags.length == 0) {
							return [];
						}
						for(let i in fs.tags) {
							if(!(fs.tags[i].choose)){
								temp.push(i);
							}
							if(i == fs.tags.length-1) {
								if(temp.length == 0){
									return fs.tags;
								}
								for(let j in temp) {
									fs.tags.splice((temp[j]-j),1);//splice后,数组长度会减小,所以,需要temp[j]-j
									if(j == temp.length-1) {
										return fs.tags;
									}
								}
							}
						}
					}
				}
			});
			tagDialog.result.then(function(result) {

				fs.tags = result;
				for(let i in fs.tags) {
					fs.tags[i].choose = true;
				}
				if(fs.isInvitation) {
					fs.invitation();
				}
			},function(){

			});
		};
		var addTagsController = function($scope, $modalInstance, ExpertService, tags) {
			var promise = ExpertService.getCounselTypes('skilledField');
			$scope.selectedSkill = tags;
			promise.then(function(data) {
				if(data.flag === 1) {
					$scope.skillField = data.data;
				}
			},function(data) {});
			$scope.cancel = function() {
				$modalInstance.dismiss();
			};
			$scope.chooseTag = chooseTag;
			$scope.cancelTag = cancelTag;
			$scope.ensure = ensure;
			function ensure(){
				$modalInstance.close($scope.selectedSkill);
			};
			
			function cancelTag(skill, event) {
				var ele = $(event.currentTarget);
				for(let i in $scope.selectedSkill) {
					if($scope.selectedSkill[i].dictcode === skill.dictcode){
						$scope.selectedSkill.splice(i,1);
						break;
					}
				}
				for(let i in $scope.skillField) {
					if($scope.skillField[i].dictcode === skill.dictcode) {
						$('#'+$scope.skillField[i].dictcode).attr('class','tag-item');
						break;
					}
				}
			};
			function chooseTag(skill, event) {
				var ele = $(event.currentTarget);
				if(ele.hasClass('tag-item-choose') || $scope.selectedSkill.length === 3) {
					return;
				}else {
					ele.addClass('tag-item-choose');
					$scope.selectedSkill.push(skill);
				}

			};
		};
		var LocationController = function($scope, $modalInstance) {
			function loadJScript() {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "http://api.map.baidu.com/api?v=2.0&ak=qrY1IKGOwttAXuxnaAxMKQr7&callback=initMap";
        document.body.appendChild(script);
	    }
	    $scope.search = search;
	    $scope.switchAddr = switchAddr;
	    window.selectAddress = selectAddress;
	    $scope.markers = [];
	    function selectAddress() {
	    	$modalInstance.close($scope.address);
	    };
	    function switchAddr(addr, event) {
	    	for(var i in $scope.markers) {
	    		if($scope.markers[i].point.equals(addr.point)) {
	    			$scope.markers[i].dispatchEvent('click',null);
	    			break;
	    		}
	    	}
	    	var li = $(event.currentTarget);
	    	if(!(li.hasClass('choose'))) {
	    		$('li.choose').eq(0).attr('class','');
	    		li.addClass('choose');
	    	}
	    };
	    function search() {
	    	$scope.myValue = $('#text_addr').val();
				setPlace();
	    };
			
			//创建和初始化地图函数：
	    window.initMap = function() {
	    	$scope.infoWindow = new BMap.InfoWindow("",{
	    		title:'地址title',
	    		width:250
	    	});
	      createMap();//创建地图
	      setMapEvent();//设置地图事件
	      addMapControl();//向地图添加控件
	      addMapOverlay();//向地图添加覆盖物
	    };
	    function createMap(){ 
	      map = new BMap.Map("map"); 
	      map.centerAndZoom(new BMap.Point(102.704131,25.048165),12);
	      var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
				{"input" : "text_addr",
					"location" : map
				});
				ac.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
					var str = "";
					var _value = e.fromitem.value;
					var value = "";
					if (e.fromitem.index > -1) {
						value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
					}    
					str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;
					
					value = "";
					if (e.toitem.index > -1) {
						_value = e.toitem.value;
						value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
					}    
					str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
					$("#searchResultPanel").html(str);
				});

				$scope.myValue;
				ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
				var _value = e.item.value;
					$scope.myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
					$("#searchResultPanel").html("onconfirm<br />index = " + e.item.index + "<br />myValue = " + $scope.myValue);
					setPlace();
				});
	    }
	    // tangram-suggestion--TANGRAM__1j-main
	    // tangram-suggestion--TANGRAM__1j-main
	    // tangram-suggestion-main
	    // tangram-suggestion-main
	    function setPlace(){
	    	$scope.markers = [];
				map.clearOverlays();    //清除地图上所有覆盖物
				function myFun(results){
					if (local.getStatus() == BMAP_STATUS_SUCCESS){
						$scope.searchResult = results.wr;
						for(var i in $scope.searchResult) {
							map.addOverlay(addClickHandler(new BMap.Marker($scope.searchResult[i].point)));
						}
					}	

					var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
					map.centerAndZoom(pp, 18);
					    //添加标注
				}
				var local = new BMap.LocalSearch(map, { //智能搜索
				  onSearchComplete: myFun,
				  renderOptions: {
				  	// map: map, 
				  	// panel: "r-result",
				  	// autoViewport: true,
				  	// selectFirstResult: true
				  }
				});
				local.search($scope.myValue);
			}
	    function setMapEvent(){
	      map.enableScrollWheelZoom();
	      map.enableKeyboard();
	      map.enableDragging();
	      map.enableDoubleClickZoom()
	    }
	    function addClickHandler(target){
	    	$scope.markers.push(target);
	      target.addEventListener("click",function(event){
	      	for(var i in $scope.searchResult) {
	      		if($scope.searchResult[i].point.equals(target.point)) {
	      			$scope.infoWindow.setTitle($scope.searchResult[i].title);
	      			$scope.infoWindow.setContent('<div>'+$scope.searchResult[i].address+'</div><div><input id="use" type="button" onclick="selectAddress()" value="使用此位置"></div>');
	      			target.openInfoWindow($scope.infoWindow);
	      			$scope.address = $scope.searchResult[i];
	      			break;
	      		}
	      	}
	        
	      });
	      return target;
	    }
	    function addMapOverlay(){
	    }
	    //向地图添加控件
	    function addMapControl(){
	      var scaleControl = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
	      scaleControl.setUnit(BMAP_UNIT_IMPERIAL);
	      map.addControl(scaleControl);
	      var navControl = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:1});
	      map.addControl(navControl);
	    }
	    var map;
    	// initMap();
			$scope.cancel = function() {
				$modalInstance.dismiss();
			}
			window.onload = loadJScript();  //异步加载地图
		};
		/**
		 * 选择图片对话框
		 * @return {[type]} [description]
		 */
		function chooseImage() {
			$('input[type=file]').click();
		};
		/**
		 * 获取地理位置信息痰喘
		 * @return {[type]} [description]
		 */
		function getLocation() {
			var locationDialog = $modal.open({
				templateUrl: 'function/expert/getLocation.html',
				controller: LocationController,
				backdrop:'static',
				keyboard: false,
				resolve: {
					data: function() {
						return null;
					}
				}
			});
			locationDialog.result.then(function(result){
				fs.address = result;
				fs.addressName = result.title;
			},function(){});
		};

    function isEmptyObject(e) {  
		  var t;  
		  for (t in e)  
	      return !1;  
		  return !0  
    }  

		/**
		 * 邀请专家复选框点击事件
		 * @return {[type]} [description]
		 */
		function invitation() {
			if(!fs.isInvitation) {
				return;
			}
			var tagsId = [];
			if(fs.tags.length == 0){
				// alert('请先选择专家');
				return;
			}
			for(let i in fs.tags) {
				if(fs.tags[i].choose){
					tagsId.push(fs.tags[i].dictcode);
				}
			}
			if(!isEmptyObject(fs.expertSearchResult)){
				fs.expertList = [];
				for(let j in tagsId) {
					if(typeof(fs.expertSearchResult[tagsId[j]]) != 'undefined'){
						fs.expertList = fs.expertList.concat(fs.expertSearchResult[tagsId[j]]);
						console.log(fs.expertList);
					}

				}
				return;
			}else {
				var promise = ExpertService.getExpertByTagsId(tagsId.join(','));
				promise.then(function(data) {
					if(data.flag == 1) {
						fs.expertSearchResult = data.data;
						for(let i in fs.expertSearchResult) {
							fs.expertList = fs.expertList.concat(fs.expertSearchResult[i]);
						}
					}
				},function(data) {
				});
			}
			
		};
		/**
		 * 专家item点击  选择或取消选择
		 * @return {[type]} [description]
		 */
		function expertItemClick(expertid, event) {
			var icon = $(event.currentTarget).find('span').eq(0);
			if(icon.hasClass('icon-choose-fs')) {//取消选择
				icon.attr('class','icon-notchoose-fs');
				$(event.currentTarget).css('border-color','#ccc')
			}else {//选择
				icon.attr('class','icon-choose-fs');
				$(event.currentTarget).css('border-color','#00a65a');
			}
			var hasThisExpert = false;
			var index = null;
			if(fs.selectedExpertId.length == 0) {
				fs.selectedExpertId.push(expertid);
				return;
			}
			for(let i in fs.selectedExpertId) {
				if(fs.selectedExpertId[i] == expertid){
					hasThisExpert = true;
					index = i;
				}
				if(i == fs.selectedExpertId.length-1) {
					if(hasThisExpert) {
						fs.selectedExpertId.splice(index,1);
						return;
					}else {
						fs.selectedExpertId.push(expertid);
					}
				}
			}
		};

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

	}
})();