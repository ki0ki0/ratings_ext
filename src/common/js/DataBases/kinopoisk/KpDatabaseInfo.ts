// ==UserScript==
// @name Ratings for FS.UA and EX.UA
// @include http://fs.ua/*
// @include http://www.ex.ua/view/*
// @include http://www.kinopoisk.ru/film/*
// ==/UserScript==

/// <reference path="../IDatabaseInfo.ts"/> 
/// <reference path="../../xhr.ts"/>
/// <reference path="KpInfo.ts"/> 

class KpDatabaseInfo implements IDatabaseInfo {

    public CreateItemRatingImg(id: any, parent: Node): Element {
        if (id instanceof KpInfo === false)
            return null;
        var itemInfo: KpInfo = id;

        var img = "http://tracker.0day.kiev.ua/kinopoisk/f" + itemInfo.id + ".gif";
        var url = "http://www.kinopoisk.ru/level/1/film/" + itemInfo.id;
        var name = "kinopoisk";

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

        var txt = document.createElement("p");
        link.appendChild(txt);
        txt.innerText = this.htmlDecode(itemInfo.title);
        return item;
    }

    private callback: Function;

    public GetUserRating(id: any, callback: Function): bool {
        if (id instanceof KpInfo === false)
            return false;
        var itemInfo: KpInfo = id;

        this.callback = callback;

        var url = "http://www.kinopoisk.ru/film/" + itemInfo.id + "/";
        xhr(url, this, this.userRatingCallback, this.userRatingCallbackError);
        return true;
    }

    private userRatingCallbackError() {
        this.callback(null);
    }

    private auth: string;

    private userRatingCallback(data) {
        var your = /myVote:([0-9]*)/g;
        var arr_your = your.exec(data);
        var rate = "-";
        if ((arr_your != null) && (arr_your.length > 0)) {
            rate = arr_your[1];
        }

        var exp = /user_code:'([0-9a-f]*)'/g;
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

        if (data.indexOf("guest:true") != -1) {
            rate = null;
            this.auth = null;
        }

        this.callback(rate);
    }

    Vote(id: any, rating: number, callback: Function): bool {
        return false;
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
