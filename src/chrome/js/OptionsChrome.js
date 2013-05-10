var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
// ==UserScript==
// @name Ratings for FS.UA and EX.UA
// @include http://fs.ua/*
// @include http://www.ex.ua/view/*
// @include http://www.kinopoisk.ru/film/*
// ==/UserScript==
/// <reference path="../../common/js/kango.d.ts"/>
/// <reference path="Settings/SettingsChrome.ts"/>
/// <reference path="../../common/js/Options.ts"/>
var OptionsChrome = (function (_super) {
    __extends(OptionsChrome, _super);
    function OptionsChrome() {
        _super.call(this);
        this.settings = new SettingsChrome(this.initOptionsValues, this);
    }
    OptionsChrome.prototype.initOptionsPage = function () {
        _super.prototype.initOptionsPage.call(this);
        var text = kango.i18n.getMessage("syncSettings");
        document.getElementById("syncSettingsLabel").textContent = text;
        var text = kango.i18n.getMessage("syncSettingsSub");
        document.getElementById("syncSettingsSub").textContent = text;
        document.getElementById("syncSettings").style.display = "";
    };
    OptionsChrome.prototype.initOptionsValues = function () {
        var val = document.getElementById("syncSettingsVal");
        val.addEventListener("click", this.saveSettings);
        val.checked = this.settings.GetIsSync();
        _super.prototype.initOptionsValues.call(this);
    };
    OptionsChrome.prototype.saveSettings = function () {
        var val = document.getElementById("syncSettingsVal");
        this.settings.SetIsSync(val.checked);
        _super.prototype.saveSettings.call(this);
    };
    return OptionsChrome;
})(Options);
//@ sourceMappingURL=OptionsChrome.js.map
