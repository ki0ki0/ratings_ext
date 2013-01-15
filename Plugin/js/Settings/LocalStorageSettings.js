var LocalStorageSettings = (function () {
    function LocalStorageSettings() { }
    LocalStorageSettings.prototype.Get = function (name) {
        return localStorage[name];
    };
    LocalStorageSettings.prototype.Set = function (name, val) {
        localStorage[name] = val;
    };
    return LocalStorageSettings;
})();
//@ sourceMappingURL=LocalStorageSettings.js.map
