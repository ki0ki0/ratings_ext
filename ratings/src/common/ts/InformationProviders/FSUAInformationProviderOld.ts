/// <reference path="IInformationProvider.d.ts"/> 

/// <reference path="../Settings/Settings.ts"/> 

declare var $f;

declare var FS_FLOWPLAYER_CONFIG;

declare var FS_GLOBALS;
declare var FS_BRANDING;

class FSUAInformationOld implements IInformationContainer {
    titles: string[];
    years: Number[];
    container: Node;
}

class FSUAInformationProviderOld implements IInformationProvider {
    GetInfo(callback: (info: IInformationContainer) => void ) {

        if ((window.location.href.indexOf("http://fs.to/") == -1) &&
            (window.location.href.indexOf("http://brb.to/") == -1) &&
            (window.location.href.indexOf("http://ewq.to/") == -1) &&
            (window.location.href.indexOf("http://sdf.to/") == -1))
            return null;

        if (window.location.href.indexOf("/video/") == -1)
            return null;

        var titleInner = document.getElementsByClassName("b-tab-item__title-inner");
        if ((titleInner === undefined) || (titleInner === null) || (titleInner.length <= 0))
            return null;

        var titleInner0 = <HTMLElement> titleInner[0];
        if ((titleInner0 === undefined) || (titleInner0 === null) || (titleInner0.children.length < 1))
            return null;
        var child = <HTMLElement> titleInner0.children[0];
        var title = child.textContent;
        var titleOrg = null;
        if (titleInner0.children.length > 1) {
            child = <HTMLElement> titleInner0.children[1];
            titleOrg = child.textContent;
        }
        var titles = title.split(String.fromCharCode(160, 47, 160));
        if (titles.length == 0)
            return null;

        if (titleOrg != null)
            titles[titles.length] = titleOrg;

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
                    year = parseInt( match[0]);
                    break;
                }
            }
        }

        var info = new FSUAInformation();
        info.titles = titles;
        if (year !== null) {
            info.years = new Array(1);
            info.years[0] = year;
        }
        info.container = itemInfo[0];
        callback(info);
    }

}