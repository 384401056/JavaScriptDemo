var Base;
Base || (Base = {});
(function () {
    $.support.cors = !0;
    Base.service = {
        defaultParams: {
            type: "POST",
            dataType: "json",
            //contentType: "application/json; charset=utf-8",
            headers: {},
            params: null,
            async: !0
        }, post: function (a) {
            var b = Base.service;
            a.mask && a.mask();
            $.ajax({
                type: a.type ? a.type : b.defaultParams.type,
                url: a.url,
                data: a.params ? JSON.stringify(a.params) : JSON.stringify(b.defaultParams.params),
                async: null == a.async ? b.defaultParams.async : a.async,
                dataType: a.dataType ? a.dataType : b.defaultParams.dataType,
                headers: a.headers ? a.headers : b.defaultParams.headers,
                contentType: a.contentType ? a.contentType : b.defaultParams.contentType,
                success: function (b, c, d) {
                    a.success && a.success(b);
                    a.unmask && a.unmask()
                },
                error: function (b, c, d) {
                    a.error && a.error(b, c, d);
                    a.unmask && a.unmask()
                }
            })
        }
    }
})();
