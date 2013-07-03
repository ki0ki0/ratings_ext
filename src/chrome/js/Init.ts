// ==UserScript==
// @name Ratings for FS.UA and EX.UA
// @include http://fs.to/*
// @include http://www.ex.ua/view/*
// @include http://www.kinopoisk.ru/film/*
// ==/UserScript==

/// <reference path="../../common/js/debug.ts"/>

/// <reference path="Settings/SettingsChrome.ts"/>
/// <reference path="../../common/js/Ratings.ts"/>

if (navigator["vendor"].indexOf("Google") != -1)
{
    debug("chrome/init");
    new SettingsChrome(function () {
        new Ratings().GetRatings();
    }, null);
}
else {
    debug("blink/init");
    new Settings(function () {
        new Ratings().GetRatings();
    });
}
