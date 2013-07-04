// ==UserScript==
// @name Ratings for FS.UA and EX.UA
// @include http://fs.to/*
// @include http://www.ex.ua/view/*
// @include http://www.kinopoisk.ru/film/*
// ==/UserScript==
/// <reference path="kango.d.ts"/>
/// <reference path="Settings/Settings.ts"/>
var Options = (function () {
    function Options(callInit) {
        var _this = this;
        new Settings(function () {
            if (callInit) {
                _this.initOptionsValues();
            }
        });
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

        var text = kango.i18n.getMessage("removeAdv");
        document.getElementById("removeAdvLabel").textContent = text;

        var text = kango.i18n.getMessage("removeAdvSub");
        document.getElementById("removeAdvSub").textContent = text;
    };

    Options.prototype.initOptionsValues = function () {
        var val = document.getElementById("playerOnlyVal");
        var _this = this;
        val.addEventListener("click", function () {
            _this.saveSettings();
        });
        val.checked = Settings.GetSettings().GetIsClearPlayer();

        val = document.getElementById("showVotingVal");
        val.addEventListener("click", function () {
            _this.saveSettings();
        });
        val.checked = Settings.GetSettings().GetIsShowVoting();

        val = document.getElementById("removeAdvVal");
        val.addEventListener("click", function () {
            _this.saveSettings();
        });
        val.checked = Settings.GetSettings().GetIsRemoveAd();
    };

    Options.prototype.saveSettings = function () {
        var val = document.getElementById("playerOnlyVal");
        Settings.GetSettings().SetIsClearPlayer(val.checked);

        val = document.getElementById("showVotingVal");
        Settings.GetSettings().SetIsShowVoting(val.checked);

        val = document.getElementById("removeAdvVal");
        Settings.GetSettings().SetIsRemoveAd(val.checked);
    };
    return Options;
})();
//@ sourceMappingURL=Options.js.map
