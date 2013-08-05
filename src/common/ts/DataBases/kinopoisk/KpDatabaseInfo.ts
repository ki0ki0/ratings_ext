// ==UserScript==
// @name Ratings for FS.TO (ex FS.UA) and EX.UA
// @include http://fs.to/*
// @include http://www.ex.ua/view/*
// @include http://www.kinopoisk.ru/film/*
// ==/UserScript==

/// <reference path="../../common.ts"/>

/// <reference path="../IDatabaseInfo.ts"/> 
/// <reference path="../../xhr.ts"/>
/// <reference path="KpInfo.ts"/> 

class KpDatabaseInfo implements IDatabaseInfo {

    public IsValid(id: any) {
        return (id instanceof KpInfo);
    }

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

        var txtNode = document.createTextNode(HtmlDecode(itemInfo.title));
        link.appendChild(txtNode);

        var txt = document.createElement("p");
        txt.appendChild(txtNode);
        link.appendChild(txt);
        return item;
    }

    private callback: Function;

    public GetUserRating(id: any, callback: Function): bool {
        if (id instanceof KpInfo === false)
            return false;
        debug("Kp GetUserRating");
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

    private kpInfo: KpInfo;

    Vote(id: any, rating: number, callback: Function): bool {
        if (id instanceof KpInfo === false)
            return false;
        debug("Kp voting.");
        this.kpInfo = id;

        this.callback = callback;

        var url = "http://www.kinopoisk.ru/film/" + this.kpInfo.id + "/#" + rating + "#" + this.auth;

        var _this = this;
        window.addEventListener("message", function (ev) { _this.receiveMessage(ev); }, false);

        var ifr = <HTMLIFrameElement> document.createElement("iframe");
        ifr.height = "0";
        ifr.width = "0";
        ifr.src = url;

        document.body.appendChild(ifr);
        return true;
    }

    private receiveMessage(event) {
        debug("Kp receiveMessage " + event);
        if (event.data.indexOf("vote:") >= 0) {
            this.callback(this.kpInfo, event.data.indexOf("Ok") >= 0);
        }
    }

}
