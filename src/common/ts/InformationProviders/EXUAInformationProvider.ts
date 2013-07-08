// ==UserScript==
// @name Ratings for FS.TO (ex FS.UA) and EX.UA
// @include http://fs.to/*
// @include http://www.ex.ua/view/*
// @include http://www.kinopoisk.ru/film/*
// ==/UserScript==

/// <reference path="IInformationProvider.ts"/> 

class EXUAInformation implements IInformationContainer {
    titles: string[];
    years: Number[];
    container: Node;
}

class EXUAInformationProvider implements IInformationProvider {
    GetInfo(): IInformationContainer {
        if (window.location.href.indexOf("http://www.ex.ua/view/") == -1)
            return null;

        var titles = null;
        var year = null;

        var header = document.getElementsByTagName("h1");
        if (header.length == 0)
            return null;

        var text = header[0].textContent.trim();
        var reg: RegExp = new RegExp("([^ |,./\\(\\)\\[\\]]*)", "g");
        titles = text.match(reg);
        if (titles.length == 0)
            return null;
        for (var i in titles) {
            titles[i] = titles[i].trim();
            var dates = titles[i].match("^[0-9][0-9][0-9][0-9]$");
            if ((dates != null) && (dates.length > 0))
                year = dates[dates.length - 1];
        }

        var info = new EXUAInformation();
        info.titles = titles;
        info.years = new Array(year);
        info.container = header[0];
        return info;
    }
}
