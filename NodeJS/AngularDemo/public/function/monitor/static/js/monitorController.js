app.controller('monitorController',function($scope, $modal, $http, $log, $state, $stateParams, MonitorService) {
	$scope.orgId = $stateParams.orgId || 10000;  //先写死后期从登陆信息里取
	$scope.dataType = $stateParams.dataType || "curry";
	$scope.perPageOptions = [2, 4, 6, 8, 10, 12];
	$scope.pageInfo = {
		currentPage: 1,
		pageSize: 6,
		totalRecord: 0
	};

	/**
	 * 加载卡片列表数据
	 */
	$scope.reloadData = function() {
		var paramData = {
	    		orgId: $scope.orgId,
	    		currentPage: $scope.pageInfo.currentPage,
	    		pageSize: $scope.pageInfo.pageSize,
	    		searchText: $scope.searchField
	    }
		
		var pormise = MonitorService.loadMonitorCardLst($scope.dataType, paramData);
		pormise.then(function(data) {
			$scope.pageInfo = data.pageInfo;
			$scope.cardList = data.cardLst;
			setTimeout("$('.warn-info-lst').slide({mainCell:'ul.warn-lst',autoPlay:true,effect:'topMarquee',vis:5,interTime:80});",100);
  		},function(data) {
  		});
	};
    
	$scope.cardTitleClick = function($event) {
		var target = $event.target;
		var orgParams = {
			orgId: $(target).closest('.acp-card-top').data("id"),
			orgType: $(target).closest('.acp-card-top').data("type"),
			orgName:  $(target).closest('.acp-card-top').data("name") || '<<空>>',
			subNum:  $(target).closest('.acp-card-top').data("subNum") || 0
		}

		if(orgParams.orgId && orgParams.orgType != null) {
			if($(target).hasClass("opt-info")) {
				$scope.showInfoDialog(orgParams);
			}else {
				$scope.dataType = "sub";
				$scope.orgId = orgParams.orgId;
				$scope.pageInfo.currentPage = 1;
				$scope.searchField = "";
				if(orgParams.orgType == 0 || orgParams.orgType == 1) {
					if(orgParams.subNum > 0){
						var navItem = {
							href: 'app.monitor',
							text: orgParams.orgName,
							orgId: orgParams.orgId,
							dataType: $scope.dataType,	
						}
						$scope.addNavItem(navItem);
						$state.go(navItem.href, navItem);
					}
				}else {
					var navItem = {
						href: 'app.mapView',
						text: orgParams.orgName,
						data: orgParams.orgId
					};
					$scope.addNavItem(navItem);
//					window.clearInterval($scope.timer);
					$state.go('app.mapView', {"data": orgParams.orgId});
				}
			}
		}else {
			console.log('参数错误，请求发送失败！');
		}
	};

	$scope.searchFieldKeypress = function($event) {
		var target = $event.target;
		if($event.keyCode === 13) {
			$scope.doSearch();
			$(target).blur();
		}
	};

	$scope.searchFieldKeyup = function($event) {
		var target = $event.target;
		if($event.keyCode !== 13) {
			$scope.searchField = $(target).val().trim();
			if($(target).val().length > 0 && $(target).data("maxlength") && $(target).val().length > $(target).data("maxlength")) {
				$scope.searchField = $(target).val().substr(0, $(target).data("maxlength"))
			}
		}
	}

	$scope.doSearch = function() {
		$scope.pageInfo.currentPage = 1;
		$scope.reloadData();
	};
	
    $scope.jumpToPage = function($event) {
    	var target = $event.target;
    	$scope.pageInfo.currentPage = $(target).val().replace(/[^0-9]/g,'');
        if($scope.pageInfo.currentPage === '' || $scope.pageInfo.currentPage < 1) {
        	$scope.pageInfo.currentPage = 1;
        }else if($scope.pageInfo.currentPage > $scope.numPages){
        	$scope.pageInfo.currentPage = $scope.numPages;
        }
        $scope.reloadData();
    };

	/**
	 * 显示详细信息弹出框
	 */
    $scope.showInfoDialog = function(orgParams) {
    	
        var modalInstance = $modal.open({
            templateUrl : 'function/monitor/infoDialog.html',
            controller : 'infoModalCtrl',
            backdrop: 'static',
            keyboard: false,
            size : 'lg',
            resolve : {
            	orgParams : function() {
            		return orgParams;
            	}
            }
        })
        modalInstance.opened.then(function () {
        	//TODO  Something after dialog opened
		});
		modalInstance.result.then(function (result) {
			//TODO Something after dialog closed
		}, function (reason) {
			//TODO  Something else
		});
    };

    $scope.reloadData();
	
	//初始化导航
	if($scope.getNavSize() === 0) {
		var navItem = {
			href:'app.monitor',
			text:'监控中心',
			orgId: $scope.orgId,
			dataType: $scope.dataType
		}
		$scope.addNavItem(navItem);
	}

	/*$scope.timer = setInterval(function() {
		$scope.$apply($scope.reloadData());
	}, 1000 * 60 * 1);*/
});

app.controller('infoModalCtrl',function($scope, $modalInstance, $http, orgParams, MonitorService) {
	var pormise = MonitorService.loadMonitorCardInfo(orgParams.orgId);
	pormise.then(function(data) {
		$scope.orgInfoData = data;
	},function(data) {
		alert("详细信息获取失败！");
    	$modalInstance.dismiss('cancel');
	});

    function loadJScript() {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "http://api.map.baidu.com/api?v=2.0&ak=VFdyIP8f3soIKoGavYR5Ra4H&callback=init";
        document.body.appendChild(script);
    }
    window.init = function() {
        var map = new BMap.Map("org-lct");
        var point, marker, label, ico;

        if($scope.orgInfoData.lng && $scope.orgInfoData.lat) {
        	point = new BMap.Point($scope.orgInfoData.lng, $scope.orgInfoData.lat);
	        map.centerAndZoom(point, 14);

			icon = new BMap.Icon("http://api.map.baidu.com/img/markers.png", new BMap.Size(23, 25), {  
				offset: new BMap.Size(10, 25),
				imageOffset: new BMap.Size(0, 0 - 10 * 25)
			});  

	        marker = new BMap.Marker(point, {icon:icon});
	        if($scope.orgInfoData.orgName) {
	        	label = new BMap.Label($scope.orgInfoData.orgName, {offset:new BMap.Size(20,-10)});  
	        	marker.setLabel(label) 
	        }
	       	map.addOverlay(marker);
        }else {
        	point = new BMap.Point(102.850378, 24.954638);
        	map.centerAndZoom(point, 13);
        	function myFun(result) {
				var cityName = result.name;
				map.setCenter(cityName);
			}
			var myCity = new BMap.LocalCity();
			myCity.get(myFun);
        }

        map.enableScrollWheelZoom();

		var ctrl_nav = new BMap.NavigationControl({
			anchor : BMAP_ANCHOR_TOP_LEFT,
			type : BMAP_NAVIGATION_CONTROL_LARGE
		});
		map.addControl(ctrl_nav);

        // mark拖拽先禁用
       	/*marker.enableDragging();
       	marker.addEventListener("dragend", function (e) {
       		alert("当前位置：" + e.point.lng + ", " + e.point.lat);
       	});*/
    };

    $scope.cancel = function() {
    	$modalInstance.dismiss('cancel');
    };

    window.onload = loadJScript();  //异步加载地图
});