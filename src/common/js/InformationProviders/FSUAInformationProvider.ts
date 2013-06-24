// ==UserScript==
// @name Ratings for FS.UA and EX.UA
// @include http://fs.to/*
// @include http://www.ex.ua/view/*
// @include http://www.kinopoisk.ru/film/*
// ==/UserScript==

/// <reference path="IInformationProvider.ts"/> 

class FSUAInformation implements IInformationContainer {
    titles: string[];
    years: Number[];
    container: Node;
}

class FSUAInformationProvider implements IInformationProvider {
    GetInfo(): IInformationContainer {
        if (window.location.href.indexOf("http://fs.to/video/") == -1)
            return null;

        var category = document.getElementsByTagName("h1");
        if ((category === undefined) && (category.length <= 0))
            return null;

        var text = category[0].textContent.trim();
        var titles = text.split(String.fromCharCode(160, 47, 160));
        if (titles.length == 0)
            return null;

        var item_info = document.getElementsByClassName("item-info");
        if (item_info.length == 0)
            return null;

        var year;
        if (item_info.length > 0) {
            var el: Element = <Element>item_info[0];
            var td = el.getElementsByTagName("td");
            for (var i = 0; i < td.length; i++) {
                var yearInfo = td[i].textContent.trim();
                var match = yearInfo.match(/[0-9][0-9][0-9][0-9]/g);
                if ((match != null) && (match.length > 0)) {
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
    }
}
