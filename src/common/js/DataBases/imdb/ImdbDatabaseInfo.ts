// ==UserScript==
// @name Ratings for FS.UA and EX.UA
// @include http://fs.to/*
// @include http://www.ex.ua/view/*
// @include http://www.kinopoisk.ru/film/*
// ==/UserScript==


/// <reference path="../../debug.ts"/>

/// <reference path="../IDatabaseInfo.ts"/> 
/// <reference path="../../xhr.ts"/>
/// <reference path="ImdbInfo.ts"/> 

class ImdbDatabaseInfo implements IDatabaseInfo {

    public IsValid(id: any) {
        return (id instanceof ImdbInfo);
    }

    public CreateItemRatingImg(id: any, parent: Node): Element {
        if (id instanceof ImdbInfo === false)
            return null;
        var itemInfo: ImdbInfo = id;

        var img = "http://tracker.0day.kiev.ua/imdb/imdb_" + itemInfo.id + ".gif";
        var url = "http://www.imdb.com/title/" + itemInfo.id;
        var name = "imdb";

        var item: HTMLDivElement = <HTMLDivElement>document.createElement("div");
        item.style.display = "table-cell";
        parent.appendChild(item);

        var input: HTMLInputElement = <HTMLInputElement> document.createElement("input");
        item.appendChild(input);
        input.type = "hidden";
        input.name = name + "_id";
        input.value = itemInfo.id;

        var link = <HTMLAnchorElement> document.createElement("a");
        item.appendChild(link);
        link.href = url;

        var image = <HTMLImageElement> document.createElement("img");
        link.appendChild(image);
        image.src = img;

        var txtNode = document.createTextNode(this.htmlDecode(itemInfo.title));

        var txt = document.createElement("p");
        txt.appendChild(txtNode);
        link.appendChild(txt);
        return item;
    }

    private callback: Function;

    public GetUserRating(id: any, callback: Function): bool {
        if (id instanceof ImdbInfo === false)
            return false;
        debug("Imdb GetUserRating");
        var itemInfo: ImdbInfo = id;

        this.callback = callback;

        var url = "http://www.imdb.com/title/" + itemInfo.id + "/";
        xhr(url, this, this.userRatingCallback, this.userRatingCallbackError);
        return true;
    }

    private userRatingCallbackError() {
        this.callback(null);
    }

    private auth: string = null;

    private userRatingCallback(data) {
        var your = /<span class="value">([0-9\-]+)<\/span>/g;
        var arr_your = your.exec(data);
        var rate = null;
        if ((arr_your != null) && (arr_your.length > 0)) {
            rate = arr_your[1];
        }

        var exp = /data-auth="([^\"]*)"/g;
        var arr = exp.exec(data);
        if ((arr != null) && (arr.length > 0)) {
            var auth = arr[1];
            if (auth.length == 0) {
                rate = null;
            }
            else {
                this.auth = auth;
            }
        }
        else {
            rate = null;
        }

        this.callback(rate);
    }


    private itemInfo: ImdbInfo;

    Vote(id: any, rating: number, callback: Function): bool {
        if (id instanceof ImdbInfo === false)
            return false;
        debug("Imdb voting.");
        this.itemInfo = id;

        this.callback = callback;

        var auth = encodeURIComponent(this.auth);

        var url = "http://www.imdb.com/ratings/_ajax/title?tconst=" + this.itemInfo.id + "&rating=" + rating + "&auth=" + auth
            + "&tracking_tag=title-maindetails";

        debug(url);
        xhr(url, this, this.voteCallback, this.voteCallbackError);
        return true;
    }

    private voteCallbackError(data) {
        debug("Imdb voting error." + data.status);
        this.callback(this.itemInfo, false);
    }

    private voteCallback(data) {
        debug("Imdb voting success." + data);
        this.callback(this.itemInfo, true);
    }

    private htmlDecode(value) {
        if (value) {
            var a = document.createElement('a'); a.innerHTML = value;
            return a.textContent;
        } else {
            return '';
        }
    }

}
