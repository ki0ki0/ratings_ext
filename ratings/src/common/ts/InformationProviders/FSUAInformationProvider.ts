/// <reference path="IInformationProvider.d.ts"/> 

/// <reference path="../Settings/Settings.ts"/> 

declare var $f;

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

        if (window.location.href.indexOf("/video/") == -1)
            return null;

        var headerInner = document.getElementsByClassName("b-player-skin__header-inner");
        if ((headerInner === undefined) || (headerInner === null) || (headerInner.length <= 0)) {
            return null;
        }

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
        var year: number = null;
        if (itemInfo.length !== 0) {
            if (itemInfo.length > 0) {
                var el: Element = <Element>itemInfo[0];
                year = parseInt(el.textContent);
            }
        }

        var parents = document.getElementsByClassName("b-player-skin__genre");
        if (parents.length == 0)
            return null;
        var p = document.createElement("p");
        var element = <HTMLDivElement>parents[0];
        element.style.height = "auto";
        element.style.margin = "0 0 20px";
        element.appendChild(p);

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

        debug("ratings replace in change url");
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
        if (((window.location.href.indexOf("/view") !== -1) && (window.location.href.indexOf("?play") !== -1))
            || window.location.href.indexOf(".html") === -1)
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
}