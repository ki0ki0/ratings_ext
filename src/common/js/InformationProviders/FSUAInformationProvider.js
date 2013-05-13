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
        var table = document.createElement("table");
        item_info[0].appendChild(table);
        var tr = document.createElement("tr");
        table.appendChild(tr);
        var act = document.getElementsByClassName("item-actions");
        if((act == null) || (act.length == 0)) {
            return null;
        }
        var div = document.createElement("div");
        act[0].parentNode.appendChild(div);
        var info = new FSUAInformation();
        info.titles = titles;
        info.years = new Array(year);
        info.container = tr;
        return info;
    };
    return FSUAInformationProvider;
})();
//@ sourceMappingURL=FSUAInformationProvider.js.map
