// ==UserScript==
// @name Ratings for FS.UA and EX.UA
// @include http://fs.ua/*
// @include http://www.ex.ua/view/*
// @include http://www.kinopoisk.ru/film/*
// ==/UserScript==
/// <reference path="isettings.ts"/>
var LocalStorageSettings = (function () {
    function LocalStorageSettings() { }
    LocalStorageSettings.prototype.Get = function (name) {
        return localStorage[name];
    };
    LocalStorageSettings.prototype.Set = function (name, val) {
        localStorage[name] = val;
    };
    return LocalStorageSettings;
})();
//@ sourceMappingURL=LocalStorageSettings.js.map
