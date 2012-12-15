var Setting = (function () {
    function Setting(callback, obj) {
        this.names = [
            "syncSettings", 
            "playerOnly", 
            "showVoting"
        ];
        this.callback = callback;
        this.obj = obj;
        this.sync = new ChromeCachedStorageSettings(true, this.names, this.syncCallback, this);
    }
    Setting.prototype.syncCallback = function () {
        if(this.GetIsSync()) {
            this.callCallback();
        }
        this.local = new ChromeCachedStorageSettings(false, this.names, this.localCallback, this);
    };
    Setting.prototype.localCallback = function () {
        this.callCallback();
    };
    Setting.prototype.callCallback = function () {
        if(this.callback) {
            if(this.obj) {
                this.callback.call(this.obj);
            } else {
                this.callback();
            }
        }
    };
    Setting.prototype.GetIsSync = function () {
        return this.sync.Get(this.names[0]);
    };
    Setting.prototype.SetIsSync = function (isSync) {
        this.sync.Set(this.names[0], isSync);
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
    Setting.prototype.GetIsClearPlayer = function () {
        return this.sync.Get(this.names[1]);
    };
    Setting.prototype.SetIsClearPlayer = function (isClear) {
        this.sync.Set(this.names[1], isClear);
    };
    Setting.prototype.GetIsShowVoting = function () {
        return this.sync.Get(this.names[2]);
    };
    Setting.prototype.SetIsShowVoting = function (isClear) {
        this.sync.Set(this.names[2], isClear);
    };
    return Setting;
})();
//@ sourceMappingURL=Settings.js.map
