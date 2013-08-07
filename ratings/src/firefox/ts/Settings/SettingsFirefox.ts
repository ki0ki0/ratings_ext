// ==UserScript==
// @name Ratings for FS.TO (ex FS.UA) and EX.UA
// @include http://fs.to/*
// @include http://www.ex.ua/view/*
// @include http://www.kinopoisk.ru/film/*
// ==/UserScript==

/// <reference path="../../../common/ts/Settings/Settings.ts"/> 

class SettingsFirefox extends Settings {

    constructor(callback: Function) {
        super(callback);
    }

    GetIsClearPlayer(): any { return false; }
    SetIsClearPlayer(isClear: boolean) { super.SetIsClearPlayer(isClear); }

    GetIsShowVoting(): any { return super.GetIsShowVoting(); }
    SetIsShowVoting(isClear: boolean) { super.SetIsShowVoting(isClear); }

    GetIsRemoveAd(): any { return super.GetIsRemoveAd(); }
    SetIsRemoveAd(isClear: boolean) { super.SetIsRemoveAd(isClear); }
}
