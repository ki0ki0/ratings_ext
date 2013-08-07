// ==UserScript==
// @name Ratings for FS.TO (ex FS.UA) and EX.UA
// @include http://fs.to/*
// @include http://www.ex.ua/view/*
// @include http://www.kinopoisk.ru/film/*
// ==/UserScript==


/// <reference path="../../common/ts/kango.d.ts"/> 
/// <reference path="Settings/SettingsChrome.ts"/> 
/// <reference path="../../common/ts/Options.ts"/>

class OptionsChrome extends Options {
    
    public settings: SettingsChrome;

    constructor() {
        super(false);
        this.settings = new SettingsChrome(this.initOptionsValues, this);
    }

    initOptionsPage() {
        super.initOptionsPage();

        var text = kango.i18n.getMessage("syncSettings");
        document.getElementById("syncSettingsLabel").textContent = text;
        text = kango.i18n.getMessage("syncSettingsSub");
        document.getElementById("syncSettingsSub").textContent = text;

        document.getElementById("syncSettings").style.display = "";
    }

    initOptionsValues() {
        var val: HTMLInputElement = <HTMLInputElement> document.getElementById("syncSettingsVal");
        val.addEventListener("click", () => {this.saveSettings();});
        val.checked = this.settings.GetIsSync();

        super.initOptionsValues();
    }

    saveSettings() {
        var val: HTMLInputElement = <HTMLInputElement> document.getElementById("syncSettingsVal");
        this.settings.SetIsSync(val.checked);

        super.saveSettings();
    }
}