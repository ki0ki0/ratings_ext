/// <reference path="../Interfaces/IInformationSource.d.ts"/>
/// <reference path="../Settings/Settings.ts"/> 
/// <reference path="../RatingsImgViewer.ts"/> 

class FSUAFilmInfo implements IRatingsImgContainer {

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

class FSUAInformationProvider implements IInformationSource {

    ProcessRatings(settings: ISettings, lookupers: IFilmLookuper[]): void {
        debug("FSUAInformationProvider::ProcessRatings");
        var info: FSUAFilmInfo = this.GetInfo();

        if (info != null) {
            var viewer = new RatingsImgViewer(settings, lookupers);
            viewer.GetRattings(info);
            debug("FSUAInformationProvider::ProcessRatings Done");
        }
    }

    GetInfo(): FSUAFilmInfo {

    	if ((window.location.href.indexOf("http://fs.to/") == -1) &&
            (window.location.href.indexOf("http://brb.to/") == -1) &&
            (window.location.href.indexOf("http://ewq.to/") == -1) &&
            (window.location.href.indexOf("http://sdf.to/") == -1))
            return null;
	    
        if (window.location.href.indexOf("/video/") == -1)
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