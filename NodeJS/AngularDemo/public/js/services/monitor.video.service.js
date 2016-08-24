/**
 * 监控中心服务
 */
app.factory('videoService', ['$http', '$q','uiLoad', function($http, $q,uiLoad) {
	var g_currDeviceID, g_currChannelID, g_currChannelIP, g_currChannelPort, g_currRTSPPort, g_currChannelUser, g_currChannelPassword, g_currIsPTZ, g_currBitStream;
	return {
		setPTZControl: function() {
			1 <= g_currIsPTZ ? $(".extra").show() : $(".extra").hide()
		},
		initPlugin: function(a, b, c) {
			if (-1 == WebVideoCtrl.I_CheckPluginInstall()) return "Win32" == navigator.platform || "Windows" == navigator.platform ? $("#divPlugin").html("<div class='pluginLink'><label name='laPlugin' onclick='window.open(\"/UpFiles/Controls/WebComponents.exe\",\"_self\")' class='pluginLinkSel' >\u8bf7\u70b9\u51fb\u6b64\u5904\u4e0b\u8f7d\u63d2\u4ef6\uff0c\u5b89\u88c5\u65f6\u8bf7\u5173\u95ed\u6d4f\u89c8\u5668<label></div>") : $("#divPlugin").html("<div class='pluginLink'><label name='laPlugin' onclick='' class='pluginLink' onMouseOver='' onMouseOut=''>\u8bf7\u70b9\u51fb\u6b64\u5904\u4e0b\u8f7d\u63d2\u4ef6\uff0c\u5b89\u88c5\u65f6\u8bf7\u5173\u95ed\u6d4f\u89c8\u5668<label></div>"), !1;
			WebVideoCtrl.I_InitPlugin(a, b, {
				iWndowType: 1
			});
			try {
				WebVideoCtrl.I_InsertOBJECTPlugin(c)
			} catch (d) {
				console.log("1. HIKVISIONActiveX\u5d4c\u5165\u5931\u8d25!")
			}
		},
		initParams: function(p) {
			g_currChannelIP = p.g_currChannelIP; //'222.219.220.245';
			g_currChannelPort = p.g_currChannelPort; //2035;
			g_currRTSPPort = p.g_currRTSPPort; //2037;
			g_currChannelID = p.g_currChannelID; //7;
			g_currChannelUser = p.g_currChannelUser; //'admin';
			g_currChannelPassword = p.g_currChannelPassword; //'yhzx168168';
			g_currIsPTZ = p.g_currIsPTZ; //1;
			g_currBitStream = p.g_currBitStream; //1
		},
		login: function() {
			var a;
			WebVideoCtrl.I_Login(g_currChannelIP, 1, g_currChannelPort, g_currChannelUser, g_currChannelPassword, {
				async: !1,
				success: function() {
					a = "IP:" + g_currChannelIP + " \u767b\u5f55\u6210\u529f"
				},
				error: function() {
					a = "IP:" + g_currChannelIP + " \u767b\u5f55\u5931\u8d25";
					console.log("3." + a)
				}
			})
		},
		logout: function() {
			WebVideoCtrl.I_Logout(g_currChannelIP)
		},
		startRealPlay: function() {
			var a;
			"" != g_currChannelIP && (this.stopRealPlay(), 0 != WebVideoCtrl.I_StartRealPlay(g_currChannelIP, {
				iStreamType: g_currBitStream,
				iChannelID: g_currChannelID,
				bZeroChannel: !1,
				iPort: g_currRTSPPort
			}) && (a = "\u8bbe\u5907ID:" + g_currDeviceID + ", IP\u7aef\u53e3:" + g_currChannelPort + ", RTSP\u7aef\u53e3:" + g_currRTSPPort + ", \u901a\u9053\u53f7:" + g_currChannelID + " \u5f00\u59cb\u9884\u89c8\u5931\u8d25!", console.log("4. " + a)))
		},
		stopRealPlay: function() {
			var a;
			null != WebVideoCtrl.I_GetWindowStatus(0) && 0 != WebVideoCtrl.I_Stop() && (a = "\u8bbe\u5907ID:" + g_currDeviceID + " \u505c\u6b62\u9884\u89c8\u5931\u8d25!", console.log("4." + a))
		},
		SetPTZAuto: function() {
			this.SetPTZRightStart()
		},
		SetPTZStop: function() {
			this.SetPTZControl(10)
		},
		SetPTZUpStart: function() {
			this.SetPTZControl(1)
		},
		SetPTZDownStart: function() {
			this.SetPTZControl(2)
		},
		SetPTZLeftStart: function() {
			this.SetPTZControl(3)
		},
		SetPTZRightStart: function() {
			this.SetPTZControl(4)
		},
		SetPTZLeftUpStart: function() {
			this.SetPTZControl(5)
		},
		SetPTZRightUpStart: function() {
			this.SetPTZControl(7)
		},
		SetPTZLeftDownStart: function() {
			this.SetPTZControl(6)
		},
		SetPTZRightDownStart: function() {
			this.SetPTZControl(8)
		},
		SetPTZControl: function(a) {
			var b = !1;
			9 == a && b ? m_iPtzSpeed = 6 : b = !1;
			WebVideoCtrl.I_PTZControl(a, {
				iPTZSpeed: 6,
				success: function(c) {
					9 == a && (b = !b)
				},
				error: function() {}
			})
		},
		SetZoomControl: function(a) {
			WebVideoCtrl.I_ZOOMControl(a, {
				iPTZSpeed: 6,
				success: function(a) {
					console.log("xxxx")
				},
				error: function() {
					console.log("ssss")
				}
			})
		},
		MonitorEventBind: function() {
			var pop = this;
			$("#t-l").bind({
				mousedown: function(a) {
					pop.SetPTZLeftUpStart()
				}
			});
			$("#t-l").bind({
				mouseup: function(a) {
					pop.SetPTZStop()
				}
			});
			$("#t-m").bind({
				mousedown: function(a) {
					pop.SetPTZUpStart()
				}
			});
			$("#t-m").bind({
				mouseup: function(a) {
					pop.SetPTZStop()
				}
			});
			$("#t-r").bind({
				mousedown: function(a) {
					pop.SetPTZRightUpStart()
				}
			});
			$("#t-r").bind({
				mouseup: function(a) {
					pop.SetPTZStop()
				}
			});
			$("#m-l").bind({
				mousedown: function(a) {
					pop.SetPTZLeftStart()
				}
			});
			$("#m-l").bind({
				mouseup: function(a) {
					pop.SetPTZStop()
				}
			});
			$("#m-m").bind({
				click: function(a) {
					pop.SetPTZAuto()
				}
			});
			$("#m-r").bind({
				mousedown: function(a) {
					pop.SetPTZRightStart()
				}
			});
			$("#m-r").bind({
				mouseup: function(a) {
					pop.SetPTZStop()
				}
			});
			$("#b-l").bind({
				mousedown: function(a) {
					pop.SetPTZLeftDownStart()
				}
			});
			$("#b-l").bind({
				mouseup: function(a) {
					pop.SetPTZStop()
				}
			});
			$("#b-m").bind({
				mousedown: function(a) {
					pop.SetPTZDownStart()
				}
			});
			$("#b-m").bind({
				mouseup: function(a) {
					pop.SetPTZStop()
				}
			});
			$("#b-r").bind({
				mousedown: function(a) {
					pop.SetPTZRightDownStart()
				}
			});
			$("#b-r").bind({
				mouseup: function(a) {
					pop.SetPTZStop()
				}
			});
			$("p[class^=zoom] a.fr").bind({
				mousedown: function(a) {
					console.log(123456);
					console.log(a);
					pop.SetZoomControl(1);
				}
			});
			$("p[class^=zoom] a.fr").bind({
				mouseup: function(a) {
					pop.SetZoomControl(3);
				}
			});
			$("p[class^=zoom] a.fl").bind({
				mousedown: function(a) {
					pop.SetZoomControl(2);
				}
			});
			$("p[class^=zoom] a.fl").bind({
				mouseup: function(a) {
					pop.SetZoomControl(3);
				}
			})
		},
		showVideo: function(videoData) {
			// var data = {
			// 	"g_currChannelIP": '60.160.227.28',
			// 	"g_currChannelPort": 8090,
			// 	"g_currRTSPPort": 554,
			// 	"g_currChannelID": 1,
			// 	"g_currChannelUser": 'admin',
			// 	"g_currChannelPassword": 'yhzx@888',
			// 	"g_currIsPTZ": 1,
			// 	"g_currBitStream": 1
			// };
			var data = {
				"g_currChannelIP": videoData.serviceIP,
				"g_currChannelPort": videoData.servicePort,
				"g_currRTSPPort": videoData.RTSPPort,
				"g_currChannelID": videoData.channelID,
				"g_currChannelUser": videoData.userName,
				"g_currChannelPassword": videoData.password,
				"g_currIsPTZ": 1,
				"g_currBitStream": 1
			};
			this.initPlugin(400, 225, "divPlugin");
			this.initParams(data);
			this.setPTZControl();
			this.login();
			this.startRealPlay();
			this.MonitorEventBind();
			$("#videofoWindow").unload(function() {
				this.stopRealPlay()
			});
		}

	};
}]);

