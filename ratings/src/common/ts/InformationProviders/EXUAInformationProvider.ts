/// <reference path="../Interfaces/IInformationSource.d.ts"/>
/// <reference path="../Settings/Settings.ts"/> 
/// <reference path="../RatingsImgViewer.ts"/> 

class EXUAFilmInfo implements IRatingsImgContainer {

    private titles: string[];
    private years: number[];
    private container: HTMLElement;
    constructor(titles: string[], year: number, container: HTMLElement) {
        this.titles = titles;
        if (year != null) {
            this.years = new Array<number>();
            this.years[0] = year;
        }
        this.container = container;
    }

    GetTitles(): string[]{
        return this.titles;
    }

    GetYears(): number[]{
        return this.years;
    }

    GetContainer(): HTMLElement {
        return this.container;
    }
}

class EXUAInformationProvider implements IInformationSource {

    ProcessRatings(settings: ISettings, lookupers: IFilmLookuper[]): void {
        debug("EXUAInformationProvider::ProcessRatings");
        var info: EXUAFilmInfo = this.GetInfo();

        if (info != null) {
            var viewer = new RatingsImgViewer(settings, lookupers);
            viewer.GetRattings(info);
            debug("EXUAInformationProvider::ProcessRatings Done");
        }
    }

    GetInfo(): EXUAFilmInfo {
        if (window.location.href.indexOf("http://www.ex.ua/") == -1)
            return null;

        var reg: RegExp = new RegExp("www.ex.ua\/([0-9]+)?", "g");
        var urlMatch = reg.exec(window.location.href);
        if (urlMatch == null || urlMatch.length <= 1 || urlMatch[1] === undefined)
            return null;

        debug(urlMatch.join());

        var titles;
        var year = null;

        var header = document.getElementsByTagName("h1");
        if (header.length == 0)
            return null;

        var text = header[0].textContent.trim();
        reg = new RegExp("([^|,./\\(\\)\\[\\]]*)", "g");
        titles = text.match(reg);
        if (titles == null || titles.length == 0)
            return null;
        for (var i in titles) {
            titles[i] = titles[i].trim();
            var dates = titles[i].match("^[0-9][0-9][0-9][0-9]$");
            if ((dates != null) && (dates.length > 0))
                year = dates[dates.length - 1];
        }

        var info = new EXUAFilmInfo(titles, year, <HTMLElement>header[0]);
        return info;
    }

}