// ==UserScript==
// @name Ratings for FS.TO (ex FS.UA) and EX.UA
// @include http://fs.to/*
// @include http://www.ex.ua/*
// @include http://www.kinopoisk.ru/film/*
// ==/UserScript==

/// <reference path="../Interfaces/IInformationSource.ts"/> 

/// <reference path="../Settings/Settings.ts"/> 

declare var $f;

declare var FS_FLOWPLAYER_CONFIG;

class FSUAFilmInfo implements IFilmInfo {

    private titles: string[];
    private years: number[];

    constructor(titles: string[], year: number) {
        this.titles = titles;
        if (year != null) {
            this.years = new Array<number>();
            this.years[0] = year;
        }
    }

    GetTitles(): string[]{
        return this.titles;
    }

    GetYears(): number[]{
        return this.years;
    }
}

class FSUAInformationProvider implements IInformationSource {

    ProcessRatings(settings: ISettings, lookupers: IFilmLookuper[]): void {

        var info: FSUAFilmInfo = this.GetInfo();

        for (var i: number = 0; i < lookupers.length; i++) {
            lookupers[i].GetId(settings, info, (dbInfo: IDbFilmInfo) => this.GetIdCallback(dbInfo));
        }
    }

    GetIdCallback(dbInfo: IDbFilmInfo): void {
        debug("info present");
        debug(dbInfo.GetName());
    }

    GetInfo(): FSUAFilmInfo {
        if (window.location.href.indexOf("http://fs.to/video/") == -1)
            return null;

        var category = document.getElementsByTagName("h1");
        if ((category === undefined) || (category === null) || (category.length <= 0))
            return null;

        var titleLocal = <HTMLElement> category[0];
        var titleOrg = titleLocal.nextElementSibling;
        var text = titleLocal.textContent.trim();
        var titles = text.split(String.fromCharCode(160, 47, 160));
        if (titles.length == 0)
            return null;

        if (titleOrg != null)
            titles[titles.length] = titleOrg.textContent.trim();

        var itemInfo = document.getElementsByClassName("item-info");
        if (itemInfo.length == 0)
            return null;

        var year: number = null;
        if (itemInfo.length > 0) {
            var el: Element = <Element>itemInfo[0];
            var td = el.getElementsByTagName("td");
            for (var i = 0; i < td.length; i++) {
                var yearInfo = td[i].textContent.trim();
                var match = yearInfo.match(/[0-9][0-9][0-9][0-9]/g);
                if ((match != null) && (match.length > 0)) {
                    year = parseInt(match[0]);
                    break;
                }
            }
        }

        var info = new FSUAFilmInfo(titles, year);
        return info;
    }
}
