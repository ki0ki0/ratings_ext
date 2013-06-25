// ==UserScript==
// @name Ratings for FS.UA and EX.UA
// @include http://fs.to/*
// @include http://www.ex.ua/view/*
// @include http://www.kinopoisk.ru/film/*
// ==/UserScript==
/// <reference path="../IDatabaseInfo.ts"/>
/// <reference path="../../xhr.ts"/>
/// <reference path="ImdbInfo.ts"/>
var ImdbDatabaseInfo = (function () {
    function ImdbDatabaseInfo() {
        this.auth = null;
    }
    ImdbDatabaseInfo.prototype.CreateItemRatingImg = function (id, parent) {
        if (id instanceof ImdbInfo === false)
            return null;
        var itemInfo = id;

        var img = "http://tracker.0day.kiev.ua/imdb/imdb_" + itemInfo.id + ".gif";
        var url = "http://www.imdb.com/title/" + itemInfo.id;
        var name = "imdb";

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

        var txt = document.createElement("p");
        link.appendChild(txt);
        txt.innerText = this.htmlDecode(itemInfo.title);
        return item;
    };

    ImdbDatabaseInfo.prototype.GetUserRating = function (id, callback) {
        if (id instanceof ImdbInfo === false)
            return false;
        console.log("Imdb GetUserRating");
        var itemInfo = id;

        this.callback = callback;

        var url = "http://www.imdb.com/title/" + itemInfo.id + "/";
        xhr(url, this, this.userRatingCallback, this.userRatingCallbackError);
        return true;
    };

    ImdbDatabaseInfo.prototype.userRatingCallbackError = function () {
        this.callback(null);
    };

    ImdbDatabaseInfo.prototype.userRatingCallback = function (data) {
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
            } else {
                this.auth = auth;
            }
        } else {
            rate = null;
        }

        this.callback(rate);
    };

    ImdbDatabaseInfo.prototype.Vote = function (id, rating, callback) {
        if (id instanceof ImdbInfo === false)
            return false;
        console.log("Imdb voting.");
        var itemInfo = id;

        this.callback = callback;

        var url = "http://www.imdb.com/ratings/_ajax/title?tconst=" + itemInfo.id + "&rating=" + rating + "&auth=" + this.auth + "&tracking_tag=title-maindetails";

        console.log(url);
        xhr(url, this, this.voteCallback, this.voteCallbackError);
        return true;
    };

    ImdbDatabaseInfo.prototype.voteCallbackError = function (data) {
        console.log("Imdb voting error." + data.status);
        this.callback(false);
    };

    ImdbDatabaseInfo.prototype.voteCallback = function (data) {
        console.log("Imdb voting success." + data);
        this.callback(true);
    };

    ImdbDatabaseInfo.prototype.htmlDecode = function (value) {
        if (value) {
            var a = document.createElement('a');
            a.innerHTML = value;
            return a.textContent;
        } else {
            return '';
        }
    };
    return ImdbDatabaseInfo;
})();
//@ sourceMappingURL=ImdbDatabaseInfo.js.map
