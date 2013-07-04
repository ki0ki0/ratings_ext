// ==UserScript==
// @name Ratings for FS.UA and EX.UA
// @include http://fs.to/*
// @include http://www.ex.ua/view/*
// @include http://www.kinopoisk.ru/film/*
// ==/UserScript==

/// <reference path="debug.ts"/>

/// <reference path="Settings/Settings.ts"/>
/// <reference path="Ratings.ts"/>

debug("init");

new Settings(function () {
    new Ratings().GetRatings();
});
