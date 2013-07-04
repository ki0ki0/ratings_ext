// ==UserScript==
// @name Ratings for FS.UA and EX.UA
// @include http://www.kinopoisk.ru/film/*
// @all-frames true
// ==/UserScript==

/// <reference path="../../debug.ts"/>

/// <reference path="../../xhr.ts"/>

class KpDatabaseInfo_Helper {
    private addScript(text) {
        var start = document.createElement("script");
        start.type = "text/javascript";
        start.innerHTML = text;
        document.body.appendChild(start);
    }

    public Vote() {
        if (document.location.hash != "") {
            var exp = /\/film\/([0-9]*)\/#([0-9])+#([0-9A-z]*)/g;
            var info = exp.exec(document.location.href);
            if ((info == null) || (info.length != 4))
                return;
            var rate = info[2];
            var id = info[1];
            var auth = info[3];

            var url = "http://www.kinopoisk.ru/vote.php?film=" + id + "&film_vote=" + rate + "&c=" + auth + "&rnd=" + Math.random();

            debug("Vote url: " + url);
            xhr(url, this, this.voteResult, this.voteError);
        }
    }


    private voteResult(data) {
        this.addScript("parent.postMessage(\"vote:" + data + "\", '*');");
    }

    private voteError(data) {
        this.addScript("parent.postMessage(\"vote:error\", '*');");
    }
}

debug("Helper loaded");

if (document.location.href.indexOf("www.kinopoisk.ru") >= 0) {
    debug("Helper start");
    var helper = new KpDatabaseInfo_Helper();
    helper.Vote();
}
