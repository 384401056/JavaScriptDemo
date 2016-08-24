var Util;
(function () {
    Date.prototype.format = function (e) {
        var f = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "h+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3),
            S: this.getMilliseconds()
        };
        /(y+)/.test(e) && (e = e.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)));
        for (var g in f)RegExp("(" + g + ")").test(e) && (e = e.replace(RegExp.$1, 1 == RegExp.$1.length ? f[g] : ("00" + f[g]).substr(("" + f[g]).length)));
        return e
    };
    Util = {
        loadCSS: function (e) {
            $("head").append("<link>");
            $("head").children(":last").attr({
                rel: "stylesheet",
                type: "text/css", href: e
            })
        }, parseISO8601Date: function (e) {
            var f = new Date(NaN), g = /^\s*(\d{4})-(\d\d)-(\d\d)\s*$/.exec(e);
            g && (e = +g[2], f.setFullYear(g[1], e - 1, g[3]), e != f.getMonth() + 1 && f.setTime(NaN));
            return f
        }, parseDate: function (e) {
            e = e.match(/(\d+)/g);
            5 == e.length && e.push("00");
            return new Date(e[0], e[1] - 1, e[2], e[3], e[4], e[5])
        }, isDate: function (e) {
            return e ? -1 != e.indexOf("/Date(") ? "isDate" : "isnotDate" : "isnotDate"
        }, toDateTime: function (e) {
            if (-1 != e.indexOf("/Date("))return new Date(parseInt(e.replace("/Date(",
                "").replace(")/", ""), 10));
            var f = new Date(e);
            "NaN" == f ? f = Util.parseISO8601Date(e) : "Invalid Date" == f && (f = Util.parseDate(e));
            return f
        }, formatDateTime: function (e, f) {
            return null != e ? Util.toDateTime(e).format(f) : ""
        }, toDate: function (e) {
            return null != e ? Util.toDateTime(e).format("yyyy-MM-dd") : ""
        }, toDateEntire: function (e) {
            return null != e ? Util.toDateTime(e).format("yyyy-MM-dd hh:mm:ss") : ""
        }, toSimpleDate: function (e) {
            return null != e ? Util.toDateTime(e).format("yyyy-MM-dd hh:mm") : ""
        }, toShortDateTime: function (e) {
            return null !=
            e ? Util.toDateTime(e).format("MM-dd hh:mm") : ""
        }, toDateDay: function (e) {
            return null != e ? Util.toDateTime(e).format("MM-dd") : ""
        }, toTime: function (e) {
            return null != e ? Util.toDateTime(e).format("hh:mm") : ""
        }, SecondsToTime: function (e) {
            var f, g = Math.floor(e / 60), h = f = 0;
            60 <= g ? (h = g % 60, f = Math.floor(g / 60)) : h = g;
            var k = g = 0;
            24 <= f ? (k = f % 24, g = Math.floor(f / 24)) : k = f;
            f = "" + (g + "\u5929") + (k + "\u65f6");
            f += h + "\u5206";
            return f += e % 60 + "\u79d2"
        }, getFullYear: function (e) {
            return null != e ? Util.toDateTime(e).format("yyyy") : ""
        }, getMonth: function (e) {
            return null !=
            e ? Util.toDateTime(e).format("MM") : ""
        }, getDay: function (e) {
            return null != e ? Util.toDateTime(e).format("d") : ""
        }, getHour: function (e) {
            return null != e ? Util.toDateTime(e).format("hh") : ""
        }, getMinute: function (e) {
            return null != e ? Util.toDateTime(e).format("mm") : ""
        }, DelHtml: function (e) {
            a = e.indexOf("<");
            b = e.indexOf(">");
            len = e.length;
            c = e.substring(0, a);
            -1 == b && (b = a);
            d = e.substring(b + 1, len);
            e = c + d;
            tagCheck = e.indexOf("<");
            -1 != tagCheck && (e = Util.DelHtml(e));
            return e
        }, getImgVisibleCss: function (e) {
            return e && "" != e ? "" : "display-none"
        },
        getStatusVisible: function (e) {
            var f = "";
            switch (e) {
                case 14:
                    f = "display-none"
            }
            return f
        }, getImageSize: function (e) {
            var f = new Image;
            f.src = e;
            return f.width + "*" + f.height
        }, getSubstr: function (e, f) {
            return e && e.length > f ? e.substr(0, f) + "..." : e
        }, toNumberic: function (e) {
            return $.isNumeric(e) ? e : 0
        }, getCurentTime: function () {
            var e = new Date, f = e.getFullYear(), g = e.getMonth() + 1, h = e.getDate(), k = e.getHours(), e = e.getMinutes(), f = f + "-";
            10 > g && (f += "0");
            f += g + "-";
            10 > h && (f += "0");
            f += h + " ";
            10 > k && (f += "0");
            f += k + ":";
            10 > e && (f += "0");
            return f +
                e
        }, getNowFormatDate: function () {
            var e = new Date, f = 0, g = 0, h = 0, k = "", f = e.getFullYear(), g = e.getMonth() + 1, h = e.getDate(), k = k + (f + "-"), k = 10 <= g ? k + (g + "-") : k + ("0" + g + "-");
            return 10 <= h ? k + h : k + ("0" + h)
        }, date2str: function (e, f, g, h, k) {
            e = Date.UTC(e, f, g);
            k *= 864E5;
            k = new Date("pre" == h ? e - k : e + k);
            h = k.getUTCFullYear() + "-";
            h += ("00" + (k.getUTCMonth() + 1)).slice(-2) + "-";
            return h += ("00" + k.getUTCDate()).slice(-2)
        }, str2date: function (e, f, g) {
            var h, k;
            (arr = e.match(/^(\/d{4})-(\/d{1,2})-(\/d{1,2})$/)) ? (k = Number(arr[1]), e = Number(arr[2]) - 1,
                h = Number(arr[3])) : (h = new Date, k = h.getUTCFullYear(), e = ("00" + h.getUTCMonth()).slice(-2), h = ("00" + h.getUTCDate()).slice(-2));
            if (null == f || "pre" != f && "next" != f)f = "pre";
            return Util.date2str(k, e, h, f, g)
        }, getNowFormatToDate: function () {
            var e = new Date, f = 0, g = 0, h = 0, k = "", f = e.getFullYear(), g = e.getMonth() + 1, h = e.getDate(), k = k + (f + "/"), k = 10 <= g ? k + (g + "/") : k + ("0" + g + "/");
            return 10 <= h ? k + h : k + ("0" + h)
        }, dateTo2str: function (e, f, g, h, k) {
            e = Date.UTC(e, f, g);
            k *= 864E5;
            k = new Date("pre" == h ? e - k : e + k);
            h = k.getUTCFullYear() + "/";
            h += ("00" + (k.getUTCMonth() +
                1)).slice(-2) + "/";
            return h += ("00" + k.getUTCDate()).slice(-2)
        }, strTo2date: function (e, f, g) {
            var h, k;
            (arr = e.match(/^(\/d{4})-(\/d{1,2})-(\/d{1,2})$/)) ? (k = Number(arr[1]), e = Number(arr[2]) - 1, h = Number(arr[3])) : (h = new Date, k = h.getUTCFullYear(), e = ("00" + h.getUTCMonth()).slice(-2), h = ("00" + h.getUTCDate()).slice(-2));
            if (null == f || "pre" != f && "next" != f)f = "pre";
            return Util.dateTo2str(k, e, h, f, g)
        }, urlParam: function (e) {
            e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            e = RegExp("[\\?&]" + e + "=([^&#]*)").exec(window.location.search);
            return null == e ? "" : decodeURIComponent(e[1].replace(/\+/g, " "))
        }, countTimeLength: function (e, f, g) {
            var h = {D: 864E5, H: 36E5, M: 6E4, S: 1E3, T: 1};
            e = e.toUpperCase();
            f = Date.parse(f.replace(/-/g, "/"));
            g = Date.parse(g.replace(/-/g, "/"));
            try {
                return ((g - f) / h[e]).toFixed(0)
            } catch (k) {
                return k.message
            }
        }, getUrlParam: function (e, f) {
            e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var g = RegExp("[\\?&]" + e + "=([^&#]*)").exec(f);
            return null == g ? "" : decodeURIComponent(g[1].replace(/\+/g, " "))
        }, getQuery: function (e) {
            e = RegExp("(^|&)" +
                e + "=([^&]*)(&|$)");
            e = window.location.search.substr(1).match(e);
            return null != e ? unescape(e[2]) : null
        }, getCSS: function (e, f) {
            var g = $("<div>").css("display", "none").addClass(f);
            $("body").append(g);
            try {
                return g.css(e)
            } finally {
                g.remove()
            }
        }, checkDateString: function (e) {
            e = e.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
            if (null == e)return !1;
            var f = new Date(e[1], e[3] - 1, e[4]);
            return f.getFullYear() == e[1] && f.getMonth() + 1 == e[3] && f.getDate() == e[4]
        }, checkDateTimeString: function (e) {
            e = e.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/);
            if (null == e)return !1;
            var f = new Date(e[1], e[3] - 1, e[4], e[5], e[6], e[7]);
            return f.getFullYear() == e[1] && f.getMonth() + 1 == e[3] && f.getDate() == e[4] && f.getHours() == e[5] && f.getMinutes() == e[6] && f.getSeconds() == e[7]
        }, checkDateTimeStringHHMM: function (e) {
            e = e.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2})$/);
            if (null == e)return !1;
            var f = new Date(e[1], e[3] - 1, e[4], e[5], e[6]);
            return f.getFullYear() == e[1] && f.getMonth() + 1 == e[3] && f.getDate() == e[4] && f.getHours() == e[5] && f.getMinutes() == e[6]
        }, checkTime: function (e) {
            e =
                String.format("{0} {1}", "2013-08-08", e);
            return /^((\d{2}(([02468][048])|([13579][26]))[\-\/\s]?((((0?[13578])|(1[02]))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\-\/\s]?((0?[1-9])|([1-2][0-9])))))|(\d{2}(([02468][1235679])|([13579][01345789]))[\-\/\s]?((((0?[13578])|(1[02]))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\-\/\s]?((0?[1-9])|(1[0-9])|(2[0-8]))))))(\s(((0?[0-9])|(1[0-9])|(2[0-3]))\:(([0-5][0-9])|([0-9]))(((\s)|(\:(([0-5][0-9])|([0-9]))))?)))?$/.test(e)
        },
        checkDateGreater: function (e) {
            e = $.extend({type: "date", start: ".startDate", end: ".endDate"}, e);
            var f = !0;
            if ("date" == e.type) {
                var g = $(e.start).val() || null, h = $(e.end).val() || null;
                if (!g)return ZENG.msgbox.show("\u8bf7\u8f93\u5165\u5f00\u59cb\u65f6\u95f4!", 4, 2E3), $(e.start).focus(), $(e.start).datepicker("show"), !1;
                if (!Util.checkDateString(g) && !Util.checkDateTimeString(g) && !Util.checkDateTimeStringHHMM(g))return ZENG.msgbox.show("\u5f00\u59cb\u65f6\u95f4\u683c\u5f0f\u4e0d\u6b63\u786e!", 4, 2E3), $(e.start).focus(),
                    $(e.start).datepicker("show"), !1;
                if (!h)return ZENG.msgbox.show("\u8bf7\u8f93\u5165\u7ed3\u675f\u65f6\u95f4!", 4, 2E3), $(e.end).focus(), $(e.end).datepicker("show"), !1;
                if (!Util.checkDateString(g) && !Util.checkDateTimeString(g) && !Util.checkDateTimeStringHHMM(g))return ZENG.msgbox.show("\u7ed3\u675f\u65f6\u95f4\u683c\u5f0f\u4e0d\u6b63\u786e!", 4, 2E3), $(e.end).focus(), $(e.end).datepicker("show"), !1;
                g > h && (ZENG.msgbox.show("\u5f00\u59cb\u65f6\u95f4\u4e0d\u80fd\u5927\u4e8e\u7ed3\u675f\u65f6\u95f4!", 4, 2E3), $(e.end).focus(),
                    $(e.end).datepicker("show"), f = !1)
            } else if ("time" == e.type) {
                g = $(e.start).val() || null;
                h = $(e.end).val() || null;
                if (!g)return ZENG.msgbox.show("\u8bf7\u8f93\u5165\u5f00\u59cb\u65f6\u95f4!", 4, 2E3), $(e.start).focus(), $(e.start).timepicker("show"), !1;
                if (!Util.checkTime(g))return ZENG.msgbox.show("\u5f00\u59cb\u65f6\u95f4\u683c\u5f0f\u4e0d\u6b63\u786e!", 4, 2E3), $(e.start).focus(), $(e.start).timepicker("show"), !1;
                if (!h)return ZENG.msgbox.show("\u8bf7\u8f93\u5165\u7ed3\u675f\u65f6\u95f4!", 4, 2E3), $(e.end).focus(),
                    $(e.end).timepicker("show"), !1;
                if (!Util.checkTime(h))return ZENG.msgbox.show("\u7ed3\u675f\u65f6\u95f4\u683c\u5f0f\u4e0d\u6b63\u786e!", 4, 2E3), $(e.end).focus(), $(e.end).timepicker("show"), !1;
                g > h && (ZENG.msgbox.show("\u5f00\u59cb\u65f6\u95f4\u4e0d\u80fd\u5927\u4e8e\u7ed3\u675f\u65f6\u95f4!", 4, 2E3), $(e.end).focus(), $(e.end).timepicker("show"), f = !1)
            }
            return f
        }, htmlEncode: function (e) {
            return $("<div/>").text(e).html()
        }, htmlDecode: function (e) {
            return $("<div/>").html(e).text()
        }, checkPhone: function (e) {
            reg145 =
                /^((\+?86)|(\(\+86\)))?(145[0-9]{8})$/;
            reg147 = /^((\+?86)|(\(\+86\)))?(147[0-9]{8})$/;
            reg15x = /^((\+?86)|(\(\+86\)))?(15[^4][0-9]{8})$/;
            reg18x = /^((\+?86)|(\(\+86\)))?(18[0-9]{9})$/;
            var f = /^((\+?86)|(\(\+86\)))?\d{3,4}-\d{7,8}(-\d{3,4})?$/, g = /^\+86(?:\-\d{2,3}\-|\(\d{2,3}\))\d{7,8}$/, h = /^(?:\(?[0\+]\d{2,3}\)?)[\s-]?(?:(?:\(0{1,3}\))?[0\d]{1,4})[\s-](?:[\d]{7,8}|[\d]{3,4}[\s-][\d]{3,4})/;
            return /^^((\+?86)|(\(\+86\)))?(13[0-9]{9})$/.test(e) || reg145.test(e) || reg147.test(e) || reg15x.test(e) || reg18x.test(e) ||
                f.test(e) || g.test(e) || h.test(e)
        }, SwapTab: function (e, f, g, h, k, l) {
            $(g + " > " + h).eq(0).show();
            "click" == l ? $(e + " " + f).click(function () {
                $(this).addClass(k).siblings().removeClass(k);
                $(g + " > " + h).eq($(e + " " + f).index(this)).show().siblings().hide()
            }) : $(e + " " + f).mouseover(function () {
                $(this).addClass(k).siblings().removeClass(k);
                $(g + " > " + h).eq($(e + " " + f).index(this)).show().siblings().hide()
            })
        }
    };
    String.format = function () {
        for (var e = arguments[0], f = 0; f < arguments.length - 1; f++)e = e.replace(RegExp("\\{" + f + "\\}", "gm"),
            arguments[f + 1]);
        return e
    };
    $.format = function (e, f) {
        if (1 == arguments.length)return function () {
            var f = $.makeArray(arguments);
            f.unshift(e);
            return $.format.apply(this, f)
        };
        2 < arguments.length && f.constructor != Array && (f = $.makeArray(arguments).slice(1));
        f.constructor != Array && (f = [f]);
        $.each(f, function (f, h) {
            e = e.replace(RegExp("\\{" + f + "\\}", "g"), h)
        });
        return e
    }
})();
