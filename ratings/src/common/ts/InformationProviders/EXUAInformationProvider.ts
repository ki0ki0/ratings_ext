/// <reference path="IInformationProvider.d.ts"/> 

class EXUAInformation implements IInformationContainer {
    titles: string[];
    years: Number[];
    container: Node;
}

class EXUAInformationProvider implements IInformationProvider {
    GetInfo(): IInformationContainer {
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

        var info = new EXUAInformation();
        info.titles = titles;
        if (year !== null) {
            info.years = new Array(1);
            info.years[0] = year;
        }
        info.container = header[0];
        return info;
    }
}