// ==UserScript==
// @name Ratings for FS.UA and EX.UA
// @include http://fs.to/*
// @include http://www.ex.ua/view/*
// @include http://www.kinopoisk.ru/film/*
// ==/UserScript==
/// <reference path="IInformationProvider.ts"/>
/// <reference path="../Settings/Settings.ts"/>
var FSUAInformation = (function () {
    function FSUAInformation() {
    }
    return FSUAInformation;
})();

var FSUAInformationProvider = (function () {
    function FSUAInformationProvider() {
        this.playerOnlyScript = '\
    function playerOnly() {\
        if (playerOnly === null)\
			return;\
        var bdd = document.getElementsByClassName("b-dropdown");\
        var bdds = new Array();\
        for (var i = 0; i < bdd.length; i++)\
        {\
            bdds[i] = bdd[i];\
        }\
\
        var bps = document.getElementsByClassName("b-player");\
        if (bps.length != 1)\
            return;\
        var bp = bps[0];\
        bp.style.width = "100%";\
        while (document.body.children.length > 0)\
        {\
            document.body.removeChild(document.body.children[0]);\
        }\
        document.body.appendChild(bp);\
\
        for (var i = 0; i < bdds.length; i++) {\
            document.body.appendChild(bdds[i]);\
        }\
\
        var items = document.getElementsByClassName("b-tab-item m-wide");\
        if ((items != undefined) && (items.length > 0))        {\
            var item = items[0];\
            item.className = "";\
        }\
\
        var itemPlayer = document.getElementById("player");\
        if (itemPlayer !== undefined)\
        {\
            var parent = itemPlayer.parentNode;\
            while (parent != document.body) {\
                if (parent.className != "main") {\
                    parent.style.width = "100%";\
                }\
                parent.style.margin = "0";\
                parent.style.height = "100%";\
                parent = parent.parentNode;\
            }\
            itemPlayer.style.height = "100%";\
            itemPlayer.style.width = "100%";\
        }\
        playerOnly = null;\
    }\
    if ($f() !== undefined)\
        $f().onBeforeBegin(playerOnly);\
    else\
        setTimeout("$f().onBeforeBegin(playerOnly)", 1000);';
        this.ids = [
            "adsProxy-zone-section-glowadswide",
            "adsProxy-zone-section-adsuniversal",
            "adsProxy-zone-video"
        ];
        this.classes = [
            "h-ad",
            "l-content-right"
        ];
    }
    FSUAInformationProvider.prototype.GetInfo = function () {
        this.CheckPlayerPage();

        this.CheckAndCleanAd();

        if (window.location.href.indexOf("http://fs.to/video/") == -1)
            return null;

        var category = document.getElementsByTagName("h1");
        if ((category === undefined) && (category.length <= 0))
            return null;

        var text = category[0].textContent.trim();
        var titles = text.split(String.fromCharCode(160, 47, 160));
        if (titles.length == 0)
            return null;

        var item_info = document.getElementsByClassName("item-info");
        if (item_info.length == 0)
            return null;

        var year;
        if (item_info.length > 0) {
            var el = item_info[0];
            var td = el.getElementsByTagName("td");
            for (var i = 0; i < td.length; i++) {
                var yearInfo = td[i].textContent.trim();
                var match = yearInfo.match(/[0-9][0-9][0-9][0-9]/g);
                if ((match != null) && (match.length > 0)) {
                    year = match[0];
                    break;
                }
            }
        }

        var info = new FSUAInformation();
        info.titles = titles;
        info.years = new Array(year);
        info.container = item_info[0];
        return info;
    };

    FSUAInformationProvider.prototype.CheckPlayerPage = function () {
        if ((window.location.href.indexOf("http://fs.to/view") == -1) || (window.location.href.indexOf("?play") == -1))
            return;

        if (Settings.GetSettings().GetIsClearPlayer()) {
            this.addScript(this.playerOnlyScript);
        }

        var script = '\
        function changeUrl(clip)\
        {\
            var file = document.location.href.match("file=([0-9]*)");\
            var fileId = clip.fsData.file_id;\
            if ((file == null) || (file.length < 2) || (file[1] == fileId))\
                return;\
            var newUrl = document.location.href.replace(/file=[0-9]*/,"file="+fileId);\
            history.replaceState(null, newUrl, newUrl);\
        }\
        if ($f() !== undefined)\
            $f().onBeforeBegin(changeUrl);\
        else\
            setTimeout("$f().onBeforeBegin(changeUrl)", 1000);';
        this.addScript(script);
    };

    FSUAInformationProvider.prototype.addScript = function (script) {
        var start = document.createElement("script");
        start.type = "text/javascript";
        start.innerHTML = script;
        document.body.appendChild(start);
    };

    FSUAInformationProvider.prototype.CheckAndCleanAd = function () {
        if (window.location.href.indexOf("http://fs.to/") == -1)
            return;

        if (Settings.GetSettings().GetIsRemoveAd() == false)
            return;

        this.setCookie("preroll", 1);

        for (var i = 0; i < this.ids.length; i++) {
            var ad = document.getElementById(this.ids[i]);
            if (ad !== null)
                ad.style.display = "none";
        }

        for (var i = 0; i < this.classes.length; i++) {
            var ads = document.getElementsByClassName(this.classes[i]);
            for (var n = 0; n < ads.length; n++) {
                var ad = ads[n];
                if (ad !== null)
                    ad.style.display = "none";
            }
        }
    };

    FSUAInformationProvider.prototype.setCookie = function (c_name, value, exdays) {
        if (typeof exdays === "undefined") { exdays = null; }
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var c_value = encodeURIComponent(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
        document.cookie = c_name + "=" + c_value;
    };
    return FSUAInformationProvider;
})();
//@ sourceMappingURL=FSUAInformationProvider.js.map
