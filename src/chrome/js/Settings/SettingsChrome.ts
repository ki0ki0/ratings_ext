// ==UserScript==
// @name Ratings for FS.UA and EX.UA
// @include http://fs.ua/*
// @include http://www.ex.ua/view/*
// @include http://www.kinopoisk.ru/film/*
// ==/UserScript==


/// <reference path="ChromeStorageSettings.ts"/> 
/// <reference path="../../../common/js/Settings/Settings.ts"/> 

class SettingsChrome extends Settings{
    private sync: ChromeCachedStorageSettings;
    private local: ChromeCachedStorageSettings;
    private callback: Function;
    private obj: Object;

    private names = ["syncSettings", "playerOnly", "showVoting"];

    constructor(callback: Function, obj: Object) {
        super();
        this.callback = callback;
        this.obj = obj;
        this.sync = new ChromeCachedStorageSettings(true, this.names, this.syncCallback, this);
    }

    private syncCallback() {
        if (this.GetIsSync())
            this.callCallback();

        this.local = new ChromeCachedStorageSettings(false, this.names, this.localCallback, this);
    }

    private localCallback() {
        if (this.GetIsSync() == false)
            this.callCallback();
    }

    private callCallback() {
        if (this.callback) {
            if (this.obj)
                this.callback.call(this.obj);
            else
                this.callback();
        }
    }

    GetIsSync():any { return this.sync.Get(this.names[0]); }
    SetIsSync(isSync: bool) { 
        this.sync.Set(this.names[0], isSync);
        this.local.Set(this.names[0], isSync);
        if (isSync) {
            for (var i in this.names)
                this.sync.Set(this.names[i], this.local.Get(this.names[i]));
        }
        else {
            for (var i in this.names)
                this.local.Set(this.names[i], this.sync.Get(this.names[i]));
        }
    }

    private getCurrentStorage() {
        return this.GetIsSync() ? this.sync : this.local;
    }

    GetIsClearPlayer(): any { return this.getCurrentStorage().Get(this.names[1]); }
    SetIsClearPlayer(isClear: bool) { this.getCurrentStorage().Set(this.names[1], isClear); }

    GetIsShowVoting(): any { return this.getCurrentStorage().Get(this.names[2]); }
    SetIsShowVoting(isClear: bool) { this.getCurrentStorage().Set(this.names[2], isClear); }
}
