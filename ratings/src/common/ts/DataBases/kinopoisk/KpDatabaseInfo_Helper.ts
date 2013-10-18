/// <reference path="../../common.ts"/>

/// <reference path="../../xhr.ts"/>

class KpDatabaseInfo_Helper {
    
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

    private sendResponse(result: string) {
        parent.postMessage("vote:" + result.toString(), '*');
    }

    private voteResult(data) {
        var result = data.indexOf("Ok") >= 0;
        addScript("(" + this.sendResponse.toString() + ")('" + (result? "Ok": "fail") + "')");
    }

    private voteError(data) {
        addScript("(" + this.sendResponse.toString() + ")('error')");
    }
}

debug("Helper loaded");

if (document.location.href.indexOf("www.kinopoisk.ru") >= 0) {
    debug("Helper start");
    var helper = new KpDatabaseInfo_Helper();
    helper.Vote();
}