var Service;
Service || (Service = {});
(function () {
    Service = {
        post: function (a) {
            a.error || (a.error = function (b, c, d) {
                Messages.showException(a, b, c, d, a.errorEl)
            });
            a.crossDomain = !0;
            a.url = "http://10.88.20.104:8079/acp-web-monitor/video/getVideos?orgid=" + a.url;
            "object" === typeof AccountGlobalInfo && AccountGlobalInfo.executeWhenUser(function (b) {
                "undefined" !== typeof b.Token && (a.headers = {Token: b.Token})
            });
            Base.service.post(a);
            Base.sessionStorage.storeSession("NetType", 0)
        }
    }
})();
