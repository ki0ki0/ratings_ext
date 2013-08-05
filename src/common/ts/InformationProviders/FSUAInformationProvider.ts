// ==UserScript==
// @name Ratings for FS.TO (ex FS.UA) and EX.UA
// @include http://fs.to/*
// @include http://www.ex.ua/view/*
// @include http://www.kinopoisk.ru/film/*
// ==/UserScript==

/// <reference path="IInformationProvider.ts"/> 

/// <reference path="../Settings/Settings.ts"/> 

declare var $f;

declare var FS_FLOWPLAYER_CONFIG;

class FSUAInformation implements IInformationContainer {
    titles: string[];
    years: Number[];
    container: Node;
}

class FSUAInformationProvider implements IInformationProvider {
    GetInfo(): IInformationContainer {
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
            var el: Element = <Element>item_info[0];
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
    }

    ChangeUrl() {
        var changeUrl = function (clip) {
            var file = document.location.href.match("file=([0-9]*)");
            var fileId = clip.fsData.file_id;
            if ((file == null) || (file.length < 2) || (file[1] == fileId))
                return;
            var newUrl = document.location.href.replace(/file=[0-9]*/, "file=" + fileId);
            history.replaceState(null, newUrl, newUrl);
        };

        console.log("ratings replace in change url");
        //var oldOnStart = FS_FLOWPLAYER_CONFIG.player.options.clip.onStart;
        //FS_FLOWPLAYER_CONFIG.player.options.clip.onStart = function (clip) {
        //    changeUrl(clip);
        //    oldOnStart(clip);
        //};
    
        if ($f() !== undefined)
            $f().onBeforeBegin(changeUrl);
        else
            setTimeout(function () { $f().onBeforeBegin(changeUrl); }, 1000);
    }
    

    CheckPlayerPage() {
        if ((window.location.href.indexOf("http://fs.to/view") == -1) || (window.location.href.indexOf("?play") == -1))
            return;

        if (Settings.GetSettings().GetIsClearPlayer()) {
            this.ChangeLists();
            this.executeScript(this.PlayerOnlyInject);
        }

        this.executeScript(this.ChangeUrl);
    }

    executeScript(script) {
        debug("ratings add script");
        var start = document.createElement("script");
        start.type = "text/javascript";
        var text = "(" + script.toString() + ")();";
        start.innerHTML = text;
        document.head.appendChild(start);
    }

    PlayerOnlyInject() {

        var playerCleared = false;

        var playerOnly = function () {
            if (playerCleared === true)
                return;

            var bdd = document.getElementsByClassName("b-dropdown");
            var bdds = new Array();
            for (var i = 0; i < bdd.length; i++)
            {
                bdds[i] = bdd[i];
            }

            var bps = document.getElementsByClassName("b-player");
            if (bps.length != 1)
                return;
            var bp = <HTMLElement> bps[0];
            bp.style.width = "100%";

            while (document.body.children.length > 0)
            {
                document.body.removeChild(document.body.firstChild);
            }

            document.body.appendChild(bp);

            for (var i = 0; i < bdds.length; i++) {
                document.body.appendChild(bdds[i]);
            }

            var items = document.getElementsByClassName("b-tab-item m-wide");
            if ((items != null) && (items.length > 0)) {
                var item = <HTMLElement> items[0];
                item.className = "";
            }

            var itemPlayer = <HTMLElement> document.getElementById("player");
            if ((itemPlayer !== null) && (itemPlayer !== undefined))
            {
                var parent = <HTMLElement> itemPlayer.parentNode;
                while (parent != document.body) {
                    if (parent.className != "main") {
                        parent.style.width = "100%";
                    }
                    parent.style.margin = "0";
                    parent.style.height = "100%";
                    parent = <HTMLElement> parent.parentNode;
                }
                itemPlayer.style.height = "100%";
                itemPlayer.style.width = "100%";
            }
            playerCleared = true;
        };

        console.log("ratings replace in player only");
        //var oldOnStart = FS_FLOWPLAYER_CONFIG.player.options.clip.onStart;
        //FS_FLOWPLAYER_CONFIG.player.options.clip.onStart = function (clip) {
        //    playerOnly();
        //    oldOnStart(clip);
        //};

        if($f() !== undefined)
            $f().onBeforeBegin(playerOnly);
        else
            setTimeout(function () { $f().onBeforeBegin(playerOnly); }, 1000);
    }

    ids = ["adsProxy-zone-section-glowadswide",
        "adsProxy-zone-section-adsuniversal",
        "adsProxy-zone-video"
    ];

    classes = ["h-ad",
        "l-content-right"
    ];


    ChangeLists() {
        var bti = document.getElementsByClassName("m-dropdown-movie");
        if ((bti != null) && (bti.length > 0))
        {
            var insert = bti[0];
            var parent = bti[0].parentNode;
            var popup = document.getElementsByClassName("m-popup");
            while ((popup != null) && (popup.length > 0))
            {
                var item = <HTMLDivElement> popup[0];
                item.className = item.className.replace("m-popup", "m-dropdown-movie");
                parent.insertBefore(item, insert);
                popup = document.getElementsByClassName("m-popup");
            }
        }
    }

    CheckAndCleanAd() {
        if (window.location.href.indexOf("http://fs.to/") == -1)
            return;

        if (Settings.GetSettings().GetIsRemoveAd() == false)
            return;

        debug("cleaner starting");

        this.ChangeLists();

        this.setCookie("preroll", 1);
        var ad;
        for (var i = 0; i < this.ids.length; i++)
        {
            ad = <HTMLDivElement> document.getElementById(this.ids[i]);
            if (ad !== null)
                ad.style.display = "none";
        }

        for (var i = 0; i < this.classes.length; i++)
        {
            var ads = document.getElementsByClassName(this.classes[i]);
            for (var n = 0; n < ads.length; n++)
            {
                ad = <HTMLDivElement> ads[n];
                if (ad !== null)
                    ad.style.display = "none";
            }
        }
    }

    setCookie(c_name, value, exdays = null) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var c_value = encodeURIComponent(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
        document.cookie = c_name + "=" + c_value;
    }
}
