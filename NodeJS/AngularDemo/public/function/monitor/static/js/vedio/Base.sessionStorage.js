var Base;
Base || (Base = {});
(function () {
    Base.sessionStorage = {
        storeSession: function (a, c) {
            "object" == typeof sessionStorage ? sessionStorage.setItem(a, JSON.stringify(c)) : CookieStorage.set(a, JSON.stringify(c))
        }, getSession: function (a) {
            return "object" == typeof sessionStorage ? (a = sessionStorage.getItem(a), JSON.parse(a)) : CookieStorage.get(a)
        }, removeSession: function (a) {
            "object" == typeof sessionStorage && sessionStorage.removeItem(a);
            CookieStorage.remove(a)
        }, getLocalStorage: function () {
            if ("object" == typeof localStorage)return localStorage;
            if ("object" == typeof globalStorage)return globalStorage[location.host]
        }, setPersistence: function (a, c) {
            var b = Base.sessionStorage.getLocalStorage();
            b && b.setItem(a, JSON.stringify(c))
        }, getPersistence: function (a, c) {
            var b = Base.sessionStorage.getLocalStorage();
            if (b)return b = b.getItem(a), JSON.parse(b)
        }, clear: function () {
            "object" == typeof sessionStorage ? sessionStorage.clear() : CookieStorage.clear()
        }
    }
})();
