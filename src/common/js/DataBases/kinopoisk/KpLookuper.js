// ==UserScript==
// @name Ratings for FS.UA and EX.UA
// @include http://fs.to/*
// @include http://www.ex.ua/view/*
// @include http://www.kinopoisk.ru/film/*
// ==/UserScript==
/// <reference path="../../debug.ts"/>
/// <reference path="../ILookuper.ts"/>
/// <reference path="../../xhr.ts"/>
/// <reference path="md5.d.ts"/>
/// <reference path="KpInfo.ts"/>
var KpLookuper = (function () {
    function KpLookuper() {
        this.titleIndex = 0;
        this.checkItem = function (film) {
            if (film == null)
                return null;

            if (this.checkFilm(film["nameRU"], film["year"])) {
                var itemInfo = new KpInfo();
                itemInfo.id = film["id"];
                itemInfo.title = film["nameRU"];
                return itemInfo;
            }
            return null;
        };
    }
    KpLookuper.prototype.GetId = function (info, callback) {
        debug("KpLookuper GetId");
        if ((info != undefined) && (callback != undefined)) {
            debug("KpLookuper GetId initiated");
            this.info = info;
            this.callback = callback;
            this.Lookup();
        }
    };

    KpLookuper.prototype.Lookup = function () {
        var title = this.NextTitle();
        if (title == null) {
            debug("KpLookuper Lookup finished");
            this.callback(null);
        } else {
            var query = "getKPGlobalSearch?cityID=49&countryID=62&keyword=";
            query = query + encodeURIComponent(title).replace(/!/g, "%21");
            var hash = MD5(query + "andrliravlik");

            query = query + "&key=" + hash;

            var url = "http://ext.kinopoisk.ru/android/1.2.0/" + query;

            xhrJson(url, this, this.Success, this.Error);
        }
    };

    KpLookuper.prototype.NextTitle = function () {
        var res = null;
        if (this.titleIndex < this.info.titles.length) {
            var res = this.info.titles[this.titleIndex];
            this.titleIndex++;
        }
        return res;
    };

    KpLookuper.prototype.Error = function () {
        this.Lookup();
    };

    KpLookuper.prototype.Success = function (json) {
        var data = json["data"];
        if (data != null) {
            var youmean = data["youmean"];
            var info = this.checkItem(youmean);
            if (info != null)
                return this.callback(info);

            var films = data["searchFilms"];
            for (var i = 0; films !== undefined && i < films.length; i++) {
                info = this.checkItem(films[i]);
                if (info != null)
                    return this.callback(info);
            }
        }
        this.Lookup();
    };

    KpLookuper.prototype.checkFilm = function (title, year) {
        if ((this.info.years === undefined) || (this.info.years == null))
            return true;
        for (var i in this.info.years) {
            if (this.info.years[i] == year)
                return true;
        }
        return false;
    };
    return KpLookuper;
})();
//@ sourceMappingURL=KpLookuper.js.map
