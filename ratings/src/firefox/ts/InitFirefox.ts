// ==UserScript==
// @name Ratings for FS.TO (ex FS.UA) and EX.UA
// @include http://fs.to/*
// @include http://www.ex.ua/*
// @include http://www.kinopoisk.ru/film/*
// ==/UserScript==

/// <reference path="../../common/ts/common.ts"/>

/// <reference path="Settings/SettingsFirefox.ts"/>
/// <reference path="../../common/ts/Ratings.ts"/>

var settings = new SettingsFirefox(function () {
    new Ratings().GetRatings();
});