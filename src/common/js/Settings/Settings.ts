// ==UserScript==
// @name Ratings for FS.UA and EX.UA
// @include http://fs.ua/*
// @include http://www.ex.ua/view/*
// @include http://www.kinopoisk.ru/film/*
// ==/UserScript==


/// <reference path="LocalStorageSettings.ts"/> 

class Settings {
    private static _this: Settings;

    public static GetSettings():Settings {
        return Settings._this;
    }

    private local: LocalStorageSettings;

    private names = ["playerOnly", "showVoting"];

    constructor() {
        this.local = new LocalStorageSettings();
        Settings._this = this;
    }

    GetIsClearPlayer(): any { return this.local.Get(this.names[1]); }
    SetIsClearPlayer(isClear: bool) { this.local.Set(this.names[1], isClear); }

    GetIsShowVoting(): any { return this.local.Get(this.names[2]); }
    SetIsShowVoting(isClear: bool) { this.local.Set(this.names[2], isClear); }
}
