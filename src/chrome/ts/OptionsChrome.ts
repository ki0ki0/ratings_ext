// ==UserScript==
// @name Ratings for FS.UA and EX.UA
// @include http://fs.to/*
// @include http://www.ex.ua/view/*
// @include http://www.kinopoisk.ru/film/*
// ==/UserScript==


/// <reference path="../../common/ts/kango.d.ts"/> 
/// <reference path="Settings/SettingsChrome.ts"/> 
/// <reference path="../../common/ts/Options.ts"/>

class OptionsChrome extends Options {
    
    private settings: SettingsChrome;

    constructor() {
        super(false);
        this.settings = new SettingsChrome(this.initOptionsValues, this);
    }

    initOptionsPage() {
        super.initOptionsPage();

        var text = kango.i18n.getMessage("syncSettings");
        document.getElementById("syncSettingsLabel").textContent = text;

        var text = kango.i18n.getMessage("syncSettingsSub");
        document.getElementById("syncSettingsSub").textContent = text;

        document.getElementById("syncSettings").style.display = "";
    }

    initOptionsValues() {
        var val: HTMLInputElement = <HTMLInputElement> document.getElementById("syncSettingsVal");
        var _this = this;
        val.addEventListener("click", function () { _this.saveSettings(); });
        val.checked = this.settings.GetIsSync();

        super.initOptionsValues();
    }

    saveSettings() {
        var val: HTMLInputElement = <HTMLInputElement> document.getElementById("syncSettingsVal");
        this.settings.SetIsSync(val.checked);

        super.saveSettings();
    }
}