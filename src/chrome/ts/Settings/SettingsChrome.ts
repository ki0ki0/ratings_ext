// ==UserScript==
// @name Ratings for FS.UA and EX.UA
// @include http://fs.to/*
// @include http://www.ex.ua/view/*
// @include http://www.kinopoisk.ru/film/*
// ==/UserScript==


/// <reference path="ChromeStorageSettings.ts"/> 
/// <reference path="../../../common/ts/Settings/Settings.ts"/> 

class SettingsChrome extends Settings{
    private sync: ChromeCachedStorageSettings;
    private localChrome: ChromeCachedStorageSettings;
    private callbackChrome: Function;
    private obj: Object;

    private namesChrome = ["playerOnly", "showVoting", "removeAdv", "syncSettings"];

    constructor(callback: Function, obj: Object) {
        super(null);
        this.callbackChrome = callback;
        this.obj = obj;
        this.sync = new ChromeCachedStorageSettings(true, this.namesChrome, this.syncCallback, this);
    }

    private syncCallback() {
        if (this.GetIsSync())
            this.callCallback();

        this.localChrome = new ChromeCachedStorageSettings(false, this.namesChrome, this.localCallback, this);
    }

    private localCallback() {
        if (!this.GetIsSync())
            this.callCallback();
    }

    private callCallback() {
        if (this.callbackChrome) {
            if (this.obj)
                this.callbackChrome.call(this.obj);
            else
                this.callbackChrome();
        }
    }

    GetIsSync():any { return this.sync.Get(this.namesChrome[3]); }
    SetIsSync(isSync: bool) { 
        this.sync.Set(this.namesChrome[3], isSync);
        this.localChrome.Set(this.namesChrome[3], isSync);
        if (isSync) {
            for (var i in this.namesChrome)
                this.sync.Set(this.namesChrome[i], this.localChrome.Get(this.namesChrome[i]));
        }
        else {
            for (var i in this.namesChrome)
                this.localChrome.Set(this.namesChrome[i], this.sync.Get(this.namesChrome[i]));
        }
    }

    private getCurrentStorage() {
        return this.GetIsSync() ? this.sync : this.localChrome;
    }

    GetIsClearPlayer(): any { return this.getCurrentStorage().Get(this.namesChrome[0]); }
    SetIsClearPlayer(isClear: bool) { this.getCurrentStorage().Set(this.namesChrome[0], isClear); }

    GetIsShowVoting(): any { return this.getCurrentStorage().Get(this.namesChrome[1]); }
    SetIsShowVoting(isClear: bool) { this.getCurrentStorage().Set(this.namesChrome[1], isClear); }

    GetIsRemoveAd(): any { return this.getCurrentStorage().Get(this.namesChrome[2]); }
    SetIsRemoveAd(isClear: bool) { this.getCurrentStorage().Set(this.namesChrome[2], isClear); }
}
