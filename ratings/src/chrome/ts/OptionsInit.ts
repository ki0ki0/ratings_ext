// ==UserScript==
// @name Ratings for FS.TO (ex FS.UA) and EX.UA
// @include http://fs.to/*
// @include http://www.ex.ua/*
// @include http://www.kinopoisk.ru/film/*
// ==/UserScript==


/// <reference path="../../common/ts/kango.d.ts"/> 
/// <reference path="OptionsChrome.ts"/> 

var optionsInit: () => void;

if (navigator["vendor"].indexOf("Google") != -1)
{
    optionsInit = () => {
        var optionsChrome = new OptionsChrome();
        optionsChrome.initOptionsPage();
    };
}
else {
    optionsInit = () => {
        var options = new Options(true);
        options.initOptionsPage();
    };
}



KangoAPI.onReady(optionsInit);