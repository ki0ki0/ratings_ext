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
            (window.location.href.indexOf("http://sdf.to/") == -1) &&
            (window.location.href.indexOf("http://cxz.to/") == -1))
            return null;


        this.CheckPlayerPage();

        this.CheckAndCleanAd();

        if (window.location.href.indexOf("/video/") == -1)
            return null;

        var headerInner = document.getElementsByClassName("b-player-skin__header-inner");
        if ((headerInner === undefined) || (headerInner === null) || (headerInner.length <= 0))
            return null;

        var headerInner0 = <HTMLElement> headerInner[0];
        if ((headerInner0 === undefined) || (headerInner0 === null) || (headerInner0.children.length < 1))
            return null;
        var child = <HTMLElement> headerInner0.children[0];
        var title = child.textContent;
        var titleOrg = null;
        if (headerInner0.children.length > 1) {
            child = <HTMLElement> headerInner0.children[1];
            titleOrg = child.textContent;
        }
        var titles = title.split(String.fromCharCode(160, 47, 160));
        if (titles.length == 0)
            return null;

        if (titleOrg != null)
            titles[titles.length] = titleOrg;

        var itemInfo = document.getElementsByClassName("b-player-skin__year");
        if (itemInfo.length == 0)
            return null;

        var year: number = null;
        if (itemInfo.length > 0) {
            var el: Element = <Element>itemInfo[0];
            year = parseInt( el.textContent);
        }

        var parents = document.getElementsByClassName("l-content-player-skin");
        if (parents.length == 0)
            return null;
        var p = document.createElement("p");
        parents[0].appendChild(p);
        p.className = "b-player-skin-play";
        p.style.display = "inline";
        p.style.backgroundImage = "url()";
        p.style.backgroundColor = "white";
        p.style.width = "initial";
        p.style.height = "initial";
        p.style.left = "350px";


        var info = new FSUAInformation();
        info.titles = titles;
        if (year !== null) {
            info.years = new Array(1);
            info.years[0] = year;
        }
        info.container = p;
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
            this.PlayerOnly();
        }

        executeScript(this.ChangeUrl);
    }

    playerCleared = false;

    PlayerOnly() {
        if (this.playerCleared === true)
            return;
        let frames = document.getElementsByTagName("iframe");
        if (frames.length === 0)
            return;
        var i = frames[0];
        window.location.href = i.src;
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

    CheckAndCleanAd() {
        if (Settings.GetSettings().GetIsRemoveAd() == false)
            return;

        debug("cleaner starting");

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

}