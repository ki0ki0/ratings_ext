// ==UserScript==
// @name Ratings for FS.UA and EX.UA
// @include http://fs.ua/*
// @include http://www.ex.ua/view/*
// @include http://www.kinopoisk.ru/film/*
// ==/UserScript==
/// <reference path="IInformationProvider.ts"/>
var FakeInformation = (function () {
    function FakeInformation() { }
    return FakeInformation;
})();
var FakeInformationProvider = (function () {
    function FakeInformationProvider() { }
    FakeInformationProvider.prototype.GetInfo = function () {
        var info = new FakeInformation();
        info.titles = [
            "Ïèëà", 
            "Saw"
        ];
        info.years = [
            2005, 
            2004
        ];
        var doc = document;
        info.container = doc.body;
        return info;
    };
    return FakeInformationProvider;
})();
//@ sourceMappingURL=FakeInformationProvider.js.map
