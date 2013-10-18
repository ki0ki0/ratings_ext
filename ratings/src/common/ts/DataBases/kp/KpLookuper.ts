/// <reference path="../../common.ts"/>
/// <reference path="../../Interfaces/IFilmLookuper.d.ts"/> 
/// <reference path="../../xhr.ts"/> 


class KpLookuper implements IFilmLookuper {
    private callback: (dbInfo: IDbFilmInfo) => void;
    private info: IFilmInfo;

    private titleIndex: number;

    GetId(settings: ISettings, info: IFilmInfo, callback: (dbInfo: IDbFilmInfo) => void): void
    {
        this.callback = callback;
        this.info = info;

        this.titleIndex = 0;

        this.Lookup();
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
            //debug("kinopoisk query: " + url);
            xhrJson(url, this, this.Success, this.Error);
        }
    }

    private NextTitle(): string {
        var res = null;
        if (this.titleIndex < this.info.GetTitles().length) {
            res = this.info.GetTitles()[this.titleIndex];
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

    private checkItem(film): KpDatabaseInfo {
        if (film == null)
            return null;
        var nameRu = film["nameRU"];
        var nameOrg = film["nameEN"];
        if (this.checkFilm(nameRu, film["year"]) || this.checkFilm(nameOrg, film["year"])) {
            if (nameOrg === "") {
                nameOrg = nameRu;
            }
            var ratingStr: string = film["rating"];
            var ratingExpr: RegExp = new RegExp("^([0-9\.]+)");
            var exec = ratingExpr.exec(ratingStr);
            var rating: number = null;
            if ((exec !== null) && (exec !== undefined) && (exec.length > 1)) {
                rating = parseFloat(exec[1]);
            }
            var itemInfo: KpDatabaseInfo = new KpDatabaseInfo(film["id"], nameOrg, nameRu, film["year"], rating);
            return itemInfo;
        }
        return null;
    }

    private checkFilm(title, year) {
        if ((this.info.GetYears() === undefined) || (this.info.GetYears() == null))
            return true;
        for (var i in this.info.GetYears()) {
            if (this.info.GetYears()[i] == year)
                return true;
        }
        return false;
    }
}