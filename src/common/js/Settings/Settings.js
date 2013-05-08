/// <reference path="ChromeStorageSettings.ts"/>
var Settings = (function () {
    function Settings(callback, obj) {
        this.names = [
            "syncSettings", 
            "playerOnly", 
            "showVoting"
        ];
        this.callback = callback;
        this.obj = obj;
        this.sync = new ChromeCachedStorageSettings(true, this.names, this.syncCallback, this);
    }
    Settings.prototype.syncCallback = function () {
        if(this.GetIsSync()) {
            this.callCallback();
        }
        this.local = new ChromeCachedStorageSettings(false, this.names, this.localCallback, this);
    };
    Settings.prototype.localCallback = function () {
        this.callCallback();
    };
    Settings.prototype.callCallback = function () {
        if(this.callback) {
            if(this.obj) {
                this.callback.call(this.obj);
            } else {
                this.callback();
            }
        }
    };
    Settings.prototype.GetIsSync = function () {
        return this.sync.Get(this.names[0]);
    };
    Settings.prototype.SetIsSync = function (isSync) {
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
    Settings.prototype.GetIsClearPlayer = function () {
        return this.sync.Get(this.names[1]);
    };
    Settings.prototype.SetIsClearPlayer = function (isClear) {
        this.sync.Set(this.names[1], isClear);
    };
    Settings.prototype.GetIsShowVoting = function () {
        return this.sync.Get(this.names[2]);
    };
    Settings.prototype.SetIsShowVoting = function (isClear) {
        this.sync.Set(this.names[2], isClear);
    };
    return Settings;
})();
//@ sourceMappingURL=Settings.js.map
