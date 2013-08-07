// ==UserScript==
// @name Ratings for FS.TO (ex FS.UA) and EX.UA
// @include http://fs.to/*
// @include http://www.ex.ua/view/*
// @include http://www.kinopoisk.ru/film/*
// ==/UserScript==


/// <reference path="../../common/ts/kango.d.ts"/> 
/// <reference path="Settings/SettingsFirefox.ts"/> 
/// <reference path="../../common/ts/Options.ts"/>

class OptionsFirefox extends Options {
    
    private settings: SettingsFirefox;

    constructor() {
        super(false);
        var _this = this;
        this.settings = new SettingsFirefox(function () { _this.initOptionsValues(); });
    }

    initOptionsPage() {
        super.initOptionsPage();
    }

    initOptionsValues() {
        super.initOptionsValues();
        var val: HTMLInputElement = <HTMLInputElement> document.getElementById("playerOnlyVal");
        val.disabled = true;
    }

    saveSettings() {
        super.saveSettings();
    }
}