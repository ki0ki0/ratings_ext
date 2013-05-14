// ==UserScript==
// @name Ratings for FS.UA and EX.UA
// @include http://fs.ua/*
// @include http://www.ex.ua/view/*
// @include http://www.kinopoisk.ru/film/*
// ==/UserScript==

/// <reference path="../IDatabaseInfo.ts"/> 
/// <reference path="../../xhr.ts"/>
/// <reference path="ImdbInfo.ts"/> 

class ImdbDatabaseInfo implements IDatabaseInfo {

    private parent:Node;

    public CreateItemRatingImg(id: any, parent: Node): bool {
        if (id instanceof ImdbInfo === false)
            return false;
        var itemInfo: ImdbInfo = id;

        var img = "http://tracker.0day.kiev.ua/imdb/imdb_" + itemInfo.id + ".gif";
        var url = "http://www.imdb.com/title/" + itemInfo.id;
        var name = "imdb";

        var item: HTMLDivElement = <HTMLDivElement>document.createElement("div");
        item.style.display = "table-cell";
        parent.appendChild(item);

        this.parent = item;

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

        var txt = document.createElement("p");
        link.appendChild(txt);
        txt.innerText = this.htmlDecode(itemInfo.title);
    }

    private callback: Function;

    public GetUserRating(id: any, callback: Function): bool {
        if (id instanceof ImdbInfo === false)
            return false;
        var itemInfo: ImdbInfo = id;

        this.callback = callback;

        var url = "http://m.imdb.com/title/" + itemInfo.id + "/";
        xhr(url, this, this.userRatingCallback, this.userRatingCallbackError);
        return true;
    }

    private userRatingCallbackError() {
        this.callback(null);
    }

    private auth: string;

    private userRatingCallback(data) {
        var your = /<strong>You: ([0-9]+)/g;
        var arr_your = your.exec(data);
        var rate = null;
        var txt = null;
        if ((arr_your != null) && (arr_your.length > 0)) {
            rate = parseInt(arr_your[1]);

            txt = document.createElement("p");
            this.parent.appendChild(txt);
            txt.innerText = "Your rating: " + rate + "/10";
        }

        var exp = /data-csrf="([^\"]*)"/g;
        var arr = exp.exec(data);
        this.auth = arr[1];

        this.callback(rate, txt);
    }

    Vote(id: any, rating: number, callback: Function): bool {
        if (id instanceof ImdbInfo === false)
            return false;
        var itemInfo: ImdbInfo = id;

        this.callback = callback;

        var url = "http://m.imdb.com/title/" + itemInfo.id + "//rate?new_rating=" + rating + "&csrf=" + this.auth;
        xhr(url, this, this.voteCallback, this.voteCallbackError);
        return true;
    }

    private voteCallbackError() {
        this.callback(false);
    }

    private voteCallback(data) {
        this.callback(true);
    }

    //voting url http://m.imdb.com/title/tt1605630/rate?new_rating=<rating>&csrf=<auth>

    private htmlDecode(value) {
        if (value) {
            var a = document.createElement('a'); a.innerHTML = value;
            return a.textContent;
        } else {
            return '';
        }
    }

}
