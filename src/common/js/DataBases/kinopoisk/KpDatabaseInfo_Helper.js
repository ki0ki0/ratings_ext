// ==UserScript==
// @name Ratings for FS.UA and EX.UA
// @include http://www.kinopoisk.ru/film/*
// @all-frames true
// ==/UserScript==
/// <reference path="../../xhr.ts"/>
var KpDatabaseInfo_Helper = (function () {
    function KpDatabaseInfo_Helper() {
    }
    KpDatabaseInfo_Helper.prototype.addScript = function (text) {
        var start = document.createElement("script");
        start.type = "text/javascript";
        start.innerHTML = text;
        document.body.appendChild(start);
    };

    KpDatabaseInfo_Helper.prototype.Vote = function () {
        if (document.location.hash != "") {
            var exp = /\/film\/([0-9]*)\/#([0-9])+#([0-9A-z]*)/g;
            var info = exp.exec(document.location.href);
            if ((info == null) || (info.length != 4))
                return;
            var rate = info[2];
            var id = info[1];
            var auth = info[3];

            var url = "http://www.kinopoisk.ru/vote.php?film=" + id + "&film_vote=" + rate + "&c=" + auth + "&rnd=" + Math.random();

            console.log("Vote url: " + url);
            xhr(url, this, this.voteResult, this.voteError);
        }
    };

    KpDatabaseInfo_Helper.prototype.voteResult = function (data) {
        this.addScript("parent.postMessage(\"vote:" + data + "\", '*');");
    };

    KpDatabaseInfo_Helper.prototype.voteError = function (data) {
        this.addScript("parent.postMessage(\"vote:error\", '*');");
    };
    return KpDatabaseInfo_Helper;
})();

console.log("Helper loaded");

if (document.location.href.indexOf("www.kinopoisk.ru") >= 0) {
    console.log("Helper start");
    var helper = new KpDatabaseInfo_Helper();
    helper.Vote();
}
//@ sourceMappingURL=KpDatabaseInfo_Helper.js.map
