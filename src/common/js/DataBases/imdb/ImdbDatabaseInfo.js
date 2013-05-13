// ==UserScript==
// @name Ratings for FS.UA and EX.UA
// @include http://fs.ua/*
// @include http://www.ex.ua/view/*
// @include http://www.kinopoisk.ru/film/*
// ==/UserScript==
/// <reference path="../IDatabaseInfo.ts"/>
/// <reference path="../../xhr.ts"/>
/// <reference path="ImdbInfo.ts"/>
var ImdbDatabaseInfo = (function () {
    function ImdbDatabaseInfo() { }
    ImdbDatabaseInfo.prototype.CreateItemRatingImg = function (id, parent) {
        if(id instanceof ImdbInfo === false) {
            return false;
        }
        var itemInfo = id;
        var img = "http://tracker.0day.kiev.ua/imdb/imdb_" + itemInfo.id + ".gif";
        var url = "http://www.imdb.com/title/" + itemInfo.id;
        var name = "imdb";
        var item = document.createElement("div");
        item.style.display = "table-cell";
        parent.appendChild(item);
        this.parent = item;
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
    };
    ImdbDatabaseInfo.prototype.GetUserRating = function (id, callback) {
        if(id instanceof ImdbInfo === false) {
            return false;
        }
        var itemInfo = id;
        this.callback = callback;
        var url = "http://m.imdb.com/title/" + itemInfo.id + "/";
        xhr(url, this, this.userRatingCallback, this.userRatingCallbackError);
        return true;
    };
    ImdbDatabaseInfo.prototype.userRatingCallbackError = function () {
        this.callback(null);
    };
    ImdbDatabaseInfo.prototype.userRatingCallback = function (data) {
        var your = /<strong>You: ([0-9]+)/g;
        var arr_your = your.exec(data);
        var rate = null;
        if((arr_your != null) && (arr_your.length > 0)) {
            rate = parseInt(arr_your[1]);
            var txt = document.createElement("p");
            this.parent.appendChild(txt);
            txt.innerText = "Your rating: " + rate + "/10";
        }
        var exp = /data-csrf="([^\"]*)"/g;
        var arr = exp.exec(data);
        this.auth = arr[1];
        this.callback(rate);
    };
    ImdbDatabaseInfo.prototype.htmlDecode = //voting url http://m.imdb.com/title/tt1605630/rate?new_rating=<rating>&csrf=<auth>
    function (value) {
        if(value) {
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
