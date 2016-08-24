(function (w) {
    if (!w.WebVideoCtrl) {
        var K = function () {
            function t() {
                this.id = this.createUUID()
            }

            var F = "100%", G = "100%", x = "", D = "", v = {
                szContainerID: "",
                szColorProperty: "",
                szOcxClassId: "clsid:E7EF736D-B4E6-4A5A-BA94-732D71107808",
                szMimeTypes: "application/hwp-webvideo-plugin",
                iWndowType: 2,
                iPlayMode: 2,
                bDebugMode: !1,
                cbSelWnd: null,
                cbEvent: null
            }, k = null, s = 0, p = [], r = [], L = null, H = null, A = null, f = null, z = this, u = null;
            w.GetSelectWndInfo = function (a) {
                a = f.loadXML(a);
                s = parseInt(g.$XML(a).find("SelectWnd").eq(0).text(), 10);
                a = [];
                a.push("<RealPlayInfo>");
                a.push("<SelectWnd>" + s + "</SelectWnd>");
                a.push("</RealPlayInfo>");
                v.cbSelWnd && v.cbSelWnd(f.loadXML(a.join("")))
            };
            w.ZoomInfoCallback = function (a) {
                var c = z.findWndIndexByIndex(s);
                if (-1 != c) {
                    var b = r[c], c = z.findDeviceIndexByIP(b.szIP);
                    -1 != c && (oDeviceInfo = p[c], oDeviceInfo.oProtocolInc.set3DZoom(oDeviceInfo, b, a, {
                        success: function (a) {
                        }, error: function () {
                        }
                    }))
                }
            };
            w.PluginEventHandler = function (a, c, b) {
                B("\u63d2\u4ef6\u4e8b\u4ef6\uff1aPluginEventHandler iEventType\uff1a%s iParam1: %s, iParam2: %s",
                    a, c, b);
                0 == a || 2 == a ? z.I_Stop(c) : 21 == a ? z.I_StopRecord(c) : 3 == a && z.I_StopVoiceTalk();
                v.cbEvent && v.cbEvent(a, c, b)
            };
            w.GetHttpInfo = function (a, c, b) {
                B("http\u54cd\u5e94\u8fd4\u56de\uff1ahttp\u72b6\u6001\uff1a%s, http\u6570\u636e\uff1a%s", a, c);
                m.prototype.processCallback(a, c)
            };
            var B = function () {
                if (v.bDebugMode) {
                    var a = h(arguments);
                    L._alert(a)
                }
            }, h = function () {
                for (var a = arguments[0], c = 1; c < arguments.length; c++)a = a.replace("%s", arguments[c]);
                return a
            }, M = function () {
                var a = "";
                if (f.browser().msie)a = "<object classid='" +
                    v.szOcxClassId + "' codebase='' standby='Waiting...' id='" + x + "' width='" + F + "' height='" + G + "' align='center' ><param name='wndtype' value='" + v.iWndowType + "'><param name='playmode' value='" + v.iPlayMode + "'><param name='colors' value='" + v.szColorProperty + "'></object>"; else for (var c = navigator.mimeTypes.length, b = 0; b < c; b++)navigator.mimeTypes[b].type.toLowerCase() == v.szMimeTypes && (a = "<embed align='center' type='" + v.szMimeTypes + "' width='" + F + "' height='" + G + "' name='" + D + "' wndtype='" + v.iWndowType + "' playmode='" +
                    v.iPlayMode + "' colors='" + v.szColorProperty + "'>");
                return a
            }, N = function () {
                var a = k.HWP_GetLocalConfig();
                u = f.loadXML(a)
            }, O = function (a) {
                z.I_GetDeviceInfo(a.szIP, {
                    success: function (c) {
                        a.szDeviceType = g.$XML(c).find("deviceType").eq(0).text()
                    }
                });
                z.I_GetAnalogChannelInfo(a.szIP, {
                    success: function (c) {
                        a.iAnalogChannelNum = g.$XML(c).find("VideoInputChannel", !0).length
                    }
                });
                z.I_GetAudioInfo(a.szIP, {
                    success: function (c) {
                        c = g.$XML(c).find("audioCompressionType", !0);
                        if (0 < c.length) {
                            c = g.$XML(c).eq(0).text();
                            var b = 0;
                            "G.711ulaw" ==
                            c ? b = 1 : "G.711alaw" == c ? b = 2 : "G.726" == c && (b = 3);
                            a.iAudioType = b
                        }
                    }
                })
            }, E = function (a) {
                var c = -1, b = -1, b = null;
                if (Q(a))b = I(a), c = b.iRtspPort, b = b.iDevicePort; else {
                    for (var c = R(a), b = !1, d = 0; d < c.length; d++)if (c[d].ipv4 == a.szIP || c[d].ipv6 == a.szIP) {
                        b = !0;
                        break
                    }
                    b ? (b = I(a), c = b.iRtspPort, b = b.iDevicePort) : (b = K(a), c = b.iRtspPort, b = b.iDevicePort, -1 == c && -1 == b && (b = I(a), c = b.iRtspPort, b = b.iDevicePort))
                }
                return {iRtspPort: c, iDevicePort: b}
            }, I = function (a) {
                var c = -1, b = -1;
                a.oProtocolInc.getPortInfo(a, {
                    async: !1, success: function (a) {
                        a = g.$XML(a).find("AdminAccessProtocol",
                            !0);
                        for (var e = 0, l = a.length; e < l; e++)"RTSP" == g.$XML(a).eq(e).find("protocol").eq(0).text() && (c = parseInt(g.$XML(a).eq(e).find("portNo").eq(0).text(), 10)), "DEV_MANAGE" == g.$XML(a).eq(e).find("protocol").eq(0).text() && (b = parseInt(g.$XML(a).eq(e).find("portNo").eq(0).text(), 10))
                    }, error: function () {
                        b = c = -1
                    }
                });
                return {iRtspPort: c, iDevicePort: b}
            }, K = function (a) {
                var c = -1, b = -1;
                a.oProtocolInc.getUPnPPortStatus(a, {
                    async: !1, success: function (a) {
                        a = g.$XML(a).find("portStatus", !0);
                        for (var e = 0, l = a.length; e < l; e++)"rtsp" ==
                        g.$XML(a).eq(e).find("internalPort").eq(0).text() && (c = parseInt(g.$XML(a).eq(e).find("externalPort").eq(0).text(), 10)), "admin" == g.$XML(a).eq(e).find("internalPort").eq(0).text() && (b = parseInt(g.$XML(a).eq(e).find("externalPort").eq(0).text(), 10))
                    }, error: function () {
                        b = c = -1
                    }
                });
                return {iRtspPort: c, iDevicePort: b}
            }, R = function (a) {
                var c = [];
                a.oProtocolInc.getNetworkBond(a, {
                    async: !1, success: function (a) {
                        "true" == g.$XML(a).find("enabled").eq(0).text() && c.push({
                            ipv4: g.$XML(a).find("ipAddress").eq(0).text(),
                            ipv6: g.$XML(a).find("ipv6Address").eq(0).text()
                        })
                    },
                    error: function () {
                        a.oProtocolInc.getNetworkInterface(a, {
                            success: function (a) {
                                for (var d = g.$XML(a).find("NetworkInterface", !0).length; 0 < d;) {
                                    c.push({
                                        ipv4: g.$XML(a).find("ipAddress").eq(0).text(),
                                        ipv6: g.$XML(a).find("ipv6Address").eq(0).text()
                                    });
                                    break
                                }
                            }, error: function () {
                            }
                        })
                    }
                });
                return c
            }, Q = function (a) {
                var c = !1;
                a.oProtocolInc.getPPPoEStatus(a, {
                    async: !1, success: function (a) {
                        c = 0 < g.$XML(a).find("ipAddress", !0).length ? !0 : 0 < g.$XML(a).find("ipv6Address", !0).length ? !0 : !1
                    }, error: function () {
                        c = !1
                    }
                });
                return c
            };
            this.I_InitPlugin =
                function (a, c, b) {
                    F = a;
                    G = c;
                    f.extend(v, b)
                };
            this.I_InsertOBJECTPlugin = function (a) {
                void 0 != a && (v.szContainerID = a);
                if (null == document.getElementById(v.szContainerID) || null != document.getElementById(x) || 0 != document.getElementsByName(x).length)return -1;
                document.getElementById(v.szContainerID).innerHTML = M();
                k = f.browser().msie ? document.getElementById(x) : document.getElementsByName(D)[0];
                if (null == k || null == k.object)return -1;
                "object" == typeof w.attachEvent && f.browser().msie && (k.attachEvent("GetSelectWndInfo", GetSelectWndInfo),
                    k.attachEvent("ZoomInfoCallback", ZoomInfoCallback), k.attachEvent("GetHttpInfo", GetHttpInfo), k.attachEvent("PluginEventHandler", PluginEventHandler));
                N();
                return 0
            };
            this.I_WriteOBJECT_XHTML = function () {
                document.writeln(M());
                k = f.browser().msie ? document.getElementById(x) : document.getElementsByName(D)[0];
                if (null == k || null == k.object)return -1;
                f.browser().msie && (k.attachEvent("GetSelectWndInfo", GetSelectWndInfo), k.attachEvent("ZoomInfoCallback", ZoomInfoCallback), k.attachEvent("GetHttpInfo", GetHttpInfo), k.attachEvent("PluginEventHandler",
                    PluginEventHandler));
                N();
                return 0
            };
            this.I_OpenFileDlg = function (a) {
                var c = k.HWP_OpenFileBrowser(a, "");
                if (1 == a) {
                    if (100 < c.length)return -1
                } else if (130 < c.length)return -1;
                return c
            };
            this.I_GetLocalCfg = function () {
                var a = k.HWP_GetLocalConfig(), c = [];
                u = f.loadXML(a);
                c.push("<LocalConfigInfo>");
                c.push("<PackgeSize>" + g.$XML(u).find("PackgeSize").eq(0).text() + "</PackgeSize>");
                c.push("<PlayWndType>" + g.$XML(u).find("PlayWndType").eq(0).text() + "</PlayWndType>");
                c.push("<BuffNumberType>" + g.$XML(u).find("BuffNumberType").eq(0).text() +
                    "</BuffNumberType>");
                c.push("<RecordPath>" + g.$XML(u).find("RecordPath").eq(0).text() + "</RecordPath>");
                c.push("<CapturePath>" + g.$XML(u).find("CapturePath").eq(0).text() + "</CapturePath>");
                c.push("<PlaybackFilePath>" + g.$XML(u).find("PlaybackFilePath").eq(0).text() + "</PlaybackFilePath>");
                c.push("<PlaybackPicPath>" + g.$XML(u).find("PlaybackPicPath").eq(0).text() + "</PlaybackPicPath>");
                c.push("<DownloadPath>" + g.$XML(u).find("DownloadPath").eq(0).text() + "</DownloadPath>");
                c.push("<IVSMode>" + g.$XML(u).find("IVSMode").eq(0).text() +
                    "</IVSMode>");
                c.push("<CaptureFileFormat>" + g.$XML(u).find("CaptureFileFormat").eq(0).text() + "</CaptureFileFormat>");
                c.push("</LocalConfigInfo>");
                return f.loadXML(c.join(""))
            };
            this.I_SetLocalCfg = function (a) {
                a = f.loadXML(a);
                var c = -1;
                g.$XML(u).find("PackgeSize").eq(0).text(g.$XML(a).find("PackgeSize").eq(0).text());
                g.$XML(u).find("PlayWndType").eq(0).text(g.$XML(a).find("PlayWndType").eq(0).text());
                g.$XML(u).find("BuffNumberType").eq(0).text(g.$XML(a).find("BuffNumberType").eq(0).text());
                g.$XML(u).find("RecordPath").eq(0).text(g.$XML(a).find("RecordPath").eq(0).text());
                g.$XML(u).find("CapturePath").eq(0).text(g.$XML(a).find("CapturePath").eq(0).text());
                g.$XML(u).find("PlaybackFilePath").eq(0).text(g.$XML(a).find("PlaybackFilePath").eq(0).text());
                g.$XML(u).find("PlaybackPicPath").eq(0).text(g.$XML(a).find("PlaybackPicPath").eq(0).text());
                g.$XML(u).find("DownloadPath").eq(0).text(g.$XML(a).find("DownloadPath").eq(0).text());
                g.$XML(u).find("IVSMode").eq(0).text(g.$XML(a).find("IVSMode").eq(0).text());
                g.$XML(u).find("CaptureFileFormat").eq(0).text(g.$XML(a).find("CaptureFileFormat").eq(0).text());
                return (c = k.HWP_SetLocalConfig(f.toXMLStr(u))) ? 0 : -1
            };
            this.I_Login = function (a, c, b, d, e, l) {
                if (-1 != this.findDeviceIndexByIP(a))return B("\u8bbe\u5907\u5df2\u7ecf\u767b\u5f55\u8fc7"), -1;
                var g = H, h = 1;
                void 0 != l.cgi && (1 == l.cgi ? (g = H, h = 1) : (g = A, h = 2));
                var k = {protocol: c, success: null, error: null}, m = f.Base64.encode(d + ":" + e);
                f.extend(k, l);
                f.extend(k, {
                    success: function (d) {
                        var e = new J;
                        e.szIP = a;
                        e.szHttpProtocol = 2 == c ? "https://" : "http://";
                        e.iHttpPort = b;
                        e.szAuth = m;
                        e.iDeviceProtocol = h;
                        e.oProtocolInc = g;
                        p.push(e);
                        B("\u4f7f\u7528%s\u534f\u8bae\u767b\u5f55\u6210\u529f",
                            h);
                        O(e);
                        l.success && l.success(d, l.DeviceID)
                    }, error: function (e, d) {
                        if (void 0 != l.cgi)l.error && l.error(e, d); else {
                            var g = {protocol: c, success: null, error: null};
                            f.extend(g, l);
                            f.extend(g, {
                                success: function (e) {
                                    var d = new J;
                                    d.szIP = a;
                                    d.szHttpProtocol = 2 == c ? "https://" : "http://";
                                    d.iHttpPort = b;
                                    d.szAuth = m;
                                    d.iDeviceProtocol = 2;
                                    d.oProtocolInc = A;
                                    p.push(d);
                                    B("\u4f7f\u7528%s\u534f\u8bae\u767b\u5f55\u6210\u529f", "PSIA");
                                    O(d);
                                    l.success && l.success(e, l.DeviceID)
                                }, error: function (a, c) {
                                    l.error && l.error(a, c)
                                }
                            });
                            A.login(a, b, m, g)
                        }
                    }
                });
                g.login(a, b, m, k)
            };
            this.I_Logout = function (a) {
                a = this.findDeviceIndexByIP(a);
                return -1 != a ? (p.splice(a, 1), 0) : -1
            };
            this.I_GetAudioInfo = function (a, c) {
                var b = this.findDeviceIndexByIP(a);
                if (-1 != b) {
                    var b = p[b], d = {success: null, error: null};
                    f.extend(d, c);
                    f.extend(d, {
                        success: function (a) {
                            c.success && c.success(a)
                        }, error: function (a, b) {
                            c.error && c.error(a, b)
                        }
                    });
                    b.oProtocolInc.getAudioInfo(b, d)
                }
            };
            this.I_GetDeviceInfo = function (a, c) {
                var b = this.findDeviceIndexByIP(a);
                if (-1 != b) {
                    var b = p[b], d = {success: null, error: null};
                    f.extend(d,
                        c);
                    f.extend(d, {
                        success: function (a) {
                            c.success && c.success(a)
                        }, error: function (a, b) {
                            c.error && c.error(a, b)
                        }
                    });
                    b.oProtocolInc.getDeviceInfo(b, d)
                }
            };
            this.I_GetAnalogChannelInfo = function (a, c) {
                var b = this.findDeviceIndexByIP(a);
                if (-1 != b) {
                    var b = p[b], d = {success: null, error: null};
                    f.extend(d, c);
                    f.extend(d, {
                        success: function (a) {
                            c.success && c.success(a)
                        }, error: function (a, b) {
                            c.error && c.error(a, b)
                        }
                    });
                    b.oProtocolInc.getAnalogChannelInfo(b, d)
                }
            };
            this.I_GetDigitalChannelInfo = function (a, c) {
                var b = this.findDeviceIndexByIP(a);
                if (-1 != b) {
                    var b = p[b], d = {success: null, error: null};
                    f.extend(d, c);
                    f.extend(d, {
                        success: function (a) {
                            c.success && c.success(a)
                        }, error: function (a, b) {
                            c.error && c.error(a, b)
                        }
                    });
                    b.oProtocolInc.getDigitalChannelInfo(b, d)
                }
            };
            this.I_GetZeroChannelInfo = function (a, c) {
                var b = this.findDeviceIndexByIP(a);
                if (-1 != b) {
                    var b = p[b], d = {success: null, error: null};
                    f.extend(d, c);
                    f.extend(d, {
                        success: function (a) {
                            c.success && c.success(a)
                        }, error: function (a, b) {
                            c.error && c.error(a, b)
                        }
                    });
                    b.oProtocolInc.getZeroChannelInfo(b, d)
                }
            };
            this.I_StartRealPlay =
                function (a, c) {
                    var b = this.findDeviceIndexByIP(a), d = -1;
                    if (-1 != b) {
                        var e = p[b];
                        void 0 != c.iPort && (e.iRtspPort = c.iPort);
                        if (-1 == e.iRtspPort && (e.iRtspPort = E(e).iRtspPort, -1 == e.iRtspPort))return B("\u83b7\u53d6RTSP\u7aef\u53e3\u53f7\u5931\u8d25"), d;
                        var l = {iWndIndex: s, iStreamType: 1, iChannelID: 1, bZeroChannel: !1};
                        f.extend(l, c);
                        b = this.findWndIndexByIndex(l.iWndIndex);
                        -1 == b && (d = e.oProtocolInc.startRealPlay(e, l))
                    }
                    -1 != b && -1 == d && (e.iRtspPort = -1);
                    return d
                };
            this.I_Stop = function (a) {
                a = -1 < a ? a : s;
                var c = this.findWndIndexByIndex(a),
                    b = -1;
                -1 != c && (b = r[c], b.bRecord && k.HWP_StopSave(b.iIndex), b.bSound && k.HWP_CloseSound(), b.bEZoom && k.HWP_DisableZoom(b.iIndex), b = k.HWP_Stop(a), 0 == b && r.splice(c, 1));
                return b
            };
            this.I_OpenSound = function (a) {
                a = a ? a : s;
                var c = this.findWndIndexByIndex(a), b = -1;
                -1 != c && (c = r[c], c.bSound || (b = k.HWP_OpenSound(a), 0 == b && (c.bSound = !0)));
                return b
            };
            this.I_CloseSound = function (a) {
                a = a ? a : s;
                var c = this.findWndIndexByIndex(a);
                a = -1;
                -1 != c && (c = r[c], c.bSound && (a = k.HWP_CloseSound(), 0 == a && (c.bSound = !1)));
                return a
            };
            this.I_SetVolume = function (a,
                                         c) {
                c = c ? c : s;
                var b = -1;
                -1 != this.findWndIndexByIndex(c) && (b = k.HWP_SetVolume(c, a));
                return b
            };
            this.I_CapturePic = function (a, c) {
                c = c ? c : s;
                var b = -1;
                -1 != this.findWndIndexByIndex(c) && (b = k.HWP_CapturePicture(c, a));
                return b
            };
            this.I_StartRecord = function (a, c) {
                c = c ? c : s;
                var b = this.findWndIndexByIndex(c), d = -1;
                -1 != b && (b = r[b], b.bRecord || (d = k.HWP_StartSave(c, a), 0 == d && (b.bRecord = !0)));
                return d
            };
            this.I_StopRecord = function (a) {
                a = a ? a : s;
                var c = this.findWndIndexByIndex(a), b = -1;
                -1 != c && (c = r[c], c.bRecord && (b = k.HWP_StopSave(a), 0 == b &&
                (c.bRecord = !1)));
                return b
            };
            this.I_StartVoiceTalk = function (a, c) {
                if (isNaN(parseInt(c, 10)))return -1;
                var b = this.findDeviceIndexByIP(a), d = -1;
                if (-1 != b) {
                    var e = p[b];
                    e.bVoiceTalk || (d = e.oProtocolInc.startVoiceTalk(e, c), 0 == d && (p[b].bVoiceTalk = !0))
                }
                return d
            };
            this.I_StopVoiceTalk = function () {
                for (var a = k.HWP_StopVoiceTalk(), c = 0, b = p.length; c < b; c++)if (p[c].bVoiceTalk) {
                    p[c].bVoiceTalk = !1;
                    break
                }
                return a
            };
            this.I_PTZControl = function (a, c) {
                var b = {iWndIndex: s, iPTZIndex: a, iPTZSpeed: 4};
                c.async && (c.async = !1);
                f.extend(b, c);
                var d = this.findWndIndexByIndex(b.iWndIndex);
                if (-1 != d) {
                    var e = r[d], d = this.findDeviceIndexByIP(e.szIP);
                    -1 != d && (d = p[d], 9 == a ? d.oProtocolInc.ptzAutoControl(d, e, b) : d.oProtocolInc.ptzControl(d, e, b))
                }
            };
            this.I_EnableEZoom = function (a) {
                a = a ? a : s;
                var c = this.findWndIndexByIndex(a), b = -1;
                -1 != c && (c = r[c], c.bEZoom || (b = k.HWP_EnableZoom(a, 0), 0 == b && (c.bEZoom = !0)));
                return b
            };
            this.I_DisableEZoom = function (a) {
                a = a ? a : s;
                var c = this.findWndIndexByIndex(a);
                return -1 != c && (c = r[c], c.bEZoom) ? (k.HWP_DisableZoom(a), c.bEZoom = !1, 0) : -1
            };
            this.I_Enable3DZoom =
                function (a) {
                    a = a ? a : s;
                    var c = this.findWndIndexByIndex(a), b = -1;
                    -1 != c && (c = r[c], c.b3DZoom || (b = k.HWP_EnableZoom(a, 1), 0 == b && (c.b3DZoom = !0)));
                    return b
                };
            this.I_Disable3DZoom = function (a) {
                a = a ? a : s;
                var c = this.findWndIndexByIndex(a);
                return -1 != c && (c = r[c], c.b3DZoom) ? (k.HWP_DisableZoom(a), c.b3DZoom = !1, 0) : -1
            };
            this.I_ZOOMControl = function (a, c) {
                var b = {iWndIndex: s, iPTZIndex: a, iPTZSpeed: 4};
                c.async && (c.async = !1);
                f.extend(b, c);
                var d = this.findWndIndexByIndex(b.iWndIndex);
                if (-1 != d) {
                    var e = r[d], d = this.findDeviceIndexByIP(e.szIP);
                    -1 != d && (d = p[d], d.oProtocolInc.zoomControl(d, e, b))
                }
            };
            this.I_FocusControl = function (a, c) {
                var b = {iWndIndex: s, iPTZIndex: a, iPTZSpeed: 4};
                c.async && (c.async = !1);
                f.extend(b, c);
                var d = this.findWndIndexByIndex(b.iWndIndex);
                if (-1 != d) {
                    var e = r[d], d = this.findDeviceIndexByIP(e.szIP);
                    -1 != d && (d = p[d], d.oProtocolInc.focusControl(d, e, b))
                }
            };
            this.I_IrisControl = function (a, c) {
                var b = {iWndIndex: s, iPTZIndex: a, iPTZSpeed: 4};
                c.async && (c.async = !1);
                f.extend(b, c);
                var d = this.findWndIndexByIndex(b.iWndIndex);
                if (-1 != d) {
                    var e = r[d], d = this.findDeviceIndexByIP(e.szIP);
                    -1 != d && (d = p[d], d.oProtocolInc.irisControl(d, e, b))
                }
            };
            this.I_FullScreen = function (a) {
                k.HWP_FullScreenDisplay(a)
            };
            this.I_SetPreset = function (a, c) {
                var b = {iWndIndex: s, iPresetID: a};
                f.extend(b, c);
                var d = this.findWndIndexByIndex(b.iWndIndex);
                if (-1 != d) {
                    var e = r[d], d = this.findDeviceIndexByIP(e.szIP);
                    -1 != d && (d = p[d], d.oProtocolInc.setPreset(d, e, b))
                }
            };
            this.I_GoPreset = function (a, c) {
                var b = {iWndIndex: s, iPresetID: a};
                f.extend(b, c);
                var d = this.findWndIndexByIndex(b.iWndIndex);
                if (-1 != d) {
                    var e = r[d], d = this.findDeviceIndexByIP(e.szIP);
                    -1 != d && (d = p[d], d.oProtocolInc.goPreset(d, e, b))
                }
            };
            this.I_RecordSearch = function (a, c, b, d, e) {
                a = this.findDeviceIndexByIP(a);
                -1 != a && (a = p[a], c = {
                    iChannelID: c,
                    szStartTime: b,
                    szEndTime: d,
                    iSearchPos: 0,
                    success: null,
                    error: null
                }, f.extend(c, e), f.extend(c, {
                    success: function (a) {
                        e.success && e.success(a)
                    }, error: function (a, c) {
                        e.error && e.error(a, c)
                    }
                }), a.oProtocolInc.recordSearch(a, c))
            };
            this.I_StartPlayback = function (a, c) {
                var b = this.findDeviceIndexByIP(a), d = -1;
                if (-1 != b) {
                    var e = p[b];
                    void 0 != c.iPort && (e.iRtspPort = c.iPort);
                    if (-1 ==
                        e.iRtspPort && (e.iRtspPort = E(e).iRtspPort, -1 == e.iRtspPort))return d;
                    var b = f.dateFormat(new Date, "yyyy-MM-dd"), l = {
                        iWndIndex: s,
                        szStartTime: b + " 00:00:00",
                        szEndTime: b + " 23:59:59",
                        iChannelID: 1
                    };
                    f.extend(l, c);
                    b = this.findWndIndexByIndex(l.iWndIndex);
                    -1 == b && (l.szStartTime = l.szStartTime.replace(/[-:]/g, "").replace(" ", "T") + "Z", l.szEndTime = l.szEndTime.replace(/[-:]/g, "").replace(" ", "T") + "Z", d = e.oProtocolInc.startPlayback(e, l))
                }
                -1 == d && (e.iRtspPort = -1);
                return d
            };
            this.I_ReversePlayback = function (a, c) {
                var b = this.findDeviceIndexByIP(a),
                    d = -1;
                if (-1 != b) {
                    var e = p[b];
                    void 0 != c.iPort && (e.iRtspPort = c.iPort);
                    if (-1 == e.iRtspPort && (e.iRtspPort = E(e).iRtspPort, -1 == e.iRtspPort))return d;
                    var b = f.dateFormat(new Date, "yyyy-MM-dd"), l = {
                        iWndIndex: s,
                        szStartTime: b + " 00:00:00",
                        szEndTime: b + " 23:59:59",
                        iChannelID: 1
                    };
                    f.extend(l, c);
                    b = this.findWndIndexByIndex(l.iWndIndex);
                    -1 == b && (l.szStartTime = l.szStartTime.replace(/[-:]/g, "").replace(" ", "T") + "Z", l.szEndTime = l.szEndTime.replace(/[-:]/g, "").replace(" ", "T") + "Z", d = e.oProtocolInc.reversePlayback(e, l))
                }
                -1 == d &&
                (e.iRtspPort = -1);
                return d
            };
            this.I_Frame = function (a) {
                a = a ? a : s;
                var c = this.findWndIndexByIndex(a), b = -1;
                if (-1 != c) {
                    var c = r[c], d = c.iPlayStatus;
                    if (2 == d || 4 == d)b = k.HWP_FrameForward(a), 0 == b && (c.iPlayStatus = 4)
                }
                return b
            };
            this.I_Pause = function (a) {
                a = a ? a : s;
                var c = this.findWndIndexByIndex(a), b = -1;
                if (-1 != c) {
                    var c = r[c], d = c.iPlayStatus;
                    2 == d ? (b = k.HWP_Pause(a), 0 == b && (c.iPlayStatus = 3)) : 5 == d && (b = k.HWP_Pause(a), 0 == b && (c.iPlayStatus = 6))
                }
                return b
            };
            this.I_Resume = function (a) {
                a = a ? a : s;
                var c = this.findWndIndexByIndex(a), b = -1;
                if (-1 !=
                    c) {
                    var c = r[c], d = c.iPlayStatus;
                    3 == d || 4 == d ? (b = k.HWP_Resume(a), 0 == b && (c.iPlayStatus = 2)) : 6 == d && (b = k.HWP_Resume(a), 0 == b && (c.iPlayStatus = 5))
                }
                return b
            };
            this.I_PlaySlow = function (a) {
                a = a ? a : s;
                var c = this.findWndIndexByIndex(a), b = -1;
                -1 != c && 2 == r[c].iPlayStatus && (b = k.HWP_Slow(a));
                return b
            };
            this.I_PlayFast = function (a) {
                a = a ? a : s;
                var c = this.findWndIndexByIndex(a), b = -1;
                -1 != c && 2 == r[c].iPlayStatus && (b = k.HWP_Fast(a));
                return b
            };
            this.I_GetOSDTime = function (a) {
                a = a ? a : s;
                return -1 != this.findWndIndexByIndex(a) ? (a = k.HWP_GetOSDTime(a),
                    f.dateFormat(new Date(1E3 * a), "yyyy-MM-dd hh:mm:ss")) : -1
            };
            this.I_StartDownloadRecord = function (a, c, b, d) {
                a = this.findDeviceIndexByIP(a);
                var e = -1;
                -1 != a && (a = p[a], c = {
                    szPlaybackURI: c,
                    szFileName: b
                }, f.extend(c, d), e = a.oProtocolInc.startDownloadRecord(a, c));
                return e
            };
            this.I_GetDownloadStatus = function (a) {
                return k.HWP_GetDownloadStatus(a)
            };
            this.I_GetDownloadProgress = function (a) {
                return k.HWP_GetDownloadProgress(a)
            };
            this.I_StopDownloadRecord = function (a) {
                return k.HWP_StopDownload(a)
            };
            this.I_ExportDeviceConfig = function (a) {
                a =
                    this.findDeviceIndexByIP(a);
                if (-1 != a)return a = p[a], a.oProtocolInc.exportDeviceConfig(a)
            };
            this.I_ImportDeviceConfig = function (a, c) {
                var b = this.findDeviceIndexByIP(a), d = -1;
                -1 != b && (b = p[b], d = b.oProtocolInc.importDeviceConfig(b, {szFileName: c}));
                return d
            };
            this.I_RestoreDefault = function (a, c, b) {
                a = this.findDeviceIndexByIP(a);
                -1 != a && (a = p[a], a.oProtocolInc.restore(a, c, b))
            };
            this.I_Restart = function (a, c) {
                var b = this.findDeviceIndexByIP(a);
                -1 != b && (b = p[b], b.oProtocolInc.restart(b, c))
            };
            this.I_Reconnect = function (a, c) {
                var b =
                    this.findDeviceIndexByIP(a);
                -1 != b && (b = p[b], b.oProtocolInc.login(b.szIP, b.iHttpPort, b.szAuth, c))
            };
            this.I_StartUpgrade = function (a, c) {
                var b = this.findDeviceIndexByIP(a), d = -1;
                -1 != b && (b = p[b], d = b.oProtocolInc.startUpgrade(b, {szFileName: c}));
                return d
            };
            this.I_UpgradeStatus = function () {
                return k.HWP_UpgradeStatus()
            };
            this.I_UpgradeProgress = function () {
                return k.HWP_UpgradeProgress()
            };
            this.I_StopUpgrade = function () {
                return k.HWP_StopUpgrade()
            };
            this.I_CheckPluginInstall = function () {
                var a = !1;
                if (f.browser().msie)try {
                    new ActiveXObject("WebVideoActiveX.WebVideoActiveXCtrl.1"),
                        a = !0
                } catch (c) {
                } else for (var b = 0, d = navigator.mimeTypes.length; b < d; b++)if ("application/hwp-webvideo-plugin" == navigator.mimeTypes[b].type.toLowerCase()) {
                    a = !0;
                    break
                }
                return a ? 0 : -1
            };
            this.I_CheckPluginVersion = function () {
                return k.HWP_CheckPluginUpdate("<?xml version='1.0' encoding='utf-8'?><FileVersion><Platform name='win32'><npWebVideoPlugin.dll>3,0,5,52</npWebVideoPlugin.dll><WebVideoActiveX.ocx>3,0,5,52</WebVideoActiveX.ocx><PlayCtrl.dll>6,5,1,6</PlayCtrl.dll><StreamTransClient.dll>1,1,2,8</StreamTransClient.dll><SystemTransform.dll>2,3,0,5</SystemTransform.dll><NetStream.dll>1,0,4,52</NetStream.dll><HCNetSDK.dll>4,2,6,7</HCNetSDK.dll><ShowRemConfig.dll>3,1,2,14</ShowRemConfig.dll></Platform></FileVersion>") ?
                    -1 : 0
            };
            this.I_RemoteConfig = function (a, c) {
                var b = this.findDeviceIndexByIP(a);
                if (-1 != b) {
                    var b = p[b], d = -1;
                    if (-1 == b.iDevicePort && ("undefined" == typeof c.iDevicePort || "" == c.iDevicePort) && (b.iDevicePort = E(b).iDevicePort, -1 == b.iDevicePort))return -1;
                    var d = c.iDevicePort || b.iDevicePort, e = {iLan: 1, iType: 0};
                    f.extend(e, c);
                    szUserName = f.Base64.decode(b.szAuth).split(":")[0];
                    szPassword = f.Base64.decode(b.szAuth).split(":")[1];
                    b = "<RemoteInfo><DeviceInfo><DeviceType>" + e.iType + "</DeviceType><LanType>" + e.iLan + "</LanType><IP>" +
                        a + "</IP><Port>" + d + "</Port><UName>" + szUserName + "</UName><PWD>" + f.Base64.encode(szPassword) + "</PWD></DeviceInfo></RemoteInfo>";
                    return k.HWP_ShowRemConfig(b)
                }
                return -1
            };
            this.I_ChangeWndNum = function (a) {
                if (isNaN(parseInt(a, 10)))return -1;
                k.HWP_ArrangeWindow(a)
            };
            this.I_GetLastError = function () {
                return k.HWP_GetLastError()
            };
            this.I_GetWindowStatus = function (a) {
                if ("undefined" == typeof a)return a = [], f.extend(a, r), a;
                a = this.findWndIndexByIndex(a);
                return -1 != a ? r[a] : null
            };
            this.findDeviceIndexByIP = function (a) {
                for (var c =
                    0; c < p.length; c++)if (p[c].szIP == a)return c;
                return -1
            };
            this.findWndIndexByIndex = function (a) {
                for (var c = 0; c < r.length; c++)if (r[c].iIndex == a)return c;
                return -1
            };
            var J = function () {
                this.szAuth = this.szHostName = this.szIP = "";
                this.szHttpProtocol = "http://";
                this.iHttpPort = 80;
                this.iDevicePort = -1;
                this.iHttpsPort = 443;
                this.iRtspPort = -1;
                this.iDeviceProtocol = this.iAudioType = 1;
                this.oProtocolInc = null;
                this.iAnalogChannelNum = 0;
                this.szDeviceType = "";
                this.bVoiceTalk = !1
            };
            J.prototype.getMyDeviceInfo = function () {
            };
            var C = function () {
                this.iIndex =
                    0;
                this.iChannelID = this.szIP = "";
                this.iPlayStatus = 0;
                this.b3DZoom = this.bEZoom = this.bPTZAuto = this.bRecord = this.bSound = !1
            }, m = function () {
                this.options = {
                    type: "GET",
                    url: "",
                    auth: "",
                    timeout: 1E4,
                    data: "",
                    async: !0,
                    success: null,
                    error: null
                };
                this.m_szHttpData = this.m_szHttpContent = this.m_szHttpHead = ""
            };
            m.prototype.m_httpRequestSet = [];
            m.prototype.setRequestParam = function (a) {
                f.extend(this.options, a)
            };
            m.prototype.submitRequest = function () {
                var a = this.getHttpMethod(this.options.type), c = null;
                this.options.async ? (c = k.HWP_SubmitHttpRequest(a,
                    this.options.url, this.options.auth, this.options.data, this.options.timeout), -1 != c && (c = {
                    iRequestID: c,
                    funSuccessCallback: this.options.success,
                    funErrorCallback: this.options.error
                }, this.m_httpRequestSet.push(c))) : (a = k.HWP_SendHttpSynRequest(a, this.options.url, this.options.auth, this.options.data, this.options.timeout), c = {
                    funSuccessCallback: this.options.success,
                    funErrorCallback: this.options.error
                }, this.httpDataAnalyse(c, a))
            };
            m.prototype.getHttpMethod = function (a) {
                return (a = {GET: 1, POST: 2, PUT: 5, DELETE: 6}[a]) ?
                    a : -1
            };
            m.prototype.processCallback = function (a, c) {
                for (var b = null, d = 0; d < this.m_httpRequestSet.length; d++)if (a == this.m_httpRequestSet[d].iRequestID) {
                    b = this.m_httpRequestSet[d];
                    this.m_httpRequestSet.splice(d, 1);
                    break
                }
                null != b && (this.httpDataAnalyse(b, c), delete b)
            };
            m.prototype.httpDataAnalyse = function (a, c) {
                var b = "", d = 0;
                "" == c || void 0 == c ? a.funErrorCallback() : (d = parseInt(c.substring(0, 3)), b = c.substring(3, c.length), isNaN(d) ? a.funErrorCallback() : 200 == d ? a.funSuccessCallback(f.loadXML(b)) : a.funErrorCallback(d,
                    f.loadXML(b)))
            };
            var n = function () {
            };
            n.prototype.CGI = {
                login: "%s%s:%s/ISAPI/Security/userCheck",
                getAudioInfo: "%s%s:%s/ISAPI/System/TwoWayAudio/channels",
                getDeviceInfo: "%s%s:%s/ISAPI/System/deviceInfo",
                getAnalogChannelInfo: "%s%s:%s/ISAPI/System/Video/inputs/channels",
                getDigitalChannelInfo: "%s%s:%s/ISAPI/ContentMgmt/InputProxy/channels/status",
                getZeroChannelInfo: "%s%s:%s/ISAPI/ContentMgmt/ZeroVideo/channels",
                getStreamChannels: "%s%s:%s/PSIA/Streaming/channels",
                getStreamDynChannels: "%s%s:%s/PSIA/Custom/SelfExt/ContentMgmt/DynStreaming/channels",
                startRealPlay: {
                    channels: "%s%s:%s/PSIA/streaming/channels/%s",
                    zeroChannels: "%s%s:%s/PSIA/Custom/SelfExt/ContentMgmt/ZeroStreaming/channels/%s"
                },
                startVoiceTalk: {
                    open: "%s%s:%s/ISAPI/System/TwoWayAudio/channels/%s/open",
                    close: "%s%s:%s/ISAPI/System/TwoWayAudio/channels/%s/close",
                    audioData: "%s%s:%s/ISAPI/System/TwoWayAudio/channels/%s/audioData"
                },
                ptzControl: {
                    analog: "%s%s:%s/ISAPI/PTZCtrl/channels/%s/continuous",
                    digital: "%s%s:%s/ISAPI/ContentMgmt/PTZCtrlProxy/channels/%s/continuous"
                },
                ptzAutoControl: {
                    ipdome: "%s%s:%s/ISAPI/PTZCtrl/channels/1/presets/%s/goto",
                    analog: "%s%s:%s/ISAPI/PTZCtrl/channels/%s/autoPan",
                    digital: "%s%s:%s/ISAPI/ContentMgmt/PTZCtrlProxy/channels/%s/autoPan"
                },
                setPreset: {
                    analog: "%s%s:%s/ISAPI/PTZCtrl/channels/%s/presets/%s",
                    digital: "%s%s:%s/ISAPI/ContentMgmt/PTZCtrlProxy/channels/%s/presets/%s"
                },
                goPreset: {
                    analog: "%s%s:%s/ISAPI/PTZCtrl/channels/%s/presets/%s/goto",
                    digital: "%s%s:%s/ISAPI/ContentMgmt/PTZCtrlProxy/channels/%s/presets/%s/goto"
                },
                getNetworkBond: "%s%s:%s/ISAPI/System/Network/Bond",
                getNetworkInterface: "%s%s:%s/ISAPI/System/Network/interfaces",
                getUPnPPortStatus: "%s%s:%s/ISAPI/System/Network/UPnP/ports/status",
                getPPPoEStatus: "%s%s:%s/ISAPI/System/Network/PPPoE/1/status",
                getPortInfo: "%s%s:%s/ISAPI/Security/adminAccesses",
                recordSearch: "%s%s:%s/ISAPI/ContentMgmt/search",
                startPlayback: "%s%s:%s/PSIA/streaming/tracks/%s?starttime=%s&endtime=%s",
                startDownloadRecord: "%s%s:%s/ISAPI/ContentMgmt/download",
                deviceConfig: "%s%s:%s/ISAPI/System/configurationData",
                restart: "%s%s:%s/ISAPI/System/reboot",
                restore: "%s%s:%s/ISAPI/System/factoryReset?mode=%s",
                startUpgrade: {
                    upgrade: "%s%s:%s/ISAPI/System/updateFirmware",
                    status: "%s%s:%s/ISAPI/System/upgradeStatus"
                },
                set3DZoom: "%s%s:%s/ISAPI/PTZCtrl/channels/%s/position3D",
                setFocus: "%s%s:%s/PSIA/System/Video/inputs/channels/%s/focus",
                setIris: "%s%s:%s/PSIA/System/Video/inputs/channels/%s/iris"
            };
            n.prototype.login = function (a, c, b, d) {
                c = h(this.CGI.login, 2 == d.protocol ? "https://" : "http://", a, c);
                a = new m;
                b = {type: "GET", url: c, auth: b, success: null, error: null};
                f.extend(b, d);
                f.extend(b, {
                    success: function (a) {
                        "200" == g.$XML(a).find("statusValue").eq(0).text() ?
                        d.success && d.success(a) : d.error && d.error(401, a)
                    }, error: function (a, c) {
                        d.error && d.error(a, c)
                    }
                });
                a.setRequestParam(b);
                a.submitRequest()
            };
            n.prototype.getAudioInfo = function (a, c) {
                var b = h(this.CGI.getAudioInfo, a.szHttpProtocol, a.szIP, a.iHttpPort), d = new m, b = {
                    type: "GET",
                    url: b,
                    auth: a.szAuth,
                    success: null,
                    error: null
                };
                f.extend(b, c);
                f.extend(b, {
                    success: function (a) {
                        c.success && c.success(a)
                    }, error: function (a, b) {
                        c.error && c.error(a, b)
                    }
                });
                d.setRequestParam(b);
                d.submitRequest()
            };
            n.prototype.getDeviceInfo = function (a, c) {
                var b =
                    h(this.CGI.getDeviceInfo, a.szHttpProtocol, a.szIP, a.iHttpPort), d = new m, b = {
                    type: "GET",
                    url: b,
                    auth: a.szAuth,
                    success: null,
                    error: null
                };
                f.extend(b, c);
                f.extend(b, {
                    success: function (a) {
                        var b = [];
                        b.push("<DeviceInfo>");
                        b.push("<deviceName>" + f.escape(g.$XML(a).find("deviceName").eq(0).text()) + "</deviceName>");
                        b.push("<deviceID>" + g.$XML(a).find("deviceID").eq(0).text() + "</deviceID>");
                        b.push("<deviceType>" + g.$XML(a).find("deviceType").eq(0).text() + "</deviceType>");
                        b.push("<model>" + g.$XML(a).find("model").eq(0).text() +
                            "</model>");
                        b.push("<serialNumber>" + g.$XML(a).find("serialNumber").eq(0).text() + "</serialNumber>");
                        b.push("<macAddress>" + g.$XML(a).find("macAddress").eq(0).text() + "</macAddress>");
                        b.push("<firmwareVersion>" + g.$XML(a).find("firmwareVersion").eq(0).text() + "</firmwareVersion>");
                        b.push("<firmwareReleasedDate>" + g.$XML(a).find("firmwareReleasedDate").eq(0).text() + "</firmwareReleasedDate>");
                        b.push("<encoderVersion>" + g.$XML(a).find("encoderVersion").eq(0).text() + "</encoderVersion>");
                        b.push("<encoderReleasedDate>" +
                            g.$XML(a).find("encoderReleasedDate").eq(0).text() + "</encoderReleasedDate>");
                        b.push("</DeviceInfo>");
                        a = f.loadXML(b.join(""));
                        c.success && c.success(a)
                    }, error: function (a, b) {
                        c.error && c.error(a, b)
                    }
                });
                d.setRequestParam(b);
                d.submitRequest()
            };
            n.prototype.getAnalogChannelInfo = function (a, c) {
                var b = h(this.CGI.getAnalogChannelInfo, a.szHttpProtocol, a.szIP, a.iHttpPort), d = new m, b = {
                    type: "GET",
                    url: b,
                    auth: a.szAuth,
                    success: null,
                    error: null
                };
                f.extend(b, c);
                f.extend(b, {
                    success: function (a) {
                        var b = [];
                        b.push("<VideoInputChannelList>");
                        a = g.$XML(a).find("VideoInputChannel", !0);
                        for (var d = 0, h = a.length; d < h; d++) {
                            var k = a[d];
                            b.push("<VideoInputChannel>");
                            b.push("<id>" + g.$XML(k).find("id").eq(0).text() + "</id>");
                            b.push("<inputPort>" + g.$XML(k).find("inputPort").eq(0).text() + "</inputPort>");
                            b.push("<name>" + f.escape(g.$XML(k).find("name").eq(0).text()) + "</name>");
                            b.push("<videoFormat>" + g.$XML(k).find("videoFormat").eq(0).text() + "</videoFormat>");
                            b.push("</VideoInputChannel>")
                        }
                        b.push("</VideoInputChannelList>");
                        a = f.loadXML(b.join(""));
                        c.success &&
                        c.success(a)
                    }, error: function (a, b) {
                        c.error && c.error(a, b)
                    }
                });
                d.setRequestParam(b);
                d.submitRequest()
            };
            n.prototype.getDigitalChannelInfo = function (a, c) {
                var b = h(this.CGI.getDigitalChannelInfo, a.szHttpProtocol, a.szIP, a.iHttpPort), d = new m, b = {
                    type: "GET",
                    url: b,
                    auth: a.szAuth,
                    success: null,
                    error: null
                };
                f.extend(b, c);
                f.extend(b, {
                    success: function (a) {
                        var b = [];
                        b.push("<InputProxyChannelStatusList>");
                        a = g.$XML(a).find("InputProxyChannelStatus", !0);
                        for (var d = 0, h = a.length; d < h; d++) {
                            var k = a[d];
                            b.push("<InputProxyChannelStatus>");
                            b.push("<id>" + g.$XML(k).find("id").eq(0).text() + "</id>");
                            b.push("<sourceInputPortDescriptor>");
                            b.push("<proxyProtocol>" + g.$XML(k).find("proxyProtocol").eq(0).text() + "</proxyProtocol>");
                            b.push("<addressingFormatType>" + g.$XML(k).find("addressingFormatType").eq(0).text() + "</addressingFormatType>");
                            b.push("<ipAddress>" + g.$XML(k).find("ipAddress").eq(0).text() + "</ipAddress>");
                            b.push("<managePortNo>" + g.$XML(k).find("managePortNo").eq(0).text() + "</managePortNo>");
                            b.push("<srcInputPort>" + g.$XML(k).find("srcInputPort").eq(0).text() +
                                "</srcInputPort>");
                            b.push("<userName>" + f.escape(g.$XML(k).find("userName").eq(0).text()) + "</userName>");
                            b.push("<streamType>" + g.$XML(k).find("streamType").eq(0).text() + "</streamType>");
                            b.push("<online>" + g.$XML(k).find("online").eq(0).text() + "</online>");
                            b.push("</sourceInputPortDescriptor>");
                            b.push("</InputProxyChannelStatus>")
                        }
                        b.push("</InputProxyChannelStatusList>");
                        a = f.loadXML(b.join(""));
                        c.success && c.success(a)
                    }, error: function (a, b) {
                        c.error && c.error(a, b)
                    }
                });
                d.setRequestParam(b);
                d.submitRequest()
            };
            n.prototype.getZeroChannelInfo = function (a, c) {
                var b = h(this.CGI.getZeroChannelInfo, a.szHttpProtocol, a.szIP, a.iHttpPort), d = new m, b = {
                    type: "GET",
                    url: b,
                    auth: a.szAuth,
                    success: null,
                    error: null
                };
                f.extend(b, c);
                f.extend(b, {
                    success: function (a) {
                        c.success && c.success(a)
                    }, error: function (a, b) {
                        c.error && c.error(a, b)
                    }
                });
                d.setRequestParam(b);
                d.submitRequest()
            };
            n.prototype.getPPPoEStatus = function (a, c) {
                var b = h(this.CGI.getPPPoEStatus, a.szHttpProtocol, a.szIP, a.iHttpPort), d = new m, b = {
                    type: "GET", url: b, auth: a.szAuth, success: null,
                    error: null
                };
                f.extend(b, c);
                f.extend(b, {
                    success: function (a) {
                        c.success && c.success(a)
                    }, error: function (a, b) {
                        c.error && c.error(a, b)
                    }
                });
                d.setRequestParam(b);
                d.submitRequest()
            };
            n.prototype.getUPnPPortStatus = function (a, c) {
                var b = h(this.CGI.getUPnPPortStatus, a.szHttpProtocol, a.szIP, a.iHttpPort), d = new m, b = {
                    type: "GET",
                    url: b,
                    auth: a.szAuth,
                    success: null,
                    error: null
                };
                f.extend(b, c);
                f.extend(b, {
                    success: function (a) {
                        c.success && c.success(a)
                    }, error: function (a, b) {
                        c.error && c.error(a, b)
                    }
                });
                d.setRequestParam(b);
                d.submitRequest()
            };
            n.prototype.getNetworkBond = function (a, c) {
                var b = h(this.CGI.getNetworkBond, a.szHttpProtocol, a.szIP, a.iHttpPort), d = new m, b = {
                    type: "GET",
                    url: b,
                    auth: a.szAuth,
                    success: null,
                    error: null
                };
                f.extend(b, c);
                f.extend(b, {
                    success: function (a) {
                        c.success && c.success(a)
                    }, error: function (a, b) {
                        c.error && c.error(a, b)
                    }
                });
                d.setRequestParam(b);
                d.submitRequest()
            };
            n.prototype.getNetworkInterface = function (a, c) {
                var b = h(this.CGI.getNetworkBond, a.szHttpProtocol, a.szIP, a.iHttpPort), d = new m, b = {
                    type: "GET", url: b, auth: a.szAuth, success: null,
                    error: null
                };
                f.extend(b, c);
                f.extend(b, {
                    success: function (a) {
                        c.success && c.success(a)
                    }, error: function (a, b) {
                        c.error && c.error(a, b)
                    }
                });
                d.setRequestParam(b);
                d.submitRequest()
            };
            n.prototype.getPortInfo = function (a, c) {
                var b = h(this.CGI.getPortInfo, a.szHttpProtocol, a.szIP, a.iHttpPort), d = new m, b = {
                    type: "GET",
                    url: b,
                    auth: a.szAuth,
                    success: null,
                    error: null
                };
                f.extend(b, c);
                f.extend(b, {
                    success: function (a) {
                        c.success && c.success(a)
                    }, error: function (a, b) {
                        c.error && c.error(a, b)
                    }
                });
                d.setRequestParam(b);
                d.submitRequest()
            };
            n.prototype.startRealPlay =
                function (a, c) {
                    var b = 100 * c.iChannelID + c.iStreamType, d = "", d = c.bZeroChannel ? h(this.CGI.startRealPlay.zeroChannels, "rtsp://", a.szIP, a.iRtspPort, b) : h(this.CGI.startRealPlay.channels, "rtsp://", a.szIP, a.iRtspPort, b), b = k.HWP_Play(d, a.szAuth, c.iWndIndex, "", "");
                    0 == b && (d = new C, d.iIndex = c.iWndIndex, d.szIP = a.szIP, d.iChannelID = c.iChannelID, d.iPlayStatus = 1, r.push(d));
                    return b
                };
            n.prototype.startVoiceTalk = function (a, c) {
                var b = h(this.CGI.startVoiceTalk.open, a.szHttpProtocol, a.szIP, a.iHttpPort, c), d = h(this.CGI.startVoiceTalk.close,
                    a.szHttpProtocol, a.szIP, a.iHttpPort, c), e = h(this.CGI.startVoiceTalk.audioData, a.szHttpProtocol, a.szIP, a.iHttpPort, c);
                return k.HWP_StartVoiceTalk(b, d, e, a.szAuth, a.iAudioType)
            };
            n.prototype.ptzAutoControl = function (a, c, b) {
                var d = c.iChannelID, e = "", l = "";
                b.iPTZSpeed = 7 > b.iPTZSpeed ? 15 * b.iPTZSpeed : 100;
                "IPDome" != a.szDeviceType ? (e = d <= a.iAnalogChannelNum ? h(this.CGI.ptzAutoControl.analog, a.szHttpProtocol, a.szIP, a.iHttpPort, c.iChannelID) : h(this.CGI.ptzAutoControl.digital, a.szHttpProtocol, a.szIP, a.iHttpPort, c.iChannelID),
                    l = "<?xml version='1.0' encoding='UTF-8'?><PTZData><autoPanData><autoPan>" + b.iPTZSpeed + "</autoPan></autoPanData></PTZData>") : (e = 99, 0 == b.iPTZSpeed && (e = 96), e = h(this.CGI.ptzAutoControl.ipdome, a.szHttpProtocol, a.szIP, a.iHttpPort, c.iChannelID, e));
                d = new m;
                a = {type: "PUT", url: e, async: !1, auth: a.szAuth, data: l, success: null, error: null};
                f.extend(a, b);
                f.extend(a, {
                    success: function (a) {
                        c.bPTZAuto = !c.bPTZAuto;
                        b.success && b.success(a)
                    }, error: function (a, c) {
                        b.error && b.error(a, c)
                    }
                });
                d.setRequestParam(a);
                d.submitRequest()
            };
            n.prototype.ptzControl = function (a, c, b) {
                var d = c.iChannelID, e = "";
                c.bPTZAuto && this.ptzAutoControl(a, c, {iPTZSpeed: 0});
                e = d <= a.iAnalogChannelNum ? h(this.CGI.ptzControl.analog, a.szHttpProtocol, a.szIP, a.iHttpPort, c.iChannelID) : h(this.CGI.ptzControl.digital, a.szHttpProtocol, a.szIP, a.iHttpPort, c.iChannelID);
                b.iPTZSpeed = 7 > b.iPTZSpeed ? 15 * b.iPTZSpeed : 100;
                c = [{}, {pan: 0, tilt: b.iPTZSpeed}, {pan: 0, tilt: -b.iPTZSpeed}, {
                    pan: -b.iPTZSpeed,
                    tilt: 0
                }, {pan: b.iPTZSpeed, tilt: 0}, {pan: -b.iPTZSpeed, tilt: b.iPTZSpeed}, {
                    pan: -b.iPTZSpeed,
                    tilt: -b.iPTZSpeed
                }, {pan: b.iPTZSpeed, tilt: b.iPTZSpeed}, {pan: b.iPTZSpeed, tilt: -b.iPTZSpeed}, {}, {
                    pan: 0,
                    tilt: 0
                }];
                d = "<?xml version='1.0' encoding='UTF-8'?><PTZData><pan>" + c[b.iPTZIndex].pan + "</pan><tilt>" + c[b.iPTZIndex].tilt + "</tilt></PTZData>";
                c = new m;
                a = {type: "PUT", url: e, async: !1, auth: a.szAuth, data: d, success: null, error: null};
                f.extend(a, b);
                f.extend(a, {
                    success: function (a) {
                        b.success && b.success(a)
                    }, error: function (a, c) {
                        b.error && b.error(a, c)
                    }
                });
                c.setRequestParam(a);
                c.submitRequest()
            };
            n.prototype.setPreset =
                function (a, c, b) {
                    var d = "", e = "", d = c.iChannelID <= a.iAnalogChannelNum ? h(this.CGI.setPreset.analog, a.szHttpProtocol, a.szIP, a.iHttpPort, c.iChannelID, b.iPresetID) : h(this.CGI.setPreset.digital, a.szHttpProtocol, a.szIP, a.iHttpPort, c.iChannelID, b.iPresetID), e = "<?xml version='1.0' encoding='UTF-8'?><PTZPreset>" + ("<id>" + b.iPresetID + "</id>");
                    "IPDome" != a.szDeviceType && (e += "<presetName>Preset" + b.iPresetID + "</presetName>");
                    e += "</PTZPreset>";
                    c = new m;
                    a = {type: "PUT", url: d, auth: a.szAuth, data: e, success: null, error: null};
                    f.extend(a, b);
                    f.extend(a, {
                        success: function (a) {
                            b.success && b.success(a)
                        }, error: function (a, c) {
                            b.error && b.error(a, c)
                        }
                    });
                    c.setRequestParam(a);
                    c.submitRequest()
                };
            n.prototype.goPreset = function (a, c, b) {
                var d = "", d = c.iChannelID <= a.iAnalogChannelNum ? h(this.CGI.goPreset.analog, a.szHttpProtocol, a.szIP, a.iHttpPort, c.iChannelID, b.iPresetID) : h(this.CGI.goPreset.digital, a.szHttpProtocol, a.szIP, a.iHttpPort, c.iChannelID, b.iPresetID);
                c = new m;
                a = {type: "PUT", url: d, auth: a.szAuth, success: null, error: null};
                f.extend(a, b);
                f.extend(a,
                    {
                        success: function (a) {
                            b.success && b.success(a)
                        }, error: function (a, c) {
                        b.error && b.error(a, c)
                    }
                    });
                c.setRequestParam(a);
                c.submitRequest()
            };
            n.prototype.recordSearch = function (a, c) {
                var b = "", d = "", e = c.iChannelID, d = c.szStartTime.replace(" ", "T") + "Z", l = c.szEndTime.replace(" ", "T") + "Z", b = h(this.CGI.recordSearch, a.szHttpProtocol, a.szIP, a.iHttpPort), d = "<?xml version='1.0' encoding='UTF-8'?><CMSearchDescription><searchID>" + new t + "</searchID><trackList><trackID>" + (100 * e + 1) + "</trackID></trackList><timeSpanList><timeSpan><startTime>" +
                    d + "</startTime><endTime>" + l + "</endTime></timeSpan></timeSpanList><maxResults>40</maxResults><searchResultPostion>" + c.iSearchPos + "</searchResultPostion><metadataList><metadataDescriptor>//metadata.ISAPI.org</metadataDescriptor></metadataList></CMSearchDescription>", e = new m, b = {
                    type: "POST",
                    url: b,
                    auth: a.szAuth,
                    data: d,
                    success: null,
                    error: null
                };
                f.extend(b, c);
                f.extend(b, {
                    success: function (a) {
                        var b = [];
                        b.push("<CMSearchResult>");
                        b.push("<responseStatus>" + g.$XML(a).find("responseStatus").eq(0).text() + "</responseStatus>");
                        b.push("<responseStatusStrg>" + g.$XML(a).find("responseStatusStrg").eq(0).text() + "</responseStatusStrg>");
                        b.push("<numOfMatches>" + g.$XML(a).find("numOfMatches").eq(0).text() + "</numOfMatches>");
                        b.push("<matchList>");
                        a = g.$XML(a).find("searchMatchItem", !0);
                        for (var d = 0, e = a.length; d < e; d++) {
                            var l = a[d];
                            b.push("<searchMatchItem>");
                            b.push("<trackID>" + g.$XML(l).find("trackID").eq(0).text() + "</trackID>");
                            b.push("<startTime>" + g.$XML(l).find("startTime").eq(0).text() + "</startTime>");
                            b.push("<endTime>" + g.$XML(l).find("endTime").eq(0).text() +
                                "</endTime>");
                            b.push("<playbackURI>" + f.escape(g.$XML(l).find("playbackURI").eq(0).text()) + "</playbackURI>");
                            b.push("<metadataDescriptor>" + g.$XML(l).find("metadataDescriptor").eq(0).text().split("/")[1] + "</metadataDescriptor>");
                            b.push("</searchMatchItem>")
                        }
                        b.push("</matchList>");
                        b.push("</CMSearchResult>");
                        a = f.loadXML(b.join(""));
                        c.success && c.success(a)
                    }, error: function (a, b) {
                        c.error && c.error(a, b)
                    }
                });
                e.setRequestParam(b);
                e.submitRequest()
            };
            n.prototype.startPlayback = function (a, c) {
                var b = c.iWndIndex, d =
                    c.szStartTime, e = c.szEndTime, l = h(this.CGI.startPlayback, "rtsp://", a.szIP, a.iRtspPort, 100 * c.iChannelID + 1, d, e), d = k.HWP_Play(l, a.szAuth, b, d, e);
                0 == d && (e = new C, e.iIndex = b, e.szIP = a.szIP, e.iChannelID = c.iChannelID, e.iPlayStatus = 2, r.push(e));
                return d
            };
            n.prototype.reversePlayback = function (a, c) {
                var b = c.iWndIndex, d = c.szStartTime, e = c.szEndTime, l = h(this.CGI.startPlayback, "rtsp://", a.szIP, a.iRtspPort, 100 * c.iChannelID + 1, d, e), d = k.HWP_ReversePlay(l, a.szAuth, b, d, e);
                0 == d && (e = new C, e.iIndex = b, e.szIP = a.szIP, e.iChannelID =
                    c.iChannelID, e.iPlayStatus = 5, r.push(e));
                return d
            };
            n.prototype.startDownloadRecord = function (a, c) {
                var b = h(this.CGI.startDownloadRecord, a.szHttpProtocol, a.szIP, a.iHttpPort);
                return k.HWP_StartDownload(b, a.szAuth, c.szFileName, "<?xml version='1.0' encoding='UTF-8'?><downloadRequest><playbackURI> " + c.szPlaybackURI + "</playbackURI></downloadRequest>")
            };
            n.prototype.exportDeviceConfig = function (a) {
                var c = h(this.CGI.deviceConfig, a.szHttpProtocol, a.szIP, a.iHttpPort);
                return k.HWP_ExportDeviceConfig(c, a.szAuth, "",
                    0)
            };
            n.prototype.importDeviceConfig = function (a, c) {
                var b = h(this.CGI.deviceConfig, a.szHttpProtocol, a.szIP, a.iHttpPort);
                return k.HWP_ImportDeviceConfig(b, a.szAuth, c.szFileName, 0)
            };
            n.prototype.restart = function (a, c) {
                var b = h(this.CGI.restart, a.szHttpProtocol, a.szIP, a.iHttpPort), d = new m, b = {
                    type: "PUT",
                    url: b,
                    auth: a.szAuth,
                    success: null,
                    error: null
                };
                f.extend(b, c);
                f.extend(b, {
                    success: function (a) {
                        c.success && c.success(a)
                    }, error: function (a, b) {
                        c.error && c.error(a, b)
                    }
                });
                d.setRequestParam(b);
                d.submitRequest()
            };
            n.prototype.restore =
                function (a, c, b) {
                    var d = h(this.CGI.restore, a.szHttpProtocol, a.szIP, a.iHttpPort, c);
                    c = new m;
                    a = {type: "PUT", url: d, auth: a.szAuth, success: null, error: null};
                    f.extend(a, b);
                    f.extend(a, {
                        success: function (a) {
                            b.success && b.success(a)
                        }, error: function (a, c) {
                            b.error && b.error(a, c)
                        }
                    });
                    c.setRequestParam(a);
                    c.submitRequest()
                };
            n.prototype.startUpgrade = function (a, c) {
                var b = h(this.CGI.startUpgrade.upgrade, a.szHttpProtocol, a.szIP, a.iHttpPort), d = h(this.CGI.startUpgrade.status, a.szHttpProtocol, a.szIP, a.iHttpPort);
                return k.HWP_StartUpgrade(b,
                    d, a.szAuth, c.szFileName)
            };
            n.prototype.set3DZoom = function (a, c, b, d) {
                c = h(this.CGI.set3DZoom, a.szHttpProtocol, a.szIP, a.iHttpPort, c.iChannelID);
                var e = f.loadXML(b);
                b = parseInt(g.$XML(e).find("StartPoint").eq(0).find("positionX").eq(0).text(), 10);
                var l = parseInt(g.$XML(e).find("StartPoint").eq(0).find("positionY").eq(0).text(), 10), k = parseInt(g.$XML(e).find("EndPoint").eq(0).find("positionX").eq(0).text(), 10), e = parseInt(g.$XML(e).find("EndPoint").eq(0).find("positionY").eq(0).text(), 10), l = "<?xml version='1.0' encoding='UTF-8'?><position3D><StartPoint><positionX>" +
                    b + "</positionX><positionY>" + (255 - l) + "</positionY></StartPoint><EndPoint><positionX>" + k + "</positionX><positionY>" + (255 - e) + "</positionY></EndPoint></position3D>";
                b = new m;
                a = {type: "PUT", url: c, data: l, auth: a.szAuth, success: null, error: null};
                f.extend(a, d);
                f.extend(a, {
                    success: function (a) {
                        d.success && d.success(a)
                    }, error: function (a, b) {
                        d.error && d.error(a, b)
                    }
                });
                b.setRequestParam(a);
                b.submitRequest()
            };
            n.prototype.zoomControl = function (a, c, b) {
                var d = "", d = c.iChannelID <= a.iAnalogChannelNum ? h(this.CGI.ptzControl.analog,
                    a.szHttpProtocol, a.szIP, a.iHttpPort, c.iChannelID) : h(this.CGI.ptzControl.digital, a.szHttpProtocol, a.szIP, a.iHttpPort, c.iChannelID), e = "<?xml version='1.0' encoding='UTF-8'?><PTZData><zoom>" + [{}, {zoom: b.iPTZSpeed}, {zoom: -b.iPTZSpeed}, {zoom: 0}][b.iPTZIndex].zoom + "</zoom></PTZData>";
                c = new m;
                a = {type: "PUT", url: d, async: !1, auth: a.szAuth, data: e, success: null, error: null};
                f.extend(a, b);
                f.extend(a, {
                    success: function (a) {
                        b.success && b.success(a)
                    }, error: function (a, c) {
                        b.error && b.error(a, c)
                    }
                });
                c.setRequestParam(a);
                c.submitRequest()
            };
            n.prototype.focusControl = function (a, c, b) {
                var d = "", d = h(this.CGI.setFocus, a.szHttpProtocol, a.szIP, a.iHttpPort, c.iChannelID), e = "<?xml version='1.0' encoding='UTF-8'?><FocusData version='1.0' xmlns='urn:psialliance-org'><focus>" + [{}, {zoom: b.iPTZSpeed}, {zoom: -b.iPTZSpeed}, {zoom: 0}][b.iPTZIndex].zoom + "</focus></PTZData>";
                c = new m;
                a = {type: "PUT", url: d, async: !1, auth: a.szAuth, data: e, success: null, error: null};
                f.extend(a, b);
                f.extend(a, {
                    success: function (a) {
                        b.success && b.success(a)
                    }, error: function (a, c) {
                        b.error && b.error(a,
                            c)
                    }
                });
                c.setRequestParam(a);
                c.submitRequest()
            };
            n.prototype.irisControl = function (a, c, b) {
                var d = "", d = h(this.CGI.setIris, a.szHttpProtocol, a.szIP, a.iHttpPort, c.iChannelID), e = "<?xml version='1.0' encoding='UTF-8'?><IrisData version='1.0' xmlns='urn:psialliance-org'><iris>" + [{}, {zoom: b.iPTZSpeed}, {zoom: -b.iPTZSpeed}, {zoom: 0}][b.iPTZIndex].zoom + "</iris></IrisData>";
                c = new m;
                a = {type: "PUT", url: d, async: !1, auth: a.szAuth, data: e, success: null, error: null};
                f.extend(a, b);
                f.extend(a, {
                    success: function (a) {
                        b.success && b.success(a)
                    },
                    error: function (a, c) {
                        b.error && b.error(a, c)
                    }
                });
                c.setRequestParam(a);
                c.submitRequest()
            };
            var q = function () {
            };
            q.prototype.CGI = {
                login: "%s%s:%s/PSIA/Custom/SelfExt/userCheck",
                getAudioInfo: "%s%s:%s/PSIA/Custom/SelfExt/TwoWayAudio/channels",
                getDeviceInfo: "%s%s:%s/PSIA/System/deviceInfo",
                getAnalogChannelInfo: "%s%s:%s/PSIA/System/Video/inputs/channels",
                getDigitalChannelInfo: "%s%s:%s/PSIA/Custom/SelfExt/ContentMgmt/DynVideo/inputs/channels/status",
                getZeroChannelInfo: "%s%s:%s/PSIA/Custom/SelfExt/ContentMgmt/ZeroVideo/channels",
                getStreamChannels: "%s%s:%s/PSIA/Streaming/channels",
                getStreamDynChannels: "%s%s:%s/PSIA/Custom/SelfExt/ContentMgmt/DynStreaming/channels",
                startRealPlay: {
                    channels: "%s%s:%s/PSIA/streaming/channels/%s",
                    zeroChannels: "%s%s:%s/PSIA/Custom/SelfExt/ContentMgmt/ZeroStreaming/channels/%s"
                },
                startVoiceTalk: {
                    open: "%s%s:%s/PSIA/Custom/SelfExt/TwoWayAudio/channels/%s/open",
                    close: "%s%s:%s/PSIA/Custom/SelfExt/TwoWayAudio/channels/%s/close",
                    audioData: "%s%s:%s/PSIA/Custom/SelfExt/TwoWayAudio/channels/%s/audioData"
                },
                ptzControl: "%s%s:%s/PSIA/PTZ/channels/%s/continuous",
                ptzAutoControl: "%s%s:%s/PSIA/Custom/SelfExt/PTZ/channels/%s/autoptz",
                setPreset: "%s%s:%s/PSIA/PTZ/channels/%s/presets/%s",
                goPreset: "%s%s:%s/PSIA/PTZ/channels/%s/presets/%s/goto",
                getNetworkBond: "%s%s:%s/PSIA/Custom/SelfExt/Bond",
                getNetworkInterface: "%s%s:%s/PSIA/System/Network/interfaces",
                getUPnPPortStatus: "%s%s:%s/PSIA/Custom/SelfExt/UPnP/ports/status",
                getPPPoEStatus: "%s%s:%s/PSIA/Custom/SelfExt/PPPoE/1/status",
                getPortInfo: "%s%s:%s/PSIA/Security/AAA/adminAccesses",
                recordSearch: "%s%s:%s/PSIA/ContentMgmt/search",
                startPlayback: "%s%s:%s/PSIA/streaming/tracks/%s?starttime=%s&endtime=%s",
                startDownloadRecord: "%s%s:%s/PSIA/Custom/SelfExt/ContentMgmt/download",
                deviceConfig: "%s%s:%s/PSIA/System/configurationData",
                restart: "%s%s:%s/PSIA/System/reboot",
                restore: "%s%s:%s/PSIA/System/factoryReset?mode=%s",
                startUpgrade: {
                    upgrade: "%s%s:%s/PSIA/System/updateFirmware",
                    status: "%s%s:%s/PSIA/Custom/SelfExt/upgradeStatus"
                },
                set3DZoom: "%s%s:%s/PSIA/Custom/SelfExt/PTZ/channels/%s/Set3DZoom",
                setFocus: "%s%s:%s/PSIA/System/Video/inputs/channels/%s/focus",
                setIris: "%s%s:%s/PSIA/System/Video/inputs/channels/%s/iris"
            };
            q.prototype.login = function (a, c, b, d) {
                c = h(this.CGI.login, 2 == d.protocol ? "https://" : "http://", a, c);
                a = new m;
                b = {type: "GET", url: c, auth: b, success: null, error: null};
                f.extend(b, d);
                f.extend(b, {
                    success: function (a) {
                        "200" == g.$XML(a).find("statusValue").eq(0).text() ? d.success && d.success(a) : d.error && d.error(401, a)
                    }, error: function (a, b) {
                        d.error && d.error(a, b)
                    }
                });
                a.setRequestParam(b);
                a.submitRequest()
            };
            q.prototype.getAudioInfo = function (a, c) {
                var b = h(this.CGI.getAudioInfo, a.szHttpProtocol, a.szIP, a.iHttpPort), d = new m, b = {
                    type: "GET",
                    url: b,
                    auth: a.szAuth,
                    success: null,
                    error: null
                };
                f.extend(b, c);
                f.extend(b, {
                    success: function (a) {
                        c.success && c.success(a)
                    }, error: function (a, b) {
                        c.error && c.error(a, b)
                    }
                });
                d.setRequestParam(b);
                d.submitRequest()
            };
            q.prototype.getDeviceInfo = function (a, c) {
                var b = h(this.CGI.getDeviceInfo, a.szHttpProtocol, a.szIP, a.iHttpPort), d = new m, b = {
                    type: "GET",
                    url: b,
                    auth: a.szAuth,
                    success: null,
                    error: null
                };
                f.extend(b, c);
                f.extend(b, {
                    success: function (a) {
                        var b = [];
                        b.push("<DeviceInfo>");
                        b.push("<deviceName>" + f.escape(g.$XML(a).find("deviceName").eq(0).text()) + "</deviceName>");
                        b.push("<deviceID>" + g.$XML(a).find("deviceID").eq(0).text() + "</deviceID>");
                        b.push("<deviceType>" + g.$XML(a).find("deviceDescription").eq(0).text() + "</deviceType>");
                        b.push("<model>" + g.$XML(a).find("model").eq(0).text() + "</model>");
                        b.push("<serialNumber>" + g.$XML(a).find("serialNumber").eq(0).text() + "</serialNumber>");
                        b.push("<macAddress>" +
                            g.$XML(a).find("macAddress").eq(0).text() + "</macAddress>");
                        b.push("<firmwareVersion>" + g.$XML(a).find("firmwareVersion").eq(0).text() + "</firmwareVersion>");
                        b.push("<firmwareReleasedDate>" + g.$XML(a).find("firmwareReleasedDate").eq(0).text() + "</firmwareReleasedDate>");
                        b.push("<encoderVersion>" + g.$XML(a).find("logicVersion").eq(0).text() + "</encoderVersion>");
                        b.push("<encoderReleasedDate>" + g.$XML(a).find("logicReleasedDate").eq(0).text() + "</encoderReleasedDate>");
                        b.push("</DeviceInfo>");
                        a = f.loadXML(b.join(""));
                        c.success && c.success(a)
                    }, error: function (a, b) {
                        c.error && c.error(a, b)
                    }
                });
                d.setRequestParam(b);
                d.submitRequest()
            };
            q.prototype.getAnalogChannelInfo = function (a, c) {
                var b = h(this.CGI.getAnalogChannelInfo, a.szHttpProtocol, a.szIP, a.iHttpPort), d = new m, b = {
                    type: "GET",
                    url: b,
                    auth: a.szAuth,
                    success: null,
                    error: null
                };
                f.extend(b, c);
                f.extend(b, {
                    success: function (a) {
                        var b = [];
                        b.push("<VideoInputChannelList>");
                        a = g.$XML(a).find("VideoInputChannel", !0);
                        for (var d = 0, k = a.length; d < k; d++) {
                            var h = a[d];
                            b.push("<VideoInputChannel>");
                            b.push("<id>" + g.$XML(h).find("id").eq(0).text() + "</id>");
                            b.push("<inputPort>" + g.$XML(h).find("inputPort").eq(0).text() + "</inputPort>");
                            b.push("<name>" + f.escape(g.$XML(h).find("name").eq(0).text()) + "</name>");
                            b.push("<videoFormat>" + g.$XML(h).find("videoFormat").eq(0).text() + "</videoFormat>");
                            b.push("</VideoInputChannel>")
                        }
                        b.push("</VideoInputChannelList>");
                        a = f.loadXML(b.join(""));
                        c.success && c.success(a)
                    }, error: function (a, b) {
                        c.error && c.error(a, b)
                    }
                });
                d.setRequestParam(b);
                d.submitRequest()
            };
            q.prototype.getDigitalChannelInfo =
                function (a, c) {
                    var b = h(this.CGI.getDigitalChannelInfo, a.szHttpProtocol, a.szIP, a.iHttpPort), d = new m, b = {
                        type: "GET",
                        url: b,
                        auth: a.szAuth,
                        success: null,
                        error: null
                    };
                    f.extend(b, c);
                    f.extend(b, {
                        success: function (a) {
                            var b = [];
                            b.push("<InputProxyChannelStatusList>");
                            a = g.$XML(a).find("DynVideoInputChannelStatus", !0);
                            for (var d = 0, k = a.length; d < k; d++) {
                                var h = a[d];
                                b.push("<InputProxyChannelStatus>");
                                b.push("<id>" + g.$XML(h).find("id").eq(0).text() + "</id>");
                                b.push("<sourceInputPortDescriptor>");
                                b.push("<proxyProtocol>" +
                                    g.$XML(h).find("adminProtocol").eq(0).text() + "</proxyProtocol>");
                                b.push("<addressingFormatType>" + g.$XML(h).find("addressingFormatType").eq(0).text() + "</addressingFormatType>");
                                b.push("<ipAddress>" + g.$XML(h).find("ipAddress").eq(0).text() + "</ipAddress>");
                                b.push("<managePortNo>" + g.$XML(h).find("adminPortNo").eq(0).text() + "</managePortNo>");
                                b.push("<srcInputPort>" + g.$XML(h).find("srcInputPort").eq(0).text() + "</srcInputPort>");
                                b.push("<userName>" + f.escape(g.$XML(h).find("userName").eq(0).text()) + "</userName>");
                                b.push("<streamType>" + g.$XML(h).find("streamType").eq(0).text() + "</streamType>");
                                b.push("<online>" + g.$XML(h).find("online").eq(0).text() + "</online>");
                                b.push("</sourceInputPortDescriptor>");
                                b.push("</InputProxyChannelStatus>")
                            }
                            b.push("</InputProxyChannelStatusList>");
                            a = f.loadXML(b.join(""));
                            c.success && c.success(a)
                        }, error: function (a, b) {
                            c.error && c.error(a, b)
                        }
                    });
                    d.setRequestParam(b);
                    d.submitRequest()
                };
            q.prototype.getZeroChannelInfo = function (a, c) {
                var b = h(this.CGI.getZeroChannelInfo, a.szHttpProtocol, a.szIP,
                    a.iHttpPort), d = new m, b = {type: "GET", url: b, auth: a.szAuth, success: null, error: null};
                f.extend(b, c);
                f.extend(b, {
                    success: function (a) {
                        c.success && c.success(a)
                    }, error: function (a, b) {
                        c.error && c.error(a, b)
                    }
                });
                d.setRequestParam(b);
                d.submitRequest()
            };
            q.prototype.getPPPoEStatus = function (a, c) {
                var b = h(this.CGI.getPPPoEStatus, a.szHttpProtocol, a.szIP, a.iHttpPort), d = new m, b = {
                    type: "GET",
                    url: b,
                    auth: a.szAuth,
                    success: null,
                    error: null
                };
                f.extend(b, c);
                f.extend(b, {
                    success: function (a) {
                        c.success && c.success(a)
                    }, error: function (a,
                                        b) {
                        c.error && c.error(a, b)
                    }
                });
                d.setRequestParam(b);
                d.submitRequest()
            };
            q.prototype.getUPnPPortStatus = function (a, c) {
                var b = h(this.CGI.getUPnPPortStatus, a.szHttpProtocol, a.szIP, a.iHttpPort), d = new m, b = {
                    type: "GET",
                    url: b,
                    auth: a.szAuth,
                    success: null,
                    error: null
                };
                f.extend(b, c);
                f.extend(b, {
                    success: function (a) {
                        c.success && c.success(a)
                    }, error: function (a, b) {
                        c.error && c.error(a, b)
                    }
                });
                d.setRequestParam(b);
                d.submitRequest()
            };
            q.prototype.getNetworkBond = function (a, c) {
                var b = h(this.CGI.getNetworkBond, a.szHttpProtocol, a.szIP,
                    a.iHttpPort), d = new m, b = {type: "GET", url: b, auth: a.szAuth, success: null, error: null};
                f.extend(b, c);
                f.extend(b, {
                    success: function (a) {
                        c.success && c.success(a)
                    }, error: function (a, b) {
                        c.error && c.error(a, b)
                    }
                });
                d.setRequestParam(b);
                d.submitRequest()
            };
            q.prototype.getNetworkInterface = function (a, c) {
                var b = h(this.CGI.getNetworkInterface, a.szHttpProtocol, a.szIP, a.iHttpPort), d = new m, b = {
                    type: "GET",
                    url: b,
                    auth: a.szAuth,
                    success: null,
                    error: null
                };
                f.extend(b, c);
                f.extend(b, {
                    success: function (a) {
                        c.success && c.success(a)
                    }, error: function (a,
                                        b) {
                        c.error && c.error(a, b)
                    }
                });
                d.setRequestParam(b);
                d.submitRequest()
            };
            q.prototype.getPortInfo = function (a, c) {
                var b = h(this.CGI.getPortInfo, a.szHttpProtocol, a.szIP, a.iHttpPort), d = new m, b = {
                    type: "GET",
                    url: b,
                    auth: a.szAuth,
                    success: null,
                    error: null
                };
                f.extend(b, c);
                f.extend(b, {
                    success: function (b) {
                        var d = [];
                        d.push("<AdminAccessProtocolList>");
                        for (var h = 0, k = g.$XML(b).find("AdminAccessProtocol", !0).length; h < k; h++)d.push("<AdminAccessProtocol>"), d.push("<id>" + g.$XML(b).find("id").eq(0).text() + "</id>"), d.push("<enabled>" +
                            g.$XML(b).find("enabled").eq(0).text() + "</enabled>"), d.push("<protocol>" + g.$XML(b).find("protocol").eq(0).text().toUpperCase() + "</protocol>"), d.push("<portNo>" + g.$XML(b).find("portNo").eq(0).text() + "</portNo>"), d.push("</AdminAccessProtocol>");
                        A.getStreamChannels(a, {
                            async: !1, success: function (b) {
                                0 < g.$XML(b).find("rtspPortNo", !0).length ? (iRtpsPort = parseInt(g.$XML(b).find("rtspPortNo").eq(0).text(), 10), d.push("<AdminAccessProtocol>"), d.push("<id>4</id>"), d.push("<enabled>true</enabled>"), d.push("<protocol>RTSP</protocol>"),
                                    d.push("<portNo>" + iRtpsPort + "</portNo>"), d.push("</AdminAccessProtocol>"), d.push("</AdminAccessProtocolList>"), b = f.loadXML(d.join("")), c.success && c.success(b)) : A.getStreamDynChannels(a, {
                                    async: !1, success: function (a) {
                                        0 < g.$XML(a).find("rtspPortNo", !0).length && (iRtpsPort = parseInt(g.$XML(a).find("rtspPortNo").eq(0).text(), 10), d.push("<AdminAccessProtocol>"), d.push("<id>4</id>"), d.push("<enabled>true</enabled>"), d.push("<protocol>RTSP</protocol>"), d.push("<portNo>" + iRtpsPort + "</portNo>"), d.push("</AdminAccessProtocol>"),
                                            d.push("</AdminAccessProtocolList>"), a = f.loadXML(d.join("")), c.success && c.success(a))
                                    }, error: function () {
                                        c.error && c.error()
                                    }
                                })
                            }, error: function () {
                                c.error && c.error()
                            }
                        })
                    }, error: function () {
                        c.error && c.error()
                    }
                });
                d.setRequestParam(b);
                d.submitRequest()
            };
            q.prototype.getStreamChannels = function (a, c) {
                var b = h(this.CGI.getStreamChannels, a.szHttpProtocol, a.szIP, a.iHttpPort), d = new m, b = {
                    type: "GET",
                    url: b,
                    auth: a.szAuth,
                    success: null,
                    error: null
                };
                f.extend(b, c);
                f.extend(b, {
                    success: function (a) {
                        c.success && c.success(a)
                    }, error: function (a,
                                        b) {
                        c.error && c.error(a, b)
                    }
                });
                d.setRequestParam(b);
                d.submitRequest()
            };
            q.prototype.getStreamDynChannels = function (a, c) {
                var b = h(this.CGI.getStreamDynChannels, a.szHttpProtocol, a.szIP, a.iHttpPort), d = new m, b = {
                    type: "GET",
                    url: b,
                    auth: a.szAuth,
                    success: null,
                    error: null
                };
                f.extend(b, c);
                f.extend(b, {
                    success: function (a) {
                        c.success && c.success(a)
                    }, error: function (a, b) {
                        c.error && c.error(a, b)
                    }
                });
                d.setRequestParam(b);
                d.submitRequest()
            };
            q.prototype.startRealPlay = function (a, c) {
                var b = 100 * c.iChannelID + c.iStreamType, d = "", d = c.bZeroChannel ?
                    h(this.CGI.startRealPlay.zeroChannels, "rtsp://", a.szIP, a.iRtspPort, b) : h(this.CGI.startRealPlay.channels, "rtsp://", a.szIP, a.iRtspPort, b), b = k.HWP_Play(d, a.szAuth, c.iWndIndex, "", "");
                0 == b && (d = new C, d.iIndex = c.iWndIndex, d.szIP = a.szIP, d.iChannelID = c.iChannelID, d.iPlayStatus = 1, r.push(d));
                return b
            };
            q.prototype.startVoiceTalk = function (a, c) {
                var b = h(this.CGI.startVoiceTalk.open, a.szHttpProtocol, a.szIP, a.iHttpPort, c), d = h(this.CGI.startVoiceTalk.close, a.szHttpProtocol, a.szIP, a.iHttpPort, c), e = h(this.CGI.startVoiceTalk.audioData,
                    a.szHttpProtocol, a.szIP, a.iHttpPort, c);
                return k.HWP_StartVoiceTalk(b, d, e, a.szAuth, a.iAudioType)
            };
            q.prototype.ptzAutoControl = function (a, c, b) {
                var d = "", e = "", d = h(this.CGI.ptzAutoControl, a.szHttpProtocol, a.szIP, a.iHttpPort, c.iChannelID);
                b.iPTZSpeed = 7 > b.iPTZSpeed ? 15 * b.iPTZSpeed : 100;
                var e = "<?xml version='1.0' encoding='UTF-8'?><PTZData><pan>" + b.iPTZSpeed + "</pan><tilt>0</tilt></PTZData>", g = new m;
                a = {type: "PUT", url: d, async: !1, auth: a.szAuth, data: e, success: null, error: null};
                f.extend(a, b);
                f.extend(a, {
                    success: function (a) {
                        c.bPTZAuto = !c.bPTZAuto;
                        b.success && b.success(a)
                    }, error: function (a, c) {
                        b.error && b.error(a, c)
                    }
                });
                g.setRequestParam(a);
                g.submitRequest()
            };
            q.prototype.ptzControl = function (a, c, b) {
                var d = "";
                c.bPTZAuto && this.ptzAutoControl(a, c, {iPTZSpeed: 0});
                d = h(this.CGI.ptzControl, a.szHttpProtocol, a.szIP, a.iHttpPort, c.iChannelID);
                b.iPTZSpeed = 7 > b.iPTZSpeed ? 15 * b.iPTZSpeed : 100;
                c = [{}, {pan: 0, tilt: b.iPTZSpeed}, {pan: 0, tilt: -b.iPTZSpeed}, {
                    pan: -b.iPTZSpeed,
                    tilt: 0
                }, {pan: b.iPTZSpeed, tilt: 0}, {pan: -b.iPTZSpeed, tilt: b.iPTZSpeed}, {
                    pan: -b.iPTZSpeed,
                    tilt: -b.iPTZSpeed
                }, {pan: b.iPTZSpeed, tilt: b.iPTZSpeed}, {pan: b.iPTZSpeed, tilt: -b.iPTZSpeed}, {}, {
                    pan: 0,
                    tilt: 0
                }];
                var e = "<?xml version='1.0' encoding='UTF-8'?><PTZData><pan>" + c[b.iPTZIndex].pan + "</pan><tilt>" + c[b.iPTZIndex].tilt + "</tilt></PTZData>";
                c = new m;
                a = {type: "PUT", url: d, async: !1, auth: a.szAuth, data: e, success: null, error: null};
                f.extend(a, b);
                f.extend(a, {
                    success: function (a) {
                        b.success && b.success(a)
                    }, error: function (a, c) {
                        b.error && b.error(a, c)
                    }
                });
                c.setRequestParam(a);
                c.submitRequest()
            };
            q.prototype.setPreset =
                function (a, c, b) {
                    var d = "", e = "", d = h(this.CGI.setPreset, a.szHttpProtocol, a.szIP, a.iHttpPort, c.iChannelID, b.iPresetID), e = "<?xml version='1.0' encoding='UTF-8'?><PTZPreset>" + ("<id>" + b.iPresetID + "</id>");
                    "IPDome" != a.szDeviceType && (e += "<presetName>Preset" + b.iPresetID + "</presetName>");
                    e += "</PTZPreset>";
                    c = new m;
                    a = {type: "PUT", url: d, auth: a.szAuth, data: e, success: null, error: null};
                    f.extend(a, b);
                    f.extend(a, {
                        success: function (a) {
                            b.success && b.success(a)
                        }, error: function (a, c) {
                            b.error && b.error(a, c)
                        }
                    });
                    c.setRequestParam(a);
                    c.submitRequest()
                };
            q.prototype.goPreset = function (a, c, b) {
                var d = "", d = h(this.CGI.goPreset, a.szHttpProtocol, a.szIP, a.iHttpPort, c.iChannelID, b.iPresetID);
                c = new m;
                a = {type: "PUT", url: d, auth: a.szAuth, success: null, error: null};
                f.extend(a, b);
                f.extend(a, {
                    success: function (a) {
                        b.success && b.success(a)
                    }, error: function (a, c) {
                        b.error && b.error(a, c)
                    }
                });
                c.setRequestParam(a);
                c.submitRequest()
            };
            q.prototype.recordSearch = function (a, c) {
                var b = "", d = "", e = c.iChannelID, d = c.szStartTime.replace(" ", "T") + "Z", l = c.szEndTime.replace(" ",
                        "T") + "Z", b = h(this.CGI.recordSearch, a.szHttpProtocol, a.szIP, a.iHttpPort), d = "<?xml version='1.0' encoding='UTF-8'?><CMSearchDescription><searchID>" + new t + "</searchID><trackList><trackID>" + (100 * e + 1) + "</trackID></trackList><timeSpanList><timeSpan><startTime>" + d + "</startTime><endTime>" + l + "</endTime></timeSpan></timeSpanList><maxResults>40</maxResults><searchResultPostion>" + c.iSearchPos + "</searchResultPostion><metadataList><metadataDescriptor>//metadata.psia.org</metadataDescriptor></metadataList></CMSearchDescription>",
                    e = new m, b = {type: "POST", url: b, auth: a.szAuth, data: d, success: null, error: null};
                f.extend(b, c);
                f.extend(b, {
                    success: function (a) {
                        var b = [];
                        b.push("<CMSearchResult>");
                        b.push("<responseStatus>" + g.$XML(a).find("responseStatus").eq(0).text() + "</responseStatus>");
                        b.push("<responseStatusStrg>" + g.$XML(a).find("responseStatusStrg").eq(0).text() + "</responseStatusStrg>");
                        b.push("<numOfMatches>" + g.$XML(a).find("numOfMatches").eq(0).text() + "</numOfMatches>");
                        b.push("<matchList>");
                        a = g.$XML(a).find("searchMatchItem", !0);
                        for (var d = 0, e = a.length; d < e; d++) {
                            var l = a[d];
                            b.push("<searchMatchItem>");
                            b.push("<trackID>" + g.$XML(l).find("trackID").eq(0).text() + "</trackID>");
                            b.push("<startTime>" + g.$XML(l).find("startTime").eq(0).text() + "</startTime>");
                            b.push("<endTime>" + g.$XML(l).find("endTime").eq(0).text() + "</endTime>");
                            b.push("<playbackURI>" + f.escape(g.$XML(l).find("playbackURI").eq(0).text()) + "</playbackURI>");
                            b.push("<metadataDescriptor>" + g.$XML(l).find("metadataDescriptor").eq(0).text().split("/")[1] + "</metadataDescriptor>");
                            b.push("</searchMatchItem>")
                        }
                        b.push("</matchList>");
                        b.push("</CMSearchResult>");
                        a = f.loadXML(b.join(""));
                        c.success && c.success(a)
                    }, error: function (a, b) {
                        c.error && c.error(a, b)
                    }
                });
                e.setRequestParam(b);
                e.submitRequest()
            };
            q.prototype.startPlayback = function (a, c) {
                var b = c.iWndIndex, d = c.szStartTime, e = c.szEndTime, f = h(this.CGI.startPlayback, "rtsp://", a.szIP, a.iRtspPort, 100 * c.iChannelID + 1, d, e), d = k.HWP_Play(f, a.szAuth, b, d, e);
                0 == d && (e = new C, e.iIndex = b, e.szIP = a.szIP, e.iChannelID = c.iChannelID, e.iPlayStatus = 2, r.push(e));
                return d
            };
            q.prototype.reversePlayback = function (a, c) {
                var b = c.iWndIndex, d = c.szStartTime, e = c.szEndTime, f = h(this.CGI.startPlayback, "rtsp://", a.szIP, a.iRtspPort, 100 * c.iChannelID + 1, d, e), d = k.HWP_ReversePlay(f, a.szAuth, b, d, e);
                0 == d && (e = new C, e.iIndex = b, e.szIP = a.szIP, e.iChannelID = c.iChannelID, e.iPlayStatus = 5, r.push(e));
                return d
            };
            q.prototype.startDownloadRecord = function (a, c) {
                var b = h(this.CGI.startDownloadRecord, a.szHttpProtocol, a.szIP, a.iHttpPort);
                return k.HWP_StartDownload(b, a.szAuth, c.szFileName, "<?xml version='1.0' encoding='UTF-8'?><downloadRequest><playbackURI> " +
                    c.szPlaybackURI + "</playbackURI></downloadRequest>")
            };
            q.prototype.exportDeviceConfig = function (a) {
                var c = h(this.CGI.deviceConfig, a.szHttpProtocol, a.szIP, a.iHttpPort);
                return k.HWP_ExportDeviceConfig(c, a.szAuth, "", 0)
            };
            q.prototype.importDeviceConfig = function (a, c) {
                var b = h(this.CGI.deviceConfig, a.szHttpProtocol, a.szIP, a.iHttpPort);
                return k.HWP_ImportDeviceConfig(b, a.szAuth, c.szFileName, 0)
            };
            q.prototype.restart = function (a, c) {
                var b = h(this.CGI.restart, a.szHttpProtocol, a.szIP, a.iHttpPort), d = new m, b = {
                    type: "PUT",
                    url: b, auth: a.szAuth, success: null, error: null
                };
                f.extend(b, c);
                f.extend(b, {
                    success: function (a) {
                        c.success && c.success(a)
                    }, error: function (a, b) {
                        c.error && c.error(a, b)
                    }
                });
                d.setRequestParam(b);
                d.submitRequest()
            };
            q.prototype.restore = function (a, c, b) {
                var d = h(this.CGI.restore, a.szHttpProtocol, a.szIP, a.iHttpPort, c);
                c = new m;
                a = {type: "PUT", url: d, auth: a.szAuth, success: null, error: null};
                f.extend(a, b);
                f.extend(a, {
                    success: function (a) {
                        b.success && b.success(a)
                    }, error: function (a, c) {
                        b.error && b.error(a, c)
                    }
                });
                c.setRequestParam(a);
                c.submitRequest()
            };
            q.prototype.startUpgrade = function (a, c) {
                var b = h(this.CGI.startUpgrade.upgrade, a.szHttpProtocol, a.szIP, a.iHttpPort), d = h(this.CGI.startUpgrade.status, a.szHttpProtocol, a.szIP, a.iHttpPort);
                return k.HWP_StartUpgrade(b, d, a.szAuth, c.szFileName)
            };
            q.prototype.set3DZoom = function (a, c, b, d) {
                var e = h(this.CGI.set3DZoom, a.szHttpProtocol, a.szIP, a.iHttpPort, c.iChannelID);
                c = new m;
                a = {type: "PUT", url: e, data: b, auth: a.szAuth, success: null, error: null};
                f.extend(a, d);
                f.extend(a, {
                    success: function (a) {
                        d.success &&
                        d.success(a)
                    }, error: function (a, b) {
                        d.error && d.error(a, b)
                    }
                });
                c.setRequestParam(a);
                c.submitRequest()
            };
            q.prototype.zoomControl = function (a, c, b) {
                var d = "", d = h(this.CGI.ptzControl, a.szHttpProtocol, a.szIP, a.iHttpPort, c.iChannelID), e = "<?xml version='1.0' encoding='UTF-8'?><PTZData><zoom>" + [{}, {zoom: b.iPTZSpeed}, {zoom: -b.iPTZSpeed}, {zoom: 0}][b.iPTZIndex].zoom + "</zoom></PTZData>";
                c = new m;
                a = {type: "PUT", url: d, async: !1, auth: a.szAuth, data: e, success: null, error: null};
                f.extend(a, b);
                f.extend(a, {
                    success: function (a) {
                        b.success &&
                        b.success(a)
                    }, error: function (a, c) {
                        b.error && b.error(a, c)
                    }
                });
                c.setRequestParam(a);
                c.submitRequest()
            };
            q.prototype.focusControl = function (a, c, b) {
                var d = "", d = h(this.CGI.setFocus, a.szHttpProtocol, a.szIP, a.iHttpPort, c.iChannelID), e = "<?xml version='1.0' encoding='UTF-8'?><FocusData version='1.0' xmlns='urn:psialliance-org'><focus>" + [{}, {zoom: b.iPTZSpeed}, {zoom: -b.iPTZSpeed}, {zoom: 0}][b.iPTZIndex].zoom + "</focus></FocusData>";
                c = new m;
                a = {type: "PUT", url: d, async: !1, auth: a.szAuth, data: e, success: null, error: null};
                f.extend(a, b);
                f.extend(a, {
                    success: function (a) {
                        b.success && b.success(a)
                    }, error: function (a, c) {
                        b.error && b.error(a, c)
                    }
                });
                c.setRequestParam(a);
                c.submitRequest()
            };
            q.prototype.irisControl = function (a, c, b) {
                var d = "", d = h(this.CGI.setIris, a.szHttpProtocol, a.szIP, a.iHttpPort, c.iChannelID), e = "<?xml version='1.0' encoding='UTF-8'?><IrisData version='1.0' xmlns='urn:psialliance-org'><iris>" + [{}, {zoom: b.iPTZSpeed}, {zoom: -b.iPTZSpeed}, {zoom: 0}][b.iPTZIndex].zoom + "</iris></IrisData>";
                c = new m;
                a = {
                    type: "PUT", url: d, async: !1,
                    auth: a.szAuth, data: e, success: null, error: null
                };
                f.extend(a, b);
                f.extend(a, {
                    success: function (a) {
                        b.success && b.success(a)
                    }, error: function (a, c) {
                        b.error && b.error(a, c)
                    }
                });
                c.setRequestParam(a);
                c.submitRequest()
            };
            var P = function () {
            };
            P.prototype._alert = function (a) {
                v.bDebugMode && console.log(a)
            };
            (function (a) {
                var c = function (a) {
                    this.elems = [];
                    this.length = 0;
                    this.length = this.elems.push(a)
                };
                c.prototype.find = function (a, c) {
                    var e = this.elems[this.length - 1].getElementsByTagName(a);
                    this.length = this.elems.push(e);
                    return c ? e :
                        this
                };
                c.prototype.eq = function (a, c) {
                    var e = this.elems[this.length - 1].length, f = null;
                    0 < e && a < e && (f = this.elems[this.length - 1][a]);
                    this.length = this.elems.push(f);
                    return c ? f : this
                };
                c.prototype.text = function (a) {
                    if (this.elems[this.length - 1])if (a)w.DOMParser ? this.elems[this.length - 1].textContent = a : this.elems[this.length - 1].text = a; else return w.DOMParser ? this.elems[this.length - 1].textContent : this.elems[this.length - 1].text; else return ""
                };
                c.prototype.attr = function (a) {
                    if (this.elems[this.length - 1])return (a = this.elems[this.length -
                    1].attributes.getNamedItem(a)) ? a.value : ""
                };
                a.$XML = function (a) {
                    return new c(a)
                }
            })(this);
            var y = function () {
            };
            y.prototype.extend = function () {
                for (var a = arguments[0] || {}, c = 1, b = arguments.length, d; c < b; c++)if (null != (d = arguments[c]))for (var e in d) {
                    var f = d[e];
                    a !== f && ("object" == typeof f ? a[e] = this.extend({}, f) : void 0 !== f && (a[e] = f))
                }
                return a
            };
            y.prototype.browser = function () {
                var a = /(opera)(?:.*version)?[ \/]([\w.]+)/, c = /(msie) ([\w.]+)/, b = /(trident.*rv:)([\w.]+)/, d = /(mozilla)(?:.*? rv:([\w.]+))?/, e = navigator.userAgent.toLowerCase(),
                    a = /(webkit)[ \/]([\w.]+)/.exec(e) || a.exec(e) || c.exec(e) || b.exec(e) || 0 > e.indexOf("compatible") && d.exec(e) || ["unknow", "0"];
                0 < a.length && -1 < a[1].indexOf("trident") && (a[1] = "msie");
                "webkit" == a[1] && (-1 < e.indexOf("chrome") ? a[1] = "chrome" : a[1] = "safari");
                e = {};
                e[a[1]] = !0;
                e.version = a[2];
                return e
            };
            y.prototype.loadXML = function (a) {
                if (null == a || "" == a)return null;
                var c = null;
                w.DOMParser ? c = (new DOMParser).parseFromString(a, "text/xml") : (c = new ActiveXObject("Microsoft.XMLDOM"), c.async = !1, c.loadXML(a));
                return c
            };
            y.prototype.toXMLStr =
                function (a) {
                    var c = "";
                    try {
                        c = (new XMLSerializer).serializeToString(a)
                    } catch (b) {
                        try {
                            c = a.xml
                        } catch (d) {
                            return ""
                        }
                    }
                    -1 == c.indexOf("<?xml") && (c = "<?xml version='1.0' encoding='utf-8'?>" + c);
                    return c
                };
            y.prototype.escape = function (a) {
                return a.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
            };
            y.prototype.dateFormat = function (a, c) {
                var b = {
                    "M+": a.getMonth() + 1,
                    "d+": a.getDate(),
                    "h+": a.getHours(),
                    "m+": a.getMinutes(),
                    "s+": a.getSeconds(),
                    "q+": Math.floor((a.getMonth() + 3) / 3),
                    S: a.getMilliseconds()
                };
                /(y+)/.test(c) &&
                (c = c.replace(RegExp.$1, (a.getFullYear() + "").substr(4 - RegExp.$1.length)));
                for (var d in b)RegExp("(" + d + ")").test(c) && (c = c.replace(RegExp.$1, 1 == RegExp.$1.length ? b[d] : ("00" + b[d]).substr(("" + b[d]).length)));
                return c
            };
            y.prototype.Base64 = {
                _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode: function (a) {
                    var c = "", b, d, e, f, g, h, k = 0;
                    for (a = y.prototype.Base64._utf8_encode(a); k < a.length;)b = a.charCodeAt(k++), d = a.charCodeAt(k++), e = a.charCodeAt(k++), f = b >> 2, b = (b & 3) << 4 | d >> 4, g = (d & 15) << 2 | e >>
                        6, h = e & 63, isNaN(d) ? g = h = 64 : isNaN(e) && (h = 64), c = c + this._keyStr.charAt(f) + this._keyStr.charAt(b) + this._keyStr.charAt(g) + this._keyStr.charAt(h);
                    return c
                }, decode: function (a) {
                    var c = "", b, d, e, f, g, h = 0;
                    for (a = a.replace(/[^A-Za-z0-9\+\/\=]/g, ""); h < a.length;)b = this._keyStr.indexOf(a.charAt(h++)), d = this._keyStr.indexOf(a.charAt(h++)), f = this._keyStr.indexOf(a.charAt(h++)), g = this._keyStr.indexOf(a.charAt(h++)), b = b << 2 | d >> 4, d = (d & 15) << 4 | f >> 2, e = (f & 3) << 6 | g, c += String.fromCharCode(b), 64 != f && (c += String.fromCharCode(d)), 64 !=
                    g && (c += String.fromCharCode(e));
                    return c = y.prototype.Base64._utf8_decode(c)
                }, _utf8_encode: function (a) {
                    a = a.replace(/\r\n/g, "\n");
                    for (var c = "", b = 0; b < a.length; b++) {
                        var d = a.charCodeAt(b);
                        128 > d ? c += String.fromCharCode(d) : (127 < d && 2048 > d ? c += String.fromCharCode(d >> 6 | 192) : (c += String.fromCharCode(d >> 12 | 224), c += String.fromCharCode(d >> 6 & 63 | 128)), c += String.fromCharCode(d & 63 | 128))
                    }
                    return c
                }, _utf8_decode: function (a) {
                    for (var c = "", b = 0, d = c1 = c2 = 0; b < a.length;)d = a.charCodeAt(b), 128 > d ? (c += String.fromCharCode(d), b++) : 191 <
                    d && 224 > d ? (c2 = a.charCodeAt(b + 1), c += String.fromCharCode((d & 31) << 6 | c2 & 63), b += 2) : (c2 = a.charCodeAt(b + 1), c3 = a.charCodeAt(b + 2), c += String.fromCharCode((d & 15) << 12 | (c2 & 63) << 6 | c3 & 63), b += 3);
                    return c
                }
            };
            t.prototype.valueOf = function () {
                return this.id
            };
            t.prototype.toString = function () {
                return this.id
            };
            t.prototype.createUUID = function () {
                var a = new Date(1582, 10, 15, 0, 0, 0, 0), c = (new Date).getTime() - a.getTime(), a = t.getIntegerBits(c, 0, 31), b = t.getIntegerBits(c, 32, 47), c = t.getIntegerBits(c, 48, 59) + "1", d = t.getIntegerBits(t.rand(4095),
                    0, 7), e = t.getIntegerBits(t.rand(4095), 0, 7), f = t.getIntegerBits(t.rand(8191), 0, 7) + t.getIntegerBits(t.rand(8191), 8, 15) + t.getIntegerBits(t.rand(8191), 0, 7) + t.getIntegerBits(t.rand(8191), 8, 15) + t.getIntegerBits(t.rand(8191), 0, 15);
                return a + "-" + b + "-" + c + "-" + d + e + "-" + f
            };
            t.getIntegerBits = function (a, c, b) {
                a = t.returnBase(a, 16);
                for (var d = [], e = "", f = 0, f = 0; f < a.length; f++)d.push(a.substring(f, f + 1));
                for (f = Math.floor(c / 4); f <= Math.floor(b / 4); f++)e = d[f] && "" != d[f] ? e + d[f] : e + "0";
                return e
            };
            t.returnBase = function (a, c) {
                var b = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
                if (a < c)b = b[a]; else var d = "" + Math.floor(a / c), e = a - d * c, b = d >= c ? this.returnBase(d, c) + b[e] : b[d] + b[e];
                return b
            };
            t.rand = function (a) {
                return Math.floor(Math.random() * a)
            };
            H = new n;
            A = new q;
            L = new P;
            f = new y;
            n = f.dateFormat(new Date, "yyyyMMddhhmmss");
            x = "webVideoCtrl" + n;
            D = "webVideoCtrl" + n;
            "object" != typeof w.attachEvent && f.browser().msie && (n = "<script for=" + x + " event='GetSelectWndInfo(SelectWndInfo)'>GetSelectWndInfo(SelectWndInfo);\x3c/script>" + ("<script for=" + x + " event='ZoomInfoCallback(ZoomInfoCallback)'>ZoomInfoCallback(ZoomInfoCallback);\x3c/script>"),
                n += "<script for=" + x + "  event='GetHttpInfo(lID, lpInfo, lReverse)'>GetHttpInfo(lID, lpInfo, lReverse);\x3c/script>", n += "<script for=" + x + "  event='PluginEventHandler(iEventType, iParam1, iParam2)'>PluginEventHandler(iEventType, iParam1, iParam2);\x3c/script>", document.write(n));
            return this
        }(), g = w.WebVideoCtrl = K;
        g.version = "1.0.1"
    }
})(this);
