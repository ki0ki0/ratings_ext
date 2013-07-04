// ==UserScript==
// @name Ratings for FS.UA and EX.UA
// @include http://fs.to/*
// @include http://www.ex.ua/view/*
// @include http://www.kinopoisk.ru/film/*
// ==/UserScript==
/// <reference path="../../debug.ts"/>
/// <reference path="../IDatabaseInfo.ts"/>
/// <reference path="../../xhr.ts"/>
/// <reference path="KpInfo.ts"/>
var KpDatabaseInfo = (function () {
    function KpDatabaseInfo() {
    }
    KpDatabaseInfo.prototype.IsValid = function (id) {
        return (id instanceof KpInfo);
    };

    KpDatabaseInfo.prototype.CreateItemRatingImg = function (id, parent) {
        if (id instanceof KpInfo === false)
            return null;
        var itemInfo = id;

        var img = "http://tracker.0day.kiev.ua/kinopoisk/f" + itemInfo.id + ".gif";
        var url = "http://www.kinopoisk.ru/level/1/film/" + itemInfo.id;
        var name = "kinopoisk";

        var item = document.createElement("div");
        item.style.display = "table-cell";
        parent.appendChild(item);

        var input = document.createElement("input");
        item.appendChild(input);
        input.type = "hidden";
        input.name = name + "_id";
        input.value = itemInfo.id;

        var link = document.createElement("a");
        item.appendChild(link);
        link.href = url;

        var image = document.createElement("img");
        link.appendChild(image);
        image.src = img;

        var txtNode = document.createTextNode(this.htmlDecode(itemInfo.title));
        link.appendChild(txtNode);

        var txt = document.createElement("p");
        txt.appendChild(txtNode);
        link.appendChild(txt);
        return item;
    };

    KpDatabaseInfo.prototype.GetUserRating = function (id, callback) {
        if (id instanceof KpInfo === false)
            return false;
        debug("Kp GetUserRating");
        var itemInfo = id;

        this.callback = callback;

        var url = "http://www.kinopoisk.ru/film/" + itemInfo.id + "/";
        xhr(url, this, this.userRatingCallback, this.userRatingCallbackError);
        return true;
    };

    KpDatabaseInfo.prototype.userRatingCallbackError = function () {
        this.callback(null);
    };

    KpDatabaseInfo.prototype.userRatingCallback = function (data) {
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
            } else {
                this.auth = auth;
            }
        } else {
            rate = null;
        }

        if (data.indexOf("guest:true") != -1) {
            rate = null;
            this.auth = null;
        }

        this.callback(rate);
    };

    KpDatabaseInfo.prototype.Vote = function (id, rating, callback) {
        if (id instanceof KpInfo === false)
            return false;
        debug("Kp voting.");
        this.kpInfo = id;

        this.callback = callback;

        var url = "http://www.kinopoisk.ru/film/" + this.kpInfo.id + "/#" + rating + "#" + this.auth;

        var _this = this;
        window.addEventListener("message", function (ev) {
            _this.receiveMessage(ev);
        }, false);

        var ifr = document.createElement("iframe");
        ifr.height = "0";
        ifr.width = "0";
        ifr.src = url;

        document.body.appendChild(ifr);
        return true;
    };

    KpDatabaseInfo.prototype.receiveMessage = function (event) {
        debug("Kp receiveMessage " + event);
        if (event.data.indexOf("vote:") >= 0) {
            this.callback(this.kpInfo, event.data.indexOf("Ok") >= 0);
        }
    };

    KpDatabaseInfo.prototype.htmlDecode = function (value) {
        if (value) {
            var a = document.createElement('a');
            a.innerHTML = value;
            return a.textContent;
        } else {
            return '';
        }
    };
    return KpDatabaseInfo;
})();
//@ sourceMappingURL=KpDatabaseInfo.js.map
