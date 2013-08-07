// ==UserScript==
// @name Ratings for FS.TO (ex FS.UA) and EX.UA
// @include http://fs.to/*
// @include http://www.ex.ua/view/*
// @include http://www.kinopoisk.ru/film/*
// ==/UserScript==

/// <reference path="../../common.ts"/>

/// <reference path="../ILookuper.ts"/> 
/// <reference path="../../xhr.ts"/> 
/// <reference path="../../../js/md5.d.ts"/> 
/// <reference path="KpInfo.ts"/> 

class KpLookuper implements ILookuper {
    private info:ILookupInfo;
    private callback: (any) => void;

    private titleIndex: number = 0;

    public GetId(info: ILookupInfo, callback: (any) => void ): void {
        debug("KpLookuper GetId");
        if ((info != undefined) && (callback != undefined)) {
            debug("KpLookuper GetId initiated");
            this.info = info;
            this.callback = callback;
            this.Lookup();
        }
    }

    private Lookup() {
        var title = this.NextTitle();
        if (title == null) {
            debug("KpLookuper Lookup finished");
            this.callback(null);
        }
        else {
            var query = "getKPGlobalSearch?cityID=49&countryID=62&keyword=";
            query = query + encodeURIComponent(title).replace(/!/g, "%21");
            var hash = MD5(query + "andrliravlik");

            query = query + "&key=" + hash;

            var url = "http://ext.kinopoisk.ru/android/1.2.0/" + query;

            xhrJson(url, this, this.Success, this.Error);
        }
    }

    private NextTitle(): string {
        var res = null;
        if (this.titleIndex < this.info.titles.length) {
            res = this.info.titles[this.titleIndex];
            this.titleIndex++;
        }
        return res;
    }

    private Error() {
        this.Lookup();
    }

    private Success(json: JSON) {
        var data = json["data"];
        if (data != null) {
            var youmean = data["youmean"];
            var info = this.checkItem(youmean);
            if (info != null)
                return this.callback(info);

            var films = data["searchFilms"];
            if ((films !== undefined) && (films !== null)) {
                for (var i = 0; i < films.length; i++) {
                    info = this.checkItem(films[i]);
                    if (info != null)
                        return this.callback(info);
                }
            }
        }
        this.Lookup();
        return null;
    }

    private checkItem(film) : KpInfo {
        if (film == null)
            return null;

        if (this.checkFilm(film["nameRU"], film["year"])) {
            var itemInfo: KpInfo = new KpInfo();
            itemInfo.id = film["id"];
            itemInfo.title = film["nameRU"];
            return itemInfo;
        }
        return null;
    }

    private checkFilm(title, year) {
        if ((this.info.years === undefined) || (this.info.years == null))
            return true;
        for (var i in this.info.years) {
            if (this.info.years[i] == year)
                return true;
        }
        return false;
    }
}
