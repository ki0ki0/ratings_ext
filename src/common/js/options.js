// ==UserScript==
// @name Ratings for FS.UA and EX.UA
// @include http://fs.ua/*
// @include http://www.ex.ua/view/*
// @include http://www.kinopoisk.ru/film/*
// ==/UserScript==
/// <reference path="kango.d.ts"/>
/// <reference path="Settings/Settings.ts"/>
var Options = (function () {
    function Options() {
        this.settings = new Settings();
    }
    Options.prototype.initOptionsPage = function () {
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
        this.initOptionsValues();
    };
    Options.prototype.initOptionsValues = function () {
        var val = document.getElementById("playerOnlyVal");
        var _this = this;
        val.addEventListener("click", function () {
            _this.saveSettings();
        });
        val.checked = this.settings.GetIsClearPlayer();
        val = document.getElementById("showVotingVal");
        val.addEventListener("click", function () {
            _this.saveSettings();
        });
        val.checked = this.settings.GetIsShowVoting();
    };
    Options.prototype.saveSettings = function () {
        var val = document.getElementById("playerOnlyVal");
        this.settings.SetIsClearPlayer(val.checked);
        val = document.getElementById("showVotingVal");
        this.settings.SetIsShowVoting(val.checked);
    };
    return Options;
})();
//@ sourceMappingURL=Options.js.map
