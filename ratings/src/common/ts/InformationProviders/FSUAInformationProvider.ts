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
    private containerRatings: HTMLTableRowElement;
    private containerVoting: HTMLDivElement;

    constructor(titles: string[], year: number, container: HTMLElement) {
        this.titles = titles;
        if (year != null) {
            this.years = new Array<number>();
            this.years[0] = year;
        }

        var table = document.createElement("table");
        container.appendChild(table);

        var trRatings = document.createElement("tr");
        table.appendChild(trRatings);

        this.containerRatings = trRatings;

        var trVoting = document.createElement("tr");
        table.appendChild(trVoting);

        var tdVoting = document.createElement("td");
        trVoting.appendChild(tdVoting);

        var divVoting = document.createElement("div");
        tdVoting.appendChild(divVoting);

        this.containerVoting = divVoting;

        var txtNode = document.createTextNode("Vote:");
        divVoting.appendChild(txtNode);
        divVoting.id = "voting";
        divVoting.style.display = "none";

        kango.invokeAsync("kango.i18n.getMessage", "vote", (data) => {
            divVoting.textContent = data;
        });

    }

    GetTitles(): string[]{
        return this.titles;
    }

    GetYears(): number[]{
        return this.years;
    }

    GetContainerRatings(): HTMLTableRowElement {
        return this.containerRatings;
    }

    GetContainerVoting(): HTMLDivElement {
        return this.containerVoting;
    }
}

class FSUAInformationProvider implements IInformationSource {

    ProcessRatings(settings: ISettings, lookupers: IFilmLookuper[]): void {

        var info: FSUAFilmInfo = this.GetInfo();

        var rating = info.GetContainerRatings();

        for (var i: number = 0; i < lookupers.length; i++) {
            var tdRating = document.createElement("td");
            rating.appendChild(tdRating);

            lookupers[i].GetId(settings, info, (dbInfo: IDbFilmInfo) => this.GetIdCallback(tdRating, dbInfo));
        }
    }

    GetIdCallback(tdRating: HTMLTableDataCellElement, dbInfo: IDbFilmInfo): void {
        debug("GetIdCallback");
        
        var link = <HTMLAnchorElement> document.createElement("a");
        tdRating.appendChild(link);
        link.href = dbInfo.GetInfoUrl();

        var image = <HTMLImageElement> document.createElement("img");
        link.appendChild(image);
        image.src = dbInfo.GetRatingImgSrc();

        var txt = document.createElement("p");
        link.appendChild(txt);

        var txtNode = document.createTextNode(HtmlDecode(dbInfo.GetLocalName()));
        txt.appendChild(txtNode);
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

        var info = new FSUAFilmInfo(titles, year, <HTMLElement>itemInfo[0]);
        return info;
    }
}
