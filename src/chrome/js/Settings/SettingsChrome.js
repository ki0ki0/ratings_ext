/// <reference path="ChromeStorageSettings.ts"/>
var SettingsChrome = (function () {
    function SettingsChrome(callback, obj) {
        this.names = [
            "syncSettings", 
            "playerOnly", 
            "showVoting"
        ];
        this.callback = callback;
        this.obj = obj;
        this.sync = new ChromeCachedStorageSettings(true, this.names, this.syncCallback, this);
    }
    SettingsChrome.prototype.syncCallback = function () {
        if(this.GetIsSync()) {
            this.callCallback();
        }
        this.local = new ChromeCachedStorageSettings(false, this.names, this.localCallback, this);
    };
    SettingsChrome.prototype.localCallback = function () {
        this.callCallback();
    };
    SettingsChrome.prototype.callCallback = function () {
        if(this.callback) {
            if(this.obj) {
                this.callback.call(this.obj);
            } else {
                this.callback();
            }
        }
    };
    SettingsChrome.prototype.GetIsSync = function () {
        return this.sync.Get(this.names[0]);
    };
    SettingsChrome.prototype.SetIsSync = function (isSync) {
        this.sync.Set(this.names[0], isSync);
        this.local.Set(this.names[0], isSync);
        if(isSync) {
            for(var i in this.names) {
                this.sync.Set(this.names[i], this.local.Get(this.names[i]));
            }
        } else {
            for(var i in this.names) {
                this.local.Set(this.names[i], this.sync.Get(this.names[i]));
            }
        }
    };
    SettingsChrome.prototype.GetIsClearPlayer = function () {
        return this.sync.Get(this.names[1]);
    };
    SettingsChrome.prototype.SetIsClearPlayer = function (isClear) {
        this.sync.Set(this.names[1], isClear);
    };
    SettingsChrome.prototype.GetIsShowVoting = function () {
        return this.sync.Get(this.names[2]);
    };
    SettingsChrome.prototype.SetIsShowVoting = function (isClear) {
        this.sync.Set(this.names[2], isClear);
    };
    return SettingsChrome;
})();
//@ sourceMappingURL=SettingsChrome.js.map
