// ==UserScript==
// @name Ratings for FS.UA and EX.UA
// @include http://fs.to/*
// @include http://www.ex.ua/view/*
// @include http://www.kinopoisk.ru/film/*
// ==/UserScript==

/// <reference path="../../common/ts/debug.ts"/>

/// <reference path="Settings/SettingsFirefox.ts"/>
/// <reference path="../../common/ts/Ratings.ts"/>

new SettingsFirefox(function () {
    new Ratings().GetRatings();
});