// ==UserScript==
// @name Ratings for FS.UA and EX.UA
// @include http://fs.to/*
// @include http://www.ex.ua/view/*
// @include http://www.kinopoisk.ru/film/*
// ==/UserScript==
/// <reference path="../debug.ts"/>
/// <reference path="KangoStorageSettings.ts"/>
var Settings = (function () {
    function Settings(callback) {
        this.names = ["playerOnly", "showVoting"];
        Settings._this = this;
        debug("Constructor " + Settings._this);

        if (callback == null)
            return;
        this.callback = callback;
        var _this = this;
        this.local = new KangoStorageSettings(this.names, function () {
            _this.local = this;
            _this.storageCallback();
        });
    }
    Settings.GetSettings = function () {
        return Settings._this;
    };

    Settings.prototype.storageCallback = function () {
        this.callback();
    };

    Settings.prototype.GetIsClearPlayer = function () {
        return this.local.Get(this.names[0]);
    };
    Settings.prototype.SetIsClearPlayer = function (isClear) {
        this.local.Set(this.names[0], isClear);
    };

    Settings.prototype.GetIsShowVoting = function () {
        return this.local.Get(this.names[1]);
    };
    Settings.prototype.SetIsShowVoting = function (isClear) {
        this.local.Set(this.names[1], isClear);
    };
    return Settings;
})();
//@ sourceMappingURL=Settings.js.map
