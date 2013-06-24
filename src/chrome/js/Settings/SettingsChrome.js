var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
// ==UserScript==
// @name Ratings for FS.UA and EX.UA
// @include http://fs.to/*
// @include http://www.ex.ua/view/*
// @include http://www.kinopoisk.ru/film/*
// ==/UserScript==
/// <reference path="ChromeStorageSettings.ts"/>
/// <reference path="../../../common/js/Settings/Settings.ts"/>
var SettingsChrome = (function (_super) {
    __extends(SettingsChrome, _super);
    function SettingsChrome(callback, obj) {
        _super.call(this, null);
        this.namesChrome = ["playerOnly", "showVoting", "syncSettings"];
        this.callbackChrome = callback;
        this.obj = obj;
        this.sync = new ChromeCachedStorageSettings(true, this.namesChrome, this.syncCallback, this);
    }
    SettingsChrome.prototype.syncCallback = function () {
        if (this.GetIsSync())
            this.callCallback();

        this.localChrome = new ChromeCachedStorageSettings(false, this.namesChrome, this.localCallback, this);
    };

    SettingsChrome.prototype.localCallback = function () {
        if (this.GetIsSync() == false)
            this.callCallback();
    };

    SettingsChrome.prototype.callCallback = function () {
        if (this.callbackChrome) {
            if (this.obj)
                this.callbackChrome.call(this.obj); else
                this.callbackChrome();
        }
    };

    SettingsChrome.prototype.GetIsSync = function () {
        return this.sync.Get(this.namesChrome[2]);
    };
    SettingsChrome.prototype.SetIsSync = function (isSync) {
        this.sync.Set(this.namesChrome[2], isSync);
        this.localChrome.Set(this.namesChrome[2], isSync);
        if (isSync) {
            for (var i in this.namesChrome)
                this.sync.Set(this.namesChrome[i], this.localChrome.Get(this.namesChrome[i]));
        } else {
            for (var i in this.namesChrome)
                this.localChrome.Set(this.namesChrome[i], this.sync.Get(this.namesChrome[i]));
        }
    };

    SettingsChrome.prototype.getCurrentStorage = function () {
        return this.GetIsSync() ? this.sync : this.localChrome;
    };

    SettingsChrome.prototype.GetIsClearPlayer = function () {
        return this.getCurrentStorage().Get(this.namesChrome[0]);
    };
    SettingsChrome.prototype.SetIsClearPlayer = function (isClear) {
        this.getCurrentStorage().Set(this.namesChrome[0], isClear);
    };

    SettingsChrome.prototype.GetIsShowVoting = function () {
        return this.getCurrentStorage().Get(this.namesChrome[1]);
    };
    SettingsChrome.prototype.SetIsShowVoting = function (isClear) {
        this.getCurrentStorage().Set(this.namesChrome[1], isClear);
    };
    return SettingsChrome;
})(Settings);
//@ sourceMappingURL=SettingsChrome.js.map
