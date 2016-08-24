var PopupVideo, g_currDeviceID, g_currChannelID, g_currChannelIP, g_currChannelPort, g_currRTSPPort, g_currChannelUser, g_currChannelPassword, g_currIsPTZ, g_currBitStream;
PopupVideo || (PopupVideo = {});(function(){
    PopupVideo = {
        setPTZControl: function() {
            1 <= g_currIsPTZ ? $(".extra").show() : $(".extra").hide()
        },
        initPlugin: function(a, b, c) {
            if ( - 1 == WebVideoCtrl.I_CheckPluginInstall()) return "Win32" == navigator.platform || "Windows" == navigator.platform ? $("#divPlugin").html("<div class='pluginLink'><label name='laPlugin' onclick='window.open(\"/Upfiles/Controls/WebComponents.exe\",\"_self\")' class='pluginLinkSel' >\u8bf7\u70b9\u51fb\u6b64\u5904\u4e0b\u8f7d\u63d2\u4ef6\uff0c\u5b89\u88c5\u65f6\u8bf7\u5173\u95ed\u6d4f\u89c8\u5668<label></div>") : $("#divPlugin").html("<div class='pluginLink'><label name='laPlugin' onclick='' class='pluginLink' onMouseOver='' onMouseOut=''>\u8bf7\u70b9\u51fb\u6b64\u5904\u4e0b\u8f7d\u63d2\u4ef6\uff0c\u5b89\u88c5\u65f6\u8bf7\u5173\u95ed\u6d4f\u89c8\u5668<label></div>"),
            !1;
            WebVideoCtrl.I_InitPlugin(a, b, {
                iWndowType: 1
            });
            try {
                WebVideoCtrl.I_InsertOBJECTPlugin(c)
            } catch(d) {
                console.log("1. HIKVISIONActiveX\u5d4c\u5165\u5931\u8d25!")
            }
        },
        initParams: function(a) {
                    g_currChannelIP = '60.160.227.28';
                    g_currChannelPort = 8090;
                    g_currRTSPPort = 554;
                    g_currChannelID = 1;
                    g_currChannelUser = 'admin';
                    g_currChannelPassword = 'yhzx@888';
                    g_currIsPTZ = 1;
                    g_currBitStream = 1
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
            "" != g_currChannelIP && (PopupVideo.stopRealPlay(), 0 != WebVideoCtrl.I_StartRealPlay(g_currChannelIP, {
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
            PopupVideo.SetPTZRightStart()
        },
        SetPTZStop: function() {
            PopupVideo.SetPTZControl(10)
        },
        SetPTZUpStart: function() {
            PopupVideo.SetPTZControl(1)
        },
        SetPTZDownStart: function() {
            PopupVideo.SetPTZControl(2)
        },
        SetPTZLeftStart: function() {
            PopupVideo.SetPTZControl(3)
        },
        SetPTZRightStart: function() {
            PopupVideo.SetPTZControl(4)
        },
        SetPTZLeftUpStart: function() {
            PopupVideo.SetPTZControl(5)
        },
        SetPTZRightUpStart: function() {
            PopupVideo.SetPTZControl(7)
        },
        SetPTZLeftDownStart: function() {
            PopupVideo.SetPTZControl(6)
        },
        SetPTZRightDownStart: function() {
            PopupVideo.SetPTZControl(8)
        },
        SetPTZControl: function(a) {
            var b = !1;
            9 == a && b ? m_iPtzSpeed = 6 : b = !1;
            WebVideoCtrl.I_PTZControl(a, {
                iPTZSpeed: 6,
                success: function(c) {
                    9 == a && (b = !b)
                },
                error: function() {
                	}
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
            $("#t-l").bind({
                mousedown: function(a) {
                    PopupVideo.SetPTZLeftUpStart()
                }
            });
            $("#t-l").bind({
                mouseup: function(a) {
                    PopupVideo.SetPTZStop()
                }
            });
            $("#t-m").bind({
                mousedown: function(a) {
                    PopupVideo.SetPTZUpStart()
                }
            });
            $("#t-m").bind({
                mouseup: function(a) {
                    PopupVideo.SetPTZStop()
                }
            });
            $("#t-r").bind({
                mousedown: function(a) {
                    PopupVideo.SetPTZRightUpStart()
                }
            });
            $("#t-r").bind({
                mouseup: function(a) {
                    PopupVideo.SetPTZStop()
                }
            });
            $("#m-l").bind({
                mousedown: function(a) {
                    PopupVideo.SetPTZLeftStart()
                }
            });
            $("#m-l").bind({
                mouseup: function(a) {
                    PopupVideo.SetPTZStop()
                }
            });
            $("#m-m").bind({
                click: function(a) {
                    PopupVideo.SetPTZAuto()
                }
            });
            $("#m-r").bind({
                mousedown: function(a) {
                    PopupVideo.SetPTZRightStart()
                }
            });
            $("#m-r").bind({
                mouseup: function(a) {
                    PopupVideo.SetPTZStop()
                }
            });
            $("#b-l").bind({
                mousedown: function(a) {
                    PopupVideo.SetPTZLeftDownStart()
                }
            });
            $("#b-l").bind({
                mouseup: function(a) {
                    PopupVideo.SetPTZStop()
                }
            });
            $("#b-m").bind({
                mousedown: function(a) {
                    PopupVideo.SetPTZDownStart()
                }
            });
            $("#b-m").bind({
                mouseup: function(a) {
                    PopupVideo.SetPTZStop()
                }
            });
            $("#b-r").bind({
                mousedown: function(a) {
                    PopupVideo.SetPTZRightDownStart()
                }
            });
            $("#b-r").bind({
                mouseup: function(a) {
                    PopupVideo.SetPTZStop()
                }
            });
            $("p[class^=zoom] a.fr").bind({
                mousedown: function(a) {
                    PopupVideo.SetZoomControl(1)
                }
            });
            $("p[class^=zoom] a.fr").bind({
                mouseup: function(a) {
                    PopupVideo.SetZoomControl(3)
                }
            });
            $("p[class^=zoom] a.fl").bind({
                mousedown: function(a) {
                    PopupVideo.SetZoomControl(2)
                }
            });
            $("p[class^=zoom] a.fl").bind({
                mouseup: function(a) {
                    PopupVideo.SetZoomControl(3)
                }
            })
        }
    }
})();
$(function() {
    var a = PopupVideo;
    //b = Base.sessionStorage.getSession("currOrgID"),
    //c = Base.sessionStorage.getSession("currDeviceID");
    a.initPlugin(400, 225, "divPlugin");
    a.initParams();
    a.setPTZControl();
    a.login();
    a.startRealPlay();
    a.MonitorEventBind();
    $(window).unload(function() {
        a.stopRealPlay()
    })
});