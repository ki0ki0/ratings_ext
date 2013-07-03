// ==UserScript==
// @name Ratings for FS.UA and EX.UA
// @include http://fs.to/*
// @include http://www.ex.ua/view/*
// @include http://www.kinopoisk.ru/film/*
// ==/UserScript==
/// <reference path="../../common/js/kango.d.ts"/>
/// <reference path="OptionsChrome.ts"/>
var optionsInit;

if (navigator["vendor"].indexOf("Google") != -1) {
    optionsInit = function () {
        var optionsChrome = new OptionsChrome();
        optionsChrome.initOptionsPage();
    };
} else {
    optionsInit = function () {
        var options = new Options(true);
        options.initOptionsPage();
    };
}

KangoAPI.onReady(optionsInit);
//@ sourceMappingURL=OptionsInit.js.map
