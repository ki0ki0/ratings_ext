// ==UserScript==
// @name Ratings for FS.TO (ex FS.UA) and EX.UA
// @include http://fs.to/*
// @include http://www.ex.ua/view/*
// @include http://www.kinopoisk.ru/film/*
// ==/UserScript==


/// <reference path="../../common/ts/kango.d.ts"/> 
/// <reference path="OptionsFirefox.ts"/> 

KangoAPI.onReady(function () {
    var options = new OptionsFirefox();
    options.initOptionsPage();
});