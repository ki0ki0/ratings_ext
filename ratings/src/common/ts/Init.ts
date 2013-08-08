// ==UserScript==
// @name Ratings for FS.TO (ex FS.UA) and EX.UA
// @include http://fs.to/*
// @include http://www.ex.ua/*
// @include http://www.kinopoisk.ru/film/*
// ==/UserScript==

/// <reference path="common.ts"/>

/// <reference path="Settings/Settings.ts"/>
/// <reference path="Ratings.ts"/>

debug("init");

var settings = new Settings(function () {
    new Ratings().GetRatings();
});
