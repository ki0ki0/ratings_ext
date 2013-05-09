/// <reference path="LocalStorageSettings.ts"/>
var Settings = (function () {
    function Settings() {
        this.names = [
            "playerOnly", 
            "showVoting"
        ];
        this.local = new LocalStorageSettings();
    }
    Settings.prototype.GetIsClearPlayer = function () {
        return this.local.Get(this.names[1]);
    };
    Settings.prototype.SetIsClearPlayer = function (isClear) {
        this.local.Set(this.names[1], isClear);
    };
    Settings.prototype.GetIsShowVoting = function () {
        return this.local.Get(this.names[2]);
    };
    Settings.prototype.SetIsShowVoting = function (isClear) {
        this.local.Set(this.names[2], isClear);
    };
    return Settings;
})();
//@ sourceMappingURL=Settings.js.map
