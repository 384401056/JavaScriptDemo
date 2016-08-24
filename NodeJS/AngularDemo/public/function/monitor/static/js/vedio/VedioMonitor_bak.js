for (var VedioMonitor, m_iAnalogChannelNum = 0, m_iDigitalChannelNum = 0, m_iZeroChanNum = 0, m_iPlaybackWnd = -1, m_DeviceID = [], m_ChannelIP = [], m_ChannelPort = [], SDK_Port = [], m_ChannelUser = [], m_ChannelPwd = [], m_ChannelID = [], g_currRTSPPort = [], m_bSound = [], m_bChannelPlay = [], m_bChannelRecord = [], m_iWndChannel = [], m_iChannelWindow = [], m_iChannelStream = [], m_bChannelPlayBack = [], m_playbackchannel = -1, i = 0; 64 > i; i++)m_DeviceID[i] = -1, m_ChannelIP[i] = "", m_ChannelPort[i] = -1, m_ChannelUser[i] = "", m_ChannelPwd[i] = "", m_ChannelID[i] = 1, m_bSound[i] =
    0, m_bChannelPlay[i] = 0, m_bChannelRecord[i] = 0, m_iWndChannel[i] = -1, m_iChannelWindow[i] = -1, m_iChannelStream[i] = 0, m_bChannelPlayBack[i] = 0, g_currRTSPPort[i] = 554;
var m_bPTZAuto = !1, m_bAllPlay = 0, m_bAllRecord = !1, m_iCurWnd = 0, m_iCurWndChannel = -1, m_iCurWndNum = 1, m_bIsSupportPage = !1, AlarmHandle = -1, netType, orgID;
VedioMonitor || (VedioMonitor = {});
(function () {
    VedioMonitor = {
        qualification: {OrgID: 2664, DeviceType: 99},
        initial: function () {
            function a() {
                var a = $(window).height() - 70;
                $(".adaptive-layout").css("height", a);
                $(".monitor-screen").css("height", a - 50);
                $(".vedio-iframe").css("height", a)
            }

            a();
            $(window).resize(function () {
                a()
            });
            $(window).load(function () {
                a()
            })
        },
        initSlider: function () {
            function a() {
                var a = $("#slider").slider("value");
                $("#slider").find(".ui-slider-handle").attr("title", "\u4e91\u53f0\u901f\u5ea6:" + a);
                $("#amount").val(a)
            }

            $("#slider").slider({
                min: 1,
                max: 7, range: "min", value: 4, slide: a, change: a
            });
            var b = $("#slider").slider("value");
            $("#slider").find(".ui-slider-handle").attr("title", "\u4e91\u53f0\u901f\u5ea6:" + b);
            $("#amount").val(b)
        },
        initPTZ: function () {
            $(".ic-t-l").bind({
                mousedown: function (a) {
                    VedioMonitor.setPTZLeftUpStart()
                }
            });
            $(".ic-t-l").bind({
                mouseup: function (a) {
                    VedioMonitor.setPTZStop()
                }
            });
            $(".ic-t-m").bind({
                mousedown: function (a) {
                    VedioMonitor.setPTZUpStart()
                }
            });
            $(".ic-t-m").bind({
                mouseup: function (a) {
                    VedioMonitor.setPTZStop()
                }
            });
            $(".ic-t-r").bind({
                mousedown: function (a) {
                    VedioMonitor.setPTZRightUpStart()
                }
            });
            $(".ic-t-r").bind({
                mouseup: function (a) {
                    VedioMonitor.setPTZStop()
                }
            });
            $(".ic-m-l").bind({
                mousedown: function (a) {
                    VedioMonitor.setPTZLeftStart()
                }
            });
            $(".ic-m-l").bind({
                mouseup: function (a) {
                    VedioMonitor.setPTZStop()
                }
            });
            $(".ic-m-m").bind({
                click: function (a) {
                    VedioMonitor.setPTZAuto()
                }
            });
            $(".ic-m-r").bind({
                mousedown: function (a) {
                    VedioMonitor.setPTZRightStart()
                }
            });
            $(".ic-m-r").bind({
                mouseup: function (a) {
                    VedioMonitor.setPTZStop()
                }
            });
            $(".ic-b-l").bind({
                mousedown: function (a) {
                    VedioMonitor.setPTZLeftDownStart()
                }
            });
            $(".ic-b-l").bind({
                mouseup: function (a) {
                    VedioMonitor.setPTZStop()
                }
            });
            $(".ic-b-m").bind({
                mousedown: function (a) {
                    VedioMonitor.setPTZDownStart()
                }
            });
            $(".ic-b-m").bind({
                mouseup: function (a) {
                    VedioMonitor.setPTZStop()
                }
            });
            $(".ic-b-r").bind({
                mousedown: function (a) {
                    VedioMonitor.setPTZRightDownStart()
                }
            });
            $(".ic-b-r").bind({
                mouseup: function (a) {
                    VedioMonitor.setPTZStop()
                }
            });
            $("p[class^=zoom] a.fr").bind({
                mousedown: function (a) {
                    VedioMonitor.setZoomControl(1)
                }
            });
            $("p[class^=zoom] a.fr").bind({
                mouseup: function (a) {
                    VedioMonitor.setZoomControl(3)
                }
            });
            $("p[class^=zoom] a.fl").bind({
                mousedown: function (a) {
                    VedioMonitor.setZoomControl(2)
                }
            });
            $("p[class^=zoom] a.fl").bind({
                mouseup: function (a) {
                    VedioMonitor.setZoomControl(3)
                }
            });
            $("p[class^=focus] a i[class^=ic-add]").bind({
                mousedown: function (a) {
                    VedioMonitor.setFocusControl(1)
                }
            });
            $("p[class^=focus] a i[class^=ic-add]").bind({
                mouseup: function (a) {
                    VedioMonitor.setFocusControl(3)
                }
            });
            $("p[class^=focus] a i[class^=ic-sub]").bind({
                mousedown: function (a) {
                    VedioMonitor.setFocusControl(2)
                }
            });
            $("p[class^=focus] a i[class^=ic-sub]").bind({
                mouseup: function (a) {
                    VedioMonitor.setFocusControl(3)
                }
            });
            $("p[class^=aperture] a i[class^=ic-add]").bind({
                mousedown: function (a) {
                    VedioMonitor.setIrisControl(1)
                }
            });
            $("p[class^=aperture] a i[class^=ic-add]").bind({
                mouseup: function (a) {
                    VedioMonitor.setIrisControl(3)
                }
            });
            $("p[class^=aperture] a i[class^=ic-sub]").bind({
                mousedown: function (a) {
                    VedioMonitor.setIrisControl(2)
                }
            });
            $("p[class^=aperture] a i[class^=ic-sub]").bind({
                mouseup: function (a) {
                    VedioMonitor.setIrisControl(3)
                }
            });
            $(".btn-add").click(function (a) {
                a.preventDefault();
                $("#slider").slider("value", $("#slider").slider("value") + 1)
            });
            $(".btn-plus").click(function (a) {
                a.preventDefault();
                $("#slider").slider("value",
                    $("#slider").slider("value") - 1)
            })
        },
        SetLocalCfg: function () {
            WebVideoCtrl.I_GetLocalCfg();
            var a = [];
            a.push("<LocalConfigInfo>");
            a.push("<CapturePath>C:\\TC_Image</CapturePath>");
            a.push("<PlaybackPicPath>C:\\TC_Image</PlaybackPicPath>");
            a.push("</LocalConfigInfo>");
            WebVideoCtrl.I_SetLocalCfg(a.join(""))
        },
        initialPlugin: function () {
            if (-1 == WebVideoCtrl.I_CheckPluginInstall()) 
                return "Win32" == navigator.platform || "Windows" == navigator.platform ? $("#divPlugin").html("<div class='pluginLink'><label name='laPlugin' onclick='window.open(\"Upfiles/Controls/WebComponents.exe\",\"_self\")' class='pluginLinkSel' >\u8bf7\u70b9\u51fb\u6b64\u5904\u4e0b\u8f7d\u63d2\u4ef6\uff0c\u5b89\u88c5\u65f6\u8bf7\u5173\u95ed\u6d4f\u89c8\u5668<label></div>") : $("#divPlugin").html("<div class='pluginLink'><label name='laPlugin' onclick='' class='pluginLink' onMouseOver='' onMouseOut=''>\u8bf7\u70b9\u51fb\u6b64\u5904\u4e0b\u8f7d\u63d2\u4ef6\uff0c\u5b89\u88c5\u65f6\u8bf7\u5173\u95ed\u6d4f\u89c8\u5668<label></div>"), !1;
            var a = 0, a = Math.ceil(Math.sqrt(m_iAnalogChannelNum + m_iDigitalChannelNum + m_iZeroChanNum));
            m_iCurWndNum = a * a;
            WebVideoCtrl.I_InitPlugin("99.99%", "100%", {
                iWndowType: a, cbSelWnd: function (a) {
                    m_iCurWnd = parseInt($(a).find("SelectWnd").eq(0).text())
                }
            });
            console.log(2);
            WebVideoCtrl.I_InsertOBJECTPlugin("divPlugin");
            VedioMonitor.SetLocalCfg();
            console.log(3);
            $(".ic-grid").parent().find("i").each(function () {
                $(this).removeClass("icon-active");
                parseInt($(this).attr("title")) == a && $(this).addClass("icon-active")
            });
            console.log(4);
            return !0
        },
        bindEvent: function () {
            $(".ic-camera").bind({
                click: function (a) {
                    $(this).toggleClass('icon-active').siblings().removeClass('icon-active');
                    $(this).parents("li[class=list-item]").attr("id");
                    a = $(this).parents("li[class=list-item]").find("span[class^=fr]").attr("id");
                    VedioMonitor.startRealPlay(a, m_iCurWnd)
                }
            });
            $("#list-camera i").bind({
                click:function () {
                   if ($(this).hasClass('icon-active')){
                        $(this).parent().parent().addClass('active');
                   }else {
                       $(this).parent().parent().removeClass('active');
                   }
                }
            });
            $("ul li span .ic-replay").bind({
                click: function (a) {
                    a =
                        parseInt($(this).parents("li[class=list-item]").find("span[class^=fr]").attr("id"));
                    $(this).toggleClass('icon-active').siblings().removeClass('icon-active');
                    VedioMonitor.StartPlayback(a, m_iCurWnd)
                }
            });
            $("#btn-playback").bind({
                click: function (a) {
                    VedioMonitor.btnPlayBack()
                }
            });
            $(".ic-grid").bind({
                click: function (a) {
                    a = parseInt($(this).attr("title"));
                    isNaN(a) || m_iCurWndNum == a * a || (m_iCurWndNum = a * a, WebVideoCtrl.I_ChangeWndNum(a), $(this).parent().find("i").each(function () {
                        $(this).removeClass("icon-active")
                    }), $(this).addClass("icon-active"))
                }
            });
            $(".ic-preview").bind({
                click: function (a) {
                    VedioMonitor.startRealPlayAll()
                }
            });
            $(".ic-snap").bind({
                click: function (a) {
                    VedioMonitor.CapturePic()
                }
            });
            $(".ic-fullscreen").bind({
                click: function (a) {
                    WebVideoCtrl.I_FullScreen(!0)
                }
            });
            $("#txtStartDate").val(VedioMonitor.dateFormat(new Date, "yyyy-MM-dd 00:00:00"));
            $("#txtEndDate").val(VedioMonitor.dateFormat(new Date, "yyyy-MM-dd hh:mm:ss"))
        },
        CapturePic: function () {
            $(".ic-snap").parent().addClass("active");
            var a = WebVideoCtrl.I_GetWindowStatus(m_iCurWnd);
            if (null != a) {
                var b = m_iWndChannel[m_iCurWnd], c = new Date, d = "", e = m_ChannelIP[b], d = 9 >= m_iChannelWindow[b] ?
                e + "_0" + String(m_iChannelWindow[b]) + "_" + c.Format("yyyyMMddhhmmssS") : e + "_" + String(m_iChannelWindow[b]) + "_" + c.Format("yyyyMMddhhmmssS");
                iRet = WebVideoCtrl.I_CapturePic(d);
                var f = "";
                0 == iRet ? (b = WebVideoCtrl.I_GetLocalCfg(), f = 1 == a.iPlayStatus ? $(b).find("CapturePath").eq(0).text() : 2 == a.iPlayStatus ? $(b).find("PlaybackPicPath").eq(0).text() : "", szInfo = "\u6293\u56fe\u6210\u529f\uff01") : szInfo = "\u6293\u56fe\u5931\u8d25\uff01";
                setTimeout(function () {
                    alert(f + "\\" + d + " " + szInfo)
                }, 2E3)
            }
            setTimeout(function () {
                    $(".ic-snap").parent().removeClass("active")
                },
                500)
        },
        setIrisControl: function (a) {
            var b = WebVideoCtrl.I_GetWindowStatus(m_iCurWnd), c = $("#slider").slider("value");
            null != b && WebVideoCtrl.I_IrisControl(a, {
                iPTZSpeed: c, success: function (a) {
                }, error: function () {
                }
            })
        },
        setFocusControl: function (a) {
            var b = WebVideoCtrl.I_GetWindowStatus(m_iCurWnd), c = $("#slider").slider("value");
            null != b && WebVideoCtrl.I_FocusControl(a, {
                iPTZSpeed: c, success: function (a) {
                }, error: function () {
                }
            })
        },
        setZoomControl: function (a) {
            var b = WebVideoCtrl.I_GetWindowStatus(m_iCurWnd), c = $("#slider").slider("value");
            null != b && WebVideoCtrl.I_ZOOMControl(a, {
                iPTZSpeed: c, success: function (a) {
                }, error: function () {
                }
            })
        }, setPTZAuto: function () {
            VedioMonitor.setPTZRightStart()
        }, setPTZStop: function () {
            VedioMonitor.setPTZControl(10)
        }, setPTZUpStart: function () {
            VedioMonitor.setPTZControl(1)
        }, setPTZDownStart: function () {
            VedioMonitor.setPTZControl(2)
        }, setPTZLeftStart: function () {
            VedioMonitor.setPTZControl(3)
        }, setPTZRightStart: function () {
            VedioMonitor.setPTZControl(4)
        }, setPTZLeftUpStart: function () {
            VedioMonitor.setPTZControl(5)
        }, setPTZRightUpStart: function () {
            VedioMonitor.setPTZControl(7)
        },
        setPTZLeftDownStart: function () {
            VedioMonitor.setPTZControl(6)
        }, setPTZRightDownStart: function () {
            VedioMonitor.setPTZControl(8)
        }, setPTZControl: function (a) {
            var b = WebVideoCtrl.I_GetWindowStatus(m_iCurWnd), c = $("#slider").slider("value");
            null != b && (9 == a && m_bPTZAuto ? c = 0 : m_bPTZAuto = !1, WebVideoCtrl.I_PTZControl(a, {
                iPTZSpeed: c,
                success: function (b) {
                    9 == a && (m_bPTZAuto = !m_bPTZAuto)
                },
                error: function () {
                }
            }))
        }, StartPlayback: function (a, b) {
            var c = VedioMonitor;
            if (0 == m_bChannelPlayBack[a]) {
                if (-1 != m_iPlaybackWnd && c.StopPlayBack(m_iPlaybackWnd),
                    -1 == m_iPlaybackWnd) {
                    var d = m_ChannelIP[a], e = $("#txtStartDate").val(), f = $("#txtEndDate").val(), g = m_ChannelID[a], h = g_currRTSPPort[a];
                    "" != d && (null != WebVideoCtrl.I_GetWindowStatus(b) && c.StopRealPlay(m_iWndChannel[b]), c = WebVideoCtrl.I_StartPlayback(d, {
                        iChannelID: g,
                        szStartTime: e,
                        szEndTime: f,
                        iPort: h
                    }), d = "#" + m_DeviceID[a] + " span i[class^=ic-replay]", 0 == c ? (m_bChannelPlayBack[a] = 1, m_iWndChannel[b] = a, m_iPlaybackWnd = b, m_playbackchannel = a, m_bAllPlay++, $(d).addClass("icon-active")) : (alert("\u6ca1\u6709\u5f55\u50cf\uff01\u6216\u8005\u64cd\u4f5c\u592a\u9891\u7e41\uff01"),
                        szInfo = "\u5f00\u59cb\u56de\u653e\u5931\u8d25\uff01", c = WebVideoCtrl.I_GetLastError(), console.log(szInfo + "\u9519\u8bef\u7801\uff1a" + c)))
                }
            } else c.StopPlayBack(m_iPlaybackWnd)
        }, btnPlayBack: function () {
            var a = WebVideoCtrl.I_GetWindowStatus(m_iCurWnd);
            null != a ? 2 == a.iPlayStatus ? (VedioMonitor.StartPlayback(m_playbackchannel, m_iCurWnd), setTimeout(function () {
                VedioMonitor.StartPlayback(m_playbackchannel, m_iCurWnd)
            }, 1E3)) : alert("\u8bf7\u9009\u62e9\u6b63\u5728\u56de\u653e\u7684\u7a97\u683c\uff01") : alert("\u8bf7\u9009\u62e9\u6b63\u5728\u56de\u653e\u7684\u7a97\u683c")
        },
        StopPlayBack: function (a) {
            null != WebVideoCtrl.I_GetWindowStatus(a) && (word = "#" + m_DeviceID[m_iWndChannel[a]] + " span i[class^=ic-replay ]");
            if (0 == WebVideoCtrl.I_Stop(a))m_bAllPlay--, m_bChannelPlayBack[m_iWndChannel[a]] = 0, m_iPlaybackWnd = -1, $(word).removeClass("icon-active"); else {
                var b = WebVideoCtrl.I_GetLastError();
                console.log("\u7a97\u683c\uff1a" + a + "\u505c\u6b62\u5931\u8d25,\u9519\u8bef\u7801" + b)
            }
        }, startRealPlayAll: function () {
            var a = VedioMonitor;
            if (0 != m_bAllPlay)a.stopRealPlayAll(); else for (var b = 0, b = m_iAnalogChannelNum +
            m_iDigitalChannelNum + m_iZeroChanNum <= m_iCurWndNum ? m_iAnalogChannelNum + m_iDigitalChannelNum + m_iZeroChanNum : m_iCurWndNum, c = 0; c < b; c++)a.startRealPlay(c, c)
        }, stopRealPlayAll: function () {
            var a = VedioMonitor;
            for (j = 0; j < m_iAnalogChannelNum + m_iDigitalChannelNum + m_iZeroChanNum; j++)1 == m_bChannelPlay[j] && null != WebVideoCtrl.I_GetWindowStatus(m_iChannelWindow[j]) && a.StopRealPlay(j), -1 != m_iPlaybackWnd && a.StopPlayBack(m_iPlaybackWnd)
        }, startRealPlay: function (a, b) {
            var c = VedioMonitor;
            if (!(a > m_iAnalogChannelNum + m_iDigitalChannelNum +
                m_iZeroChanNum))if (0 == m_bChannelPlay[a]) {
                var d = m_ChannelIP[a], e = m_ChannelID[a], f = g_currRTSPPort[a];
                if ("" != d) {
                    var g = WebVideoCtrl.I_GetWindowStatus(b);
                    null != g && (1 == g.iPlayStatus && c.StopRealPlay(m_iWndChannel[b]), 2 == g.iPlayStatus && c.StopPlayBack(m_iPlaybackWnd));
                    d = WebVideoCtrl.I_StartRealPlay(d, {
                        iWndIndex: b,
                        iStreamType: 2,
                        iChannelID: e,
                        bZeroChannel: !1,
                        iPort: f
                    });
                    c = "#" + m_DeviceID[a] + " span i[class^=ic-camera]";
                    0 == d ? (m_bChannelPlay[a] = 1, m_iWndChannel[b] = a, m_iChannelWindow[a] = b, m_bAllPlay++, $(c).addClass("icon-active"),
                        $(".ic-preview").parent().addClass("active")) : (d = WebVideoCtrl.I_GetLastError(), console.log("\u5f00\u59cb\u9884\u89c8\u5931\u8d25\uff01\u9519\u8bef\u7801\uff1a" + d), m_bChannelPlay[a] = 0, m_iWndChannel[b] = -1, m_iChannelWindow[a] = -1, $(c).removeClass("icon-active"), alert("\u8bf7\u68c0\u67e5\u8bbe\u5907\u662f\u5426\u5df2\u8fde\u63a5"))
                }
            } else c.StopRealPlay(a)
        },
        StopRealPlay: function (a) {
            if (null != WebVideoCtrl.I_GetWindowStatus(m_iChannelWindow[a])) {
                var b = "#" + m_DeviceID[a] + " span i[class^=ic-camera ]";
                0 == WebVideoCtrl.I_Stop(m_iChannelWindow[a]) ?
                    (m_bAllPlay--, m_bChannelPlay[a] = 0, m_iWndChannel[m_iChannelWindow[a]] = -1, m_iChannelWindow[a] = -1, $(b).removeClass("icon-active")) : (a = WebVideoCtrl.I_GetLastError(), console.log("\u505c\u6b62\u5931\u8d25\uff0c\u9519\u8bef\u7801\uff1a" + a))
            }
            $(".ic-preview").parent().removeClass("active");
            for (a = 0; a < m_iAnalogChannelNum + m_iDigitalChannelNum + m_iZeroChanNum; a++)if (1 == m_bChannelPlay[a]) {
                $(".ic-preview").parent().addClass("active");
                break
            }
        },
        dateFormat: function (a, b) {
            var c = {
                "M+": a.getMonth() + 1,
                "d+": a.getDate(),
                "h+": a.getHours(),
                "m+": a.getMinutes(),
                "s+": a.getSeconds(),
                "q+": Math.floor((a.getMonth() + 3) / 3),
                S: a.getMilliseconds()
            };
            /(y+)/.test(b) && (b = b.replace(RegExp.$1, (a.getFullYear() + "").substr(4 - RegExp.$1.length)));
            for (var d in c)RegExp("(" + d + ")").test(b) && (b = b.replace(RegExp.$1, 1 == RegExp.$1.length ? c[d] : ("00" + c[d]).substr(("" + c[d]).length)));
            return b
        },
        conectVideoSev: function () {
            for (i = 0; i < m_ChannelIP.length && (-1 != m_DeviceID[i] || "" != m_ChannelIP[i]); i++) {
                var a = m_DeviceID[i];
                -1 == WebVideoCtrl.I_Login(m_ChannelIP[i], 1, m_ChannelPort[i],
                    m_ChannelUser[i], m_ChannelPwd[i], {
                        DeviceID: a, success: function (a, c) {
                            $("#" + c + " span[class^=name]").addClass("text-active")
                        }, error: function () {
                            console.log(a + "\u767b\u5f55\u5931\u8d25")
                        }
                    }) && console.log(a + "\u767b\u5f55\u5931\u8d25")
            }
        },
        getDynViedoChannels: function () {
            var OrgID=$("#list-camera").data('ordid');
            Service.post({
                url: '10003',
                timeout: 15E3,
                async: !1,
                //params: VedioMonitor.qualification,
                //params: {OrgID: 10003, DeviceType: 3},
                success: function (a) {
                    var b = $("#list-camera");
                    //b.children().remove();
                    m_iDigitalChannelNum = m_iAnalogChannelNum;
                    $.each(a.data,
                        function (a, d) {
                            var e = String.format('<li class="list-item" id="{0}"><span class="fr" id="{1}"><i class="ic-camera " title="\u9884\u89c8"></i><i class="ic-replay " title="\u56de\u653e"></i></span><span class="name " title="{2}">{2}</span></li>', d.channelID, m_iDigitalChannelNum, d.deviceName);
                            $(e).appendTo(b);
                            m_DeviceID[m_iDigitalChannelNum] = d.deviceID;
                            m_ChannelIP[m_iDigitalChannelNum] = d.serviceIP;
                            m_ChannelPort[m_iDigitalChannelNum] = d.servicePort;
                            m_ChannelUser[m_iDigitalChannelNum] = d.userName;
                            m_ChannelPwd[m_iDigitalChannelNum] = d.password;
                            m_ChannelID[m_iDigitalChannelNum] = d.channelID;
                            g_currRTSPPort[m_iDigitalChannelNum] = d.rtspport;
                            m_iDigitalChannelNum++
                        })
                },
                error: function (a) {
                }
            })
        }, finish: function () {
        }
    }
})();


Date.prototype.Format = function (a) {
    var b = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        S: this.getMilliseconds()
    };
    /(y+)/.test(a) && (a = a.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)));
    for (var c in b)RegExp("(" + c + ")").test(a) && (a = a.replace(RegExp.$1, 1 == RegExp.$1.length ? b[c] : ("00" + b[c]).substr(("" + b[c]).length)));
    return a
};



(function () {
    console.log("1314")
    var a = VedioMonitor;
    orgID = $("#list-camera").data('ordid');
    var deviceType ='99';
    a.ControllerPermission = Base.sessionStorage.getSession("ControllerPermission");
    0 == a.ControllerPermission ? $(".video-control").addClass("hide") : ($(".video-control").removeClass("hide"), a.initPTZ());
    a.OrgID = orgID;
    a.qualification.OrgID = orgID;
    a.DeviceType = deviceType;
    a.qualification.DeviceType = deviceType;
    a.getDynViedoChannels(orgID);
    a.initSlider();
    var b = a.initialPlugin();
    a.bindEvent();
    b && a.conectVideoSev();
    $(window).unload(function () {
        a.stopRealPlayAll()
    })
})();
