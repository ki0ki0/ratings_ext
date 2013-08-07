// ==UserScript==
// @name Ratings for FS.TO (ex FS.UA) and EX.UA
// @include http://fs.to/*
// @include http://www.ex.ua/view/*
// @include http://www.kinopoisk.ru/film/*
// ==/UserScript==


/// <reference path="kango.d.ts"/> 
/// <reference path="Options.ts"/> 

KangoAPI.onReady(
    function () {
        var options = new Options(true);
        options.initOptionsPage();
    }
);