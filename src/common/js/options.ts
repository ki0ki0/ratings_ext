// ==UserScript==
// @name Ratings for FS.UA and EX.UA
// @include http://fs.to/*
// @include http://www.ex.ua/view/*
// @include http://www.kinopoisk.ru/film/*
// ==/UserScript==


/// <reference path="kango.d.ts"/> 
/// <reference path="Settings/Settings.ts"/> 

class Options
{
    constructor(callInit:bool) {
        var _this = this;
        new Settings(function () {
            if (callInit) {
                _this.initOptionsValues();
            }
        });
    }

    initOptionsPage() {
        document.getElementById("syncSettings").style.display = "none";

        var text = kango.i18n.getMessage("settings");
        document.getElementById("settingMess").textContent = text;

        var text = kango.i18n.getMessage("playerOnly");
        document.getElementById("playerOnlyLabel").textContent = text;

        var text = kango.i18n.getMessage("playerOnlySub");
        document.getElementById("playerOnlySub").textContent = text;

        var text = kango.i18n.getMessage("showVoting");
        document.getElementById("showVotingLabel").textContent = text;

        var text = kango.i18n.getMessage("showVotingSub");
        document.getElementById("showVotingSub").textContent = text;
    }

    initOptionsValues() {
        var val: HTMLInputElement = <HTMLInputElement> document.getElementById("playerOnlyVal");
        var _this = this;
        val.addEventListener("click", function () { _this.saveSettings(); });
        val.checked = Settings.GetSettings().GetIsClearPlayer();

        val = <HTMLInputElement> document.getElementById("showVotingVal");
        val.addEventListener("click", function () { _this.saveSettings(); });
        val.checked = Settings.GetSettings().GetIsShowVoting();
    }

    saveSettings() {
        var val: HTMLInputElement = <HTMLInputElement> document.getElementById("playerOnlyVal");
        Settings.GetSettings().SetIsClearPlayer(val.checked);

        val = <HTMLInputElement> document.getElementById("showVotingVal");
        Settings.GetSettings().SetIsShowVoting(val.checked);
    }

}