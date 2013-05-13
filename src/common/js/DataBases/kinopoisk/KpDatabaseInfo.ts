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

    private parent: Node;

    public CreateItemRatingImg(id: any, parent: Node): bool {
        if (id instanceof KpInfo === false)
            return false;
        var itemInfo: KpInfo = id;

        var img = "http://tracker.0day.kiev.ua/kinopoisk/f" + itemInfo.id + ".gif";
        var url = "http://www.kinopoisk.ru/level/1/film/" + itemInfo.id;
        var name = "kinopoisk";

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
        var rate = null;
        if (arr_your != null){
            rate = arr_your[1];

            var txt = document.createElement("p");
            this.parent.appendChild(txt);
            txt.innerText = "Your rating: " + rate + "/10";
        }

        var exp = /user_code:'([0-9a-f]*)'/g;
        var arr = exp.exec(data);
        this.auth = arr[1];

        this.callback(rate);
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
