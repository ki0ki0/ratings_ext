// ==UserScript==
// @name Ratings for FS.TO (ex FS.UA) and EX.UA
// @include http://fs.to/*
// @include http://www.ex.ua/*
// @include http://www.kinopoisk.ru/film/*
// ==/UserScript==

/// <reference path="../../common.ts"/>

/// <reference path="../ILookuper.ts"/> 
/// <reference path="../../xhr.ts"/> 
/// <reference path="ImdbInfo.ts"/> 


class ImdbLookuper implements ILookuper {
    private info:ILookupInfo;
    private callback: (any) => void;

    private titleIndex: number = 0;

    public GetId(info: ILookupInfo, callback: (any) => void ): void {
        debug("ImdbLookuper GetId");
        if ((info != undefined) && (callback != undefined)) {
            debug("ImdbLookuper GetId initiated");
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
            xhrJson("http://www.imdb.com/xml/find?json=1&nr=1&tt=on&q=" + encodeURIComponent(title),
                this, this.Success, this.Error);
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

    private Success(data: JSON) {
        if (data !== null) {
            var group = data["title_popular"];
            if (group !== undefined) {
                var info = this.checkFilms(group);
                if (info != null)
                    return this.callback(info);
            }
            group = data["title_exact"];
            if (group !== undefined) {
                info = this.checkFilms(group);
                if (info != null)
                    return this.callback(info);
            }
            group = data["title_substring"];
            if (group !== undefined) {
                info = this.checkFilms(group);
                if (info != null)
                    return this.callback(info);
            }
            group = data["title_approx"];
            if (group !== undefined) {
                info = this.checkFilms(group);
                if (info != null)
                    return this.callback(info);
            }
        }
        this.Lookup();
        return null;
    }

    private checkFilms(array) {
        if (array == null)
            return null;
        for (var i in array) {
            var years = array[i]["description"].match("[0-9][0-9][0-9][0-9]");
            if (years === null)
                continue;
            var year = years[0];
            var id = array[i]["id"];
            var title = array[i]["title"];
            if (this.checkFilm(title, year)) {
                var itemInfo: ImdbInfo = new ImdbInfo();
                itemInfo.id = id;
                itemInfo.title = title;
                return itemInfo;
            }
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
