/// <reference path="IInformationProvider.d.ts"/> 

/// <reference path="../Settings/Settings.ts"/> 

declare var $f;

declare var FS_FLOWPLAYER_CONFIG;

declare var FS_GLOBALS;
declare var FS_BRANDING;

class FSUAInformation implements IInformationContainer {
    titles: string[];
    years: Number[];
    container: Node;
}

class FSUAInformationProvider implements IInformationProvider {
    GetInfo(): IInformationContainer {

        if ((window.location.href.indexOf("http://fs.to/") == -1) &&
            (window.location.href.indexOf("http://brb.to/") == -1) &&
            (window.location.href.indexOf("http://ewq.to/") == -1) &&
            (window.location.href.indexOf("http://sdf.to/") == -1))
            return null;


        this.CheckPlayerPage();

        this.CheckAndCleanAd();

        if (window.location.href.indexOf("/video/") == -1)
            return null;

        var category = document.getElementsByTagName("h1");
        if ((category === undefined) || (category === null) || (category.length <= 0))
            return null;

        var titleLocal = <HTMLElement> category[0];
        var titleOrg = titleLocal.nextElementSibling;
        var text = titleLocal.textContent.trim();
        var titles = text.split(String.fromCharCode(160, 47, 160));
        if (titles.length == 0)
            return null;

        if (titleOrg != null)
            titles[titles.length] = titleOrg.textContent.trim();

        var itemInfo = document.getElementsByClassName("item-info");
        if (itemInfo.length == 0)
            return null;

        var year: number = null;
        if (itemInfo.length > 0) {
            var el: Element = <Element>itemInfo[0];
            var td = el.getElementsByTagName("td");
            for (var i = 0; i < td.length; i++) {
                var yearInfo = td[i].textContent.trim();
                var match = yearInfo.match(/[0-9][0-9][0-9][0-9]/g);
                if ((match != null) && (match.length > 0)) {
                    year = parseInt( match[0]);
                    break;
                }
            }
        }

        var info = new FSUAInformation();
        info.titles = titles;
        if (year !== null) {
            info.years = new Array(1);
            info.years[0] = year;
        }
        info.container = itemInfo[0];
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
        if ((window.location.href.indexOf("/view") == -1) || (window.location.href.indexOf("?play") == -1))
            return;

        if (Settings.GetSettings().GetIsClearPlayer()) {
            this.ChangeLists();
            this.PlayerOnly();
        }

        executeScript(this.ChangeUrl);
    }

    playerCleared = false;

    PlayerOnly() {
        if (this.playerCleared === true)
            return;

        var bdd = document.getElementsByClassName("b-dropdown");
        var bdds = new Array();
        var i;
        for (i = 0; i < bdd.length; i++)
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

        for (i = 0; i < bdds.length; i++) {
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
        this.playerCleared = true;
    }

    ids = ["adsProxy-zone-section-glowadswide",
        "adsProxy-zone-section-adsuniversal",
        "adsProxy-zone-video"
    ];

    classes = ["h-ad",
        "l-content-right",
        "b-adsuniversal-wrap",
        "b-section-banner-wrap",
        "l-body-branding"
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

    test() {
        FS_GLOBALS = 0;
        FS_BRANDING = 0;
    }

    CheckAndCleanAd() {
        if (Settings.GetSettings().GetIsRemoveAd() == false)
            return;

        debug("cleaner starting");

        this.ChangeLists();

        this.setCookie("preroll", 1);


        executeScript(this.test);

        var ad: HTMLDivElement;
        var i: number;
        for (i = 0; i < this.ids.length; i++)
        {
            ad = <HTMLDivElement> document.getElementById(this.ids[i]);
            if ((ad !== undefined) && (ad !== null))
                ad.parentNode.removeChild(ad);
        }

        for (i = 0; i < this.classes.length; i++)
        {
            var ads = document.getElementsByClassName(this.classes[i]);
            for (var n = 0; n < ads.length; n++)
            {
                ad = <HTMLDivElement> ads[n];
                if ((ad !== undefined) && (ad !== null)) 
                    ad.parentNode.removeChild(ad);
            }
        }

        var inners = document.getElementsByClassName("l-body-inner");
        if (inners !== undefined && inners != null && inners.length > 0) {
            var inner = <HTMLDivElement> inners[0];
            inner.className = inner.className.replace("l-body-inner", "l-body-inner-inner");
            }


        var scripts = document.getElementsByTagName('script');
        for (i = scripts.length - 1; i >= 0; --i) {
            var script = <HTMLScriptElement> scripts[i];
            if (script === undefined) continue;
            if (/(hit\.ua|adriver\.ru|admixer\.net|mediacom\.com\.ua|adocean\.pl|admaster\.net|46\.182\.85\.201|adfox\.ru)/i.test(script.src)) {
                script.parentNode.removeChild(script);
            }
        }
    }

    setCookie(cName, value, exdays = null) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var cValue = encodeURIComponent(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
        document.cookie = cName + "=" + cValue;
    }
}