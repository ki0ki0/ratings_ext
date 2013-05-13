// ==UserScript==
// @name Ratings for FS.UA and EX.UA
// @include http://fs.ua/*
// @include http://www.ex.ua/view/*
// @include http://www.kinopoisk.ru/film/*
// ==/UserScript==
/// <reference path="Settings/SettingsChrome.ts"/>
/// <reference path="../../common/js/Ratings.ts"/>
new SettingsChrome(function () {
    new Ratings().GetRatings();
}, null);
//@ sourceMappingURL=Init.js.map
