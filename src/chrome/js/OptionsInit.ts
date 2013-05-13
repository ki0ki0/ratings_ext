// ==UserScript==
// @name Ratings for FS.UA and EX.UA
// @include http://fs.ua/*
// @include http://www.ex.ua/view/*
// @include http://www.kinopoisk.ru/film/*
// ==/UserScript==


/// <reference path="../../common/js/kango.d.ts"/> 
/// <reference path="OptionsChrome.ts"/> 


KangoAPI.onReady(
    function () {
    var optionsChrome = new OptionsChrome();
    optionsChrome.initOptionsPage();
    }
);