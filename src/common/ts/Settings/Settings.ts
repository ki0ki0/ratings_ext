// ==UserScript==
// @name Ratings for FS.TO (ex FS.UA) and EX.UA
// @include http://fs.to/*
// @include http://www.ex.ua/view/*
// @include http://www.kinopoisk.ru/film/*
// ==/UserScript==

/// <reference path="../common.ts"/>

/// <reference path="KangoStorageSettings.ts"/> 

class Settings {
    private static _this: Settings;

    public static GetSettings():Settings {
        return Settings._this;
    }

    private callback: Function;
    private local: KangoStorageSettings;

    private names = ["playerOnly", "showVoting", "removeAdv"];

    constructor(callback: Function) {
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

    private storageCallback() {
        this.callback();
    }

    GetIsClearPlayer(): any { return this.local.Get(this.names[0]); }
    SetIsClearPlayer(isClear: boolean) { this.local.Set(this.names[0], isClear); }

    GetIsShowVoting(): any { return this.local.Get(this.names[1]); }
    SetIsShowVoting(isClear: boolean) { this.local.Set(this.names[1], isClear); }

    GetIsRemoveAd(): any { return this.local.Get(this.names[2]); }
    SetIsRemoveAd(isClear: boolean) { this.local.Set(this.names[2], isClear); }
}
