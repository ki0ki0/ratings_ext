// ==UserScript==
// @name Ratings for FS.UA and EX.UA
// @include http://fs.ua/*
// @include http://www.ex.ua/view/*
// @include http://www.kinopoisk.ru/film/*
// ==/UserScript==
/// <reference path="IInformationProvider.ts"/>
var FSUAInformation = (function () {
    function FSUAInformation() { }
    return FSUAInformation;
})();
var FSUAInformationProvider = (function () {
    function FSUAInformationProvider() { }
    FSUAInformationProvider.prototype.GetInfo = function () {
        if(window.location.href.indexOf("http://fs.ua/item/") == -1) {
            return null;
        }
        var category = document.getElementsByClassName("b-subcategory-title");
        if(category.length != 1) {
            return null;
        }
        var text = category[0].nextSibling.textContent.trim();
        var titles = text.split(String.fromCharCode(160, 47, 160));
        if(titles.length == 0) {
            return null;
        }
        var item_info = document.getElementsByClassName("item-info");
        if(item_info.length == 0) {
            return null;
        }
        var year;
        if(item_info.length > 0) {
            var el = item_info[0];
            var td = el.getElementsByTagName("td");
            for(var i = 0; i < td.length; i++) {
                var yearInfo = td[i].textContent.trim();
                var match = yearInfo.match(/[0-9][0-9][0-9][0-9]/g);
                if((match != null) && (match.length > 0)) {
                    year = match[0];
                    break;
                }
            }
        }
        var info = new FSUAInformation();
        info.titles = titles;
        info.years = new Array(year);
        info.container = item_info[0];
        return info;
    };
    return FSUAInformationProvider;
})();
//@ sourceMappingURL=FSUAInformationProvider.js.map
