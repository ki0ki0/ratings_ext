// ==UserScript==
// @name Ratings for FS.TO (ex FS.UA) and EX.UA
// @include http://fs.to/*
// @include http://www.ex.ua/*
// @include http://www.kinopoisk.ru/film/*
// ==/UserScript==

/// <reference path="../../common.ts"/>

/// <reference path="../../Interfaces/IFilmLookuper.ts"/> 
/// <reference path="../../xhr.ts"/> 


class ImdbLookuper implements IFilmLookuper {
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
            debug("ImdbLookuper Lookup finished");
            this.callback(null);
        }
        else {
            var url = "http://www.imdb.com/xml/find?json=1&nr=1&tt=on&q=" + encodeURIComponent(title);
            //debug("imdb query: " + url);
            xhrJson(url,
                this, this.Success, this.Error);
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

    private checkFilms(array): ImdbDatabaseInfo {
        if (array == null)
            return null;
        for (var i in array) {
            var years = array[i]["description"].match("[0-9][0-9][0-9][0-9]");
            if (years === null)
                continue;
            var year: number = parseInt(years[0]);
            var id: string = array[i]["id"];
            var title: string = array[i]["title"];
            if (this.checkFilm(title, year)) {
                var itemInfo: ImdbDatabaseInfo = new ImdbDatabaseInfo(id, title, year);
                return itemInfo;
            }
        }
        return null;
    }

    private checkFilm(title: string, year: number) {
        if ((this.info.GetYears() === undefined) || (this.info.GetYears() == null))
            return true;
        for (var i in this.info.GetYears()) {
            if (this.info.GetYears()[i] == year)
                return true;
        }
        return false;
    }
}
