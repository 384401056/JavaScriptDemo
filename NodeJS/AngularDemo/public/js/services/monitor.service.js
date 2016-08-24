/**
 * 监控中心服务
 */
app.factory('MonitorService', ['$http', '$q','commonUtil','WebHost', function($http, $q, commonUtil,WebHost) {
	var url = WebHost.monitorUrl;
	return {
		/**
		 * 监控中心卡片列表数据加载
		 * @param  orgid 组织机构id
		 * @return promise
		 */
		loadMonitorCardLst: function(type, paramObj) {
			var serviceUrl = type === "sub" ? url + "/monitorAll/findByOrgId" : url + "/monitorAll/findCurrentByOrgId";
			var deferred = $q.defer();
			$http({
				method: 'post',
				url: serviceUrl,
				data: paramObj
			}).success(function(data, header, config, status) {
				deferred.resolve(data);
			}).error(function(data, header, config, status) {
				console.log('后台数据请求失败！');
				deferred.reject(data);
			});
			return deferred.promise;
		},
		/**
		 * 监控中心组织机构或地块详细信息查询
		 * @param  orgid 组织机构id
		 * @return promise
		 */
		loadMonitorCardInfo: function(orgId) {
			var serviceUrl = url + "/org/getOrgDetailByOrgId/gstar/" + orgId;
			var deferred = $q.defer();
			$http({
				method: 'get',
				url: serviceUrl,
				params:{"Access-Token":commonUtil.getToken()},
			}).success(function(data, header, config, status) {
				deferred.resolve(data);
			}).error(function(data, header, config, status) {
				console.log('详细信息获取失败！');
				deferred.reject(data);
			});
			return deferred.promise;
		},
		/**
		 * 列表视图查询设备服务
		 * @param  orgid 组织机构id
		 * @return promise
		 */
		getDeviceList: function(orgid) {
			var deferred = $q.defer();
			$http({
				url: url + "/device/getDevStatusByMultId/gstar/" + orgid,
				method: "GET",
				params:{"Access-Token":commonUtil.getToken()},
			}).success(function(data, status, header, config) {
				deferred.resolve(data);
			}).error(function(data, status, header, config) {
				deferred.reject(data);
			});
			return deferred.promise;
		},
		getGroupDevicesData: function(orgid) {
			var deferred = $q.defer();
			$http({
				url:url +"/devicegroup/getDeviceGroup/gstar/" + orgid,
				method: "GET",
				params:{"Access-Token":commonUtil.getToken()},
			}).success(function(data, status, header, config) {
				deferred.resolve(data);
			}).error(function(data, status, header, config) {
				deferred.reject(data);
			});
			return deferred.promise;
		},
		/**
		 *查询地块信息
		 *@param orgid 地块ID
		 *@return promise
		 **/
		getOrgInfo: function(orgId) {
			var deferred = $q.defer();
			$http({
				method: 'GET',
				url: url + '/getOrg/gstar/' + orgId,
				params:{"Access-Token":commonUtil.getToken()},
			}).success(function(data, status, header, config) {
				deferred.resolve(data);
			}).error(function(data, status, header, config) {
				deferred.reject(data);
			});
			return deferred.promise;
		},
		/**
		 *查询地块所有设备信息
		 *@param orgid 地块ID
		 *@return promise
		 **/
		getOrgDiviceInfoAll: function(orgId) {
			var deferred = $q.defer();
			$http({
				method: 'GET',
				url: url + '/deviceinfoatorg/getdevice/gstar/' + orgId,
				params:{"Access-Token":commonUtil.getToken()},
			}).success(function(data, status, header, config) {
				deferred.resolve(data);
			}).error(function(data, status, header, config) {
				deferred.reject(data);
			});
			return deferred.promise;
		},
		/**
		 *保存设备位置信息
		 *@param [{"id":diviceData.id,"x":diviceData.x,"y":diviceData.y,"isUseCoord":diviceData.isUseCoord},
		 *        {"id":diviceData.id,"x":diviceData.x,"y":diviceData.y,"isUseCoord":diviceData.isUseCoord}]
		 *@return promise
		 **/
		setDiviceInfo: function(diviceInfoArray) {
			var deferred = $q.defer();
			$http({
				method: 'POST',
				url: url + '/device/setposition',
				dataType: 'json',
				data: diviceInfoArray,
			}).success(function(data, status, header, config) {
				deferred.resolve(data);
			}).error(function(data, status, header, config) {
				deferred.reject(data);
			});
			return deferred.promise;
		},
		/**
		 *查询视频设备列表
		 *@param orgid 机构ID
		 *@return promise
		 **/
		getVedioList: function(orgid) {
			var deferred = $q.defer();
			$http({
				method: 'GET',
				url: url + '/video/getVideos?orgid=' + orgid,
				params:{"Access-Token":commonUtil.getToken()},
			}).success(function(data, status, header, config) {
				deferred.resolve(data);
			}).error(function(data, status, header, config) {
				deferred.reject(data);
			});
			return deferred.promise;
		},
		/**
		 *查询传感设备信息
		 *@param diviceId 设备ID
		 *@return promise
		 **/
		getOrgDiviceInfoSingle: function(diviceId) {
			var deferred = $q.defer();
			$http({
				method: 'GET',
				url: url + '/deviceinfoatorg/getdevicelastinfo/gstar/' + diviceId,
				params:{"Access-Token":commonUtil.getToken()},
			}).success(function(data, status, header, config) {
				deferred.resolve(data);
			}).error(function(data, status, header, config) {
				deferred.reject(data);
			});
			return deferred.promise;
		},
		/**
		 *查询控制设备信息
		 *@param diviceId 设备ID
		 *@return promise
		 **/
		getOrgControllerInfoSingle: function(diviceId) {
			var deferred = $q.defer();
			$http({
				method: 'GET',
				url: url + '/deviceinfoatorgcontrollerlastvalue/getdevicelastinfo/gstar/' + diviceId + '/' + 2,
				params:{"Access-Token":commonUtil.getToken()},
			}).success(function(data, status, header, config) {
				deferred.resolve(data);
			}).error(function(data, status, header, config) {
				deferred.reject(data);
			});
			return deferred.promise;
		},
		/**
		 *查询相机设备信息
		 *@param diviceId 设备ID
		 *@return promise
		 **/
		getOrgCameraInfoSingle: function(diviceId) {
			var deferred = $q.defer();
			$http({
				method: 'GET',
				url: url + '/cameraTwoMinPictureAndStatus/controTypeStatus/gstar/' + diviceId + '/' + 4,
				params:{"Access-Token":commonUtil.getToken()},
			}).success(function(data, status, header, config) {
				deferred.resolve(data);
			}).error(function(data, status, header, config) {
				deferred.reject(data);
			});
			return deferred.promise;
		},
		/**
		 * 视频类联动设置-规则数据查询
		 * @param diviceId 设备标识
		 */
		getlinkageData: function(deviceId) {
			var deferred = $q.defer();
			$http.post(url + '/device/videoLink/list', {
				"deviceId": deviceId,
				"Access-Token":commonUtil.getToken()
			}).success(function(data, status, header, config) {
				deferred.resolve(data);
			}).error(function(data, status, header, config) {
				deferred.reject(data);
			});

			return deferred.promise;
		},
		/**
		 * 打开条件-传感器
		 * @param diviceId 设备标识
		 * @returns {*}
		 */
		getOpenLinkDeviceIdData: function(orgId) {
			var deferred = $q.defer();
			$http.post(url + '/device/videoLink/sensor/list', {
				"orgId": orgId,
				"Access-Token":commonUtil.getToken()
			}).success(function(data, status, header, config) {
				deferred.resolve(data);
			}).error(function(data, status, header, config) {
				deferred.reject(data);
			});

			return deferred.promise;
		},
		/**
		 * 关闭条件-传感器
		 * @param diviceId 设备标识
		 * @returns {*}
		 */
		getCloseLinkConditionData: function(orgId) {
			var deferred = $q.defer();
			$http.post(url + '/device/videoLink/sensor/list', {
				"orgId": orgId,
				"Access-Token":commonUtil.getToken()
			}).success(function(data, status, header, config) {
				deferred.resolve(data);
			}).error(function(data, status, header, config) {
				deferred.reject(data);
			});

			return deferred.promise;
		},
		/**
		 * 保存设置
		 * @param linkage
		 * @returns {*}
		 */
		saveLinkage: function(linkage) {
			var deferred = $q.defer();
			$http.post(url + '/device/videoLink/add', {
				"jsonData": JSON.stringify(linkage),
				"Access-Token":commonUtil.getToken()
			}).success(function(data, status, header, config) {
				deferred.resolve(data);
			}).error(function(data, status, header, config) {
				deferred.reject(data);
			});

			return deferred.promise;
		},
		/**
		 * 视频类-联动设置-规则删除
		 * @param ids 规则标识
		 */
		delLinkage: function(ids) {
			var deferred = $q.defer();
			$http.post(url + '/device/videoLink/del', {
				"ids": ids,
				"Access-Token":commonUtil.getToken()
			}).success(function(data, status, header, config) {
				deferred.resolve(data);
			}).error(function(data, status, header, config) {
				deferred.reject(data);
			});

			return deferred.promise;

		},
		/**
		 *查询机构分组信息
		 *@param orgId 机构ID
		 *@return promise
		 **/
		getDiviceGroupInfo: function(orgId) {
			var deferred = $q.defer();
			$http({
				method: 'GET',
				url: url + '/devicegroup/getDeviceGroup/gstar/' + orgId,
				params:{"Access-Token":commonUtil.getToken()},
			}).success(function(data, status, header, config) {
				deferred.resolve(data);
			}).error(function(data, status, header, config) {
				deferred.reject(data);
			});
			return deferred.promise;
		},
		/**
		 * 传感器类型单位，区间范围
		 * @param  deviceId 设备id
		 * @return promise
		 */
		getSensorDeviceUnitInfo: function(deviceId) {
			var deferred = $q.defer();
			$http({
				url: url + "/device/type",
				method: "POST",
				params: {
					"deviceId": deviceId,
					"Access-Token":commonUtil.getToken()
				}
			}).success(function(data, status, header, config) {
				deferred.resolve(data);
			}).error(function(data, status, header, config) {
				deferred.reject(data);
			});
			return deferred.promise;
		},
		/**
		 * 传感器类型规则视图列表
		 * @param  deviceId 设备id
		 * @return promise
		 */
		getSensorDeviceRuleList: function(deviceId) {
			var deferred = $q.defer();
			$http({
				url: url + "/device/deviceRule/list",
				method: "POST",
				params: {
					"deviceId": deviceId,
					"Access-Token":commonUtil.getToken()
				}
			}).success(function(data, status, header, config) {
				deferred.resolve(data);
			}).error(function(data, status, header, config) {
				deferred.reject(data);
			});
			return deferred.promise;
		},
		/**
		 * 传感器类型规则视图列表
		 * @param  diviceJson
		 * @return promise
		 */
		setSensorDeviceRuleInfo: function(diviceJson) {
			var deferred = $q.defer();
			$http({
				url: url + "/device/deviceRule/add",
				method: "POST",
				params: {
					"jsonData": diviceJson,
					"Access-Token":commonUtil.getToken()
				}
			}).success(function(data, status, header, config) {
				deferred.resolve(data);
			}).error(function(data, status, header, config) {
				deferred.reject(data);
			});
			return deferred.promise;
		},
		/**
		 * 删除传感器类型规则
		 * @param  ruleIds 规则ids "{1,12,16}"
		 * @return promise
		 */
		delSensorDeviceRuleInfo: function(objId,type,ids) {
			var deferred = $q.defer();
			$http({
				url: url + "/device/deviceRule/del",
				method: "POST",
				params: {
					"ids": ids,
					"objId":objId,
					"type":type,
					"Access-Token":commonUtil.getToken()
				}
			}).success(function(data, status, header, config) {
				deferred.resolve(data);
			}).error(function(data, status, header, config) {
				deferred.reject(data);
			});
			return deferred.promise;
		},
		/**
		 * 获取控制类型设备规则信息
		 * @param  deviceId 设备Id，组织Id
		 * @return promise
		 */
		getControllerDeviceRuleInfo: function(deviceId, groupId) {
			var deferred = $q.defer();
			$http({
				url: url + "/controTypeDeviceSetting/query/",
				method: "POST",
				params: {
					"jsonData": {
						"deviceId": deviceId,
						"groupId": groupId
					},
					"Access-Token":commonUtil.getToken()
				}
			}).success(function(data, status, header, config) {
				deferred.resolve(data);
			}).error(function(data, status, header, config) {
				deferred.reject(data);
			});
			return deferred.promise;
		},
		/**
		 * 删除控制类型设备规则信息
		 * @param  deviceId 设备Id，type模式“type=1智能;type=0定时”
		 * @return promise
		 */
		delControllerDeviceRuleInfo: function(type, ruleIds) {
			var deferred = $q.defer();
			$http({
				url: url + "/controTypeDeviceSetting/delete/",
				method: "POST",
				params: {
					"jsonData": {
						"ids": ruleIds,
						"type": type
					},
					"Access-Token":commonUtil.getToken()
				}
			}).success(function(data, status, header, config) {
				deferred.resolve(data);
			}).error(function(data, status, header, config) {
				deferred.reject(data);
			});
			return deferred.promise;
		},
		/**
		 * 新增控制类型设备规则信息
		 * @param  deviceInfoJson 设备信息json
		 * @return promise
		 */
		setControllerDeviceRuleInfo: function(deviceInfoJson) {
			var deferred = $q.defer();
			$http({
				url: url + "/controTypeDeviceSetting/add/",
				method: "POST",
				params: {
					"jsonData": deviceInfoJson,
					"Access-Token":commonUtil.getToken()
				}
			}).success(function(data, status, header, config) {
				deferred.resolve(data);
			}).error(function(data, status, header, config) {
				deferred.reject(data);
			});
			return deferred.promise;
		},
		/**
		 * 照相机类型规则视图列表
		 * @param  deviceId 设备id
		 * @return promise
		 */
		getCameraDeviceRuleList: function(deviceId) {
			var deferred = $q.defer();
			$http({
				url: url + "/deviceCamera/deviceRule/list",
				method: "POST",
				params: {
					"deviceId": deviceId,
					"Access-Token":commonUtil.getToken()
				}
			}).success(function(data, status, header, config) {
				deferred.resolve(data);
			}).error(function(data, status, header, config) {
				deferred.reject(data);
			});
			return deferred.promise;
		},
		/**
		 * 设置相机规则视图列表
		 * @param  diviceJson
		 * @return promise
		 */
		setCameraDeviceRuleInfo: function(diviceJson) {
			var deferred = $q.defer();
			$http({
				url: url + "/deviceCamera/deviceRule/add",
				method: "POST",
				params: {
					"jsonData": diviceJson,
					"Access-Token":commonUtil.getToken()
				}
			}).success(function(data, status, header, config) {
				deferred.resolve(data);
			}).error(function(data, status, header, config) {
				deferred.reject(data);
			});
			return deferred.promise;
		},
		/**
		 * 删除照相机型设备规则信息
		 * @param
		 * @return promise
		 */
		delCameraDeviceRuleInfo: function(ruleid,clientid) {
			var deferred = $q.defer();
			$http({
				url: url + "/deviceCamera/deviceRule/del",
				method: "POST",
				params: {
					"ruleid": ruleid,
					"clientid": clientid,
					"Access-Token":commonUtil.getToken()
				}
			}).success(function(data, status, header, config) {
				deferred.resolve(data);
			}).error(function(data, status, header, config) {
				deferred.reject(data);
			});
			return deferred.promise;
		},
		/**
		 *查询视频设备信息（包括账号、密码、IP、通道号等）
		 *@param orgid 机构ID
		 *@return promise
		 **/
		getVedioParams: function(diviceId) {
			var deferred = $q.defer();
			$http({
				method: 'GET',
				url: url+"/videomessage/getvideo/gstar/" + diviceId,
				params:{"Access-Token":commonUtil.getToken()},
			}).success(function(data, status, header, config) {
				deferred.resolve(data);
			}).error(function(data, status, header, config) {
				deferred.reject(data);
			});
			return deferred.promise;
		},
		/**
		 *拍照行为控制（相机）
		 *@param userId diviceId
		 *@return promise
		 **/
		photo: function(userId, clientid) {
			var deferred = $q.defer();
			$http({
				method: 'POST',
				url: url + "/deviceAct/takePhoto/",
				params: {
					"userId": userId,
					"devId": clientid,
					"Access-Token":commonUtil.getToken()
				}
			}).success(function(data, status, header, config) {
				deferred.resolve(data);
			}).error(function(data, status, header, config) {
				deferred.reject(data);
			});
			return deferred.promise;
		},
		/**
		 *开关行为控制（电磁阀）
		 *@param userId diviceId act(指令1:打开0:关闭)
		 *@return promise
		 **/
		controller: function(userId, diviceId, act,time) {
			var deferred = $q.defer();
			$http({
				method: 'POST',
				url: url + "/deviceAct/operateTap/",
				params: {
					"userid": userId,
					"dev": diviceId,
					"act": act,
					"time": time,
					"Access-Token":commonUtil.getToken()
				}
			}).success(function(data, status, header, config) {
				deferred.resolve(data);
			}).error(function(data, status, header, config) {
				deferred.reject(data);
			});
			return deferred.promise;
		},
		/**
		 * 获取球机、机枪设备参数信息
		 * @param deviceIP:设备IP sdkPort 端口 userName 用户名称 password 用户密码
		 * @return promise
		 */
		getPTZDeviceParameterInfo: function(deviceIP, sdkPort, userName, password) {
			var deferred = $q.defer();
			$http({
				url: url+"/parameter/getAlarmInCfg",
				method: "POST",
				params: {
					"m_sDeviceIP": deviceIP,
					"m_SdkPort": sdkPort,
					"userName": userName,
					"password": password,
					"Access-Token":commonUtil.getToken()
				}
			}).success(function(data, status, header, config) {
				deferred.resolve(data);
			}).error(function(data, status, header, config) {
				deferred.reject(data);
			});
			return deferred.promise;
		},
		/**
		 * 设置球机、机枪设备参数
		 * @param  deviceIP:设备IP sdkPort 端口 userName 用户名称 password 用户密码 jsonData 参数封装成json对象
		 * @return promise
		 */
		setPTZDeviceParameterInfo: function(deviceIP, sdkPort, userName, password, jsonData) {
			var deferred = $q.defer();
			$http({
				url: url+"/parameter/setAlarmInCfg",
				method: "POST",
				params: {
					"m_sDeviceIP": deviceIP,
					"m_SdkPort": sdkPort,
					"userName": userName,
					"password": password,
					"parameter": jsonData,
					"Access-Token":commonUtil.getToken()
				}
			}).success(function(data, status, header, config) {
				deferred.resolve(data);
			}).error(function(data, status, header, config) {
				deferred.reject(data);
			});
			return deferred.promise;
		},
		/**
		 * 获取球机、机枪设备界面参数信息
		 * @param deviceIP:设备IP sdkPort 端口 userName 用户名称 password 用户密码
		 * @return promise
		 */
		getPTZPageDeviceParameterInfo: function(number, deviceIP, sdkPort, userName, password) {
			var deferred = $q.defer();
			$http({
				url: url+"/parameter/getChannelConfig",
				method: "POST",
				params: {
					"number": number,
					"m_sDeviceIP": deviceIP,
					"m_SdkPort": sdkPort,
					"userName": userName,
					"password": password,
					"Access-Token":commonUtil.getToken()
				}
			}).success(function(data, status, header, config) {
				deferred.resolve(data);
			}).error(function(data, status, header, config) {
				deferred.reject(data);
			});
			return deferred.promise;
		},
		/**
		 * 设置球机、机枪设备参数
		 * @param  deviceIP:设备IP sdkPort 端口 userName 用户名称 password 用户密码 jsonData 参数封装成json对象
		 * @return promise
		 */
		setPTZPageDeviceParameterInfo:function(number, deviceIP, sdkPort, userName, password, jsonData) {
			var deferred = $q.defer();
			$http({
				url: url+"/parameter/setChannelCfg",
				method: "POST",
				params: {
					"number": number,
					"m_sDeviceIP": deviceIP,
					"m_SdkPort": sdkPort,
					"userName": userName,
					"password": password,
					"parameter": jsonData,
					"Access-Token":commonUtil.getToken()
				}
			}).success(function(data, status, header, config) {
				deferred.resolve(data);
			}).error(function(data, status, header, config) {
				deferred.reject(data);
			});
			return deferred.promise;
		},

		/**orgId 组织id
		 * returns {*}
		 */
		selectUserOrgsByUserID:function (orgId){
	 	var deferred = $q.defer();
			$http({
				method: 'GET',
				url:url+ '/device/deviceRule/orgUserList',
				params: {
					"orgId": orgId,
					"Access-Token":commonUtil.getToken()
				}
			}).success(function (data) {
				deferred.resolve(data);
			}).error(function (data) {
				deferred.reject(data);
			});
			return deferred.promise;
		},
		/**
		 *
		 * @param 添加设备分组设备分组  name：  分组名称 ，orgid: 组织Id ,dids 设备id “123，124”,categoryid 设备类型id
		 * @returns {*}
		 */
		setDeviceGroupInfo:function (name,orgid,dids,deviceTypeId){
			var deferred = $q.defer();
			$http({
				method: 'GET',
				url:url + '/device/group/save',
				params: {
					"name": name,
					"orgid": orgid,
					"dids": dids,
					"categoryid": deviceTypeId,
					"Access-Token":commonUtil.getToken()
				},
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).success(function (data) {
				deferred.resolve(data);
			}).error(function (data) {
				deferred.reject(data);
			});
			return deferred.promise;
		},
		/**
		 *
		 * @param 获取所有设备分组信息 orgid
		 * @returns {*}
		 */
		getDeviceGroupList:function (orgid){
			var deferred = $q.defer();
			$http({
				method: 'GET',
				url:url + '/device/group/getDevices',
				params: {
					"orgid": orgid,
					"Access-Token":commonUtil.getToken()
				}
			}).success(function (data) {
				deferred.resolve(data);
			}).error(function (data) {
				deferred.reject(data);
			});
			return deferred.promise;
		},
		/**
		 *
		 * @param 获取单个设备分组信息 groupId
		 * @returns {*}
		 */
		getOneDeviceGroupList:function (groupId){
			var deferred = $q.defer();
			$http({
				method: 'GET',
				url:url + '/device/group/getGroupInfo',
				params: {
					"groupid": groupId,
					"Access-Token":commonUtil.getToken()
				}
			}).success(function (data) {
				deferred.resolve(data);
			}).error(function (data) {
				deferred.reject(data);
			});
			return deferred.promise;
		},
		/**
		 *
		 * @param 获取单个设备分组信息 groupId
		 * @returns {*}
		 */
		delDeviceGroupInfo:function (groupId){
			var deferred = $q.defer();
			$http({
				method: 'GET',
				url:url + '/device/group/del',
				params: {
					"ids": groupId,
					"Access-Token":commonUtil.getToken()
				}
			}).success(function (data) {
				deferred.resolve(data);
			}).error(function (data) {
				deferred.reject(data);
			});
			return deferred.promise;
		},
		/**
		 *
		 * @param 编辑分组信息 groupId
		 * @returns {*}
		 */
		editDeviceGroupInfo:function (groupId,groupName,deviceIds,categoryId){
			var deferred = $q.defer();
			$http({
				method: 'POST',
				url:url + '/updateGroup/update/',
				params: {
					"groupId": groupId,
					 "deviceIds":deviceIds,
					 "groupName":groupName,
					"categoryId":categoryId,
					"Access-Token":commonUtil.getToken()
				}
			}).success(function (data) {
				deferred.resolve(data);
			}).error(function (data) {
				deferred.reject(data);
			});
			return deferred.promise;
		},
		/**
		 * 单个设备规则时间段校验
		 * @param beginTime
		 * @param endTime
		 * @param deviceId
		 * @param name
		 * @returns {*}
		 */
		valiTimeDevice:function(beginTime,endTime,deviceId,name,id) {
			var deferred = $q.defer();
			$http({
				url: url+"/common/validateTime/device",
				//url:'http://10.88.20.50:8080/acp-web-monitor/common/validateTime/device',
				method: "POST",
				params: {
					"beginTime": beginTime,
					"endTime": endTime,
					"deviceId": deviceId,
					"name": name,
					"id": id,
					"Access-Token":commonUtil.getToken()
				}
			}).success(function(data, status, header, config) {
				deferred.resolve(data);
			}).error(function(data, status, header, config) {
				deferred.reject(data);
			});
			return deferred.promise;
		},
		/**
		 * 组规则时间段校验
		 * @param beginTime
		 * @param endTime
		 * @param groupId
		 * @param name
		 * @returns {*}
		 */
		valiTimeGroup:function(beginTime,endTime,groupId,name,id) {
			var deferred = $q.defer();
			$http({
				url: url+"/common/validateTime/group",
				//url:'http://10.88.20.50:8080/acp-web-monitor/common/validateTime/group',
				method: "POST",
				params: {
					"beginTime": beginTime,
					"endTime": endTime,
					"groupId": groupId,
					"name": name,
					"id": id,
					"Access-Token":commonUtil.getToken()
				}
			}).success(function(data, status, header, config) {
				deferred.resolve(data);
			}).error(function(data, status, header, config) {
				deferred.reject(data);
			});
			return deferred.promise;
		},
		/**
		 * PNG码验证
		 * @param userId
		 * @param PINCode
		 */
		validatePinCode:function(userId,PINCode) {
			var deferred = $q.defer();
			$http({
				url: url + "/validatePinCode/startValidate/",
				method: "POST",
				params: {
					"userId": userId,
					"PINCode": PINCode,
					"Access-Token":commonUtil.getToken()
				}
			}).success(function(data, status, header, config) {
				deferred.resolve(data);
			}).error(function(data, status, header, config) {
				deferred.reject(data);
			});
			return deferred.promise;
		},
	};
}]);