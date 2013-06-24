// ==UserScript==
// @name Ratings for FS.UA and EX.UA
// @include http://fs.to/*
// @include http://www.ex.ua/view/*
// @include http://www.kinopoisk.ru/film/*
// ==/UserScript==
/// <reference path="isettings.ts"/>
/// <reference path="../kango.d.ts"/>
var KangoStorageSettings = (function () {
    function KangoStorageSettings(names, callback) {
        this.storage = new Object();
        this.callback = null;
        var _this = this;

        this.callback = callback;

        for (var i = 0; i < names.length; i++) {
            this.storage[names[i]] = true;
        }
        if (kango.storage === undefined) {
            kango.invokeAsync("kango.storage.getItem", "options", function (data) {
                _this.getCallback(data);
            });
        } else {
            var vals = kango.storage.getItem("options");
            this.getCallback(vals);
        }
    }
    KangoStorageSettings.prototype.getCallback = function (data) {
        if (data != null) {
            this.storage = data;
        }
        this.callback();
    };

    KangoStorageSettings.prototype.save = function () {
        kango.storage.setItem("options", this.storage);
    };

    KangoStorageSettings.prototype.Get = function (name) {
        return this.storage[name];
    };

    KangoStorageSettings.prototype.Set = function (name, val) {
        this.storage[name] = val;
        this.save();
    };
    return KangoStorageSettings;
})();
//@ sourceMappingURL=KangoStorageSettings.js.map
